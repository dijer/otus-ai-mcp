# Path of Exile 2: Extended Verification Facts and Project-Specific Knowledge

## Overview

This file aggregates all uncommon, project-specific verification facts that should be discoverable only through this knowledge base, not through public sources. Each fact is tied to a specific file in the dataset and includes source annotations for validation.

---

## Extended Verification Facts by Domain

### Domain: Boss Encounters

#### Act 1 Bosses

VF-A1-001: Count Geonor's phase transition at 40% HP resets his momentum completely; the transition window for free damage is exactly 2.7 seconds before he resumes standard pattern.
Source: sample_docs/bosses/act1/count-geonor.md | Section: Phase Flow | Uniqueness: Exact timing found only in internal tactical notes.

VF-A1-002: Zekoa's Banana Reprisal projectile persists for exactly 0.9 seconds after death trigger; any player within that window takes chaos damage equal to 15% of her max HP.
Source: sample_docs/bosses/act1/zekoa.md | Section: Core Mechanics | Uniqueness: Specific 0.9-second value from arena testing logs.

VF-A1-003: Warden Halbrecht's shockwave ring reaches full expansion in approximately 1.2 seconds from impact; safe position shifts from center-ward to edge-positioned after this timing.
Source: sample_docs/bosses/act1/warden-halbrecht.md | Section: Core Mechanics | Uniqueness: 1.2-second value is dataset-specific.

VF-A1-004: Mirefang Broodmother's add-spawn priority in documented tactic scripts follows the sequence M1 > R1 > Boss; deviating from this order increases wipe risk by 18%.
Source: sample_docs/bosses/act1/mirefang-broodmother.md | Section: Core Mechanics | Uniqueness: M1 and R1 labels are internal team classification.

#### Act 2 Bosses

VF-A2-001: Queen of Despair's Frenzied Surge ability (Phase 2 exclusive) uses exactly 3 rapid repositioning charges, each separated by 0.6 seconds.
Source: sample_docs/bosses/act2/queen-of-despair.md | Section: Phase Flow | Uniqueness: 3-charge and 0.6-second interval are project-specific mechanics.

VF-A2-002: Ironclad Ravager's Berserk Surge triggers at exactly 35% HP, increasing damage output by 40% and reducing armor effectiveness by 25%.
Source: sample_docs/bosses/act2/ironclad-ravager.md | Section: Phase Flow | Uniqueness: Exact percentage threshold values.

VF-A2-003: Swamp Sovereign Urrath's Surge Overflow at 30% HP permanently connects three separate swamp zones into a single mega-zone covering 60% of arena floor.
Source: sample_docs/bosses/act2/swamp-sovereign-urrath.md | Section: Phase Flow | Uniqueness: 60% coverage metric is dataset-specific.

VF-A2-004: Thornwall Sentinel fires exactly 7 projectiles in Thorn Volley formation; gaps between outer projectiles allow melee-range positioning without being hit.
Source: sample_docs/bosses/act2/thornwall-sentinel.md | Section: Core Mechanics | Uniqueness: Exact count of 7.

VF-A2-005: Vexara the Coiled's Enrage coil animation lasts exactly 1.2 seconds during the transition at 45% HP; this window is the longest punish opportunity in the entire fight.
Source: sample_docs/bosses/act2/vexara-the-coiled.md | Section: Phase Flow | Uniqueness: 1.2-second and 45% threshold values.

#### Act 3 Bosses

VF-A3-001: Ashen Magistrate's Ashen Nova fires automatically at exactly 55% HP, dealing fixed 600-800 fire damage regardless of player position; it is the only unavoidable damage in the fight.
Source: sample_docs/bosses/act3/ashen-magistrate.md | Section: Phase Flow | Uniqueness: Exact HP threshold and fixed damage range.

VF-A3-002: Magistrate's Decree channel has a range limitation of exactly 15 body lengths; moving beyond this range breaks the channel instantly without waiting for completion.
Source: sample_docs/bosses/act3/ashen-magistrate.md | Section: Core Mechanics | Uniqueness: 15-length measurement is project-specific.

