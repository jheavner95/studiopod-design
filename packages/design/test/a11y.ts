import axe from "axe-core";
import { expect } from "vitest";

/**
 * jsdom has no layout engine, so axe's color-contrast rule cannot compute
 * real rendered contrast — it either throws or silently no-ops depending on
 * the DOM shape, either way telling you nothing true about the design
 * system's actual contrast. Contrast is verified in the Playwright visual
 * layer instead (e2e/visual), against a real browser's computed styles. This
 * rule is disabled here so a jsdom a11y check can't produce a false pass
 * *or* a false failure on the one rule this environment can't evaluate.
 */
const JSDOM_DISABLED_RULES = ["color-contrast"];

/**
 * Runs axe-core against a rendered subtree and returns its violations.
 * Pass the element `render()` gave you (Testing Library's `container`, or a
 * more specific node — axe scopes to whatever root you hand it).
 */
export async function runA11yCheck(container: Element) {
  const results = await axe.run(container, {
    rules: Object.fromEntries(JSDOM_DISABLED_RULES.map((id) => [id, { enabled: false }])),
  });
  return results.violations;
}

interface A11yMatchers<R = unknown> {
  toHaveNoA11yViolations(): R;
}

/* eslint-disable @typescript-eslint/no-empty-object-type -- declaration merging into vitest's own interfaces; both intentionally add no members beyond what A11yMatchers already contributes. */
declare module "vitest" {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- must match vitest's own `Assertion<T = any>` default exactly, or declaration merging fails.
  interface Assertion<T = any> extends A11yMatchers<T> {}
  interface AsymmetricMatchersContaining extends A11yMatchers {}
}
/* eslint-enable @typescript-eslint/no-empty-object-type */

expect.extend({
  toHaveNoA11yViolations(violations: axe.Result[]) {
    const pass = violations.length === 0;
    return {
      pass,
      message: () =>
        pass
          ? "expected axe to find at least one accessibility violation, but it found none"
          : formatViolations(violations),
    };
  },
});

function formatViolations(violations: axe.Result[]): string {
  const lines = violations.map((violation) => {
    const nodes = violation.nodes.map((node) => `    - ${node.target.join(" ")}\n      ${node.failureSummary}`);
    return `  [${violation.id}] ${violation.help} (${violation.helpUrl})\n${nodes.join("\n")}`;
  });
  return `Found ${violations.length} accessibility violation(s):\n${lines.join("\n")}`;
}
