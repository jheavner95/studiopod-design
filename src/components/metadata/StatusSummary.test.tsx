import { describe, it, expect } from "vitest";
import { render, screen } from "@test/render";
import { runA11yCheck } from "@test/a11y";
import { StatusSummary } from "./StatusSummary";

describe("StatusSummary", () => {
  describe("rendering", () => {
    it("renders every item's label", () => {
      render(
        <StatusSummary
          items={[
            { label: "Approved", tone: "success" },
            { label: "Needs review", tone: "warning" },
          ]}
        />,
      );
      expect(screen.getByText("Approved")).toBeInTheDocument();
      expect(screen.getByText("Needs review")).toBeInTheDocument();
    });
  });

  describe("state coverage", () => {
    it("defaults tone to neutral when omitted", () => {
      render(<StatusSummary items={[{ label: "Draft" }]} />);
      expect(screen.getByText("Draft")).toBeInTheDocument();
    });

    it("renders a distinct Badge element per item, each keyed by its own label", () => {
      render(
        <StatusSummary
          items={[
            { label: "Approved", tone: "success" },
            { label: "Needs review", tone: "warning" },
          ]}
        />,
      );
      expect(screen.getByText("Approved")).not.toBe(screen.getByText("Needs review"));
    });
  });

  describe("accessibility", () => {
    it("has no axe violations", async () => {
      const { container } = render(<StatusSummary items={[{ label: "Approved", tone: "success" }]} />);
      expect(await runA11yCheck(container)).toHaveNoA11yViolations();
    });
  });
});
