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
});
