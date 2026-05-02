/**
 * One-off diagnostic: prints whether FIGMA_ACCESS_TOKEN has a value (not the value).
 * Run: node scripts/check-figma-env.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const p = path.join(__dirname, "..", ".env.local");
if (!fs.existsSync(p)) {
  console.log("NO_FILE");
  process.exit(1);
}
const t = fs.readFileSync(p, "utf8");
let len = 0;
for (const line of t.split(/\r?\n/)) {
  const s = line.trim();
  if (!s.startsWith("FIGMA_ACCESS_TOKEN=")) continue;
  const v = s
    .slice("FIGMA_ACCESS_TOKEN=".length)
    .trim()
    .replace(/^["']|["']$/g, "");
  len = v.length;
  break;
}
console.log(len > 0 ? `TOKEN_SET chars=${len}` : "TOKEN_EMPTY");
process.exit(len > 0 ? 0 : 1);
