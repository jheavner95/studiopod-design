import { describe, it, expect } from "vitest";
import { render, screen } from "@test/render";
import { runA11yCheck } from "@test/a11y";
import { WarningState } from "./WarningState";

describe("WarningState", () => {
  describe("rendering", () => {
    it("renders its title and a default AlertTriangle icon", () => {
      const { container } = render(<WarningState title="3 assets are missing metadata" />);
      expect(screen.getByText("3 assets are missing metadata")).toBeInTheDocument();
      expect(container.querySelector("svg")).toBeInTheDocument();
    });

    it("accepts a caller-supplied icon override, same as EmptyState", () => {
      render(<WarningState title="Heads up" icon={<span data-testid="custom-icon">★</span>} />);
      expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
    });
  });

  describe("state coverage", () => {
    it("locks tone to warning, exposed as role=status — non-blocking, the reader can still proceed", () => {
      render(<WarningState title="Heads up" />);
      expect(screen.getByRole("status")).toBeInTheDocument();
    });
  });

  describe("accessibility", () => {
    it("has no axe violations with description and action", async () => {
      const { container } = render(
        <WarningState title="Heads up" description="Some fields are incomplete." action={<button type="button">Review</button>} />,
      );
      expect(await runA11yCheck(container)).toHaveNoA11yViolations();
    });
  });
});
