import { getSettings } from "../config/settings.js";
import { runCorrectiveGraph } from "../retrieval/correctiveGraph.js";
import { failure, success, type ToolResponse } from "../types/api.js";

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
  const finalState = await runCorrectiveGraph(question, topK);

  const relevantCount = finalState.latestGrades.filter((item) => item.relevant).length;

  return success({
    message: "Ответ сформирован",
    question,
    graph: "rewrite -> retrieve -> grade -> (broaden/retry) -> generate",
    graphTrace: finalState.graphTrace,
    grade: {
      relevantCount,
      totalRetrieved: finalState.latest.results.length,
      threshold: 0.1,
      chunks: finalState.latestGrades,
    },
    maxRetries: settings.graphMaxRetries,
    rewrittenQuery: finalState.rewrittenQuery,
    attempts: finalState.attempts,
    answer: finalState.generatedAnswer,
    sources: finalState.sources,
    rankingTrace: finalState.latest.rankingTrace,
    stub: false,
  });
};
