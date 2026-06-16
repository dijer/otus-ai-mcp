import { ChromaClient, type Collection } from "chromadb";

import type { ChunkRecord } from "../indexing/indexer.js";
import { embedText } from "./embeddings.js";

const COLLECTION_NAME = "poe2_chunks";
let memoryIndex: ChunkRecord[] = [];

type ChromaHit = {
  id: string;
  distance: number;
  score: number;
  document?: string;
  metadata?: Record<string, unknown>;
};

const createClient = (): ChromaClient => {
  // In-process Chroma: in-memory mode (no external server required)
  return new ChromaClient();
};

const getCollection = async (): Promise<Collection> => {
  const client = createClient();
  return client.getOrCreateCollection({ name: COLLECTION_NAME });
};

export const rebuildChromaIndex = async (chunks: ChunkRecord[]): Promise<void> => {
  memoryIndex = chunks;
  const client = createClient();

  try {
    try {
      await client.deleteCollection({ name: COLLECTION_NAME });
    } catch {
      // ignore when collection does not exist yet
    }

    if (chunks.length === 0) {
      return;
    }

    const collection = await client.getOrCreateCollection({ name: COLLECTION_NAME });

    const ids = chunks.map((chunk) => chunk.id);
    const documents = chunks.map((chunk) => chunk.text);
    const embeddings = chunks.map((chunk) => embedText(chunk.text));
    const metadatas = chunks.map((chunk) => ({
      source: chunk.metadata.source,
      chunkIndex: chunk.metadata.chunkIndex,
      startChar: chunk.metadata.startChar,
      endChar: chunk.metadata.endChar,
    }));

    await collection.upsert({ ids, documents, embeddings, metadatas });
  } catch {
    // fallback: keep memoryIndex in sync, vector operations will use in-memory embeddings
  }
};

export const queryChroma = async (query: string, topK: number): Promise<ChromaHit[]> => {
  try {
    const collection = await getCollection();
    const queryEmbedding = embedText(query);

    const result = await collection.query({
      queryEmbeddings: [queryEmbedding],
      nResults: topK,
      include: ["distances", "documents", "metadatas"],
    });

    const rows = result.rows();
    const first = rows[0] ?? [];

    return first.map((row) => {
      const distance = typeof row.distance === "number" ? row.distance : 1;
      const score = 1 / (1 + Math.max(0, distance));
      return {
        id: row.id,
        distance,
        score,
        document: row.document ?? undefined,
        metadata: (row.metadata as Record<string, unknown> | null) ?? undefined,
      };
    });
  } catch {
    // fallback to in-memory embedding-based retrieval
    if (memoryIndex.length === 0) {
      return [];
    }

    const q = embedText(query);
    const dot = (a: number[], b: number[]): number => {
      let acc = 0;
      for (let i = 0; i < a.length; i += 1) {
        acc += a[i] * b[i];
      }
      return acc;
    };

    return memoryIndex
      .map((chunk) => {
        const embedding = embedText(chunk.text);
        const cosine = Math.max(0, dot(q, embedding));
        return {
          id: chunk.id,
          distance: 1 - cosine,
          score: cosine,
          document: chunk.text,
          metadata: {
            source: chunk.metadata.source,
            chunkIndex: chunk.metadata.chunkIndex,
            startChar: chunk.metadata.startChar,
            endChar: chunk.metadata.endChar,
          },
        };
      })
      .sort((a, b) => b.score - a.score || a.id.localeCompare(b.id))
      .slice(0, topK);
  }
};
