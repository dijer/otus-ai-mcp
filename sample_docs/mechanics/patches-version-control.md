# Path of Exile 2: Patch Notes and Version Control

## Part 1: Recent Patch History

### 1.1 Patch 1.0.0 Release (Launch Day)

**Major Features Added**:
- Core game: Acts 1-6 campaign (200+ hours content)
- Classes: 6 classes with 6 ascendancies each (36 unique builds minimum)
- Endgame: Atlas with 16 map tiers
- Skills: 150+ unique skill gems
- Items: 300+ unique items
- Multiplayer: party system, PvP arenas

**Major Bugs Fixed** (critical):
- Fixed: game crash on loading act 3 (memory leak)
- Fixed: client desync when using movement skills in parties
- Fixed: skills not triggering when attack speed >3.0 APS
- Fixed: loot filtering failing on special characters

**Balance Changes**:
- Life: +3% base life for all classes (survivability increase)
- Armor: +20% scaling effectiveness (defense buff)
- Critical chance: -1% base crit per level (offense nerf)
- Movement speed: items nerfed 10% → 5% penalty if exceeded
- Elemental damage: +10% effectiveness (offense buff)

**Performance Improvements**:
- FPS: +15% average (optimization)
- Load times: -30% (faster zone transitions)
- Memory: -20% (reduced heap usage)
- Network latency: improved packet batching

### 1.2 Patch 1.0.1 (Hotfix, Day 3)

**Critical Fixes**:
- Fixed: players stuck in infinite load loop in act 2
- Fixed: chat system causing server crashes
- Fixed: unique items disappearing from inventory

**Balance Tuning** (minor):
- Ailment duration: -5% (storms less oppressive)
- Rare packs: life -10% (difficulty adjustment)

**Performance**:
- Fixed memory leak in particle effects
- Optimized shadow casting (FPS +5%)

### 1.3 Patch 1.0.5 (First Major Patch, Week 2)

**New Content**:
- New unique boss: "Void Architect" (endgame challenge)
- New 20 skill gems (expanding build diversity)
- New 50 unique items (new viable builds)

**Balance Changes**:
- Stagger: threshold reduced -20% (less frequent stuns)
- Poison: damage reduced -15% (DoT less dominant)
- Leech: capped at 20% per second (sustainability nerfed)
- Block: added new block sources (defensive buff)

**Bug Fixes**:
- Fixed: 100+ reported issues
- Regression testing: all previous fixes still working

**Community Feedback Integration**:
- Based on 50,000+ player reports
- Addressed top 20 most-requested changes
- Communication: detailed patch notes published

### 1.4 Patch 1.1.0 (First Season, Month 1)

**New League Mechanic**: "Synthesis League"
- New mechanic: prophecy fragments combine into unique encounters
- Unique encounters: 10 new bosses, 50 new unique items
- Expected playtime: 40-80 hours content

**New Maps** (endgame expansion):
- 5 new map tiers (maps can now reach tier 18)
- New special areas: labyrinths, vaults, temporal rifts
- Unique boss encounters in each

**Balance Rebalance**:
- 50 skill gems adjusted for meta diversity
- 30 unique items rebalanced
- Passive tree: 20 keystones redesigned

---

## Part 2: Versioning Strategy

### 2.1 Semantic Versioning

**Format**: MAJOR.MINOR.PATCH

**Rules**:
- MAJOR: game-breaking changes (0→1)
  - New act released
  - Skill system rewritten
  - Economy reset
  - Example: 1.0.0 → 2.0.0

- MINOR: new features, backward compatible (1.0→1.1)
  - New skill gems
  - New league mechanic
  - New map areas
  - Example: 1.0.5 → 1.1.0

- PATCH: bug fixes, balance changes (1.0.5→1.0.6)
  - Hotfixes
  - Balance adjustments
  - Performance tweaks
  - Example: 1.0.5 → 1.0.6

### 2.2 Release Cycle

**Typical Cycle** (3 months/league):
- Week 1: Patch X.Y.0 (new league launch)
- Week 2: Patch X.Y.1 (hotfixes)
- Week 4: Patch X.Y.2 (balance pass)
- Week 8: Patch X.Y.3 (major balance update)
- Week 12: Patch X.Y.5 (endgame expansion)
- Week 16: Announcement of X.Y+1.0

**Patch Frequency**:
- Critical bugs: hotfix within 24 hours
- Balance concerns: patch within 1 week
- Feature requests: next planned release

### 2.3 Beta/Early Access Phases

**Closed Beta**:
- Players: 10,000 selected testers
- Duration: 2-4 weeks
- Purpose: find critical bugs
- Feedback: daily community meetings

**Open Beta**:
- Players: unlimited
- Duration: 2 weeks
- Purpose: stress test servers
- Wipe: all progress reset before launch

**Early Access**:
- Players: all
- Duration: ongoing until stable
- Purpose: gather feedback
- Progress: might be reset before 1.0.0 if unstable

---

## Part 3: Communication and Patch Notes

### 3.1 Patch Note Format

**Standard Structure**:

**Header** (1-2 lines):
- "Patch 1.0.6: Balance and Quality of Life"
- Date: YYYY-MM-DD
- Version: 1.0.6

**New Features** (if applicable):
- Summarize 2-5 major additions
- Link to detailed wiki articles

**Balance Changes**:
- Offensive skills: list adjustments
- Defensive skills: list adjustments
- Items/uniques: list adjustments
- Mechanics: list adjustments

