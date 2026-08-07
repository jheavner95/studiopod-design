import { describe, it, expect } from "vitest";
import { getDeclaredTokens, findInvalidTokenReferences, findLikelyUnusedTokens } from "./token-verification";

/**
 * DS-4 — the one token-verification result that's a real gate, not an
 * advisory report: an invalid `var(--token)` reference is a deterministic
 * bug (see token-verification.ts's own doc comment), so this runs as a
 * normal Vitest file inside verify:fast, the same "no new CLI tooling"
 * pattern design-system-navigation.test.ts (DS-1E) and certification.test.ts
 * (DS-1F) already established.
 */
describe("token declarations", () => {
  it("finds a substantial number of declared tokens (sanity check the scanner itself works)", () => {
    const declared = getDeclaredTokens();
    expect(declared.size).toBeGreaterThan(50);
    expect(declared.has("--color-accent-500")).toBe(true);
    expect(declared.has("--spacing-gutter")).toBe(true);
    expect(declared.has("--container-shell")).toBe(true);
  });
});

describe("token reference integrity", () => {
  it("every CSS custom-property reference in the codebase resolves to a declared token — a real gate, not advisory", () => {
    const invalid = findInvalidTokenReferences();
    expect(invalid).toEqual([]);
  });
});

describe("likely-unused tokens (advisory, informational only)", () => {
  it("runs without throwing and returns a well-formed result", () => {
    // Deliberately not asserting an empty list — an unused token is a
    // prompt for human review (see the file's own doc comment on why),
    // not a failure. This test only proves the scanner itself is sound.
    const candidates = findLikelyUnusedTokens();
    expect(Array.isArray(candidates)).toBe(true);
    for (const c of candidates) {
      expect(c.token.startsWith("--")).toBe(true);
      expect(typeof c.sourceFile).toBe("string");
    }
  });
});
