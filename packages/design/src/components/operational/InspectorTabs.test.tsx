import { describe, it, expect, vi } from "vitest";
import { useState } from "react";
import { render, screen, userEvent } from "@test/render";
import { runA11yCheck } from "@test/a11y";
import { InspectorTabs, InspectorTabPanel, type InspectorTabDef } from "./InspectorTabs";
import { TabPanel } from "@/components/navigation";

const TABS: InspectorTabDef[] = [
  { id: "properties", label: "Properties" },
  { id: "relationships", label: "Relationships", count: 4 },
  { id: "activity", label: "Activity", disabled: true },
];

function Harness({ onValueChange }: { onValueChange?: (value: string) => void } = {}) {
  const [value, setValue] = useState("properties");
  return (
    <InspectorTabs
      tabs={TABS}
      value={value}
      onValueChange={(next) => {
        setValue(next);
        onValueChange?.(next);
      }}
    >
      <InspectorTabPanel value="properties">Properties panel</InspectorTabPanel>
      <InspectorTabPanel value="relationships">Relationships panel</InspectorTabPanel>
      <InspectorTabPanel value="activity">Activity panel</InspectorTabPanel>
    </InspectorTabs>
  );
}

describe("InspectorTabs", () => {
  describe("rendering", () => {
    it("renders one tab per definition", () => {
      render(<Harness />);
      expect(screen.getAllByRole("tab")).toHaveLength(3);
    });

    it("renders each tab's label", () => {
      render(<Harness />);
      expect(screen.getByRole("tab", { name: /Properties/ })).toBeInTheDocument();
      expect(screen.getByRole("tab", { name: /Relationships/ })).toBeInTheDocument();
    });

    it("renders an optional count on a tab", () => {
      render(<Harness />);
      expect(screen.getByRole("tab", { name: /Relationships/ })).toHaveTextContent("4");
    });

    it("marks a disabled tab as disabled", () => {
      render(<Harness />);
      expect(screen.getByRole("tab", { name: /Activity/ })).toBeDisabled();
    });

    it("forwards className", () => {
      const { container } = render(
        <InspectorTabs tabs={TABS} value="properties" onValueChange={() => {}} className="custom-tabs">
          <InspectorTabPanel value="properties">Panel</InspectorTabPanel>
        </InspectorTabs>,
      );
      expect(container.querySelector(".custom-tabs")).toBeInTheDocument();
    });
  });

  describe("tab semantics", () => {
    it("labels the tablist, defaulting to 'Inspector sections'", () => {
      render(<Harness />);
      expect(screen.getByRole("tablist", { name: "Inspector sections" })).toBeInTheDocument();
    });

    it("honours a custom ariaLabel", () => {
      render(
        <InspectorTabs tabs={TABS} value="properties" onValueChange={() => {}} ariaLabel="Asset detail views">
          <InspectorTabPanel value="properties">Panel</InspectorTabPanel>
        </InspectorTabs>,
      );
      expect(screen.getByRole("tablist", { name: "Asset detail views" })).toBeInTheDocument();
    });

    it("marks exactly one tab selected, matching value", () => {
      render(<Harness />);
      const selected = screen.getAllByRole("tab").filter((tab) => tab.getAttribute("aria-selected") === "true");
      expect(selected).toHaveLength(1);
      expect(selected[0]).toHaveAccessibleName(/Properties/);
    });

    it("links the selected tab to its panel via aria-controls", () => {
      const { container } = render(<Harness />);
      const tab = screen.getByRole("tab", { name: /Properties/ });
      const controls = tab.getAttribute("aria-controls");
      expect(controls).toBeTruthy();
      expect(container.ownerDocument.getElementById(controls!)).toBeInTheDocument();
    });

    it("shows only the selected panel", () => {
      render(<Harness />);
      expect(screen.getByText("Properties panel")).toBeInTheDocument();
      expect(screen.queryByText("Relationships panel")).not.toBeInTheDocument();
    });
  });

  describe("interaction", () => {
    it("reports the new value on click and swaps the visible panel", async () => {
      const onValueChange = vi.fn();
      const user = userEvent.setup();
      render(<Harness onValueChange={onValueChange} />);
      await user.click(screen.getByRole("tab", { name: /Relationships/ }));
      expect(onValueChange).toHaveBeenCalledWith("relationships");
      expect(screen.getByText("Relationships panel")).toBeInTheDocument();
      expect(screen.queryByText("Properties panel")).not.toBeInTheDocument();
    });

    it("does not activate a disabled tab", async () => {
      const onValueChange = vi.fn();
      const user = userEvent.setup();
      render(<Harness onValueChange={onValueChange} />);
      await user.click(screen.getByRole("tab", { name: /Activity/ }));
      expect(onValueChange).not.toHaveBeenCalled();
      expect(screen.getByText("Properties panel")).toBeInTheDocument();
    });

    it("moves between tabs with the arrow keys — the ARIA tabs pattern", async () => {
      const user = userEvent.setup();
      render(<Harness />);
      await user.click(screen.getByRole("tab", { name: /Properties/ }));
      await user.keyboard("{ArrowRight}");
      expect(screen.getByRole("tab", { name: /Relationships/ })).toHaveAttribute("aria-selected", "true");
    });
  });

  describe("re-export alias", () => {
    it("InspectorTabPanel is Navigation's TabPanel, not a second implementation", () => {
      expect(InspectorTabPanel).toBe(TabPanel);
    });
  });

  describe("accessibility", () => {
    it("has no axe violations", async () => {
      const { container } = render(<Harness />);
      expect(await runA11yCheck(container)).toHaveNoA11yViolations();
    });
  });
});
