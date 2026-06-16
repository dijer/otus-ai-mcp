# Verification Facts Registry Template

## Usage Rules
- Keep each fact atomic: one statement = one fact.
- Use exact numbers where possible.
- Avoid generic public trivia.
- Add source note for every fact.
- Prefer facts that appear in your dataset files.

## Fact Schema
- id: <VF-###>
- domain: <boss/build/mechanic/item/atlas/lore>
- fact: <single precise statement>
- value_type: <number/text/date/boolean>
- source_file: <relative path>
- source_anchor: <heading or chunk note>
- uniqueness_note: <why this is uncommon>
- updated_at: <YYYY-MM-DD>

## Example Entries
- id: VF-101
  domain: boss
  fact: "<Boss Name> phase transition starts at exactly 47% HP."
  value_type: number
  source_file: sample_docs/bosses/actX/<boss>.md
  source_anchor: "Phase Flow"
  uniqueness_note: "Specific threshold exists only in this project dataset"
  updated_at: 2026-06-16

- id: VF-102
  domain: mechanic
  fact: "<Mechanic Name> recovery window is exactly 1.3 seconds after animation end."
  value_type: number
  source_file: sample_docs/mechanics/<file>.md
  source_anchor: "Punish Windows"
  uniqueness_note: "Custom timing from internal notes"
  updated_at: 2026-06-16

- id: VF-103
  domain: lore
  fact: "Internal callout '<Callout Name>' means '<exact action>'."
  value_type: text
  source_file: sample_docs/lore_facts/<file>.md
  source_anchor: "Verification Facts"
  uniqueness_note: "Team-specific glossary term"
  updated_at: 2026-06-16

## Copy-Paste Block
- id: VF-___
  domain: ___
  fact: "___"
  value_type: ___
  source_file: ___
  source_anchor: ___
  uniqueness_note: "___"
  updated_at: 2026-06-16

- id: VF-___
  domain: ___
  fact: "___"
  value_type: ___
  source_file: ___
  source_anchor: ___
  uniqueness_note: "___"
  updated_at: 2026-06-16

- id: VF-___
  domain: ___
  fact: "___"
  value_type: ___
  source_file: ___
  source_anchor: ___
  uniqueness_note: "___"
  updated_at: 2026-06-16
