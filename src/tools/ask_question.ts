import { getSettings } from "../config/settings.js";
import { findRelevant } from "../retrieval/hybrid.js";
import { failure, success, type ToolResponse } from "../types/api.js";

const broadenQuery = (query: string, attempt: number): string => {
  if (attempt <= 0) {
    return query;
  }
  return `${query} mechanics stats details source`;
};

const maybeGenerateWithOllama = async (
  question: string,
  snippets: string[],
): Promise<string | null> => {
  const settings = getSettings();
  if (snippets.length === 0) {
    return null;
  }

  const prompt = [
    "Ответь кратко по контексту. Если данных мало, так и скажи.",
    `Вопрос: ${question}`,
    "Контекст:",
    snippets.map((s, i) => `[${i + 1}] ${s}`).join("\n\n"),
  ].join("\n\n");

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), settings.graphTimeoutMs);

  try {
    const response = await fetch(`${settings.ollamaBaseUrl}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
      body: JSON.stringify({
        model: settings.ollamaModel,
        stream: false,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!response.ok) {
      return null;
    }

    const payload = (await response.json()) as {
      message?: { content?: string };
    };
    const text = payload.message?.content?.trim();
    return text && text.length > 0 ? text : null;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
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
  let attempts = 0;
  let latestQuery = question;
  let latest = findRelevant(latestQuery, topK);

  while (attempts < settings.graphMaxRetries) {
    const enough = latest.results.length >= Math.min(2, topK);
    if (enough) {
      break;
    }
    attempts += 1;
    latestQuery = broadenQuery(question, attempts);
    latest = findRelevant(latestQuery, topK);
  }

  const snippets = latest.results
    .map((item) => (typeof item.text === "string" ? item.text : ""))
    .filter((text) => text.length > 0)
    .slice(0, 3);

  const generated = await maybeGenerateWithOllama(question, snippets);
  const fallback =
    snippets.length > 0
      ? `По найденным источникам: ${snippets.join("\n\n")}`
      : "Недостаточно данных в индексе. Сначала выполните index_folder().";

  const sources = latest.results.map((item) => item.metadata).slice(0, topK);

  return success({
    message: "Ответ сформирован",
    question,
    rewritten_query: latestQuery,
    attempts,
    answer: generated ?? fallback,
    sources,
    ranking_trace: latest.ranking_trace,
    stub: false,
  });
};
