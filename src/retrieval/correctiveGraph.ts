import { Annotation, END, START, StateGraph } from "@langchain/langgraph";

import { getSettings } from "../config/settings.js";
import { findRelevant } from "./hybrid.js";
import { generateFromSnippets, gradeChunkYesNo } from "./ollama.js";

type RetrievedChunk = {
	rank?: number;
	score?: number;
	chunkId?: string;
	text?: string;
	metadata?: Record<string, unknown>;
};

type RetrievalOutput = {
	results: Array<Record<string, unknown>>;
	rankingTrace: Record<string, unknown>;
};

type GradeItem = {
	chunkId: string;
	score: number;
	relevant: boolean;
};

const hasCyrillic = (text: string): boolean => /[а-яё]/iu.test(text);

type AskGraphState = {
	question: string;
	topK: number;
	baseQuery: string;
	rewrittenQuery: string;
	attempts: number;
	graphTrace: string[];
	latest: RetrievalOutput;
	latestGrades: GradeItem[];
	generatedAnswer: string;
	sources: Array<Record<string, unknown>>;
};

export type CorrectiveGraphResult = {
	rewrittenQuery: string;
	attempts: number;
	graphTrace: string[];
	latest: RetrievalOutput;
	latestGrades: GradeItem[];
	generatedAnswer: string;
	sources: Array<Record<string, unknown>>;
};

const tokenize = (text: string): string[] =>
	text
		.toLowerCase()
		.split(/[^\p{L}\p{N}_]+/u)
		.map((part) => part.trim())
		.filter((part) => part.length > 1);

const asChunk = (item: Record<string, unknown>): RetrievedChunk => ({
	rank: typeof item.rank === "number" ? item.rank : undefined,
	score: typeof item.score === "number" ? item.score : undefined,
	chunkId: typeof item.chunkId === "string" ? item.chunkId : undefined,
	text: typeof item.text === "string" ? item.text : undefined,
	metadata: item.metadata as Record<string, unknown> | undefined,
});

const overlapScore = (query: string, text: string): number => {
	const q = new Set(tokenize(query));
	const d = new Set(tokenize(text));
	if (q.size === 0 || d.size === 0) {
		return 0;
	}

	let intersection = 0;
	for (const token of q) {
		if (d.has(token)) {
			intersection += 1;
		}
	}

	return intersection / q.size;
};

const rewriteQuery = (query: string): string => query.trim().replace(/\s+/g, " ");

const broadenQuery = (query: string, attempt: number): string => {
	if (attempt <= 0) {
		return query;
	}
	return `${query} mechanics tactics phases timings counters source`;
};

const retrieveAsync = async (query: string, topK: number): Promise<RetrievalOutput> =>
	findRelevant(query, topK);

const gradeChunks = (query: string, results: Array<Record<string, unknown>>): GradeItem[] => {
	return results.map((raw) => {
		const chunk = asChunk(raw);
		const text = chunk.text ?? "";
		const lexical = overlapScore(query, text);
		const retrievalScore = typeof chunk.score === "number" ? chunk.score : 0;
		const combined = lexical + Math.min(0.5, retrievalScore);

		return {
			chunkId: chunk.chunkId ?? "unknown",
			score: Number(combined.toFixed(4)),
			relevant: combined >= 0.1,
		};
	});
};

const gradeChunksWithLlm = async (
	query: string,
	question: string,
	results: Array<Record<string, unknown>>,
): Promise<GradeItem[]> => {
	const heuristic = gradeChunks(query, results);
	const graded = await Promise.all(
		results.map(async (raw, idx) => {
			const chunk = asChunk(raw);
			const chunkId = chunk.chunkId ?? "unknown";
			const retrievalScore = typeof chunk.score === "number" ? chunk.score : 0;
			const llm = await gradeChunkYesNo(question, chunk.text ?? "");
			if (llm === null) {
				return heuristic[idx];
			}
			return {
				chunkId,
				score: Number((Math.min(0.5, retrievalScore) + (llm ? 0.5 : 0)).toFixed(4)),
				relevant: llm,
			};
		}),
	);
	return graded;
};

