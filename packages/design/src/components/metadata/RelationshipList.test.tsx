import { describe, it, expect } from "vitest";
import { render, screen } from "@test/render";
import { runA11yCheck } from "@test/a11y";
import { RelationshipList } from "./RelationshipList";

describe("RelationshipList", () => {
  describe("rendering", () => {
    it("renders every item's label", () => {
      render(
        <RelationshipList
          items={[
            { label: "Q3 Launch campaign", href: "/campaign" },
            { label: "Instagram platform", href: "/platform" },
          ]}
        />,
      );
      expect(screen.getByText("Q3 Launch campaign")).toBeInTheDocument();
      expect(screen.getByText("Instagram platform")).toBeInTheDocument();
    });

    it("renders the default empty-state message when items is empty", () => {
      render(<RelationshipList items={[]} />);
      expect(screen.getByText("No related items")).toBeInTheDocument();
    });

    it("supports a custom empty-state message", () => {
      render(<RelationshipList items={[]} emptyLabel="Nothing linked yet" />);
      expect(screen.getByText("Nothing linked yet")).toBeInTheDocument();
    });
  });

  describe("state coverage", () => {
    it("renders an item with an href as a real link", () => {
      render(<RelationshipList items={[{ label: "Campaign", href: "/campaign" }]} />);
      expect(screen.getByRole("link", { name: /Campaign/ })).toHaveAttribute("href", "/campaign");
    });

    it("renders an item without an href as plain non-interactive content", () => {
      render(<RelationshipList items={[{ label: "Campaign" }]} />);
      expect(screen.queryByRole("link")).not.toBeInTheDocument();
      expect(screen.getByText("Campaign")).toBeInTheDocument();
    });

    it("renders meta content alongside the label when given", () => {
      render(<RelationshipList items={[{ label: "Campaign", meta: "3 assets" }]} />);
      expect(screen.getByText("3 assets")).toBeInTheDocument();
    });
  });

  describe("accessibility", () => {
    it("has no axe violations, populated and empty", async () => {
      const { container, rerender } = render(<RelationshipList items={[{ label: "Campaign", href: "/campaign" }]} />);
      expect(await runA11yCheck(container)).toHaveNoA11yViolations();
      rerender(<RelationshipList items={[]} />);
      expect(await runA11yCheck(container)).toHaveNoA11yViolations();
    });
  });
});
