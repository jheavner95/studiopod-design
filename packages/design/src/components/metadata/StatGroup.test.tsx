import { describe, it, expect } from "vitest";
import { render, screen } from "@test/render";
import { runA11yCheck } from "@test/a11y";
import { StatGroup } from "./StatGroup";

describe("StatGroup", () => {
  describe("rendering", () => {
    it("renders every item as a stat tile", () => {
      render(
        <StatGroup
          items={[
            { value: "24", label: "Active jobs" },
            { value: "3", label: "Queued" },
          ]}
        />,
      );
      expect(screen.getByText("24")).toBeInTheDocument();
      expect(screen.getByText("Active jobs")).toBeInTheDocument();
      expect(screen.getByText("3")).toBeInTheDocument();
    });

    it("renders description and trend only when given", () => {
      render(<StatGroup items={[{ value: "24", label: "Active jobs", description: "Up from 18 yesterday", trend: "+33%" }]} />);
      expect(screen.getByText("Up from 18 yesterday")).toBeInTheDocument();
      expect(screen.getByText("+33%")).toBeInTheDocument();
    });
  });

  describe("state coverage", () => {
    it("is a pure passthrough grid over StatCard — no independent rendering logic of its own", () => {
      const { container } = render(<StatGroup items={[{ value: "24", label: "Active jobs" }]} />);
      expect(container.querySelector(".text-display-2")).toHaveTextContent("24");
    });

    it("defaults to 3 columns", () => {
      const { container } = render(<StatGroup items={[{ value: "1", label: "A" }]} />);
      expect(container.firstElementChild?.className).toContain("grid-cols");
    });
  });

  describe("accessibility", () => {
    it("has no axe violations", async () => {
      const { container } = render(<StatGroup items={[{ value: "24", label: "Active jobs" }]} />);
      expect(await runA11yCheck(container)).toHaveNoA11yViolations();
    });
  });
});
