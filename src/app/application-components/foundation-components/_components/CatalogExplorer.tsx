"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { Card, Badge, Body, Caption, Heading, SelectableCard } from "@/components/ui";
import type { InventoryStatus } from "../../inventory/_data/inventory";
import { FOUNDATION_COMPONENTS, FOUNDATION_GROUPS, groupFor, maturityFor, type FoundationComponent } from "../_data/catalog";

const STATUS_TONE: Record<InventoryStatus, "success" | "warning" | "neutral"> = {
  Exists: "success",
  Partial: "warning",
  Needed: "neutral",
};

const MATURITY_TONE: Record<string, "neutral" | "warning" | "accent" | "success"> = {
  Concept: "neutral",
  Prototype: "warning",
  "Production Ready": "accent",
  Certified: "success",
  Locked: "success",
};

/** Local display labels only — the underlying MaturityLevel vocabulary in ../../_data/maturity is shared across other pages and isn't renamed here. */
const MATURITY_LABEL: Record<string, string> = {
  Concept: "Concept",
  Prototype: "Prototype",
  "Production Ready": "Production Ready",
  Certified: "Established",
  Locked: "Established",
};

type GroupFilter = "all" | (typeof FOUNDATION_GROUPS)[number]["id"];
type StatusFilter = "all" | InventoryStatus;

function FilterPill({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "focus-ring rounded-full border px-3 py-1.5 text-caption font-medium transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)]",
        active
          ? "border-accent-500/60 bg-accent-soft/30 text-accent-300"
          : "border-border-subtle bg-surface text-ink-tertiary hover:text-ink-secondary",
      )}
    >
      {label}
    </button>
  );
}

function ComponentCard({ component, selected, onSelect }: { component: FoundationComponent; selected: boolean; onSelect: () => void }) {
  return (
    <SelectableCard
      title={component.name}
      description={component.purpose}
      badge={
        <Badge tone={STATUS_TONE[component.status]} size="sm" className="w-fit shrink-0 whitespace-nowrap">
          {component.status}
        </Badge>
      }
      selected={selected}
      onSelect={onSelect}
      padding="sm"
    />
  );
}

function ComponentDetail({ component }: { component: FoundationComponent }) {
  const group = groupFor(component);
  const maturity = maturityFor(component);
  return (
    <Card padding="lg" className="flex flex-col gap-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex flex-col gap-2">
          <Heading level={3}>{component.name}</Heading>
          <Body muted>{component.purpose}</Body>
        </div>
        <div className="flex flex-wrap justify-end gap-1.5">
          <Badge tone={STATUS_TONE[component.status]} size="sm">
            {component.status}
          </Badge>
          <Badge tone={MATURITY_TONE[maturity]} size="sm">
            {MATURITY_LABEL[maturity]}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Caption className="text-ink-tertiary">Group</Caption>
          <Body size="sm" muted>
            {group.title}
          </Body>
        </div>
        {component.source ? (
          <div className="flex min-w-0 flex-col gap-1.5">
            <Caption className="text-ink-tertiary">Source</Caption>
            <Body size="sm" muted className="min-w-0 break-words">
              {component.source}
            </Body>
          </div>
        ) : null}
      </div>

      <div className="grid grid-cols-1 gap-6 border-t border-border-subtle pt-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Caption className="text-ink-tertiary">Required states</Caption>
          <div className="flex flex-wrap gap-1.5">
            {component.requiredStates.map((state) => (
              <Badge key={state} tone="neutral" size="sm">
                {state}
              </Badge>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <Caption className="text-ink-tertiary">Required variants</Caption>
          <div className="flex flex-wrap gap-1.5">
            {component.requiredVariants.map((variant) => (
              <Badge key={variant} tone="neutral" size="sm">
                {variant}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1.5 border-t border-border-subtle pt-4">
        <Caption className="text-ink-tertiary">Accessibility requirements</Caption>
        <ul className="flex flex-col gap-1">
          {component.accessibility.map((requirement) => (
            <li key={requirement} className="flex gap-2 text-body-sm text-ink-secondary">
              <span className="text-ink-tertiary" aria-hidden>
                –
              </span>
              <span className="min-w-0 break-words">{requirement}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-1.5 border-t border-border-subtle pt-4">
        <Caption className="text-ink-tertiary">Reuse targets</Caption>
        <ul className="flex flex-col gap-1">
          {component.reuseTargets.map((target) => (
            <li key={target} className="flex gap-2 text-body-sm text-ink-secondary">
              <span className="text-ink-tertiary" aria-hidden>
                –
              </span>
              <span className="min-w-0 break-words">{target}</span>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}

/** Filter by group and status, click any card for its full spec — the detail panel never gets out of sync with the filtered grid since both read the same selection state. */
export function CatalogExplorer() {
  const [groupFilter, setGroupFilter] = useState<GroupFilter>("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [selectedId, setSelectedId] = useState<string>(FOUNDATION_COMPONENTS[0].id);

  const filtered = useMemo(
    () =>
      FOUNDATION_COMPONENTS.filter(
        (c) => (groupFilter === "all" || c.groupId === groupFilter) && (statusFilter === "all" || c.status === statusFilter),
      ),
    [groupFilter, statusFilter],
  );

  const selected = FOUNDATION_COMPONENTS.find((c) => c.id === selectedId) ?? filtered[0] ?? FOUNDATION_COMPONENTS[0];

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap gap-2">
          <FilterPill label="All groups" active={groupFilter === "all"} onClick={() => setGroupFilter("all")} />
          {FOUNDATION_GROUPS.map((group) => (
            <FilterPill key={group.id} label={group.title} active={groupFilter === group.id} onClick={() => setGroupFilter(group.id)} />
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          <FilterPill label="All statuses" active={statusFilter === "all"} onClick={() => setStatusFilter("all")} />
          {(["Exists", "Partial", "Needed"] as InventoryStatus[]).map((status) => (
            <FilterPill key={status} label={status} active={statusFilter === status} onClick={() => setStatusFilter(status)} />
          ))}
        </div>
        <Caption className="text-ink-tertiary">
          Showing {filtered.length} of {FOUNDATION_COMPONENTS.length} components.
        </Caption>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((component) => (
          <ComponentCard
            key={component.id}
            component={component}
            selected={component.id === selected.id}
            onSelect={() => setSelectedId(component.id)}
          />
        ))}
      </div>

      <ComponentDetail component={selected} />
    </div>
  );
}