**Bug Fixes**:
- Organized by category (graphics, gameplay, etc.)
- Numbered list of 5-50 fixes

**Performance**:
- Frame rate improvements
- Load time improvements
- Memory/CPU usage reductions

**Known Issues**:
- Issues we know about but haven't fixed yet
- Workarounds provided if available

### 3.2 Community Communication

**Patch Announcement Timeline**:

T-14 days: Teaser
- "New league coming in 2 weeks"
- "Expect balance changes, performance improvements"

T-7 days: Preview
- Detailed notes published
- Community reaction gathered
- Clarifications posted

T-1 day: Final Checklist
- All testing complete
- Downtime windows announced
- Last-minute hotfixes identified

T-0 days: Launch
- Game goes down for 2-4 hours
- Patch deploys
- Servers come online
- Bug reports begin flowing in

### 3.3 Patch Feedback Loop

**Community Channels**:
1. Official forums (10,000+ posts per patch)
2. Reddit r/pathofexile2 (5,000+ comments)
3. Discord (100,000+ messages)
4. Twitch chat (50,000+ messages during launch stream)

**Developer Response Time**:
- Critical bugs: response <1 hour
- Balance feedback: response <24 hours
- Feature requests: collected and reviewed weekly

**Hotfix Criteria**:
- Must affect >1% of playerbase (critical)
- Must cause unintended benefit/nerf >20% (balance)
- Must cause client crash (stability)
- Otherwise: wait for next scheduled patch

---

## Part 4: Economy Resets and Balance Philosophy

### 4.1 Seasonal Leagues (Soft Resets)

**Mechanics**:
- Every 3 months: new league starts
- Previous league: becomes "hardcore" (permanent, no new content)
- Progress: carried over to permanent leagues
- Economy: fresh start (all prices reset)

**Rationale**:
- Fresh start: new players can compete
- Meta variety: force builds to adapt
- Content focus: players concentrate on active league
- Balance testing: new mechanics tested each league

### 4.2 Major Balance Philosophies

**Philosophy 1: Buff Underpowered**:
- When skill rarely chosen: increase power
- Example: "Poison damage increased 50%"
- Effect: poison builds become competitive
- Time: usually takes 2-3 patches for adoption

**Philosophy 2: Nerf Overpowered**:
- When skill dominates meta: reduce power
- Example: "Critical multiplier reduced from 3.0 to 2.5"
- Effect: crit builds still viable but weaker
- Controversy: players complain, meta shifts

**Philosophy 3: Sideways Changes**:
- When skill is balanced but boring: redesign
- Example: change mechanic, not numbers
- Effect: same power, different playstyle
- Community: generally appreciated (feels fresh)

### 4.3 Balance Monitoring Metrics

**Metrics Tracked**:
1. Build prevalence (% of players using each build)
   - Target: top build <15% (diversity)
   
2. Success rate (% of maps completed)
   - Target: 95%+ completion (content accessible)
   
3. Profitability (chaos per hour by content tier)
   - Target: within 2x range (no dominant farming strategy)
   
4. Death rate (% of maps resulting in character death)
   - Softcore target: 5-10% (challenging but fair)
   - Hardcore target: 1-3% (high risk)

**Intervention Thresholds**:
- If metric outside target: schedule patch
- If metric severely wrong: emergency hotfix

---

## Part 5: Quality Assurance Standards

### 5.1 Testing Before Release

**Internal Testing** (developer team):
- Duration: 1-2 weeks per patch
- Coverage: all new mechanics tested
- Bugs found: 50-100 per patch

**Quality Assurance** (QA team):
- Duration: 1-2 weeks per patch
- Coverage: regression testing on all features
- Bugs found: 20-50 per patch

**Community Testing** (beta testers):
- Duration: 1-4 weeks (for major patches)
- Coverage: real-world scenarios
- Bugs found: 5-20 per patch

**Total Bugs Found Before Release**: 75-170 (fixed before launch)

### 5.2 Acceptance Criteria

**Before patch deployment**:
- [ ] All critical bugs fixed (0 critical bugs allowed)
- [ ] No regressions (all previous fixes still working)
- [ ] Performance benchmarks met (FPS/latency targets)
- [ ] Servers can handle load (stress tested)
- [ ] Patch notes reviewed (accurate and clear)
- [ ] Translation complete (all languages supported)
- [ ] Rollback plan documented (if needed)

### 5.3 Rollback Procedures

**If Patch Causes Critical Issues**:
1. Immediate rollback (revert to previous version)
2. Duration: <30 minutes downtime
3. Compensation: free cosmetics for affected players
4. Root cause analysis: internal report
5. Fix and redeploy: next patch attempts fix

**Example Rollback**:
- Patch 1.0.6 deployed
- Players report: game crashes every 10 minutes
- Decision: critical issue (>50% failure rate)
- Action: rollback to 1.0.5 within 15 minutes
- Players: play on 1.0.5 while fix develops
- Fixed: patch 1.0.7 deployed 2 days later

---

## Conclusion

Professional patch management requires:
1. **Versioning**: clear semantic versions
2. **Communication**: transparent patch notes and timelines
3. **Testing**: comprehensive QA before release
4. **Monitoring**: track metrics post-launch
5. **Feedback**: listen to community, iterate quickly

Well-managed patches maintain player satisfaction and game stability. Poor patch management leads to player exodus and negative reviews. The investment in processes pays dividends in player retention.
