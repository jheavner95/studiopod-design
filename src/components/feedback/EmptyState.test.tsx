import { describe, it, expect } from "vitest";
import { render, screen } from "@test/render";
import { runA11yCheck } from "@test/a11y";
import { EmptyState } from "./EmptyState";
import { CONTROL_EMPTY_STATE_CLASSES } from "@/lib/control-size";

describe("EmptyState", () => {
  describe("rendering", () => {
    it("renders its required title", () => {
      render(<EmptyState title="No assets yet" />);
      expect(screen.getByText("No assets yet")).toBeInTheDocument();
    });

    it("renders description and action only when given", () => {
      const { rerender } = render(<EmptyState title="No assets yet" />);
      expect(screen.queryByText("Upload your first file to get started.")).not.toBeInTheDocument();
      rerender(
        <EmptyState
          title="No assets yet"
          description="Upload your first file to get started."
          action={<button type="button">Upload</button>}
        />,
      );
      expect(screen.getByText("Upload your first file to get started.")).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Upload" })).toBeInTheDocument();
    });

    it("renders a default Inbox icon when no icon is given, and the caller's icon when given", () => {
      const { container, rerender } = render(<EmptyState title="No assets yet" />);
      expect(container.querySelector("svg")).toBeInTheDocument();
      rerender(<EmptyState title="No assets yet" icon={<span data-testid="custom-icon">★</span>} />);
      expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
    });
  });

  describe("state coverage", () => {
    it("defaults to neutral tone, exposed as role=status", () => {
      render(<EmptyState title="No assets yet" />);
      expect(screen.getByRole("status")).toBeInTheDocument();
    });

    it("exposes role=alert only for error tone, matching the rest of the feedback family's feedbackRole() convention", () => {
      const { rerender } = render(<EmptyState tone="error" title="Failed to load" />);
      expect(screen.getByRole("alert")).toBeInTheDocument();
      rerender(<EmptyState tone="success" title="Done" />);
      expect(screen.getByRole("status")).toBeInTheDocument();
    });
  });

  describe("accessibility", () => {
    it("has no axe violations with description and action, for every tone", async () => {
      for (const tone of ["neutral", "info", "success", "warning", "error"] as const) {
        const { container, unmount } = render(
          <EmptyState
            tone={tone}
            title="Title"
            description="Description"
            action={<button type="button">Action</button>}
          />,
        );
        expect(await runA11yCheck(container)).toHaveNoA11yViolations();
        unmount();
      }
    });
  });

  /**
   * DS-5P — the shared ControlSize density. Assertions read the
   * `control-size` map rather than literal classes, so retuning the scale
   * cannot leave a stale expectation behind.
   */
  describe("size (DS-5P)", () => {
    it("defaults to md, preserving pre-DS-5P rendering", () => {
      const { container } = render(<EmptyState title="Nothing here" />);
      const root = container.firstElementChild as HTMLElement;
      expect(root).toHaveClass("py-10", "gap-3");
      expect(root.querySelector("span")).toHaveClass("size-11");
    });

    it("renders the operational density at sm — a 28px icon badge", () => {
      const { container } = render(<EmptyState title="Nothing here" size="sm" />);
      const root = container.firstElementChild as HTMLElement;
      for (const cls of CONTROL_EMPTY_STATE_CLASSES.sm.wrapper.split(" ")) {
        expect(root).toHaveClass(cls);
      }
      // size-7 = 28px, the density the operational surfaces need.
      expect(root.querySelector("span")).toHaveClass("size-7");
      expect(root.querySelector("span")).not.toHaveClass("size-11");
    });

    it("does not mix scales — sm carries no md spacing", () => {
      const { container } = render(<EmptyState title="Nothing here" size="sm" />);
      expect(container.firstElementChild).not.toHaveClass("py-10");
    });

    it("keeps a real heading element at sm, only shrinking the type", () => {
      render(<EmptyState title="Nothing here" size="sm" />);
      const heading = screen.getByRole("heading", { name: "Nothing here" });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveClass("text-body-sm");
    });

    it("still renders description and action at sm", () => {
      render(
        <EmptyState
          size="sm"
          title="No results"
          description="Try a different filter."
          action={<button type="button">Clear</button>}
        />,
      );
      expect(screen.getByText("Try a different filter.")).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Clear" })).toBeInTheDocument();
    });

    it("keeps its tone semantics at sm — size and tone are independent axes", () => {
      render(<EmptyState size="sm" tone="error" title="Failed to load" />);
      expect(screen.getByRole("alert")).toBeInTheDocument();
    });

    it.each(["sm", "md"] as const)("has no axe violations at size=%s", async (size) => {
      const { container } = render(
        <EmptyState size={size} title="Title" description="Description" action={<button type="button">Go</button>} />,
      );
      expect(await runA11yCheck(container)).toHaveNoA11yViolations();
    });
  });
});
