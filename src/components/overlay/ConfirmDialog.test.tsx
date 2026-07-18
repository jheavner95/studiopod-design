import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@test/render";
import { runA11yCheck } from "@test/a11y";
import { ConfirmDialog } from "./ConfirmDialog";

function open(props: Partial<React.ComponentProps<typeof ConfirmDialog>> = {}) {
  return render(
    <ConfirmDialog
      open
      onOpenChange={props.onOpenChange ?? (() => {})}
      onConfirm={props.onConfirm ?? (() => {})}
      title="Delete style?"
      description="This cannot be undone."
      {...props}
    />,
  );
}

describe("ConfirmDialog", () => {
  it("renders an alert dialog with Cancel + Confirm", () => {
    open();
    expect(screen.getByRole("alertdialog")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Confirm" })).toBeInTheDocument();
  });

  it("wires the title as the accessible name (alertdialog semantics)", () => {
    open();
    const dialog = screen.getByRole("alertdialog");
    expect(dialog.getAttribute("aria-labelledby")).toBe(screen.getByText("Delete style?").id);
    expect(dialog.getAttribute("aria-describedby")).toBe(screen.getByText("This cannot be undone.").id);
  });

  it("uses custom labels", () => {
    open({ confirmLabel: "Delete", cancelLabel: "Keep" });
    expect(screen.getByRole("button", { name: "Delete" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Keep" })).toBeInTheDocument();
  });

  it("default tone → Confirm is the primary Button", () => {
    open({ confirmLabel: "Go" });
    expect(screen.getByRole("button", { name: "Go" })).toHaveClass("bg-accent-500");
  });

  it("destructive tone → Confirm is the destructive Button", () => {
    open({ tone: "destructive", confirmLabel: "Delete" });
    const confirm = screen.getByRole("button", { name: "Delete" });
    expect(confirm).toHaveClass("bg-error");
    expect(confirm).not.toHaveClass("bg-accent-500");
  });

  it("Confirm fires onConfirm; Cancel fires onOpenChange(false)", () => {
    const onConfirm = vi.fn();
    const onOpenChange = vi.fn();
    open({ onConfirm, onOpenChange });
    fireEvent.click(screen.getByRole("button", { name: "Confirm" }));
    expect(onConfirm).toHaveBeenCalledTimes(1);
    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("Escape cancels", () => {
    const onOpenChange = vi.fn();
    open({ onOpenChange });
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("defaults focus to the safe action (Cancel first)", () => {
    open({ tone: "destructive" });
    expect(document.activeElement).toBe(screen.getByRole("button", { name: "Cancel" }));
  });

  describe("loading", () => {
    it("disables both actions and blocks Escape/dismissal while pending", () => {
      const onOpenChange = vi.fn();
      const onConfirm = vi.fn();
      open({ loading: true, onOpenChange, onConfirm });
      const confirm = screen.getByRole("button", { name: "Confirm" });
      const cancel = screen.getByRole("button", { name: "Cancel" });
      // Cancel is a real disabled button; Confirm is aria-disabled via Button loading
      expect(cancel).toBeDisabled();
      expect(confirm).toHaveAttribute("aria-busy", "true");
      fireEvent.keyDown(document, { key: "Escape" });
      expect(onOpenChange).not.toHaveBeenCalled();
    });
  });

  it("has no axe violations (default and destructive)", async () => {
    const { rerender } = open();
    expect(await runA11yCheck(screen.getByRole("alertdialog"))).toHaveNoA11yViolations();
    rerender(
      <ConfirmDialog open onOpenChange={() => {}} onConfirm={() => {}} title="Delete?" tone="destructive" />,
    );
    expect(await runA11yCheck(screen.getByRole("alertdialog"))).toHaveNoA11yViolations();
  });
});
