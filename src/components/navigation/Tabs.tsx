"use client";

import { createContext, useContext, useId, type KeyboardEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TabsContextValue {
  value: string;
  onValueChange: (value: string) => void;
  idPrefix: string;
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
  className?: string;
}

/**
 * ARIA tabs pattern for switching between views that share the same context without
 * navigating away — tablist/tab/tabpanel, roving tabindex, arrow-key navigation. Distinct
 * from SegmentedControl: that's a choice input (role="radiogroup"), this is a navigation
 * pattern that changes which content panel is visible.
 */
export function Tabs({ value, onValueChange, children, className }: TabsProps) {
  const idPrefix = useId();
  return (
    <TabsContext.Provider value={{ value, onValueChange, idPrefix }}>
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
        "focus-ring flex shrink-0 items-center gap-1.5 whitespace-nowrap border-b-2 px-3 py-2 text-body-sm font-medium transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)]",
        selected ? "border-accent-400 text-ink-primary" : "border-transparent text-ink-tertiary hover:text-ink-secondary",
        disabled && "pointer-events-none opacity-40",
        className,
      )}
    >
      {children}
      {count !== undefined ? (
        <span className="rounded-full bg-surface-hover px-1.5 py-0.5 text-caption text-ink-tertiary">{count}</span>
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
