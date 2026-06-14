import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

import { getSettings } from "../config/settings.js";
import { handleAskQuestion } from "../tools/ask_question.js";
import { handleFindRelevantDocs } from "../tools/find_relevant_docs.js";
import { handleIndexFolder } from "../tools/index_folder.js";
import { handleIndexStatus } from "../tools/index_status.js";

const settings = getSettings();

const server = new McpServer({
  name: settings.appName,
  version: "0.1.0",
});

const asToolResult = (payload: Record<string, unknown>) => ({
  content: [{ type: "text" as const, text: JSON.stringify(payload, null, 2) }],
});

server.tool(
  "index_folder",
  "Индексирует папку документов для базы знаний Path of Exile 2. Используется при первом запуске или после обновления документов.",
  {
    path: z.string(),
    glob_pattern: z.string().default("**/*"),
    reindex: z.boolean().default(false),
  },
  async ({ path, glob_pattern, reindex }) => asToolResult(handleIndexFolder(path, glob_pattern, reindex)),
);

server.tool(
  "ask_question",
  "Отвечает на вопрос пользователя по локальной базе знаний (классы, уникальные предметы, боссы, пассивные умения).",
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

const main = async (): Promise<void> => {
  const transport = new StdioServerTransport();
  await server.connect(transport);
};

main().catch((error) => {
  console.error("MCP server failed", error);
  process.exitCode = 1;
});
