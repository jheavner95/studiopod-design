import { describe, it, expect } from "vitest";
import { render, screen } from "@test/render";
import { runA11yCheck } from "@test/a11y";
import { EmptyState } from "./EmptyState";

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
});
