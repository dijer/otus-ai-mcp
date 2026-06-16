import { findRelevant } from "../retrieval/hybrid.js";
import { failure, success, type ToolResponse } from "../types/api.js";

export const handleFindRelevantDocs = async (
  query: string,
  topK = 10,
): Promise<ToolResponse<Record<string, unknown>>> => {
  if (query.trim().length < 2) {
    return failure("FIND_QUERY_INVALID", "query должен содержать минимум 2 символа");
  }

  if (topK < 1) {
    return failure("FIND_TOPK_INVALID", "top_k должен быть >= 1");
  }

  const found = await findRelevant(query, topK);

  return success({
    message: "Релевантные чанки найдены",
    query,
    topK,
    ...found,
    stub: false,
  });
};