export const runCorrectiveGraph = async (
	question: string,
	topK: number,
): Promise<CorrectiveGraphResult> => {
	const settings = getSettings();

	const AskState = Annotation.Root({
		question: Annotation<string>,
		topK: Annotation<number>,
		baseQuery: Annotation<string>,
		rewrittenQuery: Annotation<string>,
		attempts: Annotation<number>,
		graphTrace: Annotation<string[]>({
			reducer: (left, right) => [...left, ...right],
			default: () => [],
		}),
		latest: Annotation<RetrievalOutput>,
		latestGrades: Annotation<GradeItem[]>,
		generatedAnswer: Annotation<string>,
		sources: Annotation<Array<Record<string, unknown>>>,
	});

	const workflow = new StateGraph(AskState)
		.addNode("rewrite", async (state: AskGraphState) => ({
			rewrittenQuery: rewriteQuery(state.question),
			baseQuery: rewriteQuery(state.question),
			graphTrace: ["rewrite"],
			attempts: 0,
		}))
		.addNode("retrieve", async (state: AskGraphState) => {
			const latest = await retrieveAsync(state.rewrittenQuery, state.topK);
			return {
				latest,
				graphTrace: ["retrieve"],
			};
		})
		.addNode("grade", async (state: AskGraphState) => {
			const latestGrades = await gradeChunksWithLlm(
				state.rewrittenQuery,
				state.question,
				state.latest.results,
			);
			return {
				latestGrades,
				graphTrace: ["grade"],
			};
		})
		.addNode("broaden", async (state: AskGraphState) => {
			const nextAttempt = state.attempts + 1;
			return {
				attempts: nextAttempt,
				rewrittenQuery: broadenQuery(state.baseQuery, nextAttempt),
				graphTrace: ["decision:broaden", "broaden"],
			};
		})
		.addNode("generate", async (state: AskGraphState) => {
			const relevantChunkIds = new Set(
				state.latestGrades.filter((item) => item.relevant).map((item) => item.chunkId),
			);

			const snippets = state.latest.results
				.map((item) => asChunk(item))
				.filter((item) => (item.chunkId ? relevantChunkIds.has(item.chunkId) : false))
				.map((item) => item.text ?? "")
				.filter((text) => text.length > 0)
				.slice(0, 3);

			const generated = await generateFromSnippets(state.question, snippets);
			const russian = hasCyrillic(state.question);
			const fallback =
				snippets.length > 0
					? russian
						? `По найденным источникам: ${snippets.join("\n\n")}`
						: `From indexed sources: ${snippets.join("\n\n")}`
					: russian
						? "Недостаточно данных в индексе. Сначала выполните index_folder()."
						: "Not enough data in the index. Run index_folder() first.";

			const sources = state.latest.results
				.map((item) => asChunk(item).metadata)
				.filter((item): item is Record<string, unknown> => item !== undefined)
				.slice(0, state.topK);

			return {
				generatedAnswer: generated ?? fallback,
				sources,
				graphTrace: ["generate"],
			};
		})
		.addEdge(START, "rewrite")
		.addEdge("rewrite", "retrieve")
		.addEdge("retrieve", "grade")
		.addConditionalEdges(
			"grade",
			(state: AskGraphState) => {
				const relevantCount = state.latestGrades.filter((item) => item.relevant).length;
				const enough = relevantCount >= Math.min(2, state.topK);
				if (enough || state.attempts >= settings.graphMaxRetries) {
					return "generate";
				}
				return "broaden";
			},
			{
				broaden: "broaden",
				generate: "generate",
			},
		)
		.addEdge("broaden", "retrieve")
		.addEdge("generate", END);

	const app = workflow.compile();
	const finalState = (await app.invoke({
		question,
		topK,
		baseQuery: "",
		rewrittenQuery: question,
		attempts: 0,
		graphTrace: [],
		latest: { results: [], rankingTrace: {} },
		latestGrades: [],
		generatedAnswer: "",
		sources: [],
	})) as AskGraphState;

	return {
		rewrittenQuery: finalState.rewrittenQuery,
		attempts: finalState.attempts,
		graphTrace: finalState.graphTrace,
		latest: finalState.latest,
		latestGrades: finalState.latestGrades,
		generatedAnswer: finalState.generatedAnswer,
		sources: finalState.sources,
	};
};
