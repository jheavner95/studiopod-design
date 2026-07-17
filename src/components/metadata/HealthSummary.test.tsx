import { describe, it, expect } from "vitest";
import { render, screen } from "@test/render";
import { runA11yCheck } from "@test/a11y";
import { HealthSummary } from "./HealthSummary";

describe("HealthSummary", () => {
  describe("rendering", () => {
    it("renders every metric's label", () => {
      render(
        <HealthSummary
          metrics={[
            { label: "API", state: "healthy" },
            { label: "Queue", state: "degraded" },
          ]}
        />,
      );
      expect(screen.getByText("API")).toBeInTheDocument();
      expect(screen.getByText("Queue")).toBeInTheDocument();
    });
  });

  describe("state coverage", () => {
    it("shows a human-readable default label per state when no detail is given", () => {
      const { rerender } = render(<HealthSummary metrics={[{ label: "API", state: "healthy" }]} />);
      expect(screen.getByText("Healthy")).toBeInTheDocument();
      rerender(<HealthSummary metrics={[{ label: "API", state: "down" }]} />);
      expect(screen.getByText("Down")).toBeInTheDocument();
    });

    it("prefers a custom detail string over the default state label", () => {
      render(<HealthSummary metrics={[{ label: "API", state: "healthy", detail: "99.98% uptime" }]} />);
      expect(screen.getByText("99.98% uptime")).toBeInTheDocument();
      expect(screen.queryByText("Healthy")).not.toBeInTheDocument();
    });

    it("hides the color-coded state dot from assistive tech, since state is also conveyed as text", () => {
      const { container } = render(<HealthSummary metrics={[{ label: "API", state: "healthy" }]} />);
      expect(container.querySelector("[aria-hidden]")).toBeInTheDocument();
    });
  });

  describe("accessibility", () => {
    it("has no axe violations across every state", async () => {
      const { container } = render(
        <HealthSummary
          metrics={[
            { label: "API", state: "healthy" },
            { label: "Queue", state: "degraded" },
            { label: "Storage", state: "down" },
            { label: "Cache", state: "unknown" },
          ]}
        />,
      );
      expect(await runA11yCheck(container)).toHaveNoA11yViolations();
    });
  });
});
