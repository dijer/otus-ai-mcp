import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

import fg from "fast-glob";

export const DEFAULT_SUPPORTED_EXTENSIONS = [
  ".md",
  ".txt",
  ".py",
  ".js",
  ".ts",
  ".json",
  ".yaml",
  ".yml",
] as const;

export type ChunkRecord = {
  id: string;
  text: string;
  metadata: {
    source: string;
    chunkIndex: number;
    startChar: number;
    endChar: number;
  };
};

type ManifestFileInfo = {
  sha256: string;
  chunksCount: number;
  updatedAt: string;
};

type Manifest = {
  files: Record<string, ManifestFileInfo>;
  filesCount: number;
  chunksCount: number;
  lastIndexedAt: string | null;
};

const nowIso = (): string => new Date().toISOString();

const ensureDir = (dir: string): void => {
  fs.mkdirSync(dir, { recursive: true });
};

const readJsonSafe = <T>(filePath: string, fallback: T): T => {
  if (!fs.existsSync(filePath)) {
    return fallback;
  }
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf-8")) as T;
  } catch {
    return fallback;
  }
};

const sha256File = (filePath: string): string => {
  const hash = crypto.createHash("sha256");
  const content = fs.readFileSync(filePath);
  hash.update(content);
  return hash.digest("hex");
};

const readTextByType = (filePath: string): string => {
  const raw = fs.readFileSync(filePath, "utf-8");
  if (filePath.toLowerCase().endsWith(".json")) {
    try {
      return JSON.stringify(JSON.parse(raw), null, 2);
    } catch {
      return raw;
    }
  }
  return raw;
};

const chunkText = (
  text: string,
  chunkSize: number,
  chunkOverlap: number,
): Array<{ text: string; startChar: number; endChar: number }> => {
  const normalized = text.trim();
  if (!normalized) {
    return [];
  }

  const safeOverlap = chunkOverlap >= chunkSize ? Math.floor(chunkSize / 4) : chunkOverlap;
  const chunks: Array<{ text: string; startChar: number; endChar: number }> = [];

  let start = 0;
  while (start < normalized.length) {
    const end = Math.min(start + chunkSize, normalized.length);
    const piece = normalized.slice(start, end).trim();
    if (piece) {
      chunks.push({ text: piece, startChar: start, endChar: end });
    }
    if (end >= normalized.length) {
      break;
    }
    start = Math.max(0, end - safeOverlap);
  }

  return chunks;
};

const parseJsonLines = (filePath: string): ChunkRecord[] => {
  if (!fs.existsSync(filePath)) {
    return [];
  }
  const lines = fs.readFileSync(filePath, "utf-8").split(/\r?\n/).filter(Boolean);
  const parsed: ChunkRecord[] = [];
  for (const line of lines) {
    try {
      parsed.push(JSON.parse(line) as ChunkRecord);
    } catch {
      // ignore broken lines
    }
  }
  return parsed;
};

const writeJsonLines = (filePath: string, records: ChunkRecord[]): void => {
  const payload = records.map((item) => JSON.stringify(item)).join("\n");
  fs.writeFileSync(filePath, payload ? `${payload}\n` : "", "utf-8");
};

const getDataPaths = (dataDir: string): { manifestPath: string; chunksPath: string } => {
  const absDataDir = path.resolve(dataDir);
  ensureDir(absDataDir);
  return {
    manifestPath: path.join(absDataDir, "index_manifest.json"),
    chunksPath: path.join(absDataDir, "chunks.jsonl"),
  };
};

