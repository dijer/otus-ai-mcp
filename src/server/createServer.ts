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
    "Indexes a knowledge-base folder by scanning files, splitting them into chunks, and storing embeddings for retrieval. Use on first run or after document updates.",
    {
      path: z.string().default("./sample_docs"),
      glob_pattern: z.string().default("**/*"),
      reindex: z.boolean().default(true),
    },
    async ({ path, glob_pattern, reindex }) =>
      asToolResult(await handleIndexFolder(path, glob_pattern, reindex)),
  );

  server.tool(
    "ask_question",
    "Answers a user question from the local Path of Exile 2 tactics knowledge base using the full corrective RAG pipeline (rewrite, retrieve, grade, generate).",
    {
      question: z.string(),
      top_k: z.number().int().positive().default(8),
    },
    async ({ question, top_k }) => asToolResult(await handleAskQuestion(question, top_k)),
  );

  server.tool(
    "find_relevant_docs",
    "Returns ranked relevant chunks without generating a final answer. Useful for retrieval debugging and source verification.",
    {
      query: z.string(),
      top_k: z.number().int().positive().default(10),
    },
    async ({ query, top_k }) => asToolResult(await handleFindRelevantDocs(query, top_k)),
  );

  server.tool(
    "index_status",
    "Shows current index status, including file/chunk counts and the timestamp of the last indexing run.",
    {},
    async () => asToolResult(handleIndexStatus()),
  );

  return server;
};
