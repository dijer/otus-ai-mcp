import dotenv from "dotenv";

dotenv.config();

const readBool = (value: string | undefined, fallback: boolean): boolean => {
  if (value === undefined) {
    return fallback;
  }
  return ["1", "true", "yes", "on"].includes(value.toLowerCase());
};

const readInt = (value: string | undefined, fallback: number): number => {
  if (!value) {
    return fallback;
  }
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) ? parsed : fallback;
};

export type Settings = {
  appName: string;
  env: string;
  ollamaModel: string;
  ollamaBaseUrl: string;
  chromaPath: string;
  historyDbPath: string;
  indexRoot: string;
  retrievalTopKDefault: number;
  retrievalRrfK: number;
  graphMaxRetries: number;
  graphTimeoutMs: number;
  debug: boolean;
};

let cached: Settings | null = null;

export const getSettings = (): Settings => {
  if (cached) {
    return cached;
  }

  cached = {
    appName: process.env.MCP_APP_NAME ?? "poe2-rag-mcp",
    env: process.env.MCP_ENV ?? "dev",
    ollamaModel: process.env.MCP_OLLAMA_MODEL ?? "qwen2.5:3b",
    ollamaBaseUrl: process.env.MCP_OLLAMA_BASE_URL ?? "http://localhost:11434",
    chromaPath: process.env.MCP_CHROMA_PATH ?? "./data/chroma",
    historyDbPath: process.env.MCP_HISTORY_DB_PATH ?? "./data/history.db",
    indexRoot: process.env.MCP_INDEX_ROOT ?? "./sample_docs",
    retrievalTopKDefault: readInt(process.env.MCP_RETRIEVAL_TOPK_DEFAULT, 10),
    retrievalRrfK: readInt(process.env.MCP_RETRIEVAL_RRF_K, 60),
    graphMaxRetries: readInt(process.env.MCP_GRAPH_MAX_RETRIES, 2),
    graphTimeoutMs: readInt(process.env.MCP_GRAPH_TIMEOUT_MS, 45000),
    debug: readBool(process.env.MCP_DEBUG, true),
  };

  return cached;
};
