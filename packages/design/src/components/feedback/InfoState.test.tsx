import { describe, it, expect } from "vitest";
import { render, screen } from "@test/render";
import { runA11yCheck } from "@test/a11y";
import { InfoState } from "./InfoState";

describe("InfoState", () => {
  describe("rendering", () => {
    it("renders its title and a default Info icon", () => {
      const { container } = render(<InfoState title="New feature available" />);
      expect(screen.getByText("New feature available")).toBeInTheDocument();
      expect(container.querySelector("svg")).toBeInTheDocument();
    });

    it("accepts a caller-supplied icon override, same as EmptyState", () => {
      render(<InfoState title="Note" icon={<span data-testid="custom-icon">★</span>} />);
      expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
    });
  });

  describe("state coverage", () => {
    it("locks tone to info, exposed as role=status — a neutral, non-urgent heads-up", () => {
      render(<InfoState title="Note" />);
      expect(screen.getByRole("status")).toBeInTheDocument();
    });
  });

  describe("accessibility", () => {
    it("has no axe violations with description and action", async () => {
      const { container } = render(
        <InfoState title="New feature available" description="Try the new bulk export." action={<button type="button">Learn more</button>} />,
      );
      expect(await runA11yCheck(container)).toHaveNoA11yViolations();
    });
  });
});
