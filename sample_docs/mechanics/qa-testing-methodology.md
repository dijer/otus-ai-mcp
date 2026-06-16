# Path of Exile 2: Quality Assurance and Testing Methodology

## Part 1: Test Pyramid Strategy

### 1.1 Unit Tests (Foundation)

**Definition**: Test individual functions in isolation

**Examples for PoE2 Knowledge Base**:
- Test BM25 scoring function with known inputs
- Test vector cosine similarity calculation
- Test chunk splitting logic
- Test metadata parsing

**Test Count**: 200+ unit tests recommended
**Coverage Target**: 90%+ code coverage
**Execution Time**: <1 second total

**Example Test**:
```
test("BM25 scoring for query 'stagger immunity'", () => {
  const query = "stagger immunity"
  const doc = "advanced-combat-playbooks.md"
  const score = performBM25Search(query, doc)
  expect(score).toBeGreaterThan(0.5) // must be relevant
})
```

### 1.2 Integration Tests (Middle)

**Definition**: Test how components work together

**Examples**:
- Test indexing pipeline: read → chunk → embed → store
- Test retrieval pipeline: query → search → rank → return
- Test tool integration: askQuestion tool calls hybrid search

**Test Count**: 50+ integration tests
**Coverage Target**: 80%+ critical paths
**Execution Time**: <30 seconds total

**Example Test**:
```
test("ask_question tool returns relevant documents", async () => {
  await indexFolder("sample_docs")
  const results = await askQuestion("stagger immunity mechanics")
  expect(results).toContainObject({filename: "advanced-combat-playbooks.md"})
})
```

### 1.3 E2E Tests (Validation)

**Definition**: Test complete user workflows

**Scenarios**:
- User queries about boss mechanics → gets accurate answer
- User asks about economy → gets trading info
- User searches for build advice → gets viable builds

**Test Count**: 20+ E2E tests
**Coverage Target**: 70%+ critical user paths
**Execution Time**: 5-10 seconds per test

**Example Test**:
```
test("User asks about Kaom's Heart item", async () => {
  const response = await ask("What is Kaom's Heart unique armor?")
  expect(response).toMatch(/unique|body armor|life/)
})
```

---

## Part 2: Query-Based Validation

### 2.1 Regression Test Suite

**Purpose**: Ensure past bugs don't reappear

**Test Set**: 30 queries covering all game mechanics
```
Query 1: "stagger immunity"
Expected: advanced-combat-playbooks.md appears in top 3
Metric: precision@3 = 1.0 (success), 0.0 (failure)

Query 2: "chaos resistance scaling"
Expected: defensive-layers-analysis.md + extended-verification-database.md
Metric: precision@5 ≥ 0.8 (acceptable)

Query 3: "Kaom's Heart build enabler"
Expected: itemization-gear-progression.md + comprehensive-build-guides.md
Metric: precision@5 ≥ 0.8

Query 4: "currency farming profit routes"
Expected: trading-currency-economy.md + endgame-optimization-reference.md
Metric: both in top 5
```

### 2.2 Semantic Accuracy Validation

**Purpose**: Verify that retrieved content answers the question

**Method**: Manual review by human expert
- Prepare 10 representative queries
- Get hybrid search results (top 5)
- Score each result: relevant (1), somewhat relevant (0.5), irrelevant (0)
- Expected: average score ≥ 0.8 (80% relevant content)

**Validation Queries**:
1. "How to survive stagger lock in boss fights?" → should retrieve defensive strategies
2. "What are optimal passive tree paths?" → should retrieve class/ascendancy guides
3. "How much chaos per hour can I farm?" → should retrieve economy + farming routes
4. "Which items enable hybrid melee/spell builds?" → should retrieve unique items + builds
5. "What's the meta build this league?" → should retrieve current tier list

### 2.3 Performance Benchmarking

**Metrics to Track**:
- Query latency: <1 second (acceptable)
- Index size: track growth over time
- Recall: percentage of relevant documents found
- Precision: percentage of retrieved documents relevant

**Benchmark Queries** (10 different types):
- Single keyword: "armor" (should find 5+ documents)
- Phrase: "stagger threshold" (should find 1-2 best matches)
- Complex: "best builds for hardcore tier 16" (should find build guides)
- Typo: "arrmor" (should still work with embeddings)
- Vague: "how to get rich" (should find economy documents)

---

## Part 3: Data Quality Assurance

### 3.1 Knowledge Base Health Checks

**File Completeness**:
- Every markdown file has header (title)
- Every section has subsection headers
- No orphaned sections (all sections under headers)
- No duplicate content between files

**Validation Script**:
```
Check 1: All files have valid markdown
- Run: markdown linter
- Expected: 0 errors
- Pass/Fail

Check 2: Cross-reference validation
- Each file references at least 2 other files
- All references are valid (files exist)
- Expected: 100% valid references

Check 3: Size validation
- Total size: 500-1,000 KB (reasonable)
- Individual file: 20-40 KB (balanced)
- Expected: all files within range
```

### 3.2 Content Verification

