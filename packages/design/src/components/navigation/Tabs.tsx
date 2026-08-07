"use client";

import { createContext, useContext, useId, type KeyboardEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import {
  CONTROL_ICON_SLOT_CLASSES,
  CONTROL_TAB_CLASSES,
  CONTROL_TAB_COUNT_CLASSES,
  type ControlSize,
} from "@/lib/control-size";

interface TabsContextValue {
  value: string;
  onValueChange: (value: string) => void;
  idPrefix: string;
  /** DS-5O: provided by `Tabs` so every `Tab` inherits it — never passed per tab. */
  size: ControlSize;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext(component: string): TabsContextValue {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error(`${component} must be used within <Tabs>`);
  return ctx;
}

interface TabsProps {
  value: string;
  onValueChange: (value: string) => void;
  children: ReactNode;
  /**
   * DS-5O — the shared `ControlSize` scale. `md` (default) is the traditional
   * page tab bar; `sm` (~28px) is the operational density for workspace
   * headers, inspector tabs, and other dense surfaces. Set it once here — it
   * reaches every `Tab` through context.
   */
  size?: ControlSize;
  className?: string;
}

/**
 * ARIA tabs pattern for switching between views that share the same context without
 * navigating away — tablist/tab/tabpanel, roving tabindex, arrow-key navigation. Distinct
 * from SegmentedControl: that's a choice input (role="radiogroup"), this is a navigation
 * pattern that changes which content panel is visible.
 */
export function Tabs({ value, onValueChange, children, size = "md", className }: TabsProps) {
  const idPrefix = useId();
  return (
    <TabsContext.Provider value={{ value, onValueChange, idPrefix, size }}>
      <div className={cn("flex flex-col gap-3", className)}>{children}</div>
    </TabsContext.Provider>
  );
}

interface TabsListProps {
  children: ReactNode;
  "aria-label": string;
  className?: string;
}

export function TabsList({ children, "aria-label": ariaLabel, className }: TabsListProps) {
  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const container = event.currentTarget;
    const tabs = Array.from(container.querySelectorAll<HTMLButtonElement>('[role="tab"]:not(:disabled)'));
    const currentIndex = tabs.indexOf(document.activeElement as HTMLButtonElement);
    if (currentIndex === -1) return;

    let nextIndex: number | null = null;
    if (event.key === "ArrowRight") nextIndex = (currentIndex + 1) % tabs.length;
    else if (event.key === "ArrowLeft") nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = tabs.length - 1;

    if (nextIndex !== null) {
      event.preventDefault();
      tabs[nextIndex].focus();
      tabs[nextIndex].click();
    }
  }

  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      onKeyDown={handleKeyDown}
      className={cn("flex items-center gap-1 overflow-x-auto border-b border-border-subtle", className)}
    >
      {children}
    </div>
  );
}

interface TabProps {
  value: string;
  children: ReactNode;
  disabled?: boolean;
  /** A count or status badge rendered after the label — the "with counts/badges per tab" variant. */
  count?: ReactNode;
  className?: string;
}

export function Tab({ value, children, disabled = false, count, className }: TabProps) {
  const ctx = useTabsContext("Tab");
  const selected = ctx.value === value;
  const tabId = `${ctx.idPrefix}-tab-${value}`;
  const panelId = `${ctx.idPrefix}-panel-${value}`;

  return (
    <button
      type="button"
      role="tab"
      id={tabId}
      aria-selected={selected}
      aria-controls={panelId}
      disabled={disabled}
      tabIndex={selected ? 0 : -1}
      onClick={() => !disabled && ctx.onValueChange(value)}
      className={cn(
        "focus-ring flex shrink-0 items-center gap-1.5 whitespace-nowrap border-b-2 font-medium transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)]",
        CONTROL_TAB_CLASSES[ctx.size],
        CONTROL_ICON_SLOT_CLASSES[ctx.size],
        selected ? "border-accent-400 text-ink-primary" : "border-transparent text-ink-tertiary hover:text-ink-secondary",
        disabled && "pointer-events-none opacity-40",
        className,
      )}
    >
      {children}
      {count !== undefined ? (
        <span className={cn("rounded-full bg-surface-hover text-ink-tertiary", CONTROL_TAB_COUNT_CLASSES[ctx.size])}>
          {count}
        </span>
      ) : null}
    </button>
  );
}

interface TabPanelProps {
  value: string;
  children: ReactNode;
  className?: string;
}

export function TabPanel({ value, children, className }: TabPanelProps) {
  const ctx = useTabsContext("TabPanel");
  const selected = ctx.value === value;
  const tabId = `${ctx.idPrefix}-tab-${value}`;
  const panelId = `${ctx.idPrefix}-panel-${value}`;

  if (!selected) return null;
  return (
    <div role="tabpanel" id={panelId} aria-labelledby={tabId} tabIndex={0} className={cn("focus-ring rounded-md", className)}>
      {children}
    </div>
  );
}
