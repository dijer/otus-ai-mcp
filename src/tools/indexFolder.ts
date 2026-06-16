import path from "node:path";
import fs from "node:fs";

import { getSettings } from "../config/settings.js";
import { DEFAULT_SUPPORTED_EXTENSIONS, indexDocuments, readAllChunks } from "../indexing/indexer.js";
import { rebuildChromaIndex } from "../retrieval/chroma.js";
import { failure, success, type ToolResponse } from "../types/api.js";

export const handleIndexFolder = async (
  inputPath: string,
  globPattern = "**/*",
  reindex = false,
): Promise<ToolResponse<Record<string, unknown>>> => {
  if (!inputPath || inputPath.trim().length === 0) {
    return failure("INDEX_PATH_INVALID", "path не должен быть пустым");
  }

  const rootPath = path.resolve(inputPath.trim());
  if (!fs.existsSync(rootPath) || !fs.statSync(rootPath).isDirectory()) {
    return failure(
      "INDEX_PATH_NOT_FOUND",
      "path должен существовать и указывать на директорию",
      { path: rootPath },
    );
  }

  const settings = getSettings();
  const dataDir = path.dirname(path.resolve(settings.historyDbPath));

  const indexed = indexDocuments({
    rootPath,
    globPattern,
    reindex,
    dataDir,
    allowedExts: DEFAULT_SUPPORTED_EXTENSIONS,
  });

  try {
    const chunks = readAllChunks(dataDir);
    await rebuildChromaIndex(chunks);
  } catch (error) {
    return failure("CHROMA_INDEX_FAILED", "Не удалось синхронизировать индекс в Chroma", {
      details: error instanceof Error ? error.message : String(error),
    });
  }

  return success({
    message: "Индексация завершена",
    ...indexed,
    stub: false,
  });
};
