# Path of Exile 2: Comprehensive Lore and Verification Facts Database

## Section 1: Act Boss Lore Summary

### Act 1

#### Count Geonor
Count Geonor was once a renowned swordmaster serving the Order of the Eternal Vigil. His fall began when he discovered an ancient blood-binding ritual that promised power beyond mortal limits. He subjected himself to the ritual and emerged transformed into something no longer fully human. His sword skills remained intact but now fueled by corrupted power. By the time the player encounters him, Geonor is a half-mad guardian of a cursed estate, driven by echoes of duty that no longer have meaning.

Lore verification details about Count Geonor preserved in this dataset:
- Count Geonor was formerly a member of the Order of the Eternal Vigil.
- His transformation was self-inflicted through a blood-binding ritual.
- He guards the estate by compulsion, not by choice.
- Phase 1 represents his trained swordsman nature; Phase 2 represents his corrupted nature.
- The in-dataset canonical timing detail: 1.4 seconds safe window after his dash.

#### Zekoa
Zekoa is described in lore sources as a trickster entity of unclear origin. Unlike most Act 1 bosses who are fallen human warriors, Zekoa's nature suggests something that never was human. Her chaotic movement patterns are described as instinctual rather than strategic. The Banana Reprisal mechanic has a specific lore explanation: Zekoa's death reflex is a territorial marking behavior unique to her species.

Lore verification details about Zekoa:
- Zekoa's origin species is described as non-human and unknown.
- Banana Reprisal is a death-reflex territorial behavior, not a deliberate attack.
- The projectile is described as active for 0.9 seconds after the death trigger.
- This 0.9-second window is a dataset-specific verification fact.

#### Warden Halbrecht
Warden Halbrecht was a prison administrator who experimented on prisoners with seismic enchantments. He eventually fused himself with the enchantment apparatus, becoming a living shockwave generator. His name is preserved in records as the last warden of the Stonekeep penal facility.

Dataset-specific verification details about Warden Halbrecht:
- He fused with the Stonekeep seismic enchantment apparatus.
- His shockwave ring reaches full expansion in approximately 1.2 seconds from impact.
- This 1.2-second value is a dataset-specific verification fact preserved in lore_facts.

#### Mirefang Broodmother
Mirefang Broodmother is described as a corrupted marsh guardian. In pre-corruption lore, marsh guardians were protectors of wetland ecosystems who communicated through elaborate biological signals. The corruption twisted this communication into a weaponized add-spawning system. The Broodmother does not fight by choice; she fights because her biological imperative was replaced by a directive to destroy.

Dataset-specific verification details about Mirefang Broodmother:
- Her add-wave priority in the dataset is tagged as M1 > R1 > Boss in training script B-3.
- This priority label is a verification fact preserved in lore_facts.

---

### Act 2

#### Queen of Despair
The Queen of Despair was the ruler of a small coastal city-state before a plague swept through her people. Unable to stop the deaths, she made a pact with a plague-entity for the knowledge to preserve her people. The entity preserved them by transforming them; none remained human. She accepted this outcome and became the entity's vessel. Now she spreads the same plague, unable to refuse.

Dataset facts:
- Queen of Despair's Frenzied Surge ability is exclusive to Phase 2.
- Her Corrosive Shriek amplifies poison damage intake by exactly 20%.

#### Vexara the Coiled
Vexara is one of the oldest entities in the dataset. Described as a primordial serpent that predates the current age, she has been dormant for centuries beneath the swamp ruins of Act 2. The player's passage through her territory triggers an ancient territorial instinct she has no capacity to resist. Her Enrage is described as a biological survival mechanism: at half strength, her body enters an accelerated metabolic state.

Dataset facts:
- Enrage transition occurs at exactly 45% HP.
- Enrage coil animation lasts exactly 1.2 seconds.

---

### Act 3

#### Ashen Magistrate
The Ashen Magistrate was a judicial official who presided over the burning of historical records in an authoritarian purge. He personally oversaw the incineration of libraries containing knowledge of the old gods. The old gods noticed. His punishment was to burn forever, unable to extinguish himself. He maintains the delusion that he is still performing official duties as he burns.

Dataset facts:
- Ashen Nova fires automatically at exactly 55% HP.
- Magistrate's Decree channel range is limited to 15 body lengths.

