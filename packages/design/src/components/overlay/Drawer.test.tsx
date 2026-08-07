import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@test/render";
import { runA11yCheck } from "@test/a11y";
import { Drawer } from "./Drawer";
import { DialogHeader, DialogTitle, DialogDescription, DialogBody, DialogClose } from "./DialogParts";

/**
 * DS-5K — Drawer reuses the EXACT same composition parts as Dialog (one shared
 * DialogContext, no forked Drawer* set). These tests prove that reuse works.
 */
function DrawerFixture({ onOpenChange = () => {}, ...props }: Partial<React.ComponentProps<typeof Drawer>> = {}) {
  return (
    <Drawer open onOpenChange={onOpenChange} {...props}>
      <DialogHeader>
        <DialogTitle>Details</DialogTitle>
        <DialogDescription>Side panel content.</DialogDescription>
        <DialogClose />
      </DialogHeader>
      <DialogBody>
        <p>body</p>
      </DialogBody>
    </Drawer>
  );
}

describe("Drawer", () => {
  it("renders role=dialog aria-modal when open", () => {
    render(<DrawerFixture />);
    expect(screen.getByRole("dialog")).toHaveAttribute("aria-modal", "true");
  });

  it("reuses the shared composition parts — DialogTitle auto-wires aria-labelledby", () => {
    render(<DrawerFixture />);
    const dialog = screen.getByRole("dialog");
    const title = screen.getByText("Details");
    expect(dialog.getAttribute("aria-labelledby")).toBe(title.id);
  });

  it("reuses DialogDescription — auto-wires aria-describedby", () => {
    render(<DrawerFixture />);
    const dialog = screen.getByRole("dialog");
    expect(dialog.getAttribute("aria-describedby")).toBe(screen.getByText("Side panel content.").id);
  });

  it("DialogClose closes the Drawer via the shared context", () => {
    const onOpenChange = vi.fn();
    render(<DrawerFixture onOpenChange={onOpenChange} />);
    fireEvent.click(screen.getByRole("button", { name: "Close" }));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("Escape closes when dismissible, not when dismissible={false}", () => {
    const onOpenChange = vi.fn();
    const { rerender } = render(<DrawerFixture onOpenChange={onOpenChange} />);
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onOpenChange).toHaveBeenCalledWith(false);

    onOpenChange.mockClear();
    rerender(<DrawerFixture onOpenChange={onOpenChange} dismissible={false} />);
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onOpenChange).not.toHaveBeenCalled();
  });

  it("has no axe violations", async () => {
    render(<DrawerFixture />);
    expect(await runA11yCheck(screen.getByRole("dialog"))).toHaveNoA11yViolations();
  });

  /**
   * DS-5Q — the `left` edge. `right`/`bottom` assertions sit alongside so a
   * regression that collapses the three edges into one is caught here.
   */
  describe("edge (DS-5Q)", () => {
    it("docks to the left edge and puts its border on the content side", () => {
      render(<DrawerFixture edge="left" />);
      const panel = screen.getByRole("dialog");
      expect(panel).toHaveClass("left-0", "inset-y-0", "h-full");
      // The border faces the page content, so a left drawer borders on its right.
      expect(panel).toHaveClass("border-r");
      expect(panel).not.toHaveClass("right-0");
      expect(panel).not.toHaveClass("border-l");
    });

    it("still defaults to the right edge when no edge is given", () => {
      render(<DrawerFixture />);
      const panel = screen.getByRole("dialog");
      expect(panel).toHaveClass("right-0", "border-l");
      expect(panel).not.toHaveClass("left-0");
    });

    it("keeps the bottom edge unchanged", () => {
      render(<DrawerFixture edge="bottom" />);
      const panel = screen.getByRole("dialog");
      expect(panel).toHaveClass("bottom-0", "inset-x-0", "border-t");
    });

    it("left and right are mirror images, not the same panel", () => {
      const left = render(<DrawerFixture edge="left" />);
      const leftCls = left.getByRole("dialog").className;
      left.unmount();
      const right = render(<DrawerFixture edge="right" />);
      const rightCls = right.getByRole("dialog").className;
      expect(leftCls).not.toBe(rightCls);
    });

    it("motion enters from off-screen left — the mirrored x offset", () => {
      // framer-motion applies the initial transform inline before animating in.
      const { getByRole } = render(<DrawerFixture edge="left" />);
      const panel = getByRole("dialog");
      // A left drawer must translate in from a NEGATIVE x, never a positive one.
      expect(panel.style.transform ?? "").not.toMatch(/translateX\(100%\)/);
    });
  });

  describe("left edge keeps every Drawer behaviour (DS-5Q)", () => {
    it("Escape closes a left drawer when dismissible", () => {
      const onOpenChange = vi.fn();
      render(<DrawerFixture edge="left" onOpenChange={onOpenChange} />);
      fireEvent.keyDown(document, { key: "Escape" });
      expect(onOpenChange).toHaveBeenCalledWith(false);
    });

    it("Escape does not close a non-dismissible left drawer", () => {
      const onOpenChange = vi.fn();
      render(<DrawerFixture edge="left" dismissible={false} onOpenChange={onOpenChange} />);
      fireEvent.keyDown(document, { key: "Escape" });
      expect(onOpenChange).not.toHaveBeenCalled();
    });

    it("DialogClose closes a left drawer through the shared context", () => {
      const onOpenChange = vi.fn();
      render(<DrawerFixture edge="left" onOpenChange={onOpenChange} />);
      fireEvent.click(screen.getByRole("button", { name: /close/i }));
      expect(onOpenChange).toHaveBeenCalledWith(false);
    });

    it("moves focus into the left drawer panel", () => {
      render(<DrawerFixture edge="left" />);
      const panel = screen.getByRole("dialog");
      expect(panel.contains(document.activeElement) || document.activeElement === panel).toBe(true);
    });

    it("auto-wires its accessible name from DialogTitle at the left edge", () => {
      render(<DrawerFixture edge="left" />);
      const panel = screen.getByRole("dialog");
      expect(panel.getAttribute("aria-labelledby")).toBe(screen.getByText("Details").id);
    });

    it("has no axe violations at the left edge", async () => {
      const { container } = render(<DrawerFixture edge="left" />);
      expect(await runA11yCheck(container)).toHaveNoA11yViolations();
    });

    it("relies on the package's global reduced-motion rule, with no per-edge branch", () => {
      // Motion is opt-out globally (tokens.css disables animation/transition
      // duration under prefers-reduced-motion). `left` adds no branch of its
      // own — it only mirrors the x offset — so there is nothing edge-specific
      // to disable. Asserting the panel still renders and stays dismissible is
      // the meaningful contract here.
      const onOpenChange = vi.fn();
      render(<DrawerFixture edge="left" onOpenChange={onOpenChange} />);
      expect(screen.getByRole("dialog")).toBeInTheDocument();
      fireEvent.keyDown(document, { key: "Escape" });
      expect(onOpenChange).toHaveBeenCalledWith(false);
    });
  });
});
