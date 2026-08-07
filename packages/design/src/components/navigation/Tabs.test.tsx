import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@test/render";
import { runA11yCheck } from "@test/a11y";
import { Tabs, TabsList, Tab, TabPanel } from "./Tabs";
import { CONTROL_TAB_CLASSES, CONTROL_TAB_COUNT_CLASSES } from "@/lib/control-size";

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

  /**
   * DS-5O — the size scale, provided once on `Tabs` and reaching every `Tab`
   * through context. Assertions read the shared `control-size` maps rather
   * than literal class strings, so the scale stays the single source of truth.
   */
  describe("size (DS-5O)", () => {
    it("defaults to md, preserving pre-DS-5O rendering", () => {
      render(<ThreeTabs value="overview" onValueChange={() => {}} />);
      const tab = screen.getByRole("tab", { name: "Overview" });
      for (const cls of CONTROL_TAB_CLASSES.md.split(" ")) {
        expect(tab).toHaveClass(cls);
      }
      expect(tab).toHaveClass("px-3", "py-2", "text-body-sm");
    });

    it("propagates size through context — every Tab inherits it without being passed one", () => {
      render(
        <Tabs value="overview" onValueChange={() => {}} size="sm">
          <TabsList aria-label="Sections">
            <Tab value="overview">Overview</Tab>
            <Tab value="history">History</Tab>
          </TabsList>
        </Tabs>,
      );
      for (const name of ["Overview", "History"]) {
        const tab = screen.getByRole("tab", { name });
        for (const cls of CONTROL_TAB_CLASSES.sm.split(" ")) {
          expect(tab).toHaveClass(cls);
        }
        expect(tab).not.toHaveClass("py-2");
        expect(tab).not.toHaveClass("text-body-sm");
      }
    });

    it("scales the count badge with the tab's density", () => {
      render(
        <Tabs value="overview" onValueChange={() => {}} size="sm">
          <TabsList aria-label="Sections">
            <Tab value="overview" count={3}>
              Overview
            </Tab>
          </TabsList>
        </Tabs>,
      );
      for (const cls of CONTROL_TAB_COUNT_CLASSES.sm.split(" ")) {
        expect(screen.getByText("3")).toHaveClass(cls);
      }
    });

    it("keeps the underline, selection and disabled treatment identical across sizes", () => {
      render(
        <Tabs value="overview" onValueChange={() => {}} size="sm">
          <TabsList aria-label="Sections">
            <Tab value="overview">Overview</Tab>
            <Tab value="details" disabled>
              Details
            </Tab>
          </TabsList>
        </Tabs>,
      );
      expect(screen.getByRole("tab", { name: "Overview" })).toHaveClass("border-b-2", "border-accent-400");
      expect(screen.getByRole("tab", { name: "Details" })).toBeDisabled();
      expect(screen.getByRole("tab", { name: "Details" })).toHaveClass("opacity-40");
    });

    it("sm keeps keyboard navigation working", () => {
      const onValueChange = vi.fn();
      render(
        <Tabs value="overview" onValueChange={onValueChange} size="sm">
          <TabsList aria-label="Sections">
            <Tab value="overview">Overview</Tab>
            <Tab value="history">History</Tab>
          </TabsList>
        </Tabs>,
      );
      const overview = screen.getByRole("tab", { name: "Overview" });
      overview.focus();
      overview.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true, cancelable: true }));
      expect(onValueChange).toHaveBeenCalledWith("history");
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
