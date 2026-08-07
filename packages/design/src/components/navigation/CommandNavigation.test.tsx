import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@test/render";
import { runA11yCheck } from "@test/a11y";
import { CommandNavigation } from "./CommandNavigation";

const ITEMS = [{ id: "home", label: "Home", group: "Navigation destinations", onSelect: () => {} }];

describe("CommandNavigation", () => {
  describe("rendering", () => {
    it("renders a visible 'Search…' trigger by default", () => {
      render(<CommandNavigation items={ITEMS} />);
      expect(screen.getByText("Search…")).toBeInTheDocument();
    });

    it("opens the command palette when clicked", () => {
      render(<CommandNavigation items={ITEMS} />);
      fireEvent.click(screen.getByRole("button"));
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });
  });

  describe("state coverage", () => {
    it("drops the visible label and requires an explicit aria-label in compact mode", () => {
      render(<CommandNavigation items={ITEMS} compact />);
      expect(screen.queryByText("Search…")).not.toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Search" })).toBeInTheDocument();
    });

    it("shows the shortcut key hint, uppercased, in full mode", () => {
      render(<CommandNavigation items={ITEMS} shortcutKey="p" />);
      expect(screen.getByText("P")).toBeInTheDocument();
    });
  });

  describe("accessibility", () => {
    it("has no axe violations, full and compact", async () => {
      const { container, rerender } = render(<CommandNavigation items={ITEMS} />);
      expect(await runA11yCheck(container)).toHaveNoA11yViolations();
      rerender(<CommandNavigation items={ITEMS} compact />);
      expect(await runA11yCheck(container)).toHaveNoA11yViolations();
    });
  });
});
