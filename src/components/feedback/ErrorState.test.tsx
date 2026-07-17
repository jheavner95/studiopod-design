import { describe, it, expect } from "vitest";
import { render, screen } from "@test/render";
import { runA11yCheck } from "@test/a11y";
import { ErrorState } from "./ErrorState";

describe("ErrorState", () => {
  describe("rendering", () => {
    it("renders its title and a default AlertCircle icon", () => {
      const { container } = render(<ErrorState title="Failed to load" />);
      expect(screen.getByText("Failed to load")).toBeInTheDocument();
      expect(container.querySelector("svg")).toBeInTheDocument();
    });

    it("accepts a caller-supplied icon override, same as EmptyState", () => {
      render(<ErrorState title="Failed" icon={<span data-testid="custom-icon">★</span>} />);
      expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
    });
  });

  describe("state coverage", () => {
    it("locks tone to error, exposed as the assertive role=alert — not a caller-configurable prop", () => {
      render(<ErrorState title="Failed to load" />);
      expect(screen.getByRole("alert")).toBeInTheDocument();
    });
  });

  describe("accessibility", () => {
    it("has no axe violations with a retry action", async () => {
      const { container } = render(
        <ErrorState title="Failed to load" description="Check your connection and try again." action={<button type="button">Retry</button>} />,
      );
      expect(await runA11yCheck(container)).toHaveNoA11yViolations();
    });
  });
});