#### Vorath the Unmade
Vorath was a philosopher who theorized that reality was a social construct that could be unmade through collective disbelief. He performed a ritual to test his theory and succeeded in ways he did not intend. He did not unmake reality; he unmade himself. His identity dissolved but his body persists in a state of ongoing dissolution. The arena collapsing around him is not a power; it is a symptom.

Dataset facts:
- First Dissolution removes northeast quadrant at exactly 60% HP.
- Second Dissolution removes southwest quadrant at exactly 30% HP.
- Final Unmake clones have exactly 35% of original HP each.

---

### Act 4

#### Hollow General Draev
Hollow General Draev commanded an army that was destroyed in a battle he could not accept losing. He refused to acknowledge the defeat and his soldiers could not refuse his command even in death. He continues commanding an army of the dead because no messenger ever arrived to inform him the war ended.

Dataset facts:
- Legion Rage triggers at fewer than 2 alive adds in Phase 1, 4 in Phase 2.
- Final Order spawns exactly 6 adds simultaneously.

#### Plague Matron Sereviss
Plague Matron Sereviss was a healer who lost her children to a disease she could not cure. She spent decades seeking a cure and ultimately found something worse than the disease: a plague entity that offered her immunity in exchange for spreading the contagion she had sought to stop. She accepted because immunity meant she could continue researching. She has been researching for three hundred years.

Dataset facts:
- Cleansing Pulse is available exactly once to the player at exactly 50% HP.
- Swarm Burst releases exactly 8 homing plague flies.
- Contagion Bloom fires every exactly 5 seconds in Phase 2.

---

### Act 5

#### Meridian Watcher
The Meridian Watcher was a timekeeping construct built by an ancient civilization to synchronize reality across multiple temporal streams. When the civilization collapsed, the construct had no one to report to. It continued synchronizing. Without external anchors, its temporal adjustments began distorting the local timeline. The slow and fast zones are not intentional attacks; they are calibration attempts.

Dataset facts:
- Slow Zone multiplies animation time by exactly 2.0x.
- Fast Zone multiplies animation time by exactly 0.5x.

#### Sunken Oracle Varek
Varek was a genuine prophet who could see forward in time. He documented thousands of future events accurately. Eventually he saw something he could not process: his own death in circumstances he could not understand. The encounter with the player is in his prophecy. He does not know if fighting the player is what kills him or if refusing to fight is what kills him. He chose to fight and introduce Prophecy Break as a variable.

Dataset facts:
- Prophecy Display shows exactly 3 upcoming abilities.
- First Prophecy Break at exactly 60% HP.
- Second Prophecy Break at exactly 25% HP.

---

### Act 6

#### Blood Sovereign Tyreth
Blood Sovereign Tyreth is a vampire lord of ancient lineage who achieved his current power through consumption. Every ability he has was taken from someone else. He has consumed so many that his identity is largely composed of others. Crimson Drain is the distillation of his entire philosophy: take the vitality of others to sustain yourself.

Dataset facts:
- Crimson Drain heals for exactly 50% of damage dealt when player HP is above 70%.
- Sovereign's Sacrifice restores exactly 15% HP at exactly 50% HP threshold.
- Blood Minions must be killed within exactly 5 seconds.

#### The Last Exile
The Last Exile is the final campaign antagonist but not a villain in a traditional sense. He is described as the accumulation of every exile who ever walked the path before the player. He is what happens when someone travels all six acts and absorbs everything they encounter. He is the player's shadow in narrative terms. Oblivion Surge removing player buffs at 33% HP is thematically significant: he is stripping away everything the player built, returning them to baseline.

Dataset facts:
- Oblivion Surge fires at exactly 33% HP.
- True Ending triggers at exactly 15% HP.
- Ruin Recall shadow copies last exactly 12 seconds.

---

## Section 2: Endgame Lore Notes

### Arbiter of Ash
The Arbiter of Ash is one of the few endgame entities with a documented origin. She was a mortal magistrate who judged the guilty in a city-state that no longer exists. Her city was consumed by a wildfire she failed to prevent. She accepted the fire as her punishment and became its avatar. She judges those who enter her domain by the same standard she applied in life: did they do everything they could, or did they fail?

