import path from "node:path";

import { getSettings } from "../config/settings.js";
import { readAllChunks, type ChunkRecord } from "../indexing/indexer.js";
import { queryChroma } from "./chroma.js";

type Scored = { id: string; score: number };

const tokenize = (text: string): string[] =>
  text
    .toLowerCase()
    .split(/[^\p{L}\p{N}_]+/u)
    .map((part) => part.trim())
    .filter((part) => part.length > 1);

const countTerms = (terms: string[]): Map<string, number> => {
  const counts = new Map<string, number>();
  for (const term of terms) {
    counts.set(term, (counts.get(term) ?? 0) + 1);
  }
  return counts;
};

const sortByScore = (scores: Map<string, number>): Scored[] =>
  [...scores.entries()]
    .map(([id, score]) => ({ id, score }))
    .sort((a, b) => b.score - a.score || a.id.localeCompare(b.id));

const rrf = (rankA: string[], rankB: string[], k: number): Map<string, number> => {
  const out = new Map<string, number>();

  rankA.forEach((id, idx) => {
    const v = 1 / (k + idx + 1);
    out.set(id, (out.get(id) ?? 0) + v);
  });

  rankB.forEach((id, idx) => {
    const v = 1 / (k + idx + 1);
    out.set(id, (out.get(id) ?? 0) + v);
  });

  return out;
};

const bm25Scores = (query: string, chunks: ChunkRecord[]): Map<string, number> => {
  if (chunks.length === 0) {
    return new Map<string, number>();
  }

  if (chunks.length < 3) {
    const q = new Set(tokenize(query));
    const scores = new Map<string, number>();
    for (const chunk of chunks) {
      const d = new Set(tokenize(chunk.text));
      let intersection = 0;
      for (const token of q) {
        if (d.has(token)) {
          intersection += 1;
        }
      }
      if (intersection > 0) {
        scores.set(chunk.id, intersection / Math.max(1, q.size));
      }
    }
    return scores;
  }

  const docsTerms = chunks.map((chunk) => tokenize(chunk.text));
  const docsTf = docsTerms.map((terms) => countTerms(terms));
  const docLen = docsTerms.map((terms) => terms.length || 1);
  const avgLen = docLen.reduce((sum, n) => sum + n, 0) / Math.max(docLen.length, 1);

  const queryTerms = [...new Set(tokenize(query))];
  const docFreq = new Map<string, number>();

  for (const term of queryTerms) {
    let count = 0;
    for (const tf of docsTf) {
      if (tf.has(term)) {
        count += 1;
      }
    }
    docFreq.set(term, count);
  }

  const totalDocs = chunks.length;
  const k1 = 1.2;
  const b = 0.75;
  const scores = new Map<string, number>();

  chunks.forEach((chunk, index) => {
    let score = 0;

    for (const term of queryTerms) {
      const tf = docsTf[index].get(term) ?? 0;
      if (tf === 0) {
        continue;
      }

      const df = docFreq.get(term) ?? 0;
      const idf = Math.log(1 + (totalDocs - df + 0.5) / (df + 0.5));
      const numerator = tf * (k1 + 1);
      const denominator = tf + k1 * (1 - b + (b * docLen[index]) / (avgLen || 1));

      score += idf * (numerator / denominator);
    }

    if (score > 0) {
      scores.set(chunk.id, score);
    }
  });

  return scores;
};

export const findRelevant = async (
  query: string,
  topK: number,
): Promise<{
  results: Array<Record<string, unknown>>;
  rankingTrace: Record<string, unknown>;
}> => {
  const settings = getSettings();
  const dataDir = path.dirname(path.resolve(settings.historyDbPath));
  const chunks = readAllChunks(dataDir);

  if (chunks.length === 0) {
    return {
      results: [],
      rankingTrace: {
        bm25Hits: [],
        vectorHits: [],
        rrfCandidates: [],
        finalOrder: [],
      },
    };
  }

  const bm25 = bm25Scores(query, chunks);
  const vector = new Map<string, number>();
  const vectorRaw = await queryChroma(query, topK * 2);

  for (const hit of vectorRaw) {
    if (hit.score > 0) {
      vector.set(hit.id, hit.score);
    }
  }

  const bm25Rank = sortByScore(bm25).map((item) => item.id);
  const vectorRank = sortByScore(vector).map((item) => item.id);

  const fused = rrf(bm25Rank, vectorRank, settings.retrievalRrfK);
  const fusedRanked = sortByScore(fused).slice(0, topK);

  const byId = new Map(chunks.map((chunk) => [chunk.id, chunk]));
  const mapped = fusedRanked
    .map((item, idx): Record<string, unknown> | null => {
      const chunk = byId.get(item.id);
      if (!chunk) {
        return null;
      }

      return {
        rank: idx + 1,
        score: item.score,
        chunkId: chunk.id,
        text: chunk.text,
        metadata: chunk.metadata,
      };
    })
    .filter((item): item is Record<string, unknown> => item !== null);

  return {
    results: mapped,
    rankingTrace: {
      bm25Hits: sortByScore(bm25).slice(0, topK),
      vectorHits: vectorRaw.slice(0, topK),
      rrfCandidates: sortByScore(fused).slice(0, topK * 2),
      finalOrder: fusedRanked,
    },
  };
};
