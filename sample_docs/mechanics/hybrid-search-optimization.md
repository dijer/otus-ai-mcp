# Path of Exile 2: Hybrid Search Optimization and Vector Embeddings

## Part 1: Hybrid Search Architecture

### 1.1 Keyword Search (BM25)

**BM25 Algorithm**:
- Full name: Okapi BM25 (Best Match 25)
- Purpose: rank documents by keyword relevance
- Input: query terms (e.g., "stagger immunity")
- Output: ranked list of documents

**Scoring Formula** (simplified):
```
score = Σ IDF(term) × (f(term,doc) × (k1 + 1)) / (f(term,doc) + k1 × (1 - b + b × (doclen / avgdoclen)))
```

Where:
- IDF(term) = log(total_docs / docs_with_term)
- f(term,doc) = frequency of term in document
- k1 = 1.2 (typical constant)
- b = 0.75 (typical constant)

**Example Query**: "poise threshold mechanic"
- Term 1: "poise" (rare term, IDF=2.0)
- Term 2: "threshold" (common, IDF=0.5)
- Term 3: "mechanic" (very common, IDF=0.2)
- Document 1 (advanced-combat-playbooks.md): contains all 3 terms → score = 2.7
- Document 2 (allActsKeyBosses.md): contains 1 term → score = 0.8
- Result: Document 1 ranks first

**Advantages**:
- Fast (exact matching, no AI needed)
- Interpretable (can explain why document ranked)
- Efficient (runs on small laptops)
- Precision: finds exact matches (high precision, lower recall)

**Disadvantages**:
- No semantic understanding (synonym blindness)
- Example: query "stun lock" won't find document about "crowd control"
- Susceptible to typos (exact matching fails)

### 1.2 Vector Search (Embeddings)

**Embedding Process**:
1. Take text: "Player gets stunned by enemy attack"
2. Tokenize: ["player", "gets", "stunned", "by", "enemy", "attack"]
3. Create vector: [0.45, -0.23, 0.89, 0.12, ..., 0.34] (384-dimensional typical)
4. Store in vector database (Chroma, Pinecone, etc.)

**Semantic Similarity Example**:
- Query: "crowd control mechanics"
- Vector: [q1, q2, q3, ...q384]
- Document A: "stun lock strategy" → vector [a1, a2, a3, ...a384]
- Similarity: cosine_similarity(query, docA) = 0.87 (high similarity!)
- Result: found even without exact keyword match

**Advantages**:
- Semantic understanding (finds meaning, not just keywords)
- Synonym handling ("stun" + "crowd control" recognized as similar)
- Typo tolerance (misspellings still match meaning)
- Recall: finds related content (higher recall, lower precision)

**Disadvantages**:
- Slow (requires embedding model on each query)
- Expensive (embedding models cost compute)
- Non-interpretable (black box - why did it match?)
- Requires infrastructure (vector database, GPU)

### 1.3 Hybrid Search Combination

**Strategy**: Use both BM25 + vector search, combine results

**Two-Phase Process**:

Phase 1: Retrieve candidates
- BM25 retrieves: top 20 documents by keyword match
- Vector search retrieves: top 20 documents by semantic similarity
- Combined: union of 40 documents (some overlap)

Phase 2: Rank combined results
- Use RRF (Reciprocal Rank Fusion): score = 1/(k+rank1) + 1/(k+rank2)
- Example:
  - Document A: rank 5 in BM25, rank 2 in vector
  - Score = 1/(60+5) + 1/(60+2) = 0.0154 + 0.0161 = 0.0315
  - Document B: rank 2 in BM25, rank 50 in vector
  - Score = 1/(60+2) + 1/(60+50) = 0.0161 + 0.0091 = 0.0252
  - Result: Document A ranks first (combined score is higher)

**Benefits of Hybrid**:
- Precision of BM25: exact matches highly ranked
- Recall of embeddings: semantic matches included
- Robustness: typos don't destroy results (embeddings help)
- Balanced: neither method dominates

---

## Part 2: Vector Embeddings Selection

### 2.1 Embedding Model Options

**OpenAI text-embedding-3-small**:
- Dimensions: 1,536
- Cost: $0.02 per 1M tokens
- Speed: ~200 queries/second
- Quality: best (trained on massive dataset)
- Downside: requires API key, external service

**sentence-transformers (open-source)**:
- Model: "all-MiniLM-L6-v2"
- Dimensions: 384
- Cost: $0 (runs locally)
- Speed: ~50 queries/second (on CPU)
- Quality: good (97% of OpenAI quality)
- Upside: no API needed, no rate limits

**Our Recommendation for PoE2 RAG**:
- Use: sentence-transformers (local, free, fast enough)
- Dimensions: 384
- Model: all-MiniLM-L6-v2
- Rationale: knowledge base is only 500 KB (small), no need for expensive API

### 2.2 Embedding Quality Metrics

**Similarity Score Interpretation**:
```
Score   | Meaning
--------|----------
0.95+   | Nearly identical
0.80-95 | Very similar (synonyms)
0.70-80 | Similar (related topic)
0.50-70 | Somewhat related
<0.50   | Unrelated
```

**Example for PoE2 Knowledge Base**:
- Query: "stagger threshold"
- Document: "advanced-combat-playbooks.md" (contains "300 poise")
- Vector similarity: 0.88 (very high, semantic match)
- BM25 match: 0.95 (exact keyword match)
- Combined score: high rank (both methods agree)

**Example Mismatch**:
- Query: "flask uptime"
- Document: "trading-currency-economy.md" (no flasks mentioned)
- Vector similarity: 0.35 (unrelated)
- BM25 match: 0.0 (no keywords)
- Combined score: fails to rank (correct rejection)

