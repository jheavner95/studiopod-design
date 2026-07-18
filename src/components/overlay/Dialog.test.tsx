import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@test/render";
import { runA11yCheck } from "@test/a11y";
import { Dialog } from "./Dialog";
import { DialogHeader, DialogTitle, DialogDescription, DialogBody, DialogFooter, DialogClose } from "./DialogParts";

function Full({ onOpenChange = () => {}, ...props }: Partial<React.ComponentProps<typeof Dialog>> = {}) {
  return (
    <Dialog open onOpenChange={onOpenChange} {...props}>
      <DialogHeader>
        <DialogTitle>Rename workspace</DialogTitle>
        <DialogDescription>This changes the URL slug.</DialogDescription>
        <DialogClose />
      </DialogHeader>
      <DialogBody>
        <input aria-label="name" />
      </DialogBody>
      <DialogFooter>
        <button>Save</button>
      </DialogFooter>
    </Dialog>
  );
}

describe("Dialog", () => {
  describe("rendering", () => {
    it("renders nothing when closed", () => {
      render(
        <Dialog open={false} onOpenChange={() => {}}>
          <DialogTitle>Hidden</DialogTitle>
        </Dialog>,
      );
      expect(screen.queryByText("Hidden")).toBeNull();
    });

    it("renders a role=dialog with aria-modal when open", () => {
      render(<Full />);
      const dialog = screen.getByRole("dialog");
      expect(dialog).toHaveAttribute("aria-modal", "true");
    });

    it("supports role=alertdialog override", () => {
      render(
        <Dialog open onOpenChange={() => {}} role="alertdialog">
          <DialogTitle>Alert</DialogTitle>
        </Dialog>,
      );
      expect(screen.getByRole("alertdialog")).toBeInTheDocument();
    });
  });

  describe("accessibility auto-registration (DS-5K)", () => {
    it("wires aria-labelledby to the DialogTitle's id — no consumer plumbing", () => {
      render(<Full />);
      const dialog = screen.getByRole("dialog");
      const title = screen.getByText("Rename workspace");
      expect(title.id).toBeTruthy();
      expect(dialog.getAttribute("aria-labelledby")).toBe(title.id);
    });

    it("wires aria-describedby to the DialogDescription's id", () => {
      render(<Full />);
      const dialog = screen.getByRole("dialog");
      const desc = screen.getByText("This changes the URL slug.");
      expect(desc.id).toBeTruthy();
      expect(dialog.getAttribute("aria-describedby")).toBe(desc.id);
    });

    it("sets no aria-labelledby/describedby when no title/description is composed", () => {
      render(
        <Dialog open onOpenChange={() => {}}>
          <div>bare</div>
        </Dialog>,
      );
      const dialog = screen.getByRole("dialog");
      expect(dialog.getAttribute("aria-labelledby")).toBeNull();
      expect(dialog.getAttribute("aria-describedby")).toBeNull();
    });

    it("honors an explicit labelledBy/describedBy override", () => {
      render(
        <Dialog open onOpenChange={() => {}} labelledBy="ext-title" describedBy="ext-desc">
          <DialogTitle>ignored for wiring</DialogTitle>
        </Dialog>,
      );
      const dialog = screen.getByRole("dialog");
      expect(dialog.getAttribute("aria-labelledby")).toBe("ext-title");
      expect(dialog.getAttribute("aria-describedby")).toBe("ext-desc");
    });

    it("renders the title as a semantic heading", () => {
      render(<Full />);
      expect(screen.getByRole("heading", { name: "Rename workspace" })).toBeInTheDocument();
    });
  });

  describe("close behavior", () => {
    it("DialogClose invokes onOpenChange(false) with an accessible label", () => {
      const onOpenChange = vi.fn();
      render(<Full onOpenChange={onOpenChange} />);
      const close = screen.getByRole("button", { name: "Close" });
      fireEvent.click(close);
      expect(onOpenChange).toHaveBeenCalledWith(false);
    });

    it("Escape closes when dismissible", () => {
      const onOpenChange = vi.fn();
      render(<Full onOpenChange={onOpenChange} />);
      fireEvent.keyDown(document, { key: "Escape" });
      expect(onOpenChange).toHaveBeenCalledWith(false);
    });

    it("Escape does NOT close when dismissible={false}", () => {
      const onOpenChange = vi.fn();
      render(<Full onOpenChange={onOpenChange} dismissible={false} />);
      fireEvent.keyDown(document, { key: "Escape" });
      expect(onOpenChange).not.toHaveBeenCalled();
    });

    it("backdrop click closes when dismissible, not when not", () => {
      const onOpenChange = vi.fn();
      const { rerender } = render(<Full onOpenChange={onOpenChange} />);
      // backdrop is the aria-hidden overlay behind the panel
      const backdrop = document.querySelector('[aria-hidden="true"]') as HTMLElement;
      fireEvent.click(backdrop);
      expect(onOpenChange).toHaveBeenCalledWith(false);

      onOpenChange.mockClear();
      rerender(<Full onOpenChange={onOpenChange} dismissible={false} />);
      const backdrop2 = document.querySelector('[aria-hidden="true"]') as HTMLElement;
      fireEvent.click(backdrop2);
      expect(onOpenChange).not.toHaveBeenCalled();
    });
  });

  describe("focus management", () => {
    it("moves focus into the dialog on open", () => {
      render(<Full />);
      // first focusable (the header close button) receives focus
      expect(document.activeElement).toBe(screen.getByRole("button", { name: "Close" }));
    });
  });

  describe("composition parts", () => {
    it("DialogBody owns a scroll region", () => {
      render(<Full />);
      const body = screen.getByLabelText("name").closest("div");
      expect(body).toHaveClass("overflow-y-auto");
    });

    it("DialogFooter renders a right-aligned action row", () => {
      render(<Full />);
      const footer = screen.getByText("Save").closest("footer");
      expect(footer).toHaveClass("justify-end");
    });

    it("a part used outside a surface throws a helpful error", () => {
      const spy = vi.spyOn(console, "error").mockImplementation(() => {});
      expect(() => render(<DialogTitle>orphan</DialogTitle>)).toThrow(/must be rendered inside/);
      spy.mockRestore();
    });
  });

  describe("accessibility", () => {
    it("has no axe violations", async () => {
      render(<Full />);
      expect(await runA11yCheck(screen.getByRole("dialog"))).toHaveNoA11yViolations();
    });
  });
});
