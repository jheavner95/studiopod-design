/**
 * DS-4 — real, running checks over the token system itself, the same shape
 * as certification-checks.ts (plain functions over the filesystem, no new
 * CLI tooling, exercised by a normal co-located Vitest file). Two distinct
 * jobs, deliberately kept separate:
 *
 *  - `findInvalidTokenReferences()` is a deterministic correctness check —
 *    a `var(--typo-ed-token)` reference to a custom property that was never
 *    declared anywhere is a real bug (the browser silently falls back to
 *    `initial`/inherited, with no error), not a judgment call. This is the
 *    one token-verification result wired into `verify:fast` as a real gate
 *    — see token-verification.test.ts.
 *  - `findLikelyUnusedTokens()` is advisory, best-effort, and never gates
 *    anything — see scripts/token-report.mjs. "No reference found" is a
 *    signal worth a human look, not proof a token is safe to delete (see
 *    docs/engineering-notes/13-token-consolidation.md's reasoning on the
 *    still-public `zIndex` export for exactly why).
 */
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, extname } from "node:path";

const REPO_ROOT = process.cwd();

const TOKEN_SOURCE_FILES = ["src/styles/palette.css", "src/styles/theme.css", "src/styles/tokens.css", "src/app/globals.css"];

const SCAN_DIRS = ["src", "packages/design-system/src", "e2e"];
const SCAN_EXTENSIONS = new Set([".css", ".ts", ".tsx"]);
const EXCLUDED_DIR_NAMES = new Set(["node_modules", "dist", ".next", "coverage", "test-results", "playwright-report"]);

const CUSTOM_PROPERTY_DECLARATION_RE = /(--[a-zA-Z0-9-]+)\s*:/g;
const VAR_REFERENCE_RE = /var\(\s*(--[a-zA-Z0-9-]+)/g;
const BLOCK_COMMENT_RE = /\/\*[\s\S]*?\*\//g;
const LINE_COMMENT_RE = /\/\/.*$/gm;

/**
 * Not declared in any of the canonical CSS token files because they're
 * injected at runtime by next/font (src/app/layout.tsx's `variable:
 * "--font-geist-{sans,mono}"` options) — theme.css's `--font-sans`/
 * `--font-mono` legitimately reference them via var(), but there's no
 * static CSS declaration to find.
 */
const EXTERNALLY_PROVIDED_TOKENS = new Set(["--font-geist-sans", "--font-geist-mono"]);

/**
 * `--color-background`/`--color-foreground` (globals.css's `@theme inline`
 * block) exist purely to satisfy Next.js's own generated-project convention
 * — no component in this codebase is meant to reference them directly
 * (everything reaches for `--color-canvas`/`--color-ink-primary`, the real
 * semantic tokens they alias). Excluded from the unused-token scan for the
 * same reason as the font variables above: legitimately zero in-repo
 * reference is expected and correct, not a finding.
 */
const FRAMEWORK_CONVENTION_TOKENS = new Set(["--color-background", "--color-foreground"]);

/**
 * Tailwind v4 doesn't always generate a utility whose name is the token's
 * own `--category-` prefix verbatim — `--radius-*` generates `rounded-*`,
 * not `radius-*`. This is the one correction found to matter in practice;
 * other categories (`--color-*` -> `bg-/text-/border-*`, `--shadow-*` ->
 * `shadow-*`, `--ease-*` -> `ease-*`) already match after the generic
 * `--color-`/`--` stripping below, so they don't need an entry here. Not
 * an exhaustive Tailwind-naming mapper — this stays best-effort by design.
 */
const UTILITY_PREFIX_OVERRIDES: Record<string, string> = { "--radius-": "rounded-" };

/**
 * Strips both comment forms before scanning — a `var(--x)` mentioned in
 * prose (a JSDoc example, an inline explanation) is not a real reference,
 * and without this every doc comment describing the var() syntax itself
 * would register as a false "invalid reference." Preserves line numbers
 * (block comments are replaced with an equal count of newlines, not
 * deleted outright) so reported line numbers still point at the real line.
 */
function stripComments(source: string): string {
  const noBlockComments = source.replace(BLOCK_COMMENT_RE, (match) => "\n".repeat((match.match(/\n/g) ?? []).length));
  return noBlockComments.replace(LINE_COMMENT_RE, "");
}

/** Every `--custom-property` declared anywhere in the canonical token source files. */
export function getDeclaredTokens(): Set<string> {
  const declared = new Set<string>(EXTERNALLY_PROVIDED_TOKENS);
  for (const relPath of TOKEN_SOURCE_FILES) {
    const fullPath = join(REPO_ROOT, relPath);
    if (!existsSync(fullPath)) continue;
    const source = stripComments(readFileSync(fullPath, "utf8"));
    for (const match of source.matchAll(CUSTOM_PROPERTY_DECLARATION_RE)) {
      declared.add(match[1]);
    }
  }
  return declared;
}

function walkFiles(dir: string, out: string[]): void {
  if (!existsSync(dir)) return;
  for (const entry of readdirSync(dir)) {
    if (EXCLUDED_DIR_NAMES.has(entry)) continue;
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      walkFiles(fullPath, out);
    } else if (SCAN_EXTENSIONS.has(extname(entry))) {
      out.push(fullPath);
    }
  }
}

