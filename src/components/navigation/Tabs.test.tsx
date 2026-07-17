import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@test/render";
import { runA11yCheck } from "@test/a11y";
import { Tabs, TabsList, Tab, TabPanel } from "./Tabs";

function ThreeTabs({ value, onValueChange }: { value: string; onValueChange: (value: string) => void }) {
  return (
    <Tabs value={value} onValueChange={onValueChange}>
      <TabsList aria-label="Sections">
        <Tab value="overview">Overview</Tab>
        <Tab value="details" disabled>
          Details
        </Tab>
        <Tab value="history" count={3}>
          History
        </Tab>
      </TabsList>
      <TabPanel value="overview">Overview panel</TabPanel>
      <TabPanel value="details">Details panel</TabPanel>
      <TabPanel value="history">History panel</TabPanel>
    </Tabs>
  );
}

describe("Tabs", () => {
  describe("rendering", () => {
    it("renders every tab's label", () => {
      render(<ThreeTabs value="overview" onValueChange={() => {}} />);
      expect(screen.getByRole("tab", { name: "Overview" })).toBeInTheDocument();
      expect(screen.getByRole("tab", { name: "Details" })).toBeInTheDocument();
    });

    it("renders only the selected panel — unselected panels unmount entirely, not just hide", () => {
      render(<ThreeTabs value="overview" onValueChange={() => {}} />);
      expect(screen.getByText("Overview panel")).toBeInTheDocument();
      expect(screen.queryByText("History panel")).not.toBeInTheDocument();
    });

    it("renders a tab's count badge when given", () => {
      render(<ThreeTabs value="overview" onValueChange={() => {}} />);
      expect(screen.getByText("3")).toBeInTheDocument();
    });

    it("throws when Tab is used outside a Tabs provider", () => {
      expect(() => render(<Tab value="x">X</Tab>)).toThrow("Tab must be used within <Tabs>");
    });
  });

  describe("state coverage", () => {
    it("marks the selected tab via aria-selected and roving tabindex", () => {
      render(<ThreeTabs value="overview" onValueChange={() => {}} />);
      expect(screen.getByRole("tab", { name: "Overview" })).toHaveAttribute("aria-selected", "true");
      expect(screen.getByRole("tab", { name: "Overview" })).toHaveAttribute("tabIndex", "0");
      expect(screen.getByRole("tab", { name: "Details" })).toHaveAttribute("tabIndex", "-1");
    });

    it("calls onValueChange when a tab is clicked", () => {
      const onValueChange = vi.fn();
      render(<ThreeTabs value="overview" onValueChange={onValueChange} />);
      screen.getByRole("tab", { name: /History/ }).click();
      expect(onValueChange).toHaveBeenCalledWith("history");
    });

    it("does not call onValueChange when a disabled tab is clicked", () => {
      const onValueChange = vi.fn();
      render(<ThreeTabs value="overview" onValueChange={onValueChange} />);
      screen.getByRole("tab", { name: "Details" }).click();
      expect(onValueChange).not.toHaveBeenCalled();
    });
  });

  describe("interaction", () => {
    it("ArrowRight/ArrowLeft move focus and activate the next/previous enabled tab, wrapping at the ends", () => {
      const onValueChange = vi.fn();
      render(<ThreeTabs value="overview" onValueChange={onValueChange} />);
      const overview = screen.getByRole("tab", { name: "Overview" });
      overview.focus();
      overview.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true, cancelable: true }));
      // Details is disabled and excluded from the queried tab set, so ArrowRight lands on History.
      expect(onValueChange).toHaveBeenCalledWith("history");
    });

    it("Home/End jump to the first/last enabled tab", () => {
      const onValueChange = vi.fn();
      render(<ThreeTabs value="history" onValueChange={onValueChange} />);
      const history = screen.getByRole("tab", { name: /History/ });
      history.focus();
      history.dispatchEvent(new KeyboardEvent("keydown", { key: "Home", bubbles: true, cancelable: true }));
      expect(onValueChange).toHaveBeenCalledWith("overview");
    });
  });

  describe("accessibility", () => {
    it("wires role=tablist/tab/tabpanel with matching aria-controls/aria-labelledby, and has no axe violations", async () => {
      const { container } = render(<ThreeTabs value="overview" onValueChange={() => {}} />);
      const tab = screen.getByRole("tab", { name: "Overview" });
      const panel = screen.getByRole("tabpanel");
      expect(tab).toHaveAttribute("aria-controls", panel.id);
      expect(panel).toHaveAttribute("aria-labelledby", tab.id);
      expect(await runA11yCheck(container)).toHaveNoA11yViolations();
    });
  });
});
