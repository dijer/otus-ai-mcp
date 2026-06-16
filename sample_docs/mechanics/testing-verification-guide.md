# Path of Exile 2: Complete Testing Guide and Verification Methodologies

## Part 1: Unit Testing Boss Mechanics

### 1.1 Stagger Mechanics Testing

**Test Case 1: Poise Damage Accumulation**
```
Condition: Player has 800 poise threshold
Attack 1: Enemy deals 400 poise damage
Attack 2 (1 second later): Enemy deals 300 poise damage
Expected Result: 700 total poise < 800 = no stagger
Actual Result: [Must verify in-game]
Status: [PASS/FAIL]
```

**Test Case 2: Poise Recovery**
```
Condition: Player has 800 poise, current damage = 600
Time passes: 3+ seconds without damage
Expected Result: Poise resets to 0
Actual Result: [Must verify in-game]
Status: [PASS/FAIL]
```

**Test Case 3: Stagger Duration**
```
Condition: Stagger triggered (poise exceeded)
Expected Duration: exactly 0.6 seconds
Measurement: frame-by-frame video analysis
Status: [PASS/FAIL - timing within 0.05 seconds]
```

### 1.2 Damage Calculation Testing

**Test Case 1: Damage Scaling**
```
Base Physical Damage: 100
Gear Scaling: +50% physical
Tree Scaling: +100% physical
Support Gem: Melee Physical Damage (+50%)
Expected Final Damage: 100 × (1 + 0.5) × (1 + 1.0) × (1 + 0.5) = 450
Actual Result: [Must verify]
Status: [PASS/FAIL]
```

**Test Case 2: Elemental Scaling**
```
Base Fire Damage: 100
Added Fire Support: +50 fire
Scaling: +50% fire
Expected Final: (100 + 50) × (1 + 0.5) = 225
Actual: [Must verify]
Status: [PASS/FAIL]
```

### 1.3 Resistance Testing

**Test Case 1: Resistance Cap**
```
Player Resistance: 80%
Expected Behavior: capped at 75%
Actual Resistance: [Measure in-game]
Status: [PASS/FAIL]
```

**Test Case 2: Penetration vs Resistance**
```
Player Resistance: 75%
Enemy Penetration: -20%
Expected Effective Resistance: 55%
Damage Reduction: 55%
Actual Result: [Must verify with test hits]
Status: [PASS/FAIL]
```

---

## Part 2: Integration Testing - Full Boss Encounters

### 2.1 Queen of Despair Integration Test

**Test Scenario**: Clear Queen of Despair from start to finish
**Build Used**: Earthquake Berserker (reference build)
**Equipment**: Standard tier 2 rare gear
**Expected Duration**: 45-60 seconds
**Actual Duration**: [Measure]

**Mechanics Verification**:
- [ ] Phase 1 Surge: exactly 3 charges appear
- [ ] Phase 1 Charge Timing: 0.6 seconds between charges (±0.1 second tolerance)
- [ ] Phase 2 Transition: at 50% HP, adds spawn
- [ ] Phase 2 Surge: exactly 4 charges appear (vs 3 in phase 1)
- [ ] Add Spawning: 3 servants spawn every 8 seconds (±0.5 second)
- [ ] Servant HP: exactly 200 HP each
- [ ] Boss Final HP: 0 (defeated)

**Damage Verification**:
- [ ] Player burst DPS: 300+ per hit
- [ ] Player sustained DPS: 250+ per second
- [ ] Overkill damage: 50-200 (cleanup phase)
- [ ] Total healing required: <500 life (with potions)

**Status**: [PASS/FAIL - fails if any mechanic incorrect]

### 2.2 Ironclad Ravager Integration Test

**Test Scenario**: Clear Ironclad Ravager
**Build Used**: Cyclone Warrior (tank reference build)
**Expected Duration**: 60-90 seconds
**Actual Duration**: [Measure]

