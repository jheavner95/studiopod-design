import { describe, it, expect } from "vitest";
import { render, screen } from "@test/render";
import { runA11yCheck } from "@test/a11y";
import { NavigationDivider } from "./NavigationDivider";

describe("NavigationDivider", () => {
  describe("rendering", () => {
    it("renders a single rule element", () => {
      const { container } = render(<NavigationDivider className="my-divider" />);
      expect(container.querySelector(".my-divider")).toBeInTheDocument();
    });
  });

  describe("state coverage", () => {
    it("defaults to a horizontal rule", () => {
      render(<NavigationDivider />);
      expect(screen.getByRole("separator")).toHaveAttribute("aria-orientation", "horizontal");
    });

    it("supports a vertical rule", () => {
      render(<NavigationDivider orientation="vertical" />);
      expect(screen.getByRole("separator")).toHaveAttribute("aria-orientation", "vertical");
    });
  });

  describe("accessibility", () => {
    it("has no axe violations", async () => {
      const { container } = render(<NavigationDivider />);
      expect(await runA11yCheck(container)).toHaveNoA11yViolations();
    });
  });
});
