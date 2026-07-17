import { test, expect } from "@playwright/test";

/**
 * DS-2's visual-regression pair to Workspace.test.tsx, following
 * button-gallery.visual.spec.ts's exact pattern (DS-1C). Targets the six
 * playground examples on /application-components/foundation-workspace
 * rather than a bespoke isolated-render page.
 */
test.describe("Workspace examples (/application-components/foundation-workspace)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/application-components/foundation-workspace");
  });

  test("two-panel and three-panel examples", async ({ page }) => {
    const twoPanelLabel = page.getByText("Two-panel workspace", { exact: true });
    await twoPanelLabel.scrollIntoViewIfNeeded();
    await expect(twoPanelLabel.locator("xpath=following-sibling::*[1]")).toHaveScreenshot("workspace-two-panel.png");

    const threePanelLabel = page.getByText("Three-panel workspace", { exact: true });
    await threePanelLabel.scrollIntoViewIfNeeded();
    await expect(threePanelLabel.locator("xpath=following-sibling::*[1]")).toHaveScreenshot("workspace-three-panel.png");
  });

  test("collapsed navigation renders the icon-only rail", async ({ page }) => {
    const label = page.getByText("Collapsed navigation", { exact: true });
    await label.scrollIntoViewIfNeeded();
    const frame = label.locator("xpath=following-sibling::*[1]");
    await expect(frame).toHaveScreenshot("workspace-collapsed-nav.png");
  });

  test("dense production workspace renders the full six-region anatomy", async ({ page }) => {
    const label = page.getByText("Dense production workspace");
    await label.scrollIntoViewIfNeeded();
    const frame = label.locator("xpath=following-sibling::*[1]");
    await expect(frame).toHaveScreenshot("workspace-dense-production.png");
  });
});
