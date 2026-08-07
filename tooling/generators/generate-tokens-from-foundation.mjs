#!/usr/bin/env node
/**
 * The Tailwind bridge (DS-7.5D).
 *
 * Generates this repository's four token stylesheets from `@studiopod/foundation`,
 * which is now the canonical owner of every token VALUE. This repository remains
 * the canonical owner of its own Tailwind-shaped NAMES and ordering.
 *
 * WHY A GENERATOR AND NOT A PLAIN IMPORT
 *
 * Tailwind v4 derives utility class names from the custom-property name inside
 * `@theme`. `--color-canvas` produces `bg-canvas` / `text-canvas` / `border-canvas`.
 * Foundation publishes the same values under its own namespace —
 * `--sp-color-semantic-canvas` — which would produce `bg-sp-color-semantic-canvas`
 * instead, breaking every component in this package.
 *
 * The alternative bridge, `@theme { --color-canvas: var(--sp-color-semantic-canvas) }`,
 * was rejected: it emits `var()` indirection instead of literal values, so the
 * shipped `styles.css` would no longer be byte-identical, and it doubles the
 * number of custom properties a consumer downloads.
 *
 * So the bridge translates: Foundation's values, this package's names, emitted
 * in this package's existing order. The output is byte-identical to the
 * hand-authored files it replaces — verified by `npm run token:bridge-check`.
 *
 * WHY THE COMMENTS BELOW DO NOT AFFECT THE SHIPPED ARTIFACT
 *
 * esbuild strips CSS comments when it bundles `src/styles.css` into
 * `dist/styles.css` (confirmed: no prose comment from any source stylesheet
 * survives into the shipped file — only esbuild's own file-path markers). Only
 * declarations and their order reach consumers, which is what makes a generated
 * file safe here.
 *
 * Usage:
 *   node tooling/generators/generate-tokens-from-foundation.mjs           # write
 *   node tooling/generators/generate-tokens-from-foundation.mjs --check   # verify, exit 1 on drift
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const repoRoot = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const pkgRoot = join(repoRoot, "packages/design");

/** Foundation's machine-readable token data — the canonical source of values. */
const foundationPath = require.resolve("@studiopod/foundation/tokens.json");
const foundation = JSON.parse(readFileSync(foundationPath, "utf8"));
const flat = foundation.flat;
const scale = foundation.tokens.typography.scale;

/** Read a Foundation value by its `--sp-*` name, failing loudly if absent. */
function v(spName) {
  if (!(spName in flat)) {
    throw new Error(
      `Foundation has no token "${spName}". The bridge cannot invent a value — ` +
        `either the mapping below is wrong or @studiopod/foundation needs the token.`,
    );
  }
  return flat[spName];
}

const banner = (file) =>
  `/**\n * GENERATED FROM @studiopod/foundation — DO NOT EDIT.\n *\n` +
  ` * Source of values : @studiopod/foundation@${require("@studiopod/foundation/package.json").version} (tokens.json)\n` +
  ` * Source of names  : this file's generator, tooling/generators/generate-tokens-from-foundation.mjs\n` +
  ` * Regenerate       : npm run token:bridge\n` +
  ` * Verified in CI by: npm run token:bridge-check\n *\n` +
  ` * Comments here never reach consumers — esbuild strips them when bundling\n` +
  ` * src/styles.css into dist/styles.css. Only declarations and order ship.\n */\n`;

// ── palette.css ─────────────────────────────────────────────────────────────
const RAMPS = ["slate", "blue", "green", "amber", "red"];
const STEPS = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950"];

function paletteCss() {
  const lines = [banner("palette.css"), "", ":root {"];
  for (const ramp of RAMPS) {
    for (const step of STEPS) lines.push(`  --palette-${ramp}-${step}: ${v(`--sp-color-${ramp}-${step}`)};`);
    lines.push("");
  }
  for (const single of ["neutral", "white", "black"]) {
    lines.push(`  --palette-${single}: ${v(`--sp-color-${single}`)};`);
  }
  lines.push("}", "");
  return lines.join("\n");
}

