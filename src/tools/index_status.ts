import path from "node:path";

import { getSettings } from "../config/settings.js";
import { readIndexStatus } from "../indexing/indexer.js";
import { success, type ToolResponse } from "../types/api.js";

export const handleIndexStatus = (): ToolResponse<Record<string, unknown>> => {
  const settings = getSettings();
  const dataDir = path.dirname(path.resolve(settings.historyDbPath));
  const status = readIndexStatus(dataDir);

  return success({
    message: "Статус индекса",
    ...status,
    stub: false,
  });
};
