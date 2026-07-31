/**
 * UX-2 accessibility guards for the three defects UX-1 found by rendering the
 * consuming application and reading computed CSS out of the DOM.
 *
 * All three were invisible to source inspection and to every existing test,
 * which is the point of this file: each one is now asserted against the actual
 * source of truth (the stylesheet text, the cva variant string), not against a
 * summary of it.
 *
 *   CR-1  the ink ramp sat below WCAG AA
 *   CR-2  `.focus-ring:focus-visible` flattened its element's corners
 *   CR-3  Button's primary fill failed AA against its own label
 */

import { readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const srcRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (p: string) => readFileSync(join(srcRoot, p), "utf8");

// ── WCAG 2.1 relative luminance / contrast ──────────────────────────────────

function channels(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16)) as [number, number, number];
}

function luminance(hex: string): number {
  const [r, g, b] = channels(hex).map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  }) as [number, number, number];
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a: string, b: string): number {
  const [x, y] = [luminance(a), luminance(b)];
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
}

/** Every `--color-*` literal the theme block declares. */
function themeColors(): Map<string, string> {
  const css = read("styles/theme.css");
  const out = new Map<string, string>();
  for (const m of css.matchAll(/(--color-[a-z0-9-]+)\s*:\s*(#[0-9a-fA-F]{6})\s*;/g)) {
    out.set(m[1]!, m[2]!.toLowerCase());
  }
  return out;
}

const colors = themeColors();
const need = (name: string) => {
  const v = colors.get(name);
  if (!v) throw new Error(`theme.css does not declare ${name}`);
  return v;
};

/**
 * Every opaque surface a consumer may place text on. `surface-active` is the
 * worst case and deliberately included: in StudioPOD it is the MOST used
 * surface, so "passes against panel" was never a sufficient bar.
 */
const SURFACES = ["--color-canvas", "--color-canvas-raised", "--color-surface", "--color-surface-hover", "--color-surface-active", "--color-panel"] as const;

const AA_NORMAL = 4.5;
const PERCEIVABLE = 3;

describe("CR-1 — ink ramp contrast", () => {
  it.each(["--color-ink-primary", "--color-ink-secondary", "--color-ink-tertiary"])(
    "%s clears WCAG AA (4.5:1) against every semantic surface",
    (ink) => {
      const failures = SURFACES.filter((s) => contrast(need(ink), need(s)) < AA_NORMAL).map(
        (s) => `${s}: ${contrast(need(ink), need(s)).toFixed(2)}:1`,
      );
      expect(failures).toEqual([]);
    },
  );

  it("ink-disabled stays perceivable (>=3:1) even though WCAG exempts it", () => {
    const failures = SURFACES.filter(
      (s) => contrast(need("--color-ink-disabled"), need(s)) < PERCEIVABLE,
    ).map((s) => `${s}: ${contrast(need("--color-ink-disabled"), need(s)).toFixed(2)}:1`);
    expect(failures).toEqual([]);
  });

  it("keeps the four ink steps visually distinct from each other", () => {
    const ramp = ["--color-ink-primary", "--color-ink-secondary", "--color-ink-tertiary", "--color-ink-disabled"];
    for (let i = 0; i < ramp.length - 1; i++) {
      // Adjacent steps must differ enough to read as a step at all. 1.15:1 is
      // the floor at which the boundary is still discernible on a dark field.
      expect(contrast(need(ramp[i]!), need(ramp[i + 1]!))).toBeGreaterThan(1.15);
    }
  });
});

describe("CR-2 — focus ring must not mutate its element", () => {
  const rule = (() => {
    const css = read("styles/utilities.css");
    const m = css.match(/\.focus-ring:focus-visible\s*\{([^}]*)\}/);
    if (!m) throw new Error("utilities.css no longer defines .focus-ring:focus-visible");
    return m[1]!;
  })();

  it("does not declare border-radius", () => {
    // `border-radius: inherit` here resolved against the PARENT and squared off
    // every rounded control on keyboard focus. Browsers already follow the
    // element's own radius when drawing an outline — declaring nothing is correct.
    expect(rule).not.toMatch(/border-radius/);
  });

  it("still draws a visible ring", () => {
    expect(rule).toMatch(/outline:\s*2px solid var\(--color-accent-400\)/);
    expect(rule).toMatch(/outline-offset:\s*2px/);
  });

  it("uses a ring colour that is perceivable against every surface", () => {
    const failures = SURFACES.filter(
      (s) => contrast(need("--color-accent-400"), need(s)) < PERCEIVABLE,
    );
    expect(failures).toEqual([]);
  });
});

describe("CR-3 — Button variants against their own label", () => {
  const buttonSource = read("components/ui/Button.tsx");
  const variantBlock = (name: string) => {
    const m = buttonSource.match(new RegExp(`${name}:\\s*(?:\\n\\s*)?"([^"]*)"`));
    if (!m) throw new Error(`Button.tsx has no ${name} variant string`);
    return m[1]!;
  };

  /** Resolve a Tailwind colour utility in the variant string to its hex. */
  const fillOf = (variant: string, prefix: RegExp) => {
    const m = variant.match(prefix);
    if (!m) return null;
    const token = m[1] === "white" ? "#ffffff" : (colors.get(`--color-${m[1]}`) ?? null);
    return token;
  };

  it("primary: rest, hover and active fills all clear AA against the label", () => {
    const v = variantBlock("primary");
    const label = fillOf(v, /(?:^|\s)text-([a-z0-9-]+)/)!;
    const states = {
      rest: fillOf(v, /(?:^|\s)bg-([a-z0-9-]+)/),
      hover: fillOf(v, /hover:bg-([a-z0-9-]+)/),
      active: fillOf(v, /active:bg-([a-z0-9-]+)/),
    };
    const failures = Object.entries(states)
      .filter(([, fill]) => fill && contrast(label, fill) < AA_NORMAL)
      .map(([state, fill]) => `${state} (${fill}): ${contrast(label, fill!).toFixed(2)}:1`);
    expect(failures).toEqual([]);
  });

  it("destructive: the resting fill clears AA against the label", () => {
    const v = variantBlock("destructive");
    const label = fillOf(v, /(?:^|\s)text-([a-z0-9-]+)/)!;
    const fill = fillOf(v, /(?:^|\s)bg-([a-z0-9-]+)/)!;
    expect(contrast(label, fill)).toBeGreaterThanOrEqual(AA_NORMAL);
  });

  it("primary's resting fill is distinguishable from the page behind it", () => {
    const v = variantBlock("primary");
    const fill = fillOf(v, /(?:^|\s)bg-([a-z0-9-]+)/)!;
    expect(contrast(fill, need("--color-panel"))).toBeGreaterThanOrEqual(PERCEIVABLE);
  });
});

/**
 * CR-3 was written about Button, and fixing only Button would have been the
 * wrong shape of fix: the same defect existed in 10 other components, and one of
 * them (`SegmentedControl`) was rendering at 3.68:1 in the live application.
 *
 * So the guard is not "Button is correct" — it is "no component in this package
 * puts a light ink on a fill it cannot carry", checked across the whole source
 * tree. The rule the package now follows:
 *
 *   bg-accent-600  -> text-white     5.17:1
 *   bg-accent-500  -> never with white (3.68:1) — use accent-600
 *   bg-success     -> text-canvas    8.47:1  (white is 2.28:1)
 *   bg-warning     -> text-canvas    8.99:1  (white is 2.15:1)
 *   bg-error       -> text-canvas    6.37:1  (white is 3.03:1)
 */
describe("CR-3 (package-wide) — no light ink on a fill that cannot carry it", () => {
  const sourceFiles = (() => {
    const out: string[] = [];
    const walk = (dir: string) => {
      for (const entry of readdirSync(dir, { withFileTypes: true })) {
        const p = join(dir, entry.name);
        if (entry.isDirectory()) walk(p);
        else if (p.endsWith(".tsx") && !p.includes(".test.")) out.push(p);
      }
    };
    walk(join(srcRoot, "components"));
    return out;
  })();

  it("finds no `bg-<fill>` paired with an ink below AA on that fill", () => {
    const FILLS = ["accent-300", "accent-400", "accent-500", "accent-600", "accent-700", "success", "warning", "error"];
    const INKS: Record<string, string> = { white: "#ffffff", canvas: need("--color-canvas"), "ink-primary": need("--color-ink-primary") };
    const offenders: string[] = [];

    for (const file of sourceFiles) {
      const text = readFileSync(file, "utf8");
      // Only inspect single class strings, so a fill and an ink must genuinely
      // co-occur on one element rather than merely appear in the same file.
      for (const m of text.matchAll(/"([^"]*\bbg-[a-z0-9-]+[^"]*)"/g)) {
        const cls = m[1]!;
        const fill = FILLS.find((f) => new RegExp(`(?:^|\\s)bg-${f}(?![-\\w])`).test(cls));
        if (!fill) continue;
        const inkName = Object.keys(INKS).find((i) => new RegExp(`(?:^|\\s)text-${i}(?![-\\w])`).test(cls));
        if (!inkName) continue;
        const ratio = contrast(INKS[inkName]!, need(`--color-${fill}`));
        if (ratio < AA_NORMAL) {
          offenders.push(`${file.slice(srcRoot.length + 1)}: bg-${fill} + text-${inkName} = ${ratio.toFixed(2)}:1`);
        }
      }
    }
    expect(offenders).toEqual([]);
  });
});
