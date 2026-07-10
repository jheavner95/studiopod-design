import type { ReactNode } from "react";
import { Tabs, TabsList, Tab, TabPanel } from "@/components/navigation";

export interface InspectorTabDef {
  id: string;
  label: ReactNode;
  count?: ReactNode;
  disabled?: boolean;
}

interface InspectorTabsProps {
  tabs: InspectorTabDef[];
  value: string;
  onValueChange: (value: string) => void;
  /** TabPanel(s) — import TabPanel from @/components/navigation directly, re-exported below for convenience. */
  children: ReactNode;
  ariaLabel?: string;
  className?: string;
}

/**
 * Switching between panel views (Properties/Relationships/Activity, or
 * whatever the caller needs) without leaving the Inspector — a thin,
 * data-driven convenience over Foundation Navigation's own Tabs/TabsList/Tab,
 * not a reimplementation of the ARIA tabs pattern those already own.
 */
export function InspectorTabs({ tabs, value, onValueChange, children, ariaLabel = "Inspector sections", className }: InspectorTabsProps) {
  return (
    <Tabs value={value} onValueChange={onValueChange} className={className}>
      <TabsList aria-label={ariaLabel}>
        {tabs.map((tab) => (
          <Tab key={tab.id} value={tab.id} count={tab.count} disabled={tab.disabled}>
            {tab.label}
          </Tab>
        ))}
      </TabsList>
      {children}
    </Tabs>
  );
}

export { TabPanel as InspectorTabPanel };