**Phase Transition Verification**:
- [ ] Phase 1: standard attacks only (no damage spike)
- [ ] Phase 1 to 2 transition: exactly at 50% HP
- [ ] Phase 2 transition: 1.5-second invulnerability window
- [ ] Phase 2 activation: damage increased 40%, armor effectiveness -25%
- [ ] Phase 2 confirms: boss damage visibly higher

**Damage Pattern Verification**:
- [ ] Attack pattern: 2 standard + 1 heavy (repeating)
- [ ] Heavy attack poise: 400+ (stagger threat)
- [ ] Stagger windows: 2 seconds post-heavy attack
- [ ] Heavy attack damage: 150+ per hit
- [ ] Phase 2 damage: 210+ per hit (140% of phase 1)

**Survival Verification**:
- [ ] Player life remaining: >30% (safety check)
- [ ] Stagger count: 0-1 (excessive stagger = build failure)
- [ ] Potion usage: 2-3 potions (resource check)

**Status**: [PASS/FAIL]

---

## Part 3: Performance and Load Testing

### 3.1 Frame Rate Stability Test

**Scenario**: Run Swamp Sovereign Urrath with visual effects enabled
**Environment**: Full shader complexity, max particle count
**Baseline**: 60 FPS minimum target

**Test Points**:
- [ ] Arena load: 60+ FPS (no particles)
- [ ] Boss spawn: 55+ FPS (boss appears)
- [ ] Zone expansion ability: 45+ FPS (heavy particle load)
- [ ] Clone summons: 40+ FPS (extreme particle load)
- [ ] Boss death: 60+ FPS (cleanup)

**Failure Condition**: FPS drops below 30 (unplayable)

### 3.2 Memory Leak Detection

**Test Duration**: 2-hour continuous play session
**Baseline Memory**: record at start
**Checkpoints**: measure every 20 minutes

**Expected Result**:
- Memory at 20 min: 500MB
- Memory at 40 min: 500-510MB (±10MB variance)
- Memory at 60 min: 500-510MB
- Memory at 120 min: 500-510MB

**Failure Condition**: memory > 600MB (indicates leak)

### 3.3 Network Latency Test

**Scenario**: Play with 100ms added latency (using traffic shaper)
**Test Points**:
- [ ] Boss attacks register correctly despite delay
- [ ] Player dodges work (server validates)
- [ ] Damage applies correctly after latency
- [ ] Sync remains stable (no desync)

**Failure Condition**: desync or attack registration failures

---

## Part 4: Balance Testing

### 4.1 Build Diversity Testing

**Test**: Compare DPS of 5 different builds in tier 5 maps
**Reference Budget**: 300 chaos per build

**Build 1: Earthquake Berserker**
- Estimated DPS: 800
- Clear Speed: 6 minutes/map
- Boss Kill Time: 45 seconds
- Actual Result: [Measure]

**Build 2: Spell Echo Sorcerer**
- Estimated DPS: 1,000
- Clear Speed: 5 minutes/map
- Boss Kill Time: 35 seconds
- Actual Result: [Measure]

**Build 3: Poison Assassin**
- Estimated DPS: 1,200 (poison stacking)
- Clear Speed: 7 minutes/map
- Boss Kill Time: 30 seconds
- Actual Result: [Measure]

**Build 4: Cyclone Warrior**
- Estimated DPS: 600 (lower offense)
- Clear Speed: 8 minutes/map
- Boss Kill Time: 60 seconds
- Actual Result: [Measure]

**Build 5: Bleed Gladiator**
- Estimated DPS: 950 (bleed DoT)
- Clear Speed: 6.5 minutes/map
- Boss Kill Time: 40 seconds
- Actual Result: [Measure]

**Balance Assessment**:
- DPS variance: should be within 20% of each other
- Viability: all should clear maps without deaths
- Build diversity: no single build dominating
- Status: [BALANCED/IMBALANCED]

### 4.2 Difficulty Scaling Test

