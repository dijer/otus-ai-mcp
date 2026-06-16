const DEFAULT_EMBEDDING_DIM = 256;

const tokenize = (text: string): string[] =>
  text
    .toLowerCase()
    .split(/[^\p{L}\p{N}_]+/u)
    .map((part) => part.trim())
    .filter((part) => part.length > 1);

const hashToken = (token: string): number => {
  let hash = 2166136261;
  for (let i = 0; i < token.length; i += 1) {
    hash ^= token.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return Math.abs(hash);
};

const normalize = (vector: number[]): number[] => {
  const norm = Math.sqrt(vector.reduce((sum, val) => sum + val * val, 0)) || 1;
  return vector.map((value) => value / norm);
};

export const embedText = (text: string, dim = DEFAULT_EMBEDDING_DIM): number[] => {
  const terms = tokenize(text);
  if (terms.length === 0) {
    return Array.from({ length: dim }, () => 0);
  }

  const vector = Array.from({ length: dim }, () => 0);
  for (const term of terms) {
    const bucket = hashToken(term) % dim;
    vector[bucket] += 1;
  }

  return normalize(vector);
};

export const cosineSimilarity = (left: number[], right: number[]): number => {
  if (left.length === 0 || right.length === 0 || left.length !== right.length) {
    return 0;
  }

  let dot = 0;
  for (let i = 0; i < left.length; i += 1) {
    dot += left[i] * right[i];
  }
  return dot;
};

export const isEmbedding = (value: unknown): value is number[] => {
  return Array.isArray(value) && value.every((item) => typeof item === "number");
};
