# Path of Exile 2: Performance Optimization and Minimum Requirements Guide

## Part 1: Client Performance Tuning

### 1.1 Graphics Settings

**Ultra Settings** (60+ FPS target):
- Resolution: 1440p
- Framerate: 165+ Hz (high-end monitors)
- Particle effects: all enabled
- Shadows: ultra quality
- Ray tracing: enabled (RTX 3080+)
- Estimated FPS: 80-165 FPS

**High Settings** (solid performance):
- Resolution: 1080p
- Framerate: 144 Hz (gaming monitors)
- Particle effects: most enabled
- Shadows: high quality
- Ray tracing: disabled
- Estimated FPS: 100-144 FPS

**Medium Settings** (casual gaming):
- Resolution: 1080p
- Framerate: 60 Hz
- Particle effects: reduced (50%)
- Shadows: medium quality
- Ray tracing: disabled
- Estimated FPS: 60-100 FPS

**Low Settings** (minimum viable):
- Resolution: 720p
- Framerate: 30 Hz
- Particle effects: minimal (25%)
- Shadows: low quality
- Ray tracing: disabled
- Estimated FPS: 30-60 FPS

### 1.2 CPU Requirements

**High-End (Optimal)**:
- CPU: AMD Ryzen 9 5950X or Intel i9-13900K
- Cores: 16+ cores
- Speed: 5+ GHz
- RAM: 32 GB DDR5
- Storage: NVMe SSD (4,000+ MB/s read)
- Est. cost: $3,000+

**Mid-Range (Recommended)**:
- CPU: AMD Ryzen 7 5800X3D or Intel i7-12700
- Cores: 8 cores (16 threads)
- Speed: 4.5+ GHz
- RAM: 16 GB DDR4
- Storage: NVMe SSD (2,000+ MB/s read)
- Est. cost: $1,000-1,500

**Budget (Minimum)**:
- CPU: AMD Ryzen 5 3600 or Intel i5-10400
- Cores: 6 cores (12 threads)
- Speed: 3.5+ GHz
- RAM: 8 GB DDR4
- Storage: SATA SSD (500+ MB/s read)
- Est. cost: $300-500

### 1.3 GPU Requirements

**High-End (Ultra)**:
- GPU: RTX 4090 or RTX 6900 XT
- VRAM: 24+ GB
- Bandwidth: 576 GB/s
- FPS at 1440p: 165+ FPS
- Est. cost: $1,500-2,000

**Mid-Range (Recommended)**:
- GPU: RTX 4070 Ti or RTX 6700 XT
- VRAM: 12 GB
- Bandwidth: 360+ GB/s
- FPS at 1080p: 144 FPS
- Est. cost: $600-800

**Budget (Minimum)**:
- GPU: RTX 3060 or GTX 1080
- VRAM: 6-8 GB
- Bandwidth: 360 GB/s
- FPS at 1080p: 60-80 FPS
- Est. cost: $200-300

### 1.4 Network Requirements

**Optimal Connection**:
- Speed: 100+ Mbps download, 10+ Mbps upload
- Latency: <50 ms to server (ping)
- Packet loss: <0.1%
- Connection type: fiber, 5G
- Est. cost: $30-50/month

**Acceptable Connection**:
- Speed: 50+ Mbps download, 5+ Mbps upload
- Latency: 50-100 ms to server
- Packet loss: <1%
- Connection type: cable, good WiFi
- Est. cost: $15-30/month

**Poor Connection** (playable but problematic):
- Speed: 20+ Mbps download, 1+ Mbps upload
- Latency: 100-200 ms to server
- Packet loss: 1-5%
- Connection type: DSL, poor WiFi
- Issues: noticeable lag, desync, rubber banding

---

## Part 2: Server Load and Scaling

### 2.1 Concurrent Player Capacity

**Single Server Instance**:
- Max concurrent: 10,000 players per instance
- CPU usage: 80%+ at capacity
- RAM usage: 50 GB at capacity
- Network bandwidth: 1 Gbps (saturated)

**Multi-Instance Setup** (typical):
- Instances per league: 50 instances
- Total capacity: 500,000 concurrent players
- Cost: $500,000/month (cloud infrastructure)

**Peak Load Handling** (league start):
- Typical: 10 million login attempts in first hour
- Server: crashes on day 1 (expected)
- Recovery time: 4-6 hours (typical for major games)
- Queue: 50,000+ player queue (waiting to login)

### 2.2 Database Load

**Chunks.JSONL Storage**:
- Current size: 500 KB (small)
- Read operations per second: 1,000+ (easily handled)
- Write operations per second: 100+ (indexing)
- Bandwidth needed: <1 MB/s

**Chat System** (if added):
- Messages per second: 100,000+ (at peak)
- Storage growth: 1 GB per day (archived)
- Search queries: 10,000/second (real-time search)
- Infrastructure: separate chat database (cost: $50,000/month)

### 2.3 Optimization Strategies

**Caching Layer** (Redis):
- Purpose: cache frequently accessed data
- Hit rate: 80%+ (most queries are repeats)
- Latency improvement: 10ms → 1ms (10x faster)
- Cost: $500/month

**Content Delivery Network** (CDN):
- Purpose: serve static assets from edge locations
- Speed improvement: global users see 50% latency reduction
- Bandwidth saving: 60% reduction (geographic distribution)
- Cost: $1,000/month

