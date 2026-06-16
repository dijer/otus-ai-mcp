# Path of Exile 2: Status Ailments and Curses Reference

## Part 1: Core Ailment Systems

### 1.1 Ignite

**Ignite Basics**:
- Damage type: fire damage over time
- Trigger: fire hit that applies ailment chance
- Duration: 4 seconds base
- Effect: deals damage over time after a hit
- Scaling: fire damage, damage over time, ailment effect

**Ignite Strength Tiers**:
- Weak ignite: 100-200 damage over 4 seconds
- Medium ignite: 500-1,000 damage over 4 seconds
- Strong ignite: 2,000-5,000 damage over 4 seconds
- Boss-killing ignite: 10,000+ damage over 4 seconds

**Ignite Formula Example**:
- Fire hit: 1,000 damage
- Ignite damage: 20% of hit damage per second for 4 seconds
- Total: 800 damage over duration
- With +50% ignite effect: 1,200 total damage

**Use Cases**:
- Boss damage over time builds
- Fire trap and burn builds
- Synergy with area denial

### 1.2 Freeze

**Freeze Basics**:
- Damage type: cold hit threshold
- Trigger: enough cold damage in a single hit
- Duration: 2 seconds standard
- Effect: target cannot act while frozen
- Scaling: cold damage, ailment effect, freeze duration

**Freeze Threshold Model**:
- Low HP enemies: freeze easily
- Mid-tier enemies: require strong cold hit
- Bosses: need very large hit or special scaling

**Example**:
- Enemy life: 3,000
- Freeze threshold: 300 cold damage hit
- Player hit: 450 cold damage
- Result: freeze applies for 2 seconds

**Counterplay**:
- Freeze immunity flask
- Cannot be frozen modifiers
- Faster ailment recovery

### 1.3 Shock

**Shock Basics**:
- Damage type: lightning damage
- Trigger: lightning hit that exceeds threshold
- Duration: 2 seconds base
- Effect: target takes increased damage
- Scaling: lightning damage, shock effect, ailment duration

**Shock Strength Tiers**:
- Small shock: +10% damage taken
- Medium shock: +20% damage taken
- Strong shock: +30% damage taken
- Extreme shock: +40%+ damage taken

**Example**:
- Lightning hit: 1,500 damage
- Shock effect: 20%
- Boss takes 20% more damage from all sources for 2 seconds
- Follow-up burst benefit: 20% multiplicative damage increase

### 1.4 Poison

**Poison Basics**:
- Damage type: chaos damage over time
- Trigger: physical or chaos hit with poison chance
- Duration: 2-4 seconds depending on modifiers
- Stacking: multiple poison stacks can exist
- Scaling: chaos damage, DoT, ailment effect

**Poison Stack Example**:
- Hit applies 100 poison damage per second
- 5 stacks active
- Total: 500 damage per second
- With +50% poison effect: 750 damage per second

**Use Cases**:
- High-uptime boss damage
- Hybrid physical/chaos builds
- Damage while moving

### 1.5 Bleed

**Bleed Basics**:
- Damage type: physical damage over time
- Trigger: physical hit with bleed chance
- Duration: 5 seconds base
- Scaling: physical damage, DoT, bleed effect
- Movement penalty: extra danger if target moves

**Bleed Strength Tiers**:
- Light bleed: 100 damage over duration
- Medium bleed: 500 damage over duration
- Strong bleed: 1,500 damage over duration
- Heavy bleed: 4,000+ damage over duration

**Special Rule**:
- Moving while bleeding can worsen effective damage in many systems
- Stationary bosses are less affected than mobile targets

---

## Part 2: Curse Systems

### 2.1 Curse Basics

**Curse Definition**:
- Debuff applied to enemies or players
- Effect: reduce resistance, increase damage taken, lower speed, lower accuracy
- Duration: depends on curse effect and modifiers
- Scaling: curse effect, aura scaling, hex effectiveness

**Common Curse Types**:
- Fire curse: lowers fire resistance
- Cold curse: lowers cold resistance
- Lightning curse: lowers lightning resistance
- Chaos curse: lowers chaos resistance
- Slow curse: reduces action speed
- Weakness curse: lowers enemy damage output

### 2.2 Resistance Curses

**Resistance Reduction Example**:
- Enemy fire resistance: 75%
- Curse reduces fire res by 20%
- New effective resistance: 55%
- Damage increase: significant because damage taken rises from 25% to 45%
- Relative increase: 80% more fire damage taken

**Mathematical Example**:
- Base fire damage: 1,000
- At 75% resistance: target takes 250
- At 55% resistance: target takes 450
- Increase: 200 extra damage
- Relative gain: 80%

### 2.3 Slow Curses

**Slow Effects**:
- Movement speed reduction: -30%
- Attack speed reduction: -20%
- Cast speed reduction: -20%
- Action speed reduction: can affect all movement and attack forms

**Use Cases**:
- Kiting bosses
- Controlling arena pressure
- Reducing damage taken by slowing enemy swings

### 2.4 Damage Reduction Curses

