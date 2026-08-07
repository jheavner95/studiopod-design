import { describe, it, expect } from "vitest";
import { render, screen } from "@test/render";
import { runA11yCheck } from "@test/a11y";
import { SuccessState } from "./SuccessState";

describe("SuccessState", () => {
  describe("rendering", () => {
    it("renders its title and a default CheckCircle2 icon", () => {
      const { container } = render(<SuccessState title="Publish succeeded" />);
      expect(screen.getByText("Publish succeeded")).toBeInTheDocument();
      expect(container.querySelector("svg")).toBeInTheDocument();
    });

    it("accepts a caller-supplied icon override, same as EmptyState", () => {
      render(<SuccessState title="Done" icon={<span data-testid="custom-icon">★</span>} />);
      expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
    });
  });

  describe("state coverage", () => {
    it("locks tone to success, exposed as role=status — not a caller-configurable prop", () => {
      render(<SuccessState title="Publish succeeded" />);
      expect(screen.getByRole("status")).toBeInTheDocument();
    });
  });

  describe("accessibility", () => {
    it("has no axe violations with description and action", async () => {
      const { container } = render(
        <SuccessState title="Publish succeeded" description="Your changes are live." action={<button type="button">View</button>} />,
      );
      expect(await runA11yCheck(container)).toHaveNoA11yViolations();
    });
  });
});
