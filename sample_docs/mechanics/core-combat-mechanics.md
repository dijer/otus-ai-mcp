# Path of Exile 2: Core Combat Mechanics Guide

## Overview

Path of Exile 2 combat is built around three fundamental pillars: positioning, resource management, and ability sequencing. Mastery of these three pillars is required to progress through late Acts and Endgame content.

---

## 1. Dodge Roll System

### Basic Dodge Roll
- Grants temporary invulnerability frames (i-frames) for a fixed duration of 0.25 seconds.
- Has a base cooldown of 1.2 seconds.
- Can be enhanced by the Acrobatics passive cluster to reduce cooldown to 0.9 seconds.

### Dodge Roll Mechanics
- I-frame window begins at approximately frame 3 of the animation.
- Rolling backward away from a boss attack is the most common mistake; rolling into attacks often passes through them cleanly.
- Each class has different base dodge distance; the Monk has the longest roll by default.

### Dodge vs. Movement Skill
- Dodge Roll: short distance, guaranteed i-frames, short cooldown.
- Movement Skills (Blink, Leap Slam, etc.): longer distance, no i-frames by default, longer cooldown.
- Optimal usage: dodge roll for reactive defense, movement skill for proactive repositioning.

---

## 2. Stamina System

### What is Stamina
- Stamina is a secondary resource that governs consecutive dodge rolls.
- Base stamina is 3 charges.
- Each dodge roll consumes 1 stamina charge.
- Stamina recharges at 1 charge per 0.8 seconds when not dodge rolling.

### Stamina Management in Boss Fights
- Most mid-tier bosses have ability sequences requiring 2-3 dodge rolls.
- Endgame bosses can require 4+ consecutive dodges during burst windows.
- Passive cluster Endless Momentum reduces stamina cost to 0.8 per roll, allowing 3.75 effective rolls from 3 charges.

### Stamina and Endgame Encounters
- Final Endgame encounters like Arbiter of Ash assume full stamina at phase transition.
- Do not burn stamina rolls on avoidable ambient damage.
- Stamina regenerates during animation locks on the boss; use boss animation windows to restore.

---

## 3. Hit Stagger and Poise System

### Player Poise
- Players have a hidden Poise stat that prevents stagger on small hits.
- Poise is reduced by each hit and regenerates at 20 points per second.
- Heavy hits (telegraphed large attacks) bypass poise entirely.

### Boss Stagger
- Bosses have a Stagger Gauge visible as a yellow bar under HP.
- Filling the gauge interrupts the boss's current ability and grants a free punish window.
- Stagger windows last 2.0 seconds by default; some endgame bosses have reduced stagger durations.
- Heavy melee skills contribute 3x Stagger compared to projectile skills.

### Break Points
- Most Act bosses stagger at 100 stagger points.
- Endgame bosses stagger at 250 stagger points.
- Arbiter of Ash stagger point threshold is exactly 310 per phase.

---

## 4. Elemental Status Effects

### Ignite
- Applied by fire damage above a minimum threshold.
- Burns for 20% of initial hit as damage over 4 seconds.
- Multiple ignites do not stack; the strongest overrides.
- Counter: fire resistance above 75% prevents ignite application.

### Freeze
- Applied by cold damage with sufficient hit magnitude.
- Duration scales with chill magnitude; base freeze is 0.6 seconds.
- Freezes lock the boss in place; some endgame bosses are immune.
- Counter (for player): freeze can be broken early with movement skill.

### Shock
- Applied by lightning damage.
- Shock increases damage taken by 15% per stack; maximum 3 stacks.
- Duration: 3 seconds per stack; refreshed on new application.
- Against players: shock reduces reaction to subsequent attacks.

### Poison
- Applied by chaos damage or certain weapon types.
- Deals 8% of total poison stacks as chaos damage per second.
- Stacks are cumulative up to 20 stacks maximum.
- Counter: chaos resistance, life flask with anti-poison mod, or a cleansing skill.

### Bleed
- Applied by physical damage critical hits.
- Deals 10% of hit as physical damage over 3 seconds.
- Movement while bleeding increases damage by 50%; standing still reduces it.
- Counter: stay still briefly after a bleed application to reduce damage.

---

## 5. Resistance System

### Resistance Caps
- Default resistance cap: 75% for all elements.
- Above-cap resistance: requires unique gear or passive cluster Transcendence.
- Resistance cap can be raised to 80% with the Fortification mastery node.

### Resistance Penetration
- Enemy penetration reduces effective resistance; not visible in UI.
- Most Act bosses have 10-15% elemental penetration.
- Endgame bosses typically have 20-35% penetration.
- This means at 75% fire resistance against a boss with 20% penetration, effective resistance is 55%.

### Chaos Resistance
- Starts at -60% by default.
- Must be raised through gear; recommended minimum is 0% for endgame.
- Positive chaos resistance above 40% is considered high-end.

---

## 6. Armor and Evasion

### Armor
- Reduces physical damage taken by a percentage.
- Formula: Armor / (Armor + 5 * Damage) = Reduction%.
- At 10,000 armor against a 1,000 damage hit: 10000 / (10000 + 5000) = 66.7% reduction.
- Armor is most effective against small frequent hits; large single hits reduce its effectiveness.

### Evasion
- Provides a chance to evade attacks outright.
- At 50% evasion chance, on average every other attack misses.
- Evasion does not work against area-of-effect damage.
- Temporal chains curse reduces evasion chance by 30%.

### Energy Shield
- Acts as a second HP bar above life.
- Regenerates at 20% of total value per second after a 2-second delay without taking damage.
- Chaos damage bypasses energy shield by default.
- Some ascendancy nodes can make energy shield block chaos damage.

---

## 7. Flask System

### Life Flask Mechanics
- Life flasks recover life over a duration or instantly depending on flask type.
- Quality improvements can add recovery speed modifiers.
- Surgeon's mod: restores 1 flask charge on critical strike; useful for aggressive builds.

### Mana Flask Mechanics
- Mana flasks recover mana over duration.
- Overflowing mana is wasted; use mana flasks during high-activity phases.

### Utility Flasks
- Granite Flask: adds 3,000 armor for 4 seconds; extremely effective against physical bosses.
- Jade Flask: adds 3,000 evasion rating for 4 seconds.
- Quartz Flask: adds 10% dodge chance and phasing for 4 seconds.
- Quicksilver Flask: increases movement speed by 40% for 4 seconds.

### Flask Charge Generation
- Enemy kills generate flask charges.
- Boss fights with no add phases will drain flasks without recharge.
- Prioritize flasks with reduced charge cost or surgeon's prefix for single-boss encounters.

---

## 8. Ailment Threshold

### What Is Ailment Threshold
- Each enemy has an ailment threshold that determines minimum hit needed to apply a status effect.
- Bosses have high ailment thresholds; spamming small hits rarely applies statuses.
- Threshold for Act 1 bosses: approximately 800 per hit.
- Threshold for endgame bosses: approximately 4,000 per hit.

### Building Around Ailments
- Use Shock for universal damage amplification; easiest to maintain.
- Freeze provides control but requires high cold damage to overcome boss thresholds.
- Ignite is passive damage over time; good for DPS-efficient builds.

---

## Verification Facts
- Base dodge roll invulnerability frames last exactly 0.25 seconds.
- Base stamina is 3 charges regenerating at 1 per 0.8 seconds.
- Arbiter of Ash stagger threshold is exactly 310 per phase.
- Default resistance cap is 75%; Fortification mastery raises it to 80%.
- Chaos resistance default starting value is negative 60%.