// ── theme.css — the Tailwind @theme block ───────────────────────────────────
/** Design name -> Foundation name, in the exact order the @theme block emits. */
const THEME = [
  ["--font-sans", "--sp-typography-family-sans"],
  ["--font-mono", "--sp-typography-family-mono"],
  ...[
    "canvas", "canvas-raised", "surface", "surface-hover", "surface-active", "panel",
    "border-subtle", "border", "border-strong", "border-accent",
    "ink-primary", "ink-secondary", "ink-tertiary", "ink-disabled",
    "accent-300", "accent-400", "accent-500", "accent-600", "accent-700", "accent-soft",
    "success", "success-soft", "warning", "warning-soft", "error", "error-soft",
    "neutral", "neutral-soft",
  ].map((r) => [`--color-${r}`, `--sp-color-semantic-${r}`]),
  ...["xs", "sm", "md", "lg", "xl", "2xl", "full"].map((r) => [`--radius-${r}`, `--sp-radius-${r}`]),
  ...["xs", "sm", "md", "lg", "glow", "glass", "glass-glow"].map((s) => [`--shadow-${s}`, `--sp-elevation-${s}`]),
  ...["subtle", "card", "panel", "floating", "modal"].map((s) => [`--shadow-${s}`, `--sp-elevation-semantic-${s}`]),
  ["--spacing-gutter", "--sp-spacing-gutter"],
  ...["xs", "sm", "md", "lg", "xl"].map((s) => [`--spacing-section-${s}`, `--sp-spacing-section-${s}`]),
  ...["narrow", "content", "wide", "shell"].map((c) => [`--container-${c}`, `--sp-sizing-container-${c}`]),
  ["--ease-standard", "--sp-motion-ui-easing-standard"],
  ["--ease-in-out-soft", "--sp-motion-ui-easing-in-out-soft"],
  ["--ease-linear", "--sp-motion-ui-easing-linear"],
];

/**
 * `--shadow-subtle`..`--shadow-modal` are aliases in the hand-authored source
 * (`var(--shadow-xs)` etc.). Foundation resolves them to literals. Emitting the
 * alias preserves the shipped bytes exactly.
 */
const SHADOW_ALIAS = { subtle: "xs", card: "sm", panel: "md", floating: "lg" };

function themeCss() {
  const decls = THEME.map(([name, sp]) => {
    const alias = /^--shadow-(subtle|card|panel|floating)$/.exec(name);
    const value = alias ? `var(--shadow-${SHADOW_ALIAS[alias[1]]})` : v(sp);
    return `  ${name}: ${value};`;
  });
  return `${banner("theme.css")}\n@theme {\n${decls.join("\n")}\n}\n`;
}

// ── tokens.css — z-index, both motion systems, reduced-motion reset ─────────
const RAW = [
  ...["base", "raised", "sticky", "dropdown", "overlay", "modal", "toast", "tooltip"].map((z) => [`--z-${z}`, `--sp-z-index-${z}`]),
  null,
  ...["instant", "fast", "base", "slow", "slower"].map((d) => [`--duration-${d}`, `--sp-motion-ui-duration-${d}`]),
  null,
  ...["instant", "fast", "normal", "slow", "hero"].map((d) => [`--motion-duration-${d}`, `--sp-motion-engine-duration-${d}`]),
  null,
  ...["none", "short", "medium", "long"].map((d) => [`--motion-delay-${d}`, `--sp-motion-engine-delay-${d}`]),
  null,
  ...["micro", "small", "medium", "large"].map((d) => [`--motion-distance-${d}`, `--sp-motion-engine-distance-${d}`]),
  null,
  ...["standard", "enter", "exit", "flow", "emphasis"].map((e) => [`--motion-ease-${e}`, `--sp-motion-engine-easing-${e}`]),
];

function tokensCss() {
  const body = RAW.map((entry) => (entry === null ? "" : `  ${entry[0]}: ${v(entry[1])};`)).join("\n");
  // The reduced-motion reset is BEHAVIOUR, not a token. Foundation deliberately
  // does not ship it (a shared package emitting a global `*` rule would override
  // consumers unbidden — see Foundation's motionAccessibility). It stays owned
  // here, reproduced verbatim.
  const reducedMotion = `@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}`;
  return `${banner("tokens.css")}\n:root {\n${body}\n}\n\n${reducedMotion}\n`;
}

// ── typography.css — the fluid scale, as classes ────────────────────────────
const TYPE_ORDER = [
  "display-1", "display-2", "heading-1", "heading-2", "heading-3", "heading-4",
  "body-lg", "body-md", "body-sm", "caption", "metadata",
];

function typographyCss() {
  const blocks = TYPE_ORDER.map((role) => {
    const s = scale[role];
    if (!s) throw new Error(`Foundation has no typography scale entry "${role}"`);
    const lines = [
      `  font-size: ${s["font-size"]};`,
      `  line-height: ${s["line-height"]};`,
      `  letter-spacing: ${s["letter-spacing"]};`,
    ];
    if (s["text-transform"]) lines.push(`  text-transform: ${s["text-transform"]};`);
    return `.text-${role} {\n${lines.join("\n")}\n}`;
  });
  return `${banner("typography.css")}\n${blocks.join("\n\n")}\n`;
}

