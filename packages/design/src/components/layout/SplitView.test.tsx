import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, userEvent, mockBoundingClientRect } from "@test/render";
import { runA11yCheck } from "@test/a11y";
import { MotionPreferenceProvider } from "@/components/motion";
import { SplitView, SplitPane, SplitDivider } from "./SplitView";

/**
 * DS-3 — SplitView's companion suite, following Workspace.test.tsx's shape
 * (rendering/state coverage/interaction/accessibility). Pointer-drag math
 * needs a real container rect, which jsdom never provides on its own —
 * every drag test calls `mockBoundingClientRect` first. Playwright's own
 * spec (e2e/visual/splitview-gallery.visual.spec.ts) is the authoritative
 * real-browser drag verification; these tests check the resize *math* and
 * the ARIA/keyboard contract in isolation.
 */

function TwoPane(props: { defaultSize?: number; minSize?: number; maxSize?: number; collapsible?: boolean; onSizesChange?: (sizes: number[]) => void }) {
  return (
    <SplitView orientation="horizontal" onSizesChange={props.onSizesChange}>
      <SplitPane defaultSize={props.defaultSize} minSize={props.minSize} maxSize={props.maxSize} collapsible={props.collapsible}>
        Sidebar
      </SplitPane>
      <SplitDivider aria-label="Resize sidebar" />
      <SplitPane>Content</SplitPane>
    </SplitView>
  );
}