export const indexDocuments = (params: {
  rootPath: string;
  globPattern: string;
  reindex: boolean;
  dataDir: string;
  allowedExts?: readonly string[];
  chunkSize?: number;
  chunkOverlap?: number;
}): Record<string, unknown> => {
  const {
    rootPath,
    globPattern,
    reindex,
    dataDir,
    allowedExts = DEFAULT_SUPPORTED_EXTENSIONS,
    chunkSize = 1200,
    chunkOverlap = 120,
  } = params;

  const absRoot = path.resolve(rootPath);
  const { manifestPath, chunksPath } = getDataPaths(dataDir);

  const previousManifest = readJsonSafe<Manifest>(manifestPath, {
    files: {},
    filesCount: 0,
    chunksCount: 0,
    lastIndexedAt: null,
  });

  const previousChunks = parseJsonLines(chunksPath);
  const previousBySource = new Map<string, ChunkRecord[]>();
  for (const chunk of previousChunks) {
    const source = chunk.metadata.source;
    const list = previousBySource.get(source) ?? [];
    list.push(chunk);
    previousBySource.set(source, list);
  }

  const fileCandidates = fg.sync(globPattern, {
    cwd: absRoot,
    onlyFiles: true,
    absolute: true,
    dot: false,
  });

  const filtered = fileCandidates
    .filter((candidate) => allowedExts.includes(path.extname(candidate).toLowerCase()))
    .sort((a, b) => a.localeCompare(b));

  const finalChunks: ChunkRecord[] = [];
  const nextFiles: Record<string, ManifestFileInfo> = {};

  let newFiles = 0;
  let updatedFiles = 0;
  let unchangedFiles = 0;
  let skippedEmptyFiles = 0;

  for (const filePath of filtered) {
    const digest = sha256File(filePath);
    const source = path.resolve(filePath);
    const oldInfo = previousManifest.files[source];

    const isUnchanged =
      !reindex &&
      oldInfo !== undefined &&
      oldInfo.sha256 === digest &&
      previousBySource.has(source);

    if (isUnchanged) {
      unchangedFiles += 1;
      const existing = previousBySource.get(source) ?? [];
      finalChunks.push(...existing);
      nextFiles[source] = {
        sha256: digest,
        chunksCount: existing.length,
        updatedAt: oldInfo.updatedAt,
      };
      continue;
    }

    const text = readTextByType(source);
    const chunks = chunkText(text, chunkSize, chunkOverlap);
    if (chunks.length === 0) {
      skippedEmptyFiles += 1;
      continue;
    }

    const fileChunks = chunks.map((chunk, idx) => ({
      id: `${source}::chunk::${idx}`,
      text: chunk.text,
      metadata: {
        source,
        chunkIndex: idx,
        startChar: chunk.startChar,
        endChar: chunk.endChar,
      },
    }));

    finalChunks.push(...fileChunks);
    nextFiles[source] = {
      sha256: digest,
      chunksCount: fileChunks.length,
      updatedAt: nowIso(),
    };

    if (oldInfo === undefined) {
      newFiles += 1;
    } else {
      updatedFiles += 1;
    }
  }

  const nextManifest: Manifest = {
    files: nextFiles,
    filesCount: Object.keys(nextFiles).length,
    chunksCount: finalChunks.length,
    lastIndexedAt: nowIso(),
  };

  fs.writeFileSync(manifestPath, JSON.stringify(nextManifest, null, 2), "utf-8");
  writeJsonLines(chunksPath, finalChunks);

  return {
    path: absRoot,
    globPattern,
    reindex,
    supportedExtensions: [...allowedExts],
    indexedFiles: nextManifest.filesCount,
    chunksCount: nextManifest.chunksCount,
    newFiles,
    updatedFiles,
    unchangedFiles,
    skippedEmptyFiles,
  };
};

export const readIndexStatus = (dataDir: string): Record<string, unknown> => {
  const { manifestPath, chunksPath } = getDataPaths(dataDir);
  const manifest = readJsonSafe<Manifest>(manifestPath, {
    files: {},
    filesCount: 0,
    chunksCount: 0,
    lastIndexedAt: null,
  });

  return {
    isIndexed: manifest.filesCount > 0 || manifest.chunksCount > 0,
    filesCount: manifest.filesCount,
    chunksCount: manifest.chunksCount,
    lastIndexedAt: manifest.lastIndexedAt,
    manifestPath,
    chunksPath,
  };
};

export const readAllChunks = (dataDir: string): ChunkRecord[] => {
  const { chunksPath } = getDataPaths(dataDir);
  return parseJsonLines(chunksPath);
};
