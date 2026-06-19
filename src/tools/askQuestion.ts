import path from "node:path";

import { getSettings } from "../config/settings.js";
import { runCorrectiveGraph } from "../retrieval/correctiveGraph.js";
import { failure, success, type ToolResponse } from "../types/api.js";

type RetrievedChunk = {
  chunkId?: string;
  text?: string;
  metadata?: Record<string, unknown>;
};

type BossCandidate = {
  name: string;
  score: number;
};

const hasCyrillic = (text: string): boolean => /[а-яё]/iu.test(text);

const asChunk = (item: Record<string, unknown>): RetrievedChunk => ({
  chunkId: typeof item.chunkId === "string" ? item.chunkId : undefined,
  text: typeof item.text === "string" ? item.text : undefined,
  metadata: item.metadata as Record<string, unknown> | undefined,
});

const toTitleCase = (value: string): string =>
  value
    .replace(/([a-zа-я0-9])([A-ZА-Я])/gu, "$1 $2")
    .replace(/[._-]+/g, " ")
    .split(/\s+/)
    .filter((part) => part.length > 0)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

const GENERIC_TITLE_RE =
  /\b(mastery|guide|checklist|summary|reference|notes|basics|window|windows|template|playbook)\b/iu;

const extractBossCandidate = (chunk: RetrievedChunk): BossCandidate | null => {
  const text = chunk.text ?? "";
  const source = typeof chunk.metadata?.source === "string" ? chunk.metadata.source : "";
  const sourceLower = source.toLowerCase();
  const baseName = path.basename(source, path.extname(source));
  const inBosses = sourceLower.includes("/bosses/");
  const inBossProfileFolder = /\/bosses\/(act\d+|endgame)\//iu.test(sourceLower);

  const headingMatch = text.match(/^#{1,3}\s*Boss:\s*(.+)$/imu);
  if (headingMatch?.[1]) {
    const name = headingMatch[1].trim();
    if (name.length > 1) {
      return { name, score: 120 };
    }
  }

  const titleMatch = text.match(/^#{1,3}\s*(.+)$/imu);
  if (titleMatch?.[1] && inBosses) {
    const title = titleMatch[1].trim();
    if (title.length > 0) {
      const cleaned = title.replace(/^Boss:\s*/iu, "").trim();
      if (cleaned.length > 1) {
        let score = 35;
        if (inBossProfileFolder) {
          score += 35;
        }
        if (GENERIC_TITLE_RE.test(cleaned) || baseName.toLowerCase().startsWith("boss-")) {
          score -= 60;
        }
        return { name: cleaned, score };
      }
    }
  }

  if (inBosses) {
    if (baseName.length > 0) {
      const cleaned = toTitleCase(baseName);
      let score = inBossProfileFolder ? 55 : 20;
      if (GENERIC_TITLE_RE.test(cleaned) || baseName.toLowerCase().startsWith("boss-")) {
        score -= 45;
      }
      return { name: cleaned, score };
    }
  }

  return null;
};

const selectAnswer = (
  question: string,
  finalState: Awaited<ReturnType<typeof runCorrectiveGraph>>,
): { answer: string; status: "answered" | "no_data" } => {
  const russian = hasCyrillic(question);
  const cleanAnswer = finalState.generatedAnswer.trim();
  if (
    cleanAnswer.length > 0 &&
    !cleanAnswer.includes("Недостаточно данных") &&
    !cleanAnswer.includes("Not enough data")
  ) {
    return { answer: cleanAnswer, status: "answered" };
  }

  const results = finalState.latest.results.map((item) => asChunk(item));
  const best = results
    .map((chunk) => extractBossCandidate(chunk))
    .filter((item): item is BossCandidate => item !== null)
    .sort((a, b) => b.score - a.score)[0];
  if (best && best.score >= 40) {
    return {
      answer: russian ? `Например, ${best.name}.` : `For example, ${best.name}.`,
      status: "answered",
    };
  }

  return {
    answer: russian
      ? "Недостаточно данных в индексе. Сначала выполните index_folder()."
      : "Not enough data in the index. Run index_folder() first.",
    status: "no_data",
  };
};

export const handleAskQuestion = async (
  question: string,
  topK = 8,
): Promise<ToolResponse<Record<string, unknown>>> => {
  if (question.trim().length < 3) {
    return failure("ASK_QUESTION_INVALID", "question должен содержать минимум 3 символа");
  }
  if (topK < 1) {
    return failure("ASK_TOPK_INVALID", "top_k должен быть >= 1");
  }

  const settings = getSettings();
  const finalState = await runCorrectiveGraph(question, topK);

  const relevantCount = finalState.latestGrades.filter((item) => item.relevant).length;
  const selected = selectAnswer(question, finalState);

  if (settings.debug) {
    console.debug(
      JSON.stringify(
        {
          tool: "ask_question",
          question,
          status: selected.status,
          relevantCount,
          sourceCount: finalState.latest.results.length,
        },
        null,
        2,
      ),
    );
  }

  return success({
    status: selected.status,
    answer: selected.answer,
  });
};
