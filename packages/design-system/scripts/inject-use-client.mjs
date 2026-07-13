#!/usr/bin/env node
/**
 * Prepends a "use client" directive to the built entry files that need one.
 *
 * tsup's `treeshake: true` (see tsup.config.ts) makes esbuild actively drop
 * any module-level directive prologue during bundling — esbuild considers a
 * bundled module-level directive unsafe once tree-shaking can reorder/merge
 * code, and emits "Module level directives cause errors when bundled" and
 * removes it, even when the directive is the literal first line of the
 * entry source file. Since none of these entries have any code of their own
 * (each is a pure `export * from "..."` barrel), there's no way to make
 * esbuild keep the directive as part of its own transform — this runs after
 * tsup finishes and prepends the directive as plain text instead.
 *
 * Only the entries that actually export client components need this:
 * index (ui/layout/form/feedback/navigation/overlay/table/metadata/motion/
 * hooks/providers), marketing (compositions), and illustrations (the
 * illustration engine + workflow/platform/production/capability diagrams).
 * tokens.ts is pure constants with no React import and must NOT get one —
 * a superfluous "use client" would force it into the client bundle graph
 * for every consumer that only wants plain numeric/string values.
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const distDir = join(here, "..", "dist");

const CLIENT_ENTRIES = ["index.js", "marketing.js", "illustrations.js"];
const DIRECTIVE = '"use client";\n\n';

let failed = false;

for (const file of CLIENT_ENTRIES) {
  const path = join(distDir, file);
  if (!existsSync(path)) {
    console.error(`✗ ${file} not found in dist/ — run "tsup" first.`);
    failed = true;
    continue;
  }
  const content = readFileSync(path, "utf8");
  if (content.startsWith(DIRECTIVE)) {
    console.log(`✓ ${file} already begins with "use client" — skipping`);
    continue;
  }
  writeFileSync(path, DIRECTIVE + content, "utf8");
  console.log(`✓ injected "use client" into ${file}`);
}

if (failed) {
  console.error("\nuse-client injection FAILED.");
  process.exit(1);
}