**Fact Checking**:
- Sample 5% of verification facts (4 facts from extended-verification-database.md)
- Verify against source files
- Expected: 100% accuracy (or flag for correction)

**Example**:
- Fact: "Count Geonor has 300 poise threshold"
- Source: sample_docs/bosses/act1/count-geonor.md
- Verification: does file mention "300 poise"? YES ✓

**Consistency Checking**:
- Same boss mentioned in multiple files should have consistent stats
- Example: if "Kaom's Heart +100 life" in file A, should match file B
- Expected: 100% consistency (0 contradictions)

### 3.3 Embedding Quality Validation

**Test Embeddings**:
- Generate embeddings for all 500 KB of documents
- Verify: embedding dimensions = 384 (expected for all-MiniLM-L6-v2)
- Verify: no NaN or Inf values in embeddings
- Expected: 100% valid embeddings

**Similarity Validation**:
- Document A ("advanced-combat-playbooks.md") should be highly similar to itself
- Similarity score should be close to 1.0 (0.95+)
- Different documents should have lower scores (0.3-0.7)
- Expected: semantic clustering is logical

---

## Part 4: Stress Testing

### 4.1 Load Testing

**Scenario 1: High Query Volume**:
- 100 concurrent queries
- Latency target: <1 second per query
- Success rate: 100% (no failures)
- Expected: system handles load gracefully

**Scenario 2: Large Index**:
- Index 5 MB of documents (10x current size)
- Query latency target: <2 seconds
- Expected: performance degrades gracefully

**Scenario 3: Malformed Input**:
- Query with SQL injection attempt: `'; DROP TABLE chunks; --`
- Expected: safely rejected, no database damage
- Query with very long text (10,000 characters)
- Expected: truncated and processed safely

### 4.2 Resilience Testing

**Test 1: Index Corruption**:
- Corrupt chunks.jsonl file (random bytes)
- Expected: system detects error, doesn't crash
- Recovery: can rebuild index from sample_docs

**Test 2: Missing Files**:
- Delete a document from sample_docs mid-session
- Expected: index still works, doesn't crash
- Query for deleted document: should not appear in results

**Test 3: Database Failure**:
- Kill SQLite connection mid-query
- Expected: graceful error, retry logic works
- Recovery: reconnect and resume

---

## Part 5: Continuous Integration Pipeline

### 5.1 Automated Testing (GitHub Actions)

**On Every Commit**:
1. Run unit tests (5 seconds)
   - 200 tests, must all pass
   - Coverage report generated
2. Run integration tests (30 seconds)
   - 50 tests, must all pass
   - Measure query latency
3. Lint code (10 seconds)
   - Check syntax, style
   - 0 errors allowed
4. Build artifacts (10 seconds)
   - Compile TypeScript
   - Generate bundles

**Total Pipeline**: <60 seconds

**On Every Pull Request**:
1. All above checks
2. E2E tests (30 seconds)
   - 20 scenario tests
3. Code review required
4. Manual test approval
5. Merge only if all pass

### 5.2 Pre-Release Checklist

**Before Publishing**:
- [ ] All tests passing (100%)
- [ ] Code coverage ≥90%
- [ ] No open bug reports
- [ ] Documentation updated
- [ ] Changelog written
- [ ] Version bumped (semantic versioning)
- [ ] Tag created in git
- [ ] Release notes published
- [ ] All E2E scenarios validated manually
- [ ] Performance benchmarks recorded

---

## Part 6: Success Criteria

### 6.1 Quality Metrics

**Code Quality**:
- Test coverage: ≥90% (target)
- Code duplication: <5% (low)
- Cyclomatic complexity: avg <5 (simple)
- Lint errors: 0 (mandatory)

**Retrieval Quality**:
- Precision@5: ≥0.80 (80% of top 5 relevant)
- Recall: ≥0.70 (find 70% of relevant docs)
- MRR: ≥0.80 (first relevant in top 2)
- F1 Score: ≥0.75 (balanced metric)

**Performance**:
- Query latency: <1 second
- Index time: <30 seconds for 500 KB
- Memory usage: <500 MB for index
- Uptime: >99.9% (8.7 hours downtime/month acceptable)

### 6.2 Release Readiness

**Deployment Checklist**:
- All automated tests passing: ✓
- Manual validation of 10 queries: ✓
- Performance benchmarks acceptable: ✓
- Security review completed: ✓
- Documentation complete: ✓
- Backup tested: ✓
- Rollback plan documented: ✓

**Post-Deployment**:
- Monitor error rates (target: <0.1%)
- Monitor latency (target: <1 second p95)
- Monitor disk usage (target: <80% full)
- Collect user feedback

---

## Conclusion

Comprehensive testing ensures:
1. **Reliability**: system works as expected
2. **Performance**: meets latency/throughput targets
3. **Quality**: high-quality retrieval results
4. **Safety**: handles errors gracefully
5. **Confidence**: ready for production deployment

Test automation allows rapid iteration while maintaining quality standards. The investment in testing pays dividends through reduced bugs and faster deployment cycles.
