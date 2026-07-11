"use client";

import { useRef, useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { Popover } from "@/components/overlay";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";

interface FilterPopoverProps {
  label: ReactNode;
  /** e.g. a count Badge once a value is selected. */
  badge?: ReactNode;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}

/**
 * The generic trigger-button-plus-Popover shell one filter dimension needs —
 * generalized from Data Grid's own DataGridColumnPicker (a button anchoring
 * a Popover that stays open across multiple toggles, Popover's dismissal
 * model rather than Menu's close-on-every-selection one). FilterGroup is a
 * checkbox-list specialization of this shell; anything needing a different
 * popover body (a date range, a numeric slider) can use this directly.
 */
export function FilterPopover({ label, badge, icon, children, className }: FilterPopoverProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLSpanElement>(null);

  return (
    <div className={cn("inline-flex", className)}>
      <span ref={triggerRef} className="inline-flex">
        <Button
          size="sm"
          variant="secondary"
          leadingIcon={icon}
          trailingIcon={<ChevronDown className="size-3.5" />}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="inline-flex items-center gap-1.5">
            {label}
            {badge}
          </span>
        </Button>
      </span>
      <Popover
        open={open}
        onOpenChange={setOpen}
        triggerRef={triggerRef}
        aria-label={typeof label === "string" ? label : "Filter options"}
      >
        {children}
      </Popover>
    </div>
  );
}
