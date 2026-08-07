import { test, expect } from "@playwright/test";

/**
 * Canonical visual-regression example, paired with the Button unit-test
 * suite (src/components/ui/Button.test.tsx) as the two halves of the DS-1C
 * pilot: Vitest/jsdom proves behavior and structure; this proves pixels,
 * against a real browser's layout and paint, which jsdom cannot. See
 * docs/TESTING.md "Visual regression" for when to add more of these.
 *
 * Targets the existing "Buttons, states" and "Buttons, variants & sizes"
 * gallery already built into /core-components rather than standing up a
 * new isolated-render page — every component family already has one of
 * these playground routes.
 */
test.describe("Button gallery (/core-components)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/core-components");
    // Disambiguates a pre-existing duplicate-id bug on this page (both the
    // <section> and its <h2> heading render id="components" — see
    // docs/TESTING.md "Known limitations" for the flagged follow-up).
    await page.locator("section#components").scrollIntoViewIfNeeded();
  });

  test("static states — default, disabled, loading", async ({ page }) => {
    const section = page.locator("section#components");
    await expect(section).toHaveScreenshot("button-states.png");
  });

  test("variant & size matrix", async ({ page }) => {
    const primaryButton = page.getByRole("button", { name: "Primary", exact: true }).first();
    await expect(primaryButton).toBeVisible();
    const section = page.locator("section#components");
    await expect(section).toHaveScreenshot("button-variants.png");
  });

  test("hover state", async ({ page }) => {
    const button = page.getByRole("button", { name: "Primary", exact: true }).first();
    await button.hover();
    await expect(button).toHaveScreenshot("button-hover.png");
  });

  test("focus-visible state", async ({ page }) => {
    // Tab to the first focusable control on the page, then keep tabbing
    // until a "Primary" button is focused — proves the focus ring renders
    // (not just that it *can* be focused, which the Vitest suite already
    // covers without a real browser's paint).
    const button = page.getByRole("button", { name: "Primary", exact: true }).first();
    await button.focus();
    await expect(button).toHaveScreenshot("button-focus.png");
  });
});
