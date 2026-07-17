import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@test/render";
import { runA11yCheck } from "@test/a11y";
import { TreeNavigation, type TreeNode } from "./TreeNavigation";

const NODES: TreeNode[] = [
  {
    id: "assets",
    label: "Assets",
    children: [
      { id: "images", label: "Images" },
      { id: "videos", label: "Videos" },
    ],
  },
  { id: "orders", label: "Orders" },
];

function press(el: Element, key: string) {
  fireEvent.keyDown(el, { key });
}

describe("TreeNavigation", () => {
  describe("rendering", () => {
    it("renders every top-level node's label", () => {
      render(<TreeNavigation nodes={NODES} />);
      expect(screen.getByText("Assets")).toBeInTheDocument();
      expect(screen.getByText("Orders")).toBeInTheDocument();
    });

    it("does not render children of a collapsed node", () => {
      render(<TreeNavigation nodes={NODES} />);
      expect(screen.queryByText("Images")).not.toBeInTheDocument();
    });

    it("renders children of a node listed in defaultExpandedIds", () => {
      render(<TreeNavigation nodes={NODES} defaultExpandedIds={["assets"]} />);
      expect(screen.getByText("Images")).toBeInTheDocument();
      expect(screen.getByText("Videos")).toBeInTheDocument();
    });
  });

  describe("state coverage", () => {
    it("marks a node with children as aria-expanded, and a leaf node as having no aria-expanded at all", () => {
      render(<TreeNavigation nodes={NODES} />);
      expect(screen.getByText("Assets").closest('[role="treeitem"]')).toHaveAttribute("aria-expanded", "false");
      expect(screen.getByText("Orders").closest('[role="treeitem"]')).not.toHaveAttribute("aria-expanded");
    });

    it("marks the node matching activeId as aria-selected, via the correct ARIA tree attribute (not aria-current)", () => {
      render(<TreeNavigation nodes={NODES} activeId="orders" />);
      expect(screen.getByText("Orders").closest('[role="treeitem"]')).toHaveAttribute("aria-selected", "true");
      expect(screen.getByText("Assets").closest('[role="treeitem"]')).toHaveAttribute("aria-selected", "false");
    });

    it("calls onSelect and toggles expansion when a parent node is clicked", () => {
      const onSelect = vi.fn();
      render(<TreeNavigation nodes={NODES} onSelect={onSelect} />);
      fireEvent.click(screen.getByText("Assets"));
      expect(onSelect).toHaveBeenCalledWith("assets");
      expect(screen.getByText("Images")).toBeInTheDocument();
    });

    it("only the focused node is a real Tab stop — single-tab-stop roving tabindex per the ARIA tree pattern", () => {
      render(<TreeNavigation nodes={NODES} activeId="assets" />);
      expect(screen.getByText("Assets").closest('[role="treeitem"]')).toHaveAttribute("tabIndex", "0");
      expect(screen.getByText("Orders").closest('[role="treeitem"]')).toHaveAttribute("tabIndex", "-1");
    });
  });

  describe("interaction", () => {
    it("ArrowRight expands a collapsed parent node without moving focus off it", () => {
      render(<TreeNavigation nodes={NODES} activeId="assets" />);
      const assets = screen.getByText("Assets").closest('[role="treeitem"]')!;
      press(assets, "ArrowRight");
      expect(screen.getByText("Images")).toBeInTheDocument();
    });

    it("ArrowRight on an already-expanded parent moves focus to its first child", () => {
      render(<TreeNavigation nodes={NODES} activeId="assets" defaultExpandedIds={["assets"]} />);
      const assets = screen.getByText("Assets").closest('[role="treeitem"]')!;
      press(assets, "ArrowRight");
      expect(screen.getByText("Images").closest('[role="treeitem"]')).toHaveFocus();
    });

    it("ArrowLeft collapses an expanded parent node", () => {
      render(<TreeNavigation nodes={NODES} activeId="assets" defaultExpandedIds={["assets"]} />);
      const assets = screen.getByText("Assets").closest('[role="treeitem"]')!;
      press(assets, "ArrowLeft");
      expect(screen.queryByText("Images")).not.toBeInTheDocument();
    });

    it("ArrowDown/ArrowUp move focus across all visible treeitems, clamped at the ends (no wrap)", () => {
      render(<TreeNavigation nodes={NODES} activeId="assets" defaultExpandedIds={["assets"]} />);
      const assets = screen.getByText("Assets").closest('[role="treeitem"]')!;
      press(assets, "ArrowDown");
      const images = screen.getByText("Images").closest('[role="treeitem"]')!;
      expect(images).toHaveFocus();
      press(images, "ArrowUp");
      expect(assets).toHaveFocus();
    });

    it("Enter and Space select the focused node the same way a click does", () => {
      const onSelect = vi.fn();
      render(<TreeNavigation nodes={NODES} onSelect={onSelect} activeId="orders" />);
      press(screen.getByText("Orders").closest('[role="treeitem"]')!, "Enter");
      expect(onSelect).toHaveBeenCalledWith("orders");
    });
  });

  describe("accessibility", () => {
    it("wires role=tree/treeitem/group correctly, and has no axe violations", async () => {
      const { container } = render(<TreeNavigation nodes={NODES} defaultExpandedIds={["assets"]} activeId="images" />);
      expect(screen.getByRole("tree")).toBeInTheDocument();
      expect(screen.getAllByRole("treeitem").length).toBe(4);
      expect(container.querySelector('ul[role="group"]')).toBeInTheDocument();
      expect(await runA11yCheck(container)).toHaveNoA11yViolations();
    });
  });
});