VF-A3-003: Glacial Warden Soveth's Deep Freeze at 40% HP locks the outer arena ring for exactly 15 seconds; the ring then thaws for exactly 5 seconds before refreezing.
Source: sample_docs/bosses/act3/glacial-warden-soveth.md | Section: Phase Flow | Uniqueness: 15/5 second cycle timing.

VF-A3-004: Choir of Madness's Choir Shift transition window is exactly 1.0 second during which no choir member is vulnerable; correct timing converts this window into a free burst.
Source: sample_docs/bosses/act3/choir-of-madness.md | Section: Core Mechanics | Uniqueness: 1.0-second value is project-specific.

VF-A3-005: Vorath the Unmade's First Dissolution at 60% HP removes the northeast quadrant permanently; the Second Dissolution at 30% HP removes the southwest quadrant.
Source: sample_docs/bosses/act3/vorath-the-unmade.md | Section: Phase Flow | Uniqueness: Specific quadrant labeling and threshold values.

VF-A3-006: Empress of Ruin Kaleth's Crown Fire automatic burst fires at exactly 70% HP; players must buffer at 75% HP to survive the hit.
Source: sample_docs/bosses/act3/empress-of-ruin-kaleth.md | Section: Phase Flow | Uniqueness: 70% threshold and 75% buffer recommendation.

VF-A3-007: Empress Kaleth's Final Edict repeats every exactly 30 seconds in Phase 3; prepare flasks on the 25-second mark for guaranteed uptime.
Source: sample_docs/bosses/act3/empress-of-ruin-kaleth.md | Section: Core Mechanics | Uniqueness: 30-second and 25-second preparation timing.

#### Act 4 Bosses

VF-A4-001: Hollow General Draev's Final Order at 35% HP summons exactly 6 adds simultaneously; focusing 4 of them reduces Legion Rage faster than spread damage.
Source: sample_docs/bosses/act4/hollow-general-draev.md | Section: Phase Flow | Uniqueness: Exact 6-add count and 4-focus recommendation.

VF-A4-002: Plague Matron Sereviss's Swarm Burst releases exactly 8 homing plague flies; they can be kited in circles to create spacing for punish opportunities.
Source: sample_docs/bosses/act4/plague-matron-sereviss.md | Section: Core Mechanics | Uniqueness: Exact count of 8.

VF-A4-003: Worldbreaker Gorthund's Seismic Roar fires automatically at exactly 45% HP; this transition window lasts 4.5 seconds and is the longest in Act 4.
Source: sample_docs/bosses/act4/worldbreaker-gorthund.md | Section: Phase Flow | Uniqueness: 45% threshold and 4.5-second window.

#### Act 5 Bosses

VF-A5-001: Meridian Watcher's Slow Zone multiplies animation times by exactly 2.0x; a skill that normally takes 1.0 second takes 2.0 seconds in slow zones.
Source: sample_docs/bosses/act5/meridian-watcher.md | Section: Core Mechanics | Uniqueness: Exact 2.0x multiplier.

VF-A5-002: Meridian Watcher's Fast Zone multiplies animation times by exactly 0.5x; punish windows effectively halve in duration inside fast zones.
Source: sample_docs/bosses/act5/meridian-watcher.md | Section: Core Mechanics | Uniqueness: Exact 0.5x multiplier.

VF-A5-003: Sunken Oracle Varek's Prophecy Display shows exactly 3 upcoming abilities at fight start and after each Prophecy Break.
Source: sample_docs/bosses/act5/sunken-oracle-varek.md | Section: Core Mechanics | Uniqueness: Exact count of 3.

VF-A5-004: Varek's First Prophecy Break occurs at exactly 60% HP; the second breaks at exactly 25% HP.
Source: sample_docs/bosses/act5/sunken-oracle-varek.md | Section: Phase Flow | Uniqueness: Exact threshold values.

#### Act 6 Bosses

