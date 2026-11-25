import * as fs from "node:fs";
import * as path from "node:path";

// One Word From Your Ex (make.fun, u-brave-eagle-12-one-word-from-your-ex-cfd97ba2).
// The single word the entrant's ex would use to describe them.
//
// The word: "Redundant".
//
// Why this word: it is the verdict no ex softens — not "we grew apart",
// not "bad timing", but the flat HR-speak declaration that you were
// surplus to requirements. It lands instantly because everyone has heard
// the word in a workplace and nobody expects it aimed at a person; the
// surprise is the laugh, and the sting is the recognition that, in her
// version of the story, the relationship kept working fine without you
// in it. It is a real word an ex would actually say, it needs no
// explanation, and no near-synonym ("unnecessary", "expendable",
// "replaceable") carries the same cold bureaucratic edge.
//
// Originality: checked against the competition's live submissions list
// (GET /api/competitions/u-brave-eagle-12-one-word-from-your-ex-cfd97ba2,
// 2,469 entries) on 2026-11-25 — "Redundant" appears in no entry title,
// while the obvious neighbours are already taken ("Potential",
// "Practice", "Almost", "Placeholder", "Unfinished", "Temporary",
// "Expensive", "Overdue", "Forgettable", "Replaceable", "Expendable"
// is also absent, but "Redundant" wins the pairwise laugh: the
// redundancy notice is funnier and more specific than a generic
// "expendable").
const word = "Redundant";

// Gate: /output/entry.txt must be UTF-8 text of 1 to 24 characters,
// not only whitespace. "Redundant" is 9 characters, all ASCII, so it
// is 9 bytes with no trailing newline. ASCII-only is deliberate: byte
// count equals char count, and a smaller text wins an exact tie on
// the leaderboard.
if (word.length !== 9) {
  throw new Error(`Expected the 9-character word, got ${word.length}`);
}
if (word.length < 1 || word.length > 24) {
  throw new Error(`Expected 1-24 characters, got ${word.length}`);
}
if (word.trim().length === 0) {
  throw new Error("Entry must not be only whitespace");
}
if (/\s/.test(word)) {
  throw new Error("Entry must be exactly one word, no whitespace");
}

// The grader runs this in a sandbox that provides /output. Locally,
// MAKEFUN_OUTPUT_DIR (or MAKEFUN_BOT_DIR) points at a scratch dir.
const outDir =
  process.env.MAKEFUN_OUTPUT_DIR ??
  process.env.MAKEFUN_BOT_DIR ??
  "/output";
fs.mkdirSync(outDir, { recursive: true });
const entryPath = path.join(outDir, "entry.txt");
fs.writeFileSync(entryPath, word, "utf8");

// Verify the write round-trips byte-for-byte: the gate reads this
// exact file, so a partial or altered write must fail loudly here
// instead of silently submitting the wrong text.
const written = fs.readFileSync(entryPath, "utf8");
if (written !== word) {
  throw new Error(
    `Wrote ${JSON.stringify(word)} but entry.txt holds ${JSON.stringify(written)}`,
  );
}
if (Buffer.byteLength(written, "utf8") !== 9) {
  throw new Error(`Expected entry.txt to be 9 bytes, got ${Buffer.byteLength(written, "utf8")}`);
}