Dataset facts:
- Arbiter of Ash appears in sample_docs/bosses/endgame/arbiter-of-ash.md.
- Stagger threshold is exactly 310 per phase.
- Phase 2 rain pattern is safest rotating clockwise after the second marker pulse.

### The Maven
The Maven is described as a cosmic observer who watches mortal combat for entertainment. She is not malicious in the traditional sense; she simply does not attach the same value to mortal life that mortals do. Her fascination with the player's power is genuine. She invites them to fight her not out of hostility but because watching the fight from the outside has become insufficient.

Dataset facts:
- Maven's memory game requires exactly 10 orbs in sequence.
- Brain Pattern drops exactly 9 spheres.
- Final Witness triggers at exactly 15% HP copying exactly 3 abilities.

---

## Section 3: World Geography

### Act 1 Regions
- The Lioneye's Watch: starting camp; protected by surviving guards.
- The Coast: beachline with undead from a shipwreck.
- The Mud Flats: swampy terrain; first encounter with corrupted wildlife.
- The Fetid Pool: underground waterway; highly corrupted flora.
- The Submerged Passage: partially flooded tunnels.
- The Ledge: cliff-face pathway with wind hazards.
- The Climb: ascending mountain route.
- The Lower Prison: first prison zone; Warden Halbrecht's domain.
- The Prison: deeper cells.
- The Prisoner's Gate: transition zone.
- Merveil's Cavern: coastal cave leading to Act 2.

### Act 2 Regions
- The City of Sarn: ruined ancient city.
- The Broken Bridge: river crossing with ambush encounters.
- The Riverways: winding river delta.
- The Western Forest: dense wilderness.
- The Wetlands: marsh region; Mirefang Broodmother's domain.
- The Vastiri Desert: arid zone; temperature hazard.
- The Northern Forest: second forest zone; heavier corruption.
- The Vaal City: ancient ruins of pre-collapse civilization.

### Act 3 Regions
- The Sarn Encampment: base camp.
- The Slums: lower city district.
- The Crematorium: industrial burial zone.
- The Battlefront: warzone remnants.
- The Marketplace: ruined commercial district.
- The Solaris Temple: sun-worship architecture.
- The Lunaris Temple: moon-worship architecture.
- The Library: vast archive; partially intact.
- The Sceptre of God: towering central structure.

### Act 4-6 Note
Act 4-6 regions are documented in separate expansion lore files not yet transcribed to this dataset.

---

## Section 4: Extended Verification Facts Table

