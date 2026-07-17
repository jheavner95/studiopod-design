import { describe, it, expect } from "vitest";
import { render, screen } from "@test/render";
import { runA11yCheck } from "@test/a11y";
import { EmptyMetadata } from "./EmptyMetadata";

describe("EmptyMetadata", () => {
  describe("rendering", () => {
    it("renders its required title", () => {
      render(<EmptyMetadata title="No metadata yet" />);
      expect(screen.getByText("No metadata yet")).toBeInTheDocument();
    });

    it("renders description only when given", () => {
      const { rerender } = render(<EmptyMetadata title="No metadata yet" />);
      expect(screen.queryByText("Fields will appear once set.")).not.toBeInTheDocument();
      rerender(<EmptyMetadata title="No metadata yet" description="Fields will appear once set." />);
      expect(screen.getByText("Fields will appear once set.")).toBeInTheDocument();
    });
  });

  describe("accessibility", () => {
    it("has no axe violations", async () => {
      const { container } = render(<EmptyMetadata title="No metadata yet" description="Fields will appear once set." />);
      expect(await runA11yCheck(container)).toHaveNoA11yViolations();
    });
  });
});
