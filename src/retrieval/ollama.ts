import { getSettings } from "../config/settings.js";

const hasCyrillic = (text: string): boolean => /[а-яё]/iu.test(text);

const chat = async (prompt: string): Promise<string | null> => {
  const settings = getSettings();
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), settings.graphTimeoutMs);

  try {
    const response = await fetch(`${settings.llmBaseUrl}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
      body: JSON.stringify({
        model: settings.llmModel,
        stream: false,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!response.ok) {
      return null;
    }

    const payload = (await response.json()) as { message?: { content?: string } };
    const text = payload.message?.content?.trim();
    return text && text.length > 0 ? text : null;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
};

export const gradeChunkYesNo = async (
  question: string,
  chunkText: string,
): Promise<boolean | null> => {
  const prompt = [
    "Оцени релевантность чанка вопросу.",
    "Ответь строго одним словом: yes или no.",
    `Вопрос: ${question}`,
    `Чанк: ${chunkText}`,
  ].join("\n\n");

  const text = (await chat(prompt))?.toLowerCase() ?? "";
  if (/\byes\b|\bда\b/u.test(text)) {
    return true;
  }
  if (/\bno\b|\bнет\b/u.test(text)) {
    return false;
  }
  return null;
};

export const generateFromSnippets = async (
  question: string,
  snippets: string[],
): Promise<string | null> => {
  if (snippets.length === 0) {
    return null;
  }

  const russian = hasCyrillic(question);

  const prompt = [
    russian
      ? "Ответь кратко по контексту и тем же языком, что и вопрос. Если данных мало, так и скажи."
      : "Answer briefly using only the provided context and in the same language as the question. If data is insufficient, say so explicitly.",
    russian ? `Вопрос: ${question}` : `Question: ${question}`,
    russian ? "Контекст:" : "Context:",
    snippets.map((s, i) => `[${i + 1}] ${s}`).join("\n\n"),
  ].join("\n\n");

  return chat(prompt);
};