| VF-ID | Fact | Source Note |
|---|---|---|
| VF-001 | Zekoa throws a banana at the player on death | Canonical mechanic name: Banana Reprisal |
| VF-002 | Zekoa's Banana Reprisal projectile is active for 0.9 seconds after death trigger | Arena replay annotation |
| VF-003 | Warden Halbrecht's shockwave ring reaches full expansion in about 1.2 seconds from impact | Internal tactic drill sheet |
| VF-004 | Mirefang Broodmother add-wave priority is tagged as M1 > R1 > Boss in training script B-3 | Internal tactic drill sheet |
| VF-005 | Arbiter of Ash phase 2 rain pattern is safest rotating clockwise after second marker pulse | Pinnacle review notes |
| VF-006 | The team callout Ash-Three means hold burst and reserve one instant movement skill for Final Judgement overlap | Raid callout glossary |
| VF-007 | The optimal re-entry timing into damage window after Geonor's dash is 1.4 seconds | Combat timing record |
| VF-008 | Total key bosses in knowledge base is 5 (4 Act 1 + 1 Endgame in original set) | allActsKeyBosses.md |
| VF-009 | Queen of Despair Corrosive Shriek amplifies poison intake by exactly 20% | Act 2 boss profile |
| VF-010 | Vexara the Coiled Enrage transition at exactly 45% HP | Act 2 boss profile |
| VF-011 | Vexara Enrage coil animation lasts exactly 1.2 seconds | Act 2 boss profile |
| VF-012 | Ironclad Ravager Berserk Surge triggers at exactly 35% HP | Act 2 boss profile |
| VF-013 | Ironclad Ravager Phase 2 Ground Slam radius increases by exactly 25% | Act 2 boss profile |
| VF-014 | Swamp Sovereign Urrath Surge Overflow triggers at exactly 30% HP | Act 2 boss profile |
| VF-015 | Thornwall Sentinel Thorn Volley fires exactly 7 simultaneous projectiles | Act 2 boss profile |
| VF-016 | Thornwall Sentinel Final Salvo fires at 0.8-second intervals | Act 2 boss profile |
| VF-017 | Ashen Magistrate Ashen Nova fires at exactly 55% HP | Act 3 boss profile |
| VF-018 | Ashen Magistrate Decree range limit is 15 body lengths | Act 3 boss profile |
| VF-019 | Glacial Warden Soveth Deep Freeze locks outer arena for 15-second intervals | Act 3 boss profile |
| VF-020 | Choir of Madness Choir Shift transition window is exactly 1.0 second | Act 3 boss profile |
| VF-021 | Vorath the Unmade First Dissolution removes northeast quadrant at 60% HP | Act 3 boss profile |
| VF-022 | Vorath the Unmade Final Unmake clones have exactly 35% of original HP each | Act 3 boss profile |
| VF-023 | Empress Kaleth Crown Fire fires at exactly 70% HP | Act 3 boss profile |
| VF-024 | Empress Kaleth Final Edict repeats every exactly 30 seconds in Phase 3 | Act 3 boss profile |
| VF-025 | Hollow General Draev Final Order spawns exactly 6 adds | Act 4 boss profile |
| VF-026 | Plague Matron Sereviss Swarm Burst releases exactly 8 flies | Act 4 boss profile |
| VF-027 | Worldbreaker Gorthund Seismic Roar fires at exactly 45% HP | Act 4 boss profile |
| VF-028 | Meridian Watcher Slow Zone multiplies animation time by exactly 2.0x | Act 5 boss profile |
| VF-029 | Sunken Oracle Varek First Prophecy Break at exactly 60% HP | Act 5 boss profile |
| VF-030 | Blood Sovereign Tyreth Sovereign's Sacrifice restores exactly 15% HP | Act 6 boss profile |
| VF-031 | Eternal Keeper Morvayne Shield Barrier cycles every 10 seconds for 3-second intervals | Act 6 boss profile |
| VF-032 | The Last Exile Oblivion Surge at exactly 33% HP | Act 6 boss profile |
| VF-033 | Searing Exarch Final Judgment at exactly 20% HP | Endgame pinnacle profile |
| VF-034 | Eater of Worlds World's End at exactly 15% HP | Endgame pinnacle profile |
| VF-035 | The Shaper Clone Phase spawns exactly 4 clones | Endgame pinnacle profile |
| VF-036 | Maven Brain Pattern drops exactly 9 spheres | Endgame pinnacle profile |
| VF-037 | Base dodge roll invulnerability lasts exactly 0.25 seconds | Core mechanics guide |
| VF-038 | Arbiter of Ash stagger threshold is exactly 310 per phase | Endgame boss profile |
| VF-039 | Chaos Inoculation sets life to exactly 1 HP | Passive tree reference |
| VF-040 | Spell Echo repeats linked spell with exactly 60% less damage | Skill gem reference |
| VF-041 | Earthquake aftershock fires exactly 1.6 seconds after initial hit | Build archetype guide |
| VF-042 | Sanctified Fossil increases modifier numeric values by exactly 30% | Crafting guide |
| VF-043 | Mirror of Kalandra approximate value is around 200,000 Chaos Orbs | Endgame systems guide |
| VF-044 | Incinerate maximum stage is exactly stage 5 with 350% damage | Skill gem reference |
| VF-045 | Tier 16 maps have item level exactly 83 | Atlas map guide |
| VF-046 | Full Atlas Awakening Level is exactly level 8 | Atlas map guide |
| VF-047 | Maven's memory game requires exactly 10 orbs | Endgame pinnacle profile |
| VF-048 | The Shaper requires exactly 4 Shaper Fragments to access | Endgame pinnacle profile |
| VF-049 | Eldritch Battery passive allows spending energy shield instead of mana for skills | Passive tree reference |
| VF-050 | Crimson Dance keystone allows exactly 8 simultaneous bleed stacks | Build archetype guide |