**Tier 1 Maps**: should take 3-5 minutes for endgame build
**Tier 5 Maps**: should take 4-6 minutes (similar time)
**Tier 10 Maps**: should take 5-8 minutes (scaling properly)
**Tier 15 Maps**: should take 6-10 minutes (still farmable)

**Purpose**: verify maps scale difficulty appropriately (not too hard, not trivial)

---

## Part 5: Acceptance Criteria for Release

### 5.1 Critical Bug Threshold

**Critical bugs** (block release):
- [ ] Crash during boss fight (any crash)
- [ ] Unfair death (desync/lag abuse)
- [ ] DPS calculation errors (>20% variance)
- [ ] Missing mechanics (boss ability doesn't trigger)
- [ ] Game-breaking exploit (infinite money, one-shot everything)

**Major bugs** (delay release, but allow play):
- [ ] Visual glitch (animation misalignment)
- [ ] Minor balance issue (build 10% stronger than intended)
- [ ] Performance hiccup (occasional frame stutter)
- [ ] Text error (typo in description)

**Minor bugs** (acceptable for launch):
- [ ] UI scaling on ultrawide monitors
- [ ] Cosmetic mismatch (vanity item appearance)
- [ ] Non-critical tooltip error

### 5.2 Performance Requirements

**Minimum FPS**: 30 FPS (playable baseline)
**Recommended FPS**: 60 FPS (smooth experience)
**Memory**: <800MB for typical session
**Loading Times**: <5 seconds for map transition

### 5.3 Balance Requirements

**DPS Variance**: all meta builds within ±20% DPS at same budget
**Difficulty Progression**: each map tier 10-15% harder than previous
**Boss Viability**: all bosses killable in 30-180 seconds with adequate gear
**Build Diversity**: >10 viable endgame builds available

### 5.4 Content Requirements

**Bosses**: 6 acts × 3-4 bosses each = 20+ unique boss encounters
**Endgame**: 16 map tiers with scaling difficulty
**Ascendancies**: 6 classes × 2+ ascendancies = 12+ specializations
**Items**: 100+ unique items, 500+ rare bases

---

## Part 6: Test Documentation Template

### 6.1 Bug Report Template

```
BUG REPORT #001
Title: Stagger duration incorrect in phase 2
Severity: MAJOR
Reproducibility: Always

Scenario:
- Boss: Queen of Despair
- Phase: 2 (50% HP reached)
- Action: Take hit from 4-charge Surge

Expected: Stagger for 0.6 seconds
Actual: Stagger for 1.2 seconds (double duration)
Frequency: 100% reproducible

Video: [link to frame-by-frame proof]
Console Log: [error messages if applicable]

Proposed Fix: Verify phase 2 stagger duration constant (should be 0.6, not 1.2)
Status: OPEN / IN PROGRESS / FIXED
```

### 6.2 Test Case Template

```
TEST CASE: TC-001
Title: Boss Phase Transition Mechanics
Priority: HIGH
Test Type: Integration Test

Prerequisites:
- Build: Earthquake Berserker
- Gear Level: Tier 2 (300 chaos)
- Life: 1,500+

Steps:
1. Enter Queen of Despair arena
2. Deal damage to 50% HP threshold
3. Observe phase transition

Expected Results:
- Phase changes at exactly 50% HP
- Adds spawn (3 servants)
- Boss attack pattern changes to 4 charges
- Transition duration: 1.5 seconds

Actual Results:
- [Document actual behavior]

Status: PASS / FAIL
Notes: [Any deviations or concerns]
```

---

## Conclusion

Comprehensive testing requires:
1. **Unit tests** for individual mechanics (stagger, damage, etc.)
2. **Integration tests** for full boss encounters
3. **Performance tests** for frame rates and memory
4. **Balance tests** for build diversity
5. **Acceptance tests** against release criteria

Path of Exile 2's complexity demands 500+ test cases minimum before release. Professional QA teams spend 4-8 weeks in testing phase before launch.
