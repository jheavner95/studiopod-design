import { describe, it, expect } from "vitest";
import { render, screen } from "@test/render";
import { runA11yCheck } from "@test/a11y";
import { DescriptionList } from "./DescriptionList";

const items = [
  { label: "Status", value: "Active" },
  { label: "Owner", value: "Jordan" },
];

describe("DescriptionList", () => {
  describe("rendering", () => {
    it("renders every item's label and value", () => {
      render(<DescriptionList items={items} />);
      expect(screen.getByText("Status")).toBeInTheDocument();
      expect(screen.getByText("Active")).toBeInTheDocument();
      expect(screen.getByText("Owner")).toBeInTheDocument();
      expect(screen.getByText("Jordan")).toBeInTheDocument();
    });

    it("renders as a real <dl> with matching <dt>/<dd> pairs", () => {
      const { container } = render(<DescriptionList items={items} />);
      expect(container.querySelectorAll("dt")).toHaveLength(2);
      expect(container.querySelectorAll("dd")).toHaveLength(2);
    });
  });

  describe("state coverage", () => {
    it("wraps in a bordered card by default", () => {
      const { container } = render(<DescriptionList items={items} />);
      expect(container.querySelector(".border-border-subtle")).toBeInTheDocument();
    });

    it("returns a bare <dl> with no wrapping card when bordered is false", () => {
      const { container } = render(<DescriptionList items={items} bordered={false} />);
      expect(container.firstChild).toHaveProperty("nodeName", "DL");
      expect(container.querySelector(".rounded-lg.bg-surface")).not.toBeInTheDocument();
    });

    it("only the two-column and responsive layouts cap the label column width — stacked never does", () => {
      const { container, rerender } = render(<DescriptionList items={items} layout="stacked" />);
      expect(container.querySelector("dt")).not.toHaveClass("sm:max-w-[110px]");
      rerender(<DescriptionList items={items} layout="two-column" />);
      expect(container.querySelector("dt")).toHaveClass("sm:max-w-[110px]", "lg:max-w-[220px]");
    });
  });

  describe("accessibility", () => {
    it("has no axe violations", async () => {
      const { container } = render(<DescriptionList items={items} />);
      expect(await runA11yCheck(container)).toHaveNoA11yViolations();
    });
  });
});