describe("SplitView", () => {
  describe("rendering", () => {
    it("renders every pane's content and a separator-role divider between them", () => {
      render(<TwoPane />);
      expect(screen.getByText("Sidebar")).toBeInTheDocument();
      expect(screen.getByText("Content")).toBeInTheDocument();
      expect(screen.getByRole("separator", { name: "Resize sidebar" })).toBeInTheDocument();
    });

    it("horizontal (default) orientation renders a vertical-line divider — aria-orientation is the divider's own axis, not the layout's", () => {
      render(<TwoPane />);
      expect(screen.getByRole("separator", { name: "Resize sidebar" })).toHaveAttribute("aria-orientation", "vertical");
    });

    it("vertical orientation renders a horizontal-line divider", () => {
      render(
        <SplitView orientation="vertical">
          <SplitPane>Top</SplitPane>
          <SplitDivider aria-label="Resize top pane" />
          <SplitPane>Bottom</SplitPane>
        </SplitView>,
      );
      expect(screen.getByRole("separator", { name: "Resize top pane" })).toHaveAttribute("aria-orientation", "horizontal");
    });

    it("three panes render two independent dividers", () => {
      render(
        <SplitView>
          <SplitPane>A</SplitPane>
          <SplitDivider aria-label="Resize A" />
          <SplitPane>B</SplitPane>
          <SplitDivider aria-label="Resize B" />
          <SplitPane>C</SplitPane>
        </SplitView>,
      );
      expect(screen.getAllByRole("separator")).toHaveLength(2);
    });

    it("logs a dev warning when SplitPane or SplitDivider is used outside SplitView", () => {
      const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
      render(<SplitPane>Orphan</SplitPane>);
      render(<SplitDivider aria-label="Orphan divider" />);
      expect(errorSpy).toHaveBeenCalledWith(expect.stringContaining("must be a direct child of SplitView"));
      errorSpy.mockRestore();
    });
  });

  describe("state coverage", () => {
    it("defaultSize seeds each pane's flex-basis", () => {
      render(<TwoPane defaultSize={30} />);
      expect(screen.getByText("Sidebar")).toHaveStyle({ flexBasis: "30%" });
      expect(screen.getByText("Content")).toHaveStyle({ flexBasis: "70%" });
    });

    it("panes without defaultSize split the remaining space evenly", () => {
      render(
        <SplitView>
          <SplitPane>A</SplitPane>
          <SplitDivider aria-label="d1" />
          <SplitPane>B</SplitPane>
          <SplitDivider aria-label="d2" />
          <SplitPane>C</SplitPane>
        </SplitView>,
      );
      expect(screen.getByText("A")).toHaveStyle({ flexBasis: `${100 / 3}%` });
    });

    it("the divider's aria-valuemin/max reflect minSize/maxSize", () => {
      render(<TwoPane defaultSize={30} minSize={15} maxSize={60} />);
      const divider = screen.getByRole("separator", { name: "Resize sidebar" });
      expect(divider).toHaveAttribute("aria-valuemin", "15");
      expect(divider).toHaveAttribute("aria-valuemax", "60");
      expect(divider).toHaveAttribute("aria-valuenow", "30");
    });

    it("a controlled collapsed=true forces the pane to 0% regardless of defaultSize", () => {
      render(
        <SplitView>
          <SplitPane defaultSize={30} collapsed>
            Sidebar
          </SplitPane>
          <SplitDivider aria-label="Resize sidebar" />
          <SplitPane>Content</SplitPane>
        </SplitView>,
      );
      const pane = screen.getByText("Sidebar");
      expect(pane).toHaveStyle({ flexBasis: "0%" });
      expect(pane).toHaveAttribute("data-collapsed", "true");
    });

    it("a controlled collapsed=false forces the pane open at its defaultSize", () => {
      render(
        <SplitView>
          <SplitPane defaultSize={35} collapsed={false}>
            Sidebar
          </SplitPane>
          <SplitDivider aria-label="Resize sidebar" />
          <SplitPane>Content</SplitPane>
        </SplitView>,
      );
      expect(screen.getByText("Sidebar")).toHaveStyle({ flexBasis: "35%" });
    });

    it("respects a reduced-motion preference by omitting the flex-basis transition class", () => {
      // MotionPreferenceProvider's explicit override is the reliable way to
      // force useMotionPreference() in a test — framer-motion's own
      // useReducedMotion() reads prefers-reduced-motion through machinery
      // mockMatchMedia (a raw window.matchMedia swap) doesn't reliably reach.
      render(
        <MotionPreferenceProvider reduceMotion>
          <TwoPane />
        </MotionPreferenceProvider>,
      );
      expect(screen.getByText("Sidebar")).not.toHaveClass("transition-[flex-basis]");
    });

    it("applies the flex-basis transition class by default (motion allowed)", () => {
      render(<TwoPane />);
      expect(screen.getByText("Sidebar")).toHaveClass("transition-[flex-basis]");
    });
  });

  describe("interaction", () => {
    it("ArrowRight/ArrowLeft on a horizontal divider grows/shrinks the pane before it, reported via onSizesChange", async () => {
      const onSizesChange = vi.fn();
      const user = userEvent.setup();
      render(<TwoPane defaultSize={30} onSizesChange={onSizesChange} />);

      const divider = screen.getByRole("separator", { name: "Resize sidebar" });
      divider.focus();
      await user.keyboard("{ArrowRight}");
      expect(onSizesChange).toHaveBeenLastCalledWith([32, 68]);

      await user.keyboard("{ArrowLeft}{ArrowLeft}");
      expect(onSizesChange).toHaveBeenLastCalledWith([28, 72]);
    });

    it("Shift+Arrow steps by the larger increment", async () => {
      const onSizesChange = vi.fn();
      const user = userEvent.setup();
      render(<TwoPane defaultSize={30} onSizesChange={onSizesChange} />);

      screen.getByRole("separator", { name: "Resize sidebar" }).focus();
      await user.keyboard("{Shift>}{ArrowRight}{/Shift}");
      expect(onSizesChange).toHaveBeenLastCalledWith([40, 60]);
    });

    it("Home jumps the pane before the divider to its minimum", async () => {
      const onSizesChange = vi.fn();
      const user = userEvent.setup();
      render(<TwoPane defaultSize={30} minSize={12} onSizesChange={onSizesChange} />);

      screen.getByRole("separator", { name: "Resize sidebar" }).focus();
      await user.keyboard("{Home}");
      expect(onSizesChange).toHaveBeenLastCalledWith([12, 88]);
    });

    it("End jumps the pane before the divider to its maximum", async () => {
      const onSizesChange = vi.fn();
      const user = userEvent.setup();
      render(<TwoPane defaultSize={30} maxSize={70} onSizesChange={onSizesChange} />);

      screen.getByRole("separator", { name: "Resize sidebar" }).focus();
      await user.keyboard("{End}");
      expect(onSizesChange).toHaveBeenLastCalledWith([70, 30]);
    });

    it("dragging never shrinks a pane below its own minSize, clamping instead", async () => {
      const onSizesChange = vi.fn();
      const user = userEvent.setup();
      render(<TwoPane defaultSize={15} minSize={12} onSizesChange={onSizesChange} />);

      const divider = screen.getByRole("separator", { name: "Resize sidebar" });
      divider.focus();
      // Three large leftward steps would go well under minSize=12 unclamped.
      await user.keyboard("{Shift>}{ArrowLeft}{ArrowLeft}{ArrowLeft}{/Shift}");
      const [before] = onSizesChange.mock.calls.at(-1)![0] as number[];
      expect(before).toBeCloseTo(12);
    });

    it("Enter collapses a collapsible pane to 0%, and restores it on a second Enter", async () => {
      const onSizesChange = vi.fn();
      const user = userEvent.setup();
      render(<TwoPane defaultSize={25} collapsible onSizesChange={onSizesChange} />);

      const divider = screen.getByRole("separator", { name: "Resize sidebar" });
      divider.focus();
      await user.keyboard("{Enter}");
      expect(onSizesChange).toHaveBeenLastCalledWith([0, 100]);

      await user.keyboard("{Enter}");
      expect(onSizesChange).toHaveBeenLastCalledWith([25, 75]);
    });

    it("dragging the divider with the pointer resizes both flanking panes", () => {
      mockBoundingClientRect({ width: 1000, height: 1000 });
      const onSizesChange = vi.fn();
      render(<TwoPane defaultSize={30} onSizesChange={onSizesChange} />);

      const divider = screen.getByRole("separator", { name: "Resize sidebar" });
      fireEvent.pointerDown(divider, { pointerId: 1, clientX: 300, clientY: 0, button: 0, pointerType: "mouse" });
      fireEvent.pointerMove(divider, { pointerId: 1, clientX: 400, clientY: 0, pointerType: "mouse" });
      fireEvent.pointerUp(divider, { pointerId: 1, clientX: 400, clientY: 0, pointerType: "mouse" });

      // 100px of 1000px container width = 10 percentage points transferred.
      expect(onSizesChange).toHaveBeenLastCalledWith([40, 60]);
    });

    it("a nested SplitView inside a SplitPane resizes independently of its parent", async () => {
      const outerChange = vi.fn();
      const innerChange = vi.fn();
      const user = userEvent.setup();

      render(
        <SplitView onSizesChange={outerChange}>
          <SplitPane defaultSize={40}>
            <SplitView orientation="vertical" onSizesChange={innerChange}>
              <SplitPane defaultSize={50}>Top</SplitPane>
              <SplitDivider aria-label="Resize inner top" />
              <SplitPane>Bottom</SplitPane>
            </SplitView>
          </SplitPane>
          <SplitDivider aria-label="Resize outer" />
          <SplitPane>Right</SplitPane>
        </SplitView>,
      );

      screen.getByRole("separator", { name: "Resize inner top" }).focus();
      await user.keyboard("{ArrowDown}");

      expect(innerChange).toHaveBeenCalled();
      expect(outerChange).not.toHaveBeenCalled();
    });
  });

  describe("accessibility", () => {
    it("a basic two-pane horizontal split has no axe violations", async () => {
      const { container } = render(<TwoPane />);
      expect(await runA11yCheck(container)).toHaveNoA11yViolations();
    });

    it("a three-pane vertical split has no axe violations", async () => {
      const { container } = render(
        <SplitView orientation="vertical">
          <SplitPane>Top</SplitPane>
          <SplitDivider aria-label="Resize top" />
          <SplitPane>Middle</SplitPane>
          <SplitDivider aria-label="Resize middle" />
          <SplitPane>Bottom</SplitPane>
        </SplitView>,
      );
      expect(await runA11yCheck(container)).toHaveNoA11yViolations();
    });

    it("every divider is keyboard-focusable", () => {
      render(<TwoPane />);
      expect(screen.getByRole("separator", { name: "Resize sidebar" })).toHaveAttribute("tabIndex", "0");
    });

    it("is reachable by Tab and actually receives focus", async () => {
      const user = userEvent.setup();
      render(<TwoPane />);
      await user.tab();
      expect(screen.getByRole("separator", { name: "Resize sidebar" })).toHaveFocus();
    });
  });
});
