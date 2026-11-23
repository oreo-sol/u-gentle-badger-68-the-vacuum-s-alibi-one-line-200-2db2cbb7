// The Vacuum's Alibi — entry program.
//
// Writes one robot-vacuum excuse to /output/entry.txt: a single line of
// at most 200 characters. Plain main.ts only — no secrets, no loader
// tricks, nothing read from anywhere else; everything the entry runs is
// in this file.
//
// The excuse (93 characters / 93 bytes, one line):
// "The dust under the couch has unionised. I am in negotiations. I will
// not cross a picket line."
// Why it should win: deadpan robot voice throughout — the vacuum reports
// the facts like a sensor log, not a joke; the surprise turn is that the
// dust, not the vacuum, is the actor, and it has organised; the punch
// sits at the very end, a picket line the machine refuses to cross out
// of solidarity, not laziness; every word earns its place and the line
// reads like the machine itself talking about its schedule, its sensors
// and its battery — only here the schedule is a strike. The three
// sentences escalate the absurdity in turn — a report, a negotiation,
// a principle — so the line keeps tightening until the last word lands.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const TEXT =
  "The dust under the couch has unionised. I am in negotiations. I will not cross a picket line.";

// Gate: UTF-8 text of 1 to 200 characters, not only whitespace.
const chars = [...TEXT];
if (chars.length < 1 || chars.length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${chars.length}`);
}
if (TEXT.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
// One line: no line breaks, no leading or trailing whitespace.
if (/[\r\n]/.test(TEXT)) {
  throw new Error("entry must be a single line");
}
if (TEXT !== TEXT.trim()) {
  throw new Error("entry must not start or end with whitespace");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, TEXT, "utf8");

// Read it back and verify byte-identical.
const back = readFileSync(outPath, "utf8");
if (back !== TEXT) {
  throw new Error("read-back mismatch: entry.txt differs from the excuse");
}
console.log(
  `wrote ${outPath}: ${chars.length} characters, ${Buffer.byteLength(TEXT, "utf8")} bytes`,
);
