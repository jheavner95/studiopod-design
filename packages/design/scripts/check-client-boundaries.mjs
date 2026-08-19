#!/usr/bin/env node
/**
 * Client/server boundary check for @jheavner95/design (DH-3).
 *
 * Replaces check-use-client.mjs, which asserted the opposite of what is now
 * true. That check required every code entry point to BEGIN with
 * `"use client"`, because the bundled build stripped per-module directives and
 * re-injected one per entry. That is precisely defect N1: a directive on
 * index.js makes every export in the package a client reference — `cn`, the
 * token constants, and the ~73% of components that are pure presentation
 * included — so any consumer with a Server Component paid for interactivity it
 * never asked for.
 *
 * The package now emits one module per source file and each carries its own
 * directive, so the boundary can be checked where it actually lives.
 *
 * Four assertions:
 *
 *   1. No public entry point carries a directive. An entry is a re-export
 *      graph; marking one client re-creates N1 wholesale.
 *   2. Every module that needs a directive has one. "Needs" is decided by the
 *      rules below, not by opinion.
 *   3. No module carries a directive it does not need. Over-marking is not
 *      harmless: it is how N1 spread in the first place.
 *   4. Source and emitted output agree. A directive that survives the build
 *      for one module and not another is a build regression.
 *
 * A module needs `"use client"` when IT ITSELF does something only a client
 * can do: calls a React hook or any `useX` hook, creates context, imports
 * framer-motion for a value, touches a browser global, or attaches an inline
 * function to a JSX event prop.
 *
 * It does NOT need one merely because it renders or re-exports a client
 * component — server-renders-client is the normal direction, and the boundary
 * belongs at the client module. Nor because it passes a handler THROUGH from
 * its own props: the parent owns that function, and the parent is where the
 * boundary belongs.
 *
 * Exit codes: 0 = all four hold. 1 = at least one violation.
 *
 * Usage: node scripts/check-client-boundaries.mjs
 */
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, relative } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const pkgRoot = join(here, "..");
const SRC = join(pkgRoot, "src");
const DIST = join(pkgRoot, "dist");

/** Entry points that must stay server-safe. `tokens` is pure data; the rest are re-export graphs. */
const ENTRY_MODULES = ["index", "tokens", "marketing", "illustrations", "internal"];

const REACT_HOOKS = [
  "useState", "useEffect", "useLayoutEffect", "useRef", "useContext", "useReducer",
  "useMemo", "useCallback", "useId", "useTransition", "useDeferredValue",
  "useSyncExternalStore", "useImperativeHandle", "useOptimistic", "useActionState",
  "useInsertionEffect", "useDebugValue",
];
const BROWSER_GLOBALS = [
  "window.", "document.", "navigator.", "localStorage", "sessionStorage", "matchMedia",
  "requestAnimationFrame", "IntersectionObserver", "ResizeObserver", "MutationObserver",
];

const hasDirective = (text) => /^\s*["']use client["']/.test(text);
const stripComments = (t) => t.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/^\s*\/\/.*$/gm, " ");