export interface InvalidTokenReference {
  file: string;
  line: number;
  token: string;
}

/**
 * Scans every .css/.ts/.tsx file under src/, packages/design-system/src/,
 * and e2e/ for `var(--token)` references and flags any that don't resolve
 * to a token declared in the canonical source files. Correctly ignores a
 * `var()` fallback's own content (`var(--x, var(--y))` only checks `--x`
 * and `--y` as reference names, never text inside the fallback that isn't
 * itself a `var(...)` call).
 */
export function findInvalidTokenReferences(): InvalidTokenReference[] {
  const declared = getDeclaredTokens();
  const files: string[] = [];
  for (const dir of SCAN_DIRS) walkFiles(join(REPO_ROOT, dir), files);

  const findings: InvalidTokenReference[] = [];
  for (const file of files) {
    const source = stripComments(readFileSync(file, "utf8"));
    const lines = source.split("\n");
    lines.forEach((lineText, idx) => {
      for (const match of lineText.matchAll(VAR_REFERENCE_RE)) {
        const token = match[1];
        if (!declared.has(token)) {
          findings.push({ file: file.replace(`${REPO_ROOT}/`, ""), line: idx + 1, token });
        }
      }
    });
  }
  return findings;
}

export interface UnusedTokenCandidate {
  token: string;
  sourceFile: string;
}

/**
 * palette.css's raw ramps are deliberately excluded from this scan — its
 * own file header already documents that they're "read via inline style
 * in the Foundation Palette showcase only," via a data-driven `cssVar`
 * string built into a `var(${cssVar})` template at render time. A static
 * scan can't see through that indirection, so every one of the ~40 palette
 * tokens would otherwise report as a false "unused" — noise that would
 * bury the report's real signal. This is a known, already-reviewed usage
 * pattern, not a gap in the scanner worth chasing further.
 */
const UNUSED_SCAN_SOURCE_FILES = TOKEN_SOURCE_FILES.filter((f) => f !== "src/styles/palette.css");

/**
 * Best-effort: a declared token with zero `var(--token)` references, zero
 * quoted-string references (catches the data-driven `cssVar: "--token"`
 * pattern used elsewhere on the tokens showcase pages, where the `var()`
 * wrapper is built at render time, not present as static source text), and
 * zero uses of its Tailwind-generated utility-class form (best-effort name
 * derivation — `--color-accent-500` -> `accent-500` as a class-name
 * fragment) anywhere in the scanned tree. Advisory only — see the file
 * doc comment for why this never gates anything.
 */
export function findLikelyUnusedTokens(): UnusedTokenCandidate[] {
  const files: string[] = [];
  for (const dir of SCAN_DIRS) walkFiles(join(REPO_ROOT, dir), files);
  const allSource = files.map((f) => readFileSync(f, "utf8")).join("\n");

  const candidates: UnusedTokenCandidate[] = [];
  for (const relPath of UNUSED_SCAN_SOURCE_FILES) {
    const fullPath = join(REPO_ROOT, relPath);
    if (!existsSync(fullPath)) continue;
    const source = readFileSync(fullPath, "utf8");
    for (const match of source.matchAll(CUSTOM_PROPERTY_DECLARATION_RE)) {
      const token = match[1];
      if (FRAMEWORK_CONVENTION_TOKENS.has(token) || EXTERNALLY_PROVIDED_TOKENS.has(token)) continue;

      const varUsageCount = (allSource.match(new RegExp(`var\\(\\s*${token}\\b`, "g")) ?? []).length;
      // Quoted-string form (`"--token"` / `'--token'`) — CSS declarations
      // themselves are never quoted, so no adjustment is needed for the
      // token's own declaration line the way the var()-form check doesn't
      // need one either.
      const quotedStringUsageCount = (allSource.match(new RegExp(`["'\`]${token}\\b`, "g")) ?? []).length;

      const overridePrefix = Object.keys(UTILITY_PREFIX_OVERRIDES).find((prefix) => token.startsWith(prefix));
      const utilityFragment = overridePrefix
        ? token.replace(overridePrefix, UTILITY_PREFIX_OVERRIDES[overridePrefix])
        : token.replace(/^--color-/, "").replace(/^--/, "");
      const utilityUsageCount = (allSource.match(new RegExp(`[-"'\`:\\s]${utilityFragment}(?=[\\s"'\`;)]|$)`, "g")) ?? []).length;

      if (varUsageCount === 0 && quotedStringUsageCount === 0 && utilityUsageCount === 0) {
        candidates.push({ token, sourceFile: relPath });
      }
    }
  }
  return candidates;
}