// ── src/lib/tokens.ts — the public JS token surface, as literals ────────────
/**
 * Emitted as literal values rather than as `export { x } from
 * "@studiopod/foundation"`, deliberately.
 *
 * A module-level re-export makes tsup bundle Foundation's whole token tree into
 * `dist/`, and Tailwind's content scanner then reads Foundation's object keys
 * (`shadow`, `elevation`, …) as class-name candidates in every consumer that
 * `@source`s this package's dist. That measurably changed a consumer's
 * generated CSS — it gained an unused `.shadow` rule — for no benefit.
 *
 * Generating literals keeps the emitted bytes exactly as they were while
 * Foundation stays the canonical source: the values come from tokens.json, and
 * `--check` fails if anyone edits them by hand.
 */
function libTokensTs() {
  const seconds = foundation.jsMirrors.seconds.ui;
  const bezier = foundation.jsMirrors.bezier.ui;
  const z = foundation.tokens["z-index"];
  const rgb = foundation.tokens.color.rgb;
  const obj = (o, indent = "  ") =>
    Object.entries(o).map(([k, val]) => `${indent}${k}: ${JSON.stringify(val)},`).join("\n");

  return `/**
 * GENERATED FROM @studiopod/foundation — DO NOT EDIT.
 *
 * The public \`@studiopod/design/tokens\` surface. Values are owned by
 * @studiopod/foundation and written here as literals by
 * tooling/generators/generate-tokens-from-foundation.mjs; the stylesheets in src/styles
 * are generated from the same source, so the JS mirror and the CSS cannot
 * drift apart. Regenerate with \`npm run token:bridge\`.
 *
 * Literals rather than a re-export: importing Foundation at module level makes
 * tsup bundle its token tree into dist/, which Tailwind's scanner then mines
 * for class names in every consumer. Emitting values keeps dist byte-identical.
 *
 * The exported shape is frozen — same five names, same types, same values as
 * before DS-7.5D. Consumers need no change.
 */

/** Seconds, for framer-motion. Mirrors \`--duration-*\` (MS-1 UI scale). */
export const motionDuration = {
${obj(seconds)}
} as const;

export const motionEase = {
  /** Confident, decelerating "arrive" curve. Default for entrances. */
  standard: ${JSON.stringify(bezier.standard)},
  /** Symmetric ease for looping/pulsing motion. */
  inOut: ${JSON.stringify(bezier.inOut)},
  /** Mechanical, constant-rate motion for progress/fill indicators. */
  linear: ${JSON.stringify(bezier.linear)},
} as const;

/** Mirrors \`--z-*\`. */
export const zIndex = {
${obj(z)}
} as const;

/**
 * RGB triples mirroring \`--color-accent-500\` / \`--color-success\`, for the
 * framer-motion boxShadow values that interpolate a colour's alpha channel.
 * Framer-motion cannot tween a \`var(--color-x)\` reference — it needs literal
 * components — so these are the single source those call sites build an
 * \`rgba(\${accentRgb}, alpha)\` string from.
 */
export const accentRgb = ${JSON.stringify(rgb.accent)};
export const successRgb = ${JSON.stringify(rgb.success)};
`;
}

// ── Emit / verify ───────────────────────────────────────────────────────────
const artifacts = [
  ["src/styles/palette.css", paletteCss()],
  ["src/styles/theme.css", themeCss()],
  ["src/styles/tokens.css", tokensCss()],
  ["src/styles/typography.css", typographyCss()],
  ["src/lib/tokens.ts", libTokensTs()],
];

const checkOnly = process.argv.includes("--check");
const drifted = [];

for (const [rel, content] of artifacts) {
  const abs = join(pkgRoot, rel);
  const current = existsSync(abs) ? readFileSync(abs, "utf8") : null;
  if (current === content) {
    if (!checkOnly) console.log(`unchanged  ${rel}`);
    continue;
  }
  if (checkOnly) {
    drifted.push(current === null ? `${rel} (missing)` : rel);
    continue;
  }
  writeFileSync(abs, content, "utf8");
  console.log(`written    ${rel}`);
}

if (checkOnly) {
  if (drifted.length > 0) {
    console.error("✖ Token stylesheets have drifted from @studiopod/foundation:");
    for (const d of drifted) console.error(`  - ${d}`);
    console.error("\nRun `npm run token:bridge` and commit the result.");
    console.error("If a value genuinely needs to change, change it in @studiopod/foundation — not here.");
    process.exit(1);
  }
  console.log("✔ Token stylesheets match @studiopod/foundation.");
}