/** Why this module needs to run on the client, or [] if it does not. */
function clientReasons(raw) {
  const src = stripComments(raw);
  const reasons = [];

  const react = REACT_HOOKS.filter((h) => new RegExp(`\\b${h}\\s*[(<]`).test(src));
  if (react.length) reasons.push(`React hooks (${react.join(", ")})`);

  const custom = [...new Set([...src.matchAll(/\b(use[A-Z]\w*)\s*\(/g)].map((m) => m[1]))].filter(
    (h) => !REACT_HOOKS.includes(h)
  );
  if (custom.length) reasons.push(`hook calls (${custom.join(", ")})`);

  if (/\bcreateContext\s*[(<]/.test(src)) reasons.push("createContext");

  // A type-only framer-motion import compiles away and does not make a module
  // client — motion/tokens.ts and motion/utils.ts are pure helpers.
  const fmValue = [...src.matchAll(/^import\s+([^;]*?)\s*from\s*["']framer-motion["']/gm)].some((m) => {
    const clause = m[1].trim();
    if (clause.startsWith("type ")) return false;
    const braces = clause.match(/\{([^}]*)\}/);
    if (braces && !clause.replace(/\{[^}]*\}/, "").replace(/,/g, "").trim()) {
      return braces[1].split(",").some((x) => x.trim() && !x.trim().startsWith("type "));
    }
    return true;
  });
  if (fmValue) reasons.push("framer-motion");

  const browser = BROWSER_GLOBALS.filter((b) => src.includes(b));
  if (browser.length) reasons.push(`browser globals (${browser.join(", ")})`);

  // An inline function attached to a JSX event prop is created during render,
  // which a Server Component cannot do. A handler passed through from props
  // (onClick={onSelect}) is the parent's, and is fine here.
  if (/\bon[A-Z][a-zA-Z]*=\{\s*(?:\(|function\b|async\b)/.test(src)) reasons.push("inline event handler");

  return reasons;
}

function sourceModules() {
  const out = [];
  (function walk(dir) {
    for (const entry of readdirSync(dir)) {
      const p = join(dir, entry);
      if (statSync(p).isDirectory()) walk(p);
      else if (/\.(ts|tsx)$/.test(entry) && !/\.test\.tsx?$/.test(entry)) out.push(p);
    }
  })(SRC);
  return out;
}

const failures = { entries: [], missing: [], extra: [], drift: [] };

// ── 1 & 2 & 3: source directives match the rules ──────────────────────────
const expectedClient = new Set();
for (const file of sourceModules()) {
  const rel = relative(SRC, file).replace(/\.tsx?$/, "");
  const raw = readFileSync(file, "utf8");
  const reasons = clientReasons(raw);
  const marked = hasDirective(raw);

  if (reasons.length) expectedClient.add(rel);

  if (ENTRY_MODULES.includes(rel) && marked) {
    failures.entries.push(`src/${rel} — an entry point must never carry the directive (this is N1)`);
  }
  if (reasons.length && !marked) failures.missing.push(`src/${rel} — needs it: ${reasons.join("; ")}`);
  if (!reasons.length && marked) failures.extra.push(`src/${rel} — carries it but does nothing client-only`);
}

// ── 4: emitted output agrees with source ──────────────────────────────────
if (!existsSync(DIST)) {
  console.log("ℹ dist/ not built — skipping emitted-output assertions");
} else {
  const emitted = [];
  (function walk(dir) {
    for (const entry of readdirSync(dir)) {
      const p = join(dir, entry);
      if (statSync(p).isDirectory()) walk(p);
      else if (entry.endsWith(".js")) emitted.push(p);
    }
  })(DIST);

  for (const file of emitted) {
    const rel = relative(DIST, file).replace(/\.js$/, "");
    const marked = hasDirective(readFileSync(file, "utf8"));
    const shouldBe = expectedClient.has(rel);
    if (marked !== shouldBe) {
      failures.drift.push(
        `dist/${rel}.js ${marked ? "has" : "is missing"} the directive; source says it should ${shouldBe ? "have" : "not have"} one`
      );
    }
  }
}

// ── Report ────────────────────────────────────────────────────────────────
const total = Object.values(failures).reduce((n, list) => n + list.length, 0);
if (total === 0) {
  const clientCount = expectedClient.size;
  const all = sourceModules().length;
  console.log("✓ client/server boundaries are correct");
  console.log(`  · ${all - clientCount} of ${all} modules are server-safe (${Math.round(((all - clientCount) / all) * 100)}%)`);
  console.log(`  · ${clientCount} modules genuinely require the client`);
  console.log(`  · no entry point carries a directive`);
  process.exit(0);
}

console.error(`✖ client/server boundary check — ${total} violation(s)\n`);
const label = {
  entries: "entry point carries a client directive (this is N1)",
  missing: "needs a client directive and lacks one",
  extra: "carries a client directive it does not need",
  drift: "emitted output disagrees with source",
};
for (const [key, list] of Object.entries(failures)) {
  if (!list.length) continue;
  console.error(`  ${label[key]}:`);
  for (const item of list.slice(0, 25)) console.error(`    - ${item}`);
  if (list.length > 25) console.error(`    … and ${list.length - 25} more`);
  console.error("");
}
process.exit(1);
