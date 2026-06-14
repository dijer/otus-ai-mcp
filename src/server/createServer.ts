import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

import { getSettings } from "../config/settings.js";
import { handleAskQuestion } from "../tools/askQuestion.js";
import { handleFindRelevantDocs } from "../tools/findRelevantDocs.js";
import { handleIndexFolder } from "../tools/indexFolder.js";
import { handleIndexStatus } from "../tools/indexStatus.js";

const asToolResult = (payload: Record<string, unknown>) => ({
  content: [{ type: "text" as const, text: JSON.stringify(payload, null, 2) }],
});

export const createMcpServer = (): McpServer => {
  const settings = getSettings();

  const server = new McpServer({
    name: settings.appName,
    version: "0.1.0",
  });

  server.tool(
    "index_folder",
    "Индексирует папку документов базы знаний по тактикам на боссов в Path of Exile 2. Используется при первом запуске или после обновления документов.",
    {
      path: z.string().default("./sample_docs"),
      glob_pattern: z.string().default("**/*"),
      reindex: z.boolean().default(true),
    },
    async ({ path, glob_pattern, reindex }) => asToolResult(handleIndexFolder(path, glob_pattern, reindex)),
  );

  server.tool(
    "ask_question",
    "Отвечает на вопрос пользователя по локальной базе знаний с тактиками на боссов в Path of Exile 2 (фазы, механики, окна урона, позиционирование).",
    {
      question: z.string(),
      top_k: z.number().int().positive().default(8),
    },
    async ({ question, top_k }) => asToolResult(await handleAskQuestion(question, top_k)),
  );

  server.tool(
    "find_relevant_docs",
    "Возвращает релевантные чанки без генерации ответа. Полезно для проверки качества поиска и источников.",
    {
      query: z.string(),
      top_k: z.number().int().positive().default(10),
    },
    async ({ query, top_k }) => asToolResult(handleFindRelevantDocs(query, top_k)),
  );

  server.tool(
    "index_status",
    "Показывает состояние индекса: количество файлов, чанков и время последней индексации.",
    {},
    async () => asToolResult(handleIndexStatus()),
  );

  return server;
};
