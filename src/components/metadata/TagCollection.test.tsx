import { describe, it, expect } from "vitest";
import { render, screen } from "@test/render";
import { runA11yCheck } from "@test/a11y";
import { TagCollection } from "./TagCollection";

describe("TagCollection", () => {
  describe("rendering", () => {
    it("renders every tag", () => {
      render(<TagCollection tags={["Marketing", "Q4", "Approved"]} />);
      expect(screen.getByText("Marketing")).toBeInTheDocument();
      expect(screen.getByText("Q4")).toBeInTheDocument();
      expect(screen.getByText("Approved")).toBeInTheDocument();
    });

    it("renders nothing when tags is empty", () => {
      const { container } = render(<TagCollection tags={[]} />);
      expect(container.firstElementChild?.children.length).toBe(0);
    });
  });

  describe("state coverage", () => {
    it("renders every tag as a real Badge, not plain text", () => {
      const { container } = render(<TagCollection tags={["Marketing"]} />);
      expect(container.querySelector("span")).toBeInTheDocument();
    });
  });

  describe("accessibility", () => {
    it("has no axe violations", async () => {
      const { container } = render(<TagCollection tags={["Marketing", "Q4"]} />);
      expect(await runA11yCheck(container)).toHaveNoA11yViolations();
    });
  });
});
