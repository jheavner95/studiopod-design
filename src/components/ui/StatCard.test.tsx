import { describe, it, expect } from "vitest";
import { render, screen } from "@test/render";
import { runA11yCheck } from "@test/a11y";
import { StatCard } from "./StatCard";

describe("StatCard", () => {
  describe("rendering", () => {
    it("renders its required value and label", () => {
      render(<StatCard value="24" label="Active jobs" />);
      expect(screen.getByText("24")).toBeInTheDocument();
      expect(screen.getByText("Active jobs")).toBeInTheDocument();
    });

    it("renders description and trend only when given", () => {
      const { rerender } = render(<StatCard value="24" label="Active jobs" />);
      expect(screen.queryByText("Up from 18 yesterday")).not.toBeInTheDocument();
      rerender(<StatCard value="24" label="Active jobs" description="Up from 18 yesterday" trend="+33%" />);
      expect(screen.getByText("Up from 18 yesterday")).toBeInTheDocument();
      expect(screen.getByText("+33%")).toBeInTheDocument();
    });
  });

  describe("accessibility", () => {
    it("has no axe violations", async () => {
      const { container } = render(<StatCard value="24" label="Active jobs" description="Up from 18 yesterday" trend="+33%" />);
      expect(await runA11yCheck(container)).toHaveNoA11yViolations();
    });
  });
});
