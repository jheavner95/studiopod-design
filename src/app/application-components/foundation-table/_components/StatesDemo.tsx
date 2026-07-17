"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button, Caption } from "@/components/ui";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  TableStatusCell,
  TableEmptyState,
  TableLoadingState,
  TableFooter,
} from "@/components/table";
import { TABLE_STATES } from "../_data/states";

const ALL_ITEMS = [
  { id: "1", name: "Trailhead mug wrap", type: "Artwork Project", status: "Published", tone: "success" as const },
  { id: "2", name: "Studio Tee — Black / M", type: "Style", status: "Draft", tone: "neutral" as const },
  { id: "3", name: "Sunset ridge tee — front print", type: "Ratio Set", status: "In Review", tone: "warning" as const },
];

function PillButton({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
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

/** One shared table, its body swapped between the six documented states — proves TableLoadingState and TableEmptyState render inside real TableHeader/TableBody structure rather than replacing it. */
export function StatesDemo() {
  const [stateId, setStateId] = useState(TABLE_STATES[0].id);
  const selected = TABLE_STATES.find((state) => state.id === stateId) ?? TABLE_STATES[0];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-2">
        {TABLE_STATES.map((state) => (
          <PillButton key={state.id} label={state.name} active={state.id === stateId} onClick={() => setStateId(state.id)} />
        ))}
      </div>

      <Table caption={`${selected.name} state example`}>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {stateId === "loading" ? <TableLoadingState columns={3} /> : null}
          {stateId === "empty" ? (
            <TableEmptyState colSpan={3} title="No Production Packages yet" description="Production Packages you create will show up here." />
          ) : null}
          {stateId === "no-results" ? (
            <TableEmptyState
              colSpan={3}
              title={"No results for “mug”"}
              description="Try a different search term, or clear your filters."
              action={
                <Button variant="ghost" size="sm">
                  Clear filters
                </Button>
              }
            />
          ) : null}
          {stateId === "error" ? (
            <TableEmptyState
              colSpan={3}
              title="Couldn't load items"
              description="Something went wrong loading this table."
              action={
                <Button variant="secondary" size="sm">
                  Retry
                </Button>
              }
            />
          ) : null}
          {stateId === "offline" ? (
            <TableEmptyState colSpan={3} title="You're offline" description="Showing the last cached results. Reconnect to load new data." />
          ) : null}
          {stateId === "filtered"
            ? ALL_ITEMS.slice(0, 1).map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.type}</TableCell>
                  <TableStatusCell label={item.status} tone={item.tone} />
                </TableRow>
              ))
            : null}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3} className="text-caption text-ink-tertiary">
              Showing {stateId === "filtered" ? 1 : ALL_ITEMS.length} of {ALL_ITEMS.length} items — rendered outside the scrolling body, so it
              never counts against a fixed-height ScrollArea.
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      <Caption className="text-ink-tertiary">{selected.presentation}</Caption>
    </div>
  );
}