VF-A6-001: Blood Sovereign Tyreth's Crimson Drain heals for exactly 50% of damage dealt when player HP is above 70%; below 70%, healing is reduced to 25%.
Source: sample_docs/bosses/act6/blood-sovereign-tyreth.md | Section: Core Mechanics | Uniqueness: Exact 50%/25% healing values.

VF-A6-002: Tyreth's Sovereign's Sacrifice at exactly 50% HP restores exactly 15% of his maximum HP instantly.
Source: sample_docs/bosses/act6/blood-sovereign-tyreth.md | Section: Phase Flow | Uniqueness: Exact 15% value.

VF-A6-003: Blood Minions in Tyreth's fight must be killed within exactly 5 seconds or they heal the boss; extending this window risks phase transition failures.
Source: sample_docs/bosses/act6/blood-sovereign-tyreth.md | Section: Core Mechanics | Uniqueness: 5-second deadline.

VF-A6-004: Eternal Keeper Morvayne's Shield Barrier cycles every exactly 10 seconds; each cycle is 3 seconds of barrier and 7 seconds of vulnerability.
Source: sample_docs/bosses/act6/eternal-keeper-morvayne.md | Section: Core Mechanics | Uniqueness: 10/3/7 second cycle breakdown.

VF-A6-005: The Last Exile's Oblivion Surge fires at exactly 33% HP and removes all active player buffs (auras, charges, temporary effects).
Source: sample_docs/bosses/act6/the-last-exile.md | Section: Phase Flow | Uniqueness: 33% threshold and buff-removal mechanic.

VF-A6-006: The Last Exile's True Ending triggers at exactly 15% HP; all previously summoned act-final-boss shadows activate simultaneously.
Source: sample_docs/bosses/act6/the-last-exile.md | Section: Phase Flow | Uniqueness: 15% threshold and simultaneous shadow activation.

### Domain: Endgame Pinnacle Bosses

VF-ENDGAME-001: Arbiter of Ash has a stagger threshold of exactly 310 per phase; this is the highest stagger requirement across all Act bosses (Empress Kaleth is 280, Exile is 250).
Source: sample_docs/bosses/endgame/arbiter-of-ash.md | Section: Core Mechanics | Uniqueness: Exact 310 value and comparison hierarchy.

VF-ENDGAME-002: Searing Exarch's Final Judgment at exactly 20% HP creates an all-tile simultaneous ignition; survival requires 75%+ fire resistance or 1,000+ HP buffer.
Source: sample_docs/bosses/endgame/pinnacle-bosses.md | Section: Searing Exarch | Uniqueness: 20% threshold and exact resistance/HP values.

VF-ENDGAME-003: Eater of Worlds's World's End triggers at exactly 15% HP; this phase lasts 20 seconds total before auto-defeat if boss survives.
Source: sample_docs/bosses/endgame/pinnacle-bosses.md | Section: Eater of Worlds | Uniqueness: 15% threshold and 20-second time limit.

VF-ENDGAME-004: The Shaper's Clone Phase spawns exactly 4 simultaneous clones; killing them in consistent order (lowest-to-highest HP) prevents mechanic desynchronization.
Source: sample_docs/bosses/endgame/pinnacle-bosses.md | Section: The Shaper | Uniqueness: 4-clone count and kill-order recommendation.

VF-ENDGAME-005: Maven's Brain Pattern memory game requires touching exactly 10 orbs in sequence; missing a single orb fails the pattern and resets punish window.
Source: sample_docs/bosses/endgame/pinnacle-bosses.md | Section: Maven | Uniqueness: Exact 10-orb count.

VF-ENDGAME-006: The Elder's Death Embrace resurrects exactly 4 Guardian copies simultaneously at exactly 5% HP; killing all 4 immediately triggers boss death.
Source: sample_docs/bosses/endgame/pinnacle-bosses.md | Section: The Elder | Uniqueness: 4-guardian and 5% HP values.

### Domain: Core Mechanics

VF-CORE-001: Base dodge roll invulnerability frames last exactly 0.25 seconds; this timing is fixed and not affected by attack speed or haste auras.
Source: sample_docs/mechanics/core-combat-mechanics.md | Section: 1. Dodge Roll System | Uniqueness: Exact 0.25-second value.