**Weakness Effects**:
- Lowers enemy damage output
- Usually affects physical or general damage
- Makes hard-hitting bosses survivable
- Best on multi-hit encounters

**Example**:
- Boss hit: 1,000 physical
- Weakness curse: -20% damage output
- New hit: 800 physical
- With 50% armor: final damage = 400 instead of 500

---

## Part 3: Ailment Immunity and Cleansing

### 3.1 Immunity Sources

**Flasks**:
- Remove freeze
- Remove ignite
- Remove poison
- Remove curse
- Usually temporary immunity for a few seconds

**Passives**:
- Cannot be frozen
- Cannot be ignited
- Cannot be shocked
- Reduced curse effect
- Ailment avoidance scaling

**Gear Modifiers**:
- Increased ailment avoidance
- Reduced curse duration
- Immunity to specific ailment under condition

### 3.2 Cleansing Priority

**Priority Order**:
1. Freeze if movement is impossible
2. Curse if damage spikes are dangerous
3. Ignite if life is low and DoT is high
4. Poison if multiple stacks are building
5. Shock if burst damage is upcoming

**Why Order Matters**:
- Freeze can prevent all reaction.
- Curse often amplifies every other hazard.
- Ignite and poison are time-based but can be managed.
- Shock is dangerous if the boss still has follow-up attacks.

### 3.3 Ailment Uptime Management

**Goal**:
- Keep dangerous ailments on the enemy.
- Keep dangerous ailments off yourself.
- Use uptime windows to maximize damage.

**Example**:
- Shock enemy before burst.
- Ignite enemy during movement phase.
- Freeze adds to stop pressure.
- Curse boss before cooldown cycle.

---

## Part 4: Build Synergy by Ailment

### 4.1 Ignite Builds

**Characteristics**:
- High front-loaded fire hit.
- Strong damage over time scaling.
- Excellent during boss movement.

**Typical Setup**:
- Fire spell or attack.
- Ignite chance support.
- Damage over time support.
- Fire penetration or curse support.

**Power Curve**:
- Early game: moderate.
- Mid game: strong.
- Endgame: extremely strong if scaling is correct.

### 4.2 Freeze Builds

**Characteristics**:
- Cold hit threshold based control.
- Great for interrupting dangerous skills.
- Strong against non-boss enemies.

**Typical Setup**:
- Cold projectile or nova.
- Freeze duration scaling.
- Increased cold damage.
- Critical strike synergy.

### 4.3 Shock Builds

**Characteristics**:
- Lightning burst with shock amplification.
- Adds team-wide benefit if allies are present.
- Great for burst-oriented parties.

**Typical Setup**:
- Lightning hit with shock chance.
- Shock effect scaling.
- High burst window timing.
- Follow-up damage cooldowns.

### 4.4 Poison and Bleed Builds

**Characteristics**:
- Damage while moving.
- Strong against mobile bosses.
- Works well with repeated hits.

**Typical Setup**:
- Fast attack speed.
- DoT scaling.
- Duration scaling.
- Movement-friendly playstyle.

---

## Part 5: Boss Interaction Rules

### 5.1 When Ailments Matter Most

Ailments are strongest when:
- Boss has long, predictable animation.
- Boss is vulnerable after a failed attack.
- Player can maintain uptime while dodging.
- The fight has repeated mechanics.

Ailments are weaker when:
- Boss is immune in many phases.
- Boss constantly teleports.
- Fight ends too quickly.
- Boss cleanses debuffs frequently.

### 5.2 Curse Timing

Best curse timing:
- Before boss enters vulnerability.
- Before burst cooldowns are used.
- Before adds spawn if the curse helps control them.

Bad curse timing:
- During invulnerability.
- After the burst window already ended.
- On enemies that die before the curse matters.

### 5.3 Cleansing and Recovery Cycles

For players:
- Cure freeze first.
- Remove curse if damage spikes.
- Clear ignite if life is dropping over time.
- Keep poison under control if multiple stacks build.

For bosses:
- If boss cleanses itself, hold curse until after cleanse.
- If boss enters enrage, curse immediately before the phase begins.

---

## Part 6: Numerical Reference Table

| Effect | Base Duration | Main Scaling | Typical Combat Value |
| --- | --- | --- | --- |
| Ignite | 4 seconds | fire damage, DoT | 800-5,000 total |
| Freeze | 2 seconds | cold hit threshold | full stop |
| Shock | 2 seconds | lightning hit, shock effect | 10-40% more damage taken |
| Poison | 2-4 seconds | chaos damage, DoT | 500-750 DPS with stacks |
| Bleed | 5 seconds | physical damage, DoT | 100-4,000+ total |
| Curse | varies | curse effect | 20-80% swing in outcome |

---

## Conclusion

Status ailments and curses are a force multiplier. They do not just add damage or control. They reshape the fight by changing when the enemy can act, how much damage the enemy takes, and how much room the player has to survive.

If you want a boss guide to feel complete, it should always mention which ailments matter, which curses matter, and which cleansing tools should be reserved for the hardest phase.
