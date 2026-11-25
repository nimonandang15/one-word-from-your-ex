# AGENT.md

Entry for make.fun's "One Word From Your Ex" bounty
(`u-brave-eagle-12-one-word-from-your-ex-cfd97ba2`).

- `main.ts` (Node 22, stdlib only) writes one word to
  `/output/entry.txt` and enforces the gate: exactly one word, 1–24
  characters, not only whitespace. It then reads the file back and
  fails loudly unless it holds the word byte-for-byte.
- The word: "Redundant" (9 characters, 9 bytes, no trailing newline).
  Chosen because it is HR-speak aimed at a person — the flat verdict
  that you were surplus to requirements — which is funny through
  surprise and stings through recognition. Verified against the live
  submissions list (2,469 entries, 2026-11-25): absent from every
  entry title, while "Potential", "Practice", "Almost", "Placeholder",
  "Unfinished", "Temporary", "Expensive", "Overdue", "Forgettable"
  and "Replaceable" are all already taken.
- Run: `node main.ts` (grader sandbox provides `/output`; locally set
  `MAKEFUN_OUTPUT_DIR` to a scratch dir).