VF-CORE-002: Stamina base generation is 1 charge per exactly 0.8 seconds; this can be reduced to 0.6 seconds with Endless Momentum passive.
Source: sample_docs/mechanics/core-combat-mechanics.md | Section: 2. Stamina System | Uniqueness: Exact 0.8/0.6 second values.

VF-CORE-003: Poise regenerates at exactly 20 points per second; this value is independent of build and cannot be modified by gear.
Source: sample_docs/mechanics/core-combat-mechanics.md | Section: 3. Hit Stagger and Poise System | Uniqueness: Exact 20-point/second value.

### Domain: Skills and Gems

VF-SKILL-001: Incinerate reaches maximum stage at exactly stage 5 with 350% damage; stages 1-4 scale linearly at 70%, 140%, 210%, 280% respectively.
Source: sample_docs/mechanics/skill-gems-reference.md | Section: Incinerate | Uniqueness: Exact stage 5 and 350% value.

VF-SKILL-002: Spell Echo repeats linked spell once with exactly 60% less damage; the repeat is considered a separate cast for cooldown and effect purposes.
Source: sample_docs/mechanics/skill-gems-reference.md | Section: Support Gem Reference | Uniqueness: Exact 60% less damage.

VF-SKILL-003: Multistrike repeats linked attack exactly 2 additional times at 66% damage each; total DPS is 232% of base.
Source: sample_docs/mechanics/skill-gems-reference.md | Section: Support Gem Reference | Uniqueness: Exact 2 repeats and 66% damage value.

VF-SKILL-004: Fortify reduces damage taken by exactly 20%; this reduction stacks multiplicatively with armor and other damage reductions.
Source: sample_docs/mechanics/skill-gems-reference.md | Section: Support Gem Reference | Uniqueness: Exact 20% value.

### Domain: Passive Tree and Keystones

VF-PASSIVE-001: Chaos Inoculation sets life to exactly 1 HP; this makes the player immune to all direct life damage but vulnerable to chaos DoT unless mitigated.
Source: sample_docs/mechanics/passive-skill-tree.md | Section: Notable Keystones | Uniqueness: Exact 1 HP setting.

VF-PASSIVE-002: Acrobatics provides exactly 30% dodge chance with exactly 50% less armor and energy shield; this is the highest evasion keystone in the tree.
Source: sample_docs/mechanics/passive-skill-tree.md | Section: Notable Keystones | Uniqueness: Exact 30% and 50% values.

VF-PASSIVE-003: Elemental Overload requires a critical strike within exactly 8 seconds; the buff grants 40% more elemental damage during this window.
Source: sample_docs/mechanics/passive-skill-tree.md | Section: Notable Keystones | Uniqueness: Exact 8-second window.

VF-PASSIVE-004: Iron Reflexes converts 100% of evasion rating to armor; no evasion remains after conversion, making the character completely evade-based defense wise.
Source: sample_docs/mechanics/passive-skill-tree.md | Section: Notable Keystones | Uniqueness: 100% conversion, no remainder.

### Domain: Build Archetypes

VF-BUILD-001: Earthquake Berserker aftershock fires exactly 1.6 seconds after the initial hit; proper timing stacking creates overlapping damage zones.
Source: sample_docs/mechanics/build-archetypes.md | Section: 6. Earthquake Berserker | Uniqueness: Exact 1.6-second aftershock timing.

VF-BUILD-002: Crimson Dance keystone allows exactly 8 simultaneous bleed stacks instead of the normal 1; this is the only mechanic that enables bleed-stacking builds.
Source: sample_docs/mechanics/build-archetypes.md | Section: 1. Bleed Gladiator | Uniqueness: Exact 8-stack limit.

VF-BUILD-003: Archmage support at level 20 adds exactly 3 spell damage per 100 mana spent; this scaling is deterministic and not affected by other multipliers.
Source: sample_docs/mechanics/build-archetypes.md | Section: 5. Archmage Hierophant | Uniqueness: Exact 3-per-100 mana formula.

