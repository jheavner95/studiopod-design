import { test, expect } from "@playwright/test";

/**
 * DS-3's visual-regression pair to SplitView.test.tsx, following
 * workspace-gallery.visual.spec.ts's exact pattern (DS-2). Targets the six
 * playground examples on /application-components/foundation-splitview.
 * This is the authoritative REAL-BROWSER verification for pointer drag —
 * Vitest/jsdom has no layout engine, so its own drag tests rely on a mocked
 * container rect; here the divider is dragged with real mouse events against
 * real layout, and the resulting frame is screenshotted.
 */
test.describe("SplitView examples (/application-components/foundation-splitview)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/application-components/foundation-splitview");
  });

  test("two-pane editor and three-pane inspector render at their default sizes", async ({ page }) => {
    const twoPaneLabel = page.getByText("Two-pane editor", { exact: true });
    await twoPaneLabel.scrollIntoViewIfNeeded();
    await expect(twoPaneLabel.locator("xpath=following-sibling::*[1]")).toHaveScreenshot("splitview-two-pane-editor.png");

    const threePaneLabel = page.getByText("Three-pane inspector", { exact: true });
    await threePaneLabel.scrollIntoViewIfNeeded();
    await expect(threePaneLabel.locator("xpath=following-sibling::*[1]")).toHaveScreenshot("splitview-three-pane-inspector.png");
  });

  test("vertical split and nested split render their stacked/nested anatomy", async ({ page }) => {
    const verticalLabel = page.getByText("Vertical split", { exact: true });
    await verticalLabel.scrollIntoViewIfNeeded();
    await expect(verticalLabel.locator("xpath=following-sibling::*[1]")).toHaveScreenshot("splitview-vertical-split.png");

    const nestedLabel = page.getByText("Nested split", { exact: true });
    await nestedLabel.scrollIntoViewIfNeeded();
    await expect(nestedLabel.locator("xpath=following-sibling::*[1]")).toHaveScreenshot("splitview-nested-split.png");
  });

  test("dragging the divider with the mouse actually resizes the panes", async ({ page }) => {
    const label = page.getByText("Two-pane editor", { exact: true });
    await label.scrollIntoViewIfNeeded();
    const frame = label.locator("xpath=following-sibling::*[1]");
    const divider = frame.getByRole("separator", { name: "Resize file list" });

    const before = await divider.boundingBox();
    if (!before) throw new Error("divider has no bounding box");

    await page.mouse.move(before.x + before.width / 2, before.y + before.height / 2);
    await page.mouse.down();
    await page.mouse.move(before.x + before.width / 2 + 60, before.y + before.height / 2, { steps: 5 });
    await page.mouse.up();

    const after = await divider.boundingBox();
    if (!after) throw new Error("divider has no bounding box after drag");
    expect(after.x).toBeGreaterThan(before.x + 40);
  });

  test("keyboard resize moves the divider without a pointer", async ({ page }) => {
    const label = page.getByText("Three-pane inspector", { exact: true });
    await label.scrollIntoViewIfNeeded();
    const frame = label.locator("xpath=following-sibling::*[1]");
    const divider = frame.getByRole("separator", { name: "Resize batch list" });

    await divider.focus();
    const before = await divider.getAttribute("aria-valuenow");
    await page.keyboard.press("ArrowRight");
    const after = await divider.getAttribute("aria-valuenow");
    expect(Number(after)).toBeGreaterThan(Number(before));
  });

  test("collapsible inspector collapses via Enter and the frame reflects it", async ({ page }) => {
    const label = page.getByText("Collapsible inspector", { exact: true });
    await label.scrollIntoViewIfNeeded();
    const frame = label.locator("xpath=following-sibling::*[1]");
    const divider = frame.getByRole("separator", { name: "Resize or collapse properties" });

    await divider.focus();
    await page.keyboard.press("Enter");
    await expect(frame).toHaveScreenshot("splitview-collapsible-inspector-collapsed.png");
  });

  test("IDE-style layout renders the full nested, collapsible anatomy", async ({ page }) => {
    const label = page.getByText("IDE-style layout", { exact: true });
    await label.scrollIntoViewIfNeeded();
    const frame = label.locator("xpath=following-sibling::*[1]");
    await expect(frame).toHaveScreenshot("splitview-ide-style-layout.png");
  });
});
