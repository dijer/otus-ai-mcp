import path from "node:path";
import fs from "node:fs";

import { getSettings } from "../config/settings.js";
import { DEFAULT_SUPPORTED_EXTENSIONS, indexDocuments } from "../indexing/indexer.js";
import { failure, success, type ToolResponse } from "../types/api.js";

export const handleIndexFolder = (
  inputPath: string,
  globPattern = "**/*",
  reindex = false,
): ToolResponse<Record<string, unknown>> => {
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

  return success({
    message: "Индексация завершена",
    ...indexed,
    stub: false,
  });
};