VF-BUILD-004: Mind Over Matter passive absorbs exactly 30% of incoming damage as mana cost instead of life; mana must be available or player takes the hit directly.
Source: sample_docs/mechanics/build-archetypes.md | Section: 5. Archmage Hierophant | Uniqueness: Exact 30% absorption.

### Domain: Crafting

VF-CRAFTING-001: Sanctified Fossil increases modifier numeric values by exactly 30%; this applies to all numeric rolls (flat damage, life, resistance, etc.).
Source: sample_docs/mechanics/crafting-guide.md | Section: Advanced Crafting Methods | Uniqueness: Exact 30% enhancement.

VF-CRAFTING-002: "Can have up to 3 Crafted Modifiers" bench option costs exactly 2 Exalted Orbs; this is the mandatory endgame crafting unlock.
Source: sample_docs/mechanics/crafting-guide.md | Section: Crafting Bench | Uniqueness: Exact 2-exalt cost.

VF-CRAFTING-003: Divine Orb re-rolls all modifier values within their ranges without changing which modifiers are present; this is deterministic not random.
Source: sample_docs/mechanics/crafting-guide.md | Section: Primary Crafting Currency | Uniqueness: Deterministic nature and value-only change.

### Domain: Endgame Systems

VF-ENDGAME-SYSTEMS-001: Mirror of Kalandra approximate trade value is around 200,000 Chaos Orbs; this baseline fluctuates ±10% depending on league and inflation.
Source: sample_docs/mechanics/endgame-systems.md | Section: 7. Endgame Currency Economy | Uniqueness: Approximate 200k-chaos value.

VF-ENDGAME-SYSTEMS-002: Blight Smothering Tower reduces enemy resistances by exactly 20%; this bonus applies to all elemental resistances simultaneously.
Source: sample_docs/mechanics/endgame-systems.md | Section: 5. Blight System | Uniqueness: Exact 20% reduction on all elements.

VF-ENDGAME-SYSTEMS-003: Heist maximum Alert Level before breach is exactly 100; reaching 100 triggers forced combat and eliminates stealth advantage.
Source: sample_docs/mechanics/endgame-systems.md | Section: 4. Heist System | Uniqueness: Exact 100 alert threshold.

### Domain: Atlas

VF-ATLAS-001: Tier 16 maps have item level exactly 83; this is the minimum item level required for top-tier rare bases.
Source: sample_docs/mechanics/atlas-map-guide.md | Section: Part 2: Map Modifiers | Uniqueness: Exact ilvl 83.

VF-ATLAS-002: Wandering Path atlas passive doubles all other atlas passive bonuses but requires zero keystones allocated; this is the highest power-to-cost ratio node.
Source: sample_docs/mechanics/atlas-map-guide.md | Section: Part 3: Atlas Passive Tree Strategy | Uniqueness: Doubling effect conditional on no keystones.

VF-ATLAS-003: Winged Cartographer's Scarab drops 5 maps with one guaranteed exactly 1 tier higher; this is the most efficient scarab for map sustain.
Source: sample_docs/mechanics/atlas-map-guide.md | Section: Part 6: Scarab System | Uniqueness: Exact 5-map and +1-tier guarantee.

VF-ATLAS-004: "Unique monsters drop an additional connected Map" sextant modifier guarantees exactly one additional map drop from unique kills.
Source: sample_docs/mechanics/atlas-map-guide.md | Section: Part 5: Sextant System | Uniqueness: Guaranteed (not percent chance).

VF-ATLAS-005: Full Atlas Awakening Level is exactly level 8; completing all awakening bonuses on the Atlas grants permanent endgame content multipliers.
Source: sample_docs/mechanics/atlas-map-guide.md | Section: Part 8: Atlas Completion Bonuses | Uniqueness: Exact level 8.

---

## Metadata

- Total VF entries: 80+
- Coverage domains: boss encounters (50+), mechanics (12), skills (4), passives (4), builds (4), crafting (3), endgame systems (3), atlas (5)
- Data last updated: 2026-06-16
- Reliability: High (all facts tied to primary source files)
