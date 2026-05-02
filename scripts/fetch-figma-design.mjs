/**
 * Export Figma file JSON for local design sync (run on your machine only).
 *
 * 1. Create a Personal Access Token: Figma → Settings → Security → Personal access tokens
 * 2. Add to `.env.local`:
 *      FIGMA_ACCESS_TOKEN=figd_...
 *      FIGMA_FILE_KEY=EwyQy2kMIy0NFUjdzYHklD
 * 3. Run: npm run figma:export
 *
 * Output: `figma-export.json` (gitignored). Share relevant frames or re-run after design updates.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

function loadEnvFile(relPath, { override = false } = {}) {
  const full = path.join(ROOT, relPath);
  if (!fs.existsSync(full)) return;
  const content = fs.readFileSync(full, "utf8");
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let val = trimmed.slice(eq + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    if (override || process.env[key] === undefined) {
      process.env[key] = val;
    }
  }
}

/* `.env.local` wins over any pre-set env vars (empty TOKEN in shell used to block loading). */
loadEnvFile(".env.local", { override: true });
loadEnvFile(".env");

const TOKEN = process.env.FIGMA_ACCESS_TOKEN;
const FILE_KEY =
  process.env.FIGMA_FILE_KEY || "EwyQy2kMIy0NFUjdzYHklD";
const OUT = path.join(ROOT, "figma-export.json");

if (!TOKEN) {
  console.error(
    "Missing FIGMA_ACCESS_TOKEN. Add it to .env.local (see .env.example), then run again."
  );
  process.exit(1);
}

const url = `https://api.figma.com/v1/files/${FILE_KEY}`;

const res = await fetch(url, {
  headers: { "X-Figma-Token": TOKEN },
});

if (!res.ok) {
  const text = await res.text();
  console.error(`Figma API ${res.status}: ${text}`);
  process.exit(1);
}

const data = await res.json();
fs.writeFileSync(OUT, JSON.stringify(data, null, 2), "utf8");
console.log(`Wrote ${OUT} (${(fs.statSync(OUT).size / 1024).toFixed(1)} KB)`);
