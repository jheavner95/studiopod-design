"use client";

import { useRef, useState } from "react";
import { Columns3 } from "lucide-react";
import { Popover } from "@/components/overlay";
import { Button, Checkbox } from "@/components/ui";

export interface DataGridColumnPickerOption {
  id: string;
  label: string;
}

interface DataGridColumnPickerProps {
  columns: DataGridColumnPickerOption[];
  visibleIds: Set<string>;
  onChange: (ids: Set<string>) => void;
  className?: string;
}

/**
 * A checkbox list of columns to show/hide, anchored to a trigger button.
 * Built on the Overlay System's Popover rather than Menu — a column picker
 * needs to stay open across multiple toggles, which is Popover's dismissal
 * model (Escape/outside click only), not Menu's (closes on every selection).
 */
export function DataGridColumnPicker({ columns, visibleIds, onChange, className }: DataGridColumnPickerProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLSpanElement>(null);

  function toggle(id: string) {
    const next = new Set(visibleIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    onChange(next);
  }

  return (
    <div className={className}>
      <span ref={triggerRef} className="inline-flex">
        <Button size="sm" variant="secondary" leadingIcon={<Columns3 className="size-3.5" />} onClick={() => setOpen((value) => !value)}>
          Columns
        </Button>
      </span>
      <Popover open={open} onOpenChange={setOpen} triggerRef={triggerRef} aria-label="Choose columns">
        <div className="flex flex-col gap-2">
          {columns.map((column) => (
            <Checkbox key={column.id} label={column.label} checked={visibleIds.has(column.id)} onChange={() => toggle(column.id)} />
          ))}
        </div>
      </Popover>
    </div>
  );
}