### 2.3 Chunking Strategy for Embeddings

**Chunk Size Impact**:
- Small chunks (100 tokens): precise but many chunks
- Medium chunks (512 tokens): balanced
- Large chunks (2000+ tokens): loses context

**Our Implementation**:
- Chunk size: 512 tokens (~2,000 characters)
- Overlap: 50 tokens (prevents context loss)
- Rationale: balance between precision and efficiency

**Example Chunking**:
- Document: advanced-combat-playbooks.md (100 KB)
- Total tokens: 25,000
- Chunks: 25,000 / 512 ≈ 49 chunks
- Storage: 49 embeddings (one per chunk)
- Query: searches 49 chunks, returns top 5 most similar

---

## Part 3: Implementation in Our MCP Server

### 3.1 Current State

**What We Have** (existing):
- BM25 keyword search (fully implemented in hybrid.ts)
- Token-based cosine similarity (fallback)
- JSONL storage (chunks.jsonl with metadata)
- HTTP endpoint: POST /ask_question

**What We Need** (missing):
- sentence-transformers integration
- Vector storage (Chroma or similar)
- Vector retrieval endpoint
- Merged BM25 + vector hybrid search

### 3.2 Integration Points

**File: src/retrieval/hybrid.ts** (main changes):
```typescript
// Current:
- performBM25Search()
- performTokenSearch()

// Add:
- performEmbeddingSearch()
- combineResultsWithRRF()
- rankFinalResults()
```

**File: src/indexing/indexer.ts** (store vectors):
```typescript
// Current:
- stores chunks in JSONL

// Add:
- generate embeddings for each chunk
- store vectors in Chroma DB
```

**File: src/tools/askQuestion.ts** (use hybrid):
```typescript
// Current:
- uses BM25 search only

// Change:
- use hybrid search (BM25 + vector)
- apply RRF ranking
- return top 5 results
```

### 3.3 Chroma Database Setup

**Chroma Setup**:
```bash
npm install chromadb
```

**In-Memory vs Persistent**:
- In-memory: fast, loses data on restart
- Persistent: durable, slightly slower

**Our Choice**: Persistent (saves embeddings to disk)

**Basic Flow**:
```
1. Start Chroma client
2. Create collection: "poe2_knowledge"
3. Add documents with embeddings: client.add({ids, embeddings, metadatas})
4. Query: client.query({query_embeddings, n_results})
5. Return top N matches
```

---

## Part 4: Retrieval Performance Metrics

### 4.1 Evaluation Metrics

**Precision@k** (are top k results relevant?):
- Definition: (relevant results in top k) / k
- Example: top 5 results, 4 are relevant = 80% precision@5
- Target: 80%+ for production

**Recall@k** (did we find all relevant results?):
- Definition: (relevant results retrieved) / (all relevant results)
- Example: 5 relevant results, found 4 = 80% recall@5
- Target: 70%+ for knowledge bases

**Mean Reciprocal Rank (MRR)** (how soon is first relevant result?):
- Definition: average of 1/(rank of first relevant result)
- Example: first relevant at rank 3 = 1/3 = 0.33 MRR
- Target: 0.8+ (first relevant result in top 2)

**F1 Score** (combined metric):
- Definition: 2 × (precision × recall) / (precision + recall)
- Example: precision=0.80, recall=0.75 → F1 = 0.775
- Target: 0.75+ for knowledge bases

### 4.2 Testing Our Implementation

**Test Queries for PoE2 Knowledge Base**:

Query 1: "how to survive stagger lock"
- Expected: advanced-combat-playbooks.md (stagger section)
- Metric: should rank first (top 1 result)

Query 2: "poise regeneration mechanic"
- Expected: advanced-combat-playbooks.md + extended-verification-database.md
- Metric: both should be in top 3

Query 3: "currency farming profit"
- Expected: trading-currency-economy.md + endgame-optimization-reference.md
- Metric: both should be in top 5

Query 4: "Kaom's Heart unique armor"
- Expected: itemization-gear-progression.md + comprehensive-build-guides.md
- Metric: should be in top 3

Query 5: "boss mechanics phase transitions"
- Expected: detailed-encounter-strategies.md + advanced-combat-playbooks.md
- Metric: both should be in top 5

---

## Part 5: Optimization and Scaling

### 5.1 Embedding Caching

**Problem**: Each query generates new embeddings (slow)

**Solution**: Cache query embeddings
- Store: hash(query) → embedding vector
- Before: generate new embedding
- After: check cache, return cached or generate new

**Expected Impact**: 90% of queries are repeats → 10x speedup

### 5.2 Batch Processing

**Problem**: Indexing 500 KB takes time

**Solution**: Process chunks in batches
- Batch size: 32 chunks per batch
- Generate: 32 embeddings simultaneously
- Store: commit batch to Chroma
- Expected time: 30 seconds for 500 KB (vs 2 minutes sequential)

### 5.3 Scaling Beyond 500 KB

**Current**: 500 KB → ~100 chunks → manageable

**Future**: 50 MB → ~10,000 chunks → needs optimization
- Use: approximate nearest neighbor (ANN) algorithms
- Tools: FAISS, Annoy, HNSW
- Expected: <100ms per query even with 10,000 chunks

---

## Conclusion

Hybrid search (BM25 + vector embeddings) provides:
1. **Precision** (exact keyword matches)
2. **Recall** (semantic understanding)
3. **Robustness** (typos and synonyms handled)
4. **Performance** (fast on small knowledge bases)

Implementation requires:
- sentence-transformers library
- Chroma vector database
- RRF ranking algorithm
- Integration in hybrid.ts and indexer.ts

Expected quality: 85%+ precision@5 on typical queries.