**Database Replication**:
- Purpose: redundancy and read scaling
- Setup: 1 primary, 3 replicas
- Failure tolerance: can lose 2 replicas and still function
- Cost: 3x database cost ($1,500/month)

---

## Part 3: Development Environment Setup

### 3.1 Local Development

**Minimum Setup**:
- Editor: VS Code (free)
- Language: Node.js v18+ (free)
- Database: SQLite (embedded, free)
- Testing: Jest (free)
- Total cost: $0

**Recommended Setup**:
- Editor: VS Code + extensions ($0)
- Language: Node.js v20 LTS ($0)
- Database: PostgreSQL (local) + SQLite ($0)
- Testing: Jest + Testing Library ($0)
- Containerization: Docker Desktop ($0-13/month)
- Version Control: Git + GitHub (free-$21/month)
- Total cost: $0-13/month

### 3.2 Debugging Tools

**Built-in Debugger**:
- VS Code debugger (free)
- Set breakpoints, step through code
- Inspect variables, watch expressions
- Performance: adds 5-10% overhead

**Profiling Tools**:
- Node.js --prof flag (free)
- V8 profiler (free)
- Chrome DevTools (free)
- Purpose: find performance bottlenecks

**Network Debugging**:
- Postman (free version available)
- curl command-line (free)
- Network inspector in browser (free)
- Purpose: test API endpoints

### 3.3 Testing Strategy

**Unit Tests**:
- Target: all utility functions
- Coverage goal: 90%+
- Framework: Jest
- Time per test: <10ms

**Integration Tests**:
- Target: API endpoints, database interactions
- Coverage goal: 80%+
- Framework: Jest + Supertest
- Time per test: <100ms

**E2E Tests**:
- Target: full user flows
- Coverage goal: 50%+ critical paths
- Framework: Playwright or Cypress
- Time per test: 1-5 seconds

**Load Testing** (stress testing):
- Tool: Apache JMeter or k6
- Scenario: 1,000 concurrent users
- Duration: 10 minutes
- Purpose: find breaking points

---

## Part 4: Security Hardening

### 4.1 Input Validation

**Query Input** (for RAG system):
- Max length: 1,000 characters
- Allowed characters: alphanumeric + spaces + punctuation
- Injection protection: parameterized queries
- Rate limit: 100 queries per minute per IP

**File Upload** (if applicable):
- Max file size: 50 MB
- Allowed types: .md, .txt, .json
- Virus scan: required
- Storage: encrypted, isolated directory

### 4.2 Authentication & Authorization

**API Keys** (for MCP tools):
- Generation: random 32-byte tokens
- Storage: hashed with bcrypt
- Rotation: every 90 days (automated)
- Revocation: instant (admin action)

**Rate Limiting**:
- Per IP: 1,000 requests/hour
- Per user: 10,000 requests/hour
- Per API key: 100,000 requests/hour
- Burst: max 100 requests/minute

### 4.3 Data Protection

**Encryption** (in-transit):
- Protocol: HTTPS (TLS 1.3+)
- Certificate: Let's Encrypt (free, auto-renew)
- Ciphers: AES-256-GCM

**Encryption** (at-rest):
- Database: encrypted with AES-256
- Backups: encrypted with same key
- Key storage: secure key management service

**Backup Strategy**:
- Frequency: hourly backups (automatic)
- Retention: 30 days full + incremental
- Testing: weekly restore drills
- Off-site: replicated to different geographic region

---

## Part 5: Monitoring and Alerting

### 5.1 System Metrics

**CPU Usage**:
- Target: <80% average
- Alert: >90% for >5 minutes
- Action: scale up or investigate

**Memory Usage**:
- Target: <70% available
- Alert: >85% for >2 minutes
- Action: restart service or investigate memory leak

**Disk Usage**:
- Target: <80% full
- Alert: >90% full
- Action: archive old data or expand storage

**Network Latency**:
- Target: <100ms (API responses)
- Alert: >500ms for >10 seconds
- Action: investigate database or network issues

### 5.2 Application Metrics

**Request Latency**:
- P50: <50ms (median request)
- P95: <200ms (95th percentile)
- P99: <500ms (99th percentile)
- Alert: P95 > 300ms

**Error Rate**:
- Target: <0.1% errors
- Alert: >1% errors
- Categories: 4xx (client error), 5xx (server error)

**Cache Hit Rate**:
- Target: >80%
- Alert: <70%
- Meaning: if low, cache is undersized or misconfigured

### 5.3 Business Metrics

**API Uptime**:
- Target: 99.9% (8.7 hours downtime/month)
- SLA: customer-facing availability
- Monitoring: synthetic tests every minute

**Query Performance**:
- ask_question() latency: <1 second
- find_relevant_docs() latency: <500ms
- index_folder() throughput: >10 MB/second

**Knowledge Base Health**:
- Total indexed documents: should grow
- Chunk count: should match document count × chunk ratio
- Stale index: alert if >1 day old

---

## Conclusion

Production Path of Exile 2 RAG system requires:
1. **Infrastructure**: servers, databases, CDN
2. **Monitoring**: understand system health in real-time
3. **Security**: protect data and prevent abuse
4. **Performance**: optimize for users
5. **Scalability**: grow with demand

Key insight: proper setup costs $10,000-50,000/month but enables stable operation for millions of users.
