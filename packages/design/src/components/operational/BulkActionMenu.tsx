"use client";

import { useRef, useState, type ReactNode } from "react";
import { MoreHorizontal } from "lucide-react";
import { Menu, MenuItem } from "@/components/overlay";
import { Button } from "@/components/ui";

export interface BulkActionMenuItem {
  id: string;
  label: ReactNode;
  icon?: ReactNode;
  destructive?: boolean;
  disabled?: boolean;
  onSelect: () => void;
}

interface BulkActionMenuProps {
  items: BulkActionMenuItem[];
  label?: string;
  className?: string;
}

/** The overflow menu for bulk actions that don't fit inline in a BulkActionGroup — Foundation Overlay's own Menu/MenuItem (roving highlight, type-ahead, Enter/Escape) unchanged, not a second menu implementation. */
export function BulkActionMenu({ items, label = "More actions", className }: BulkActionMenuProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLSpanElement>(null);

  return (
    <div className={className}>
      <span ref={triggerRef} className="inline-flex">
        <Button size="sm" variant="ghost" leadingIcon={<MoreHorizontal className="size-3.5" />} onClick={() => setOpen((value) => !value)}>
          {label}
        </Button>
      </span>
      <Menu open={open} onOpenChange={setOpen} triggerRef={triggerRef}>
        {items.map((item) => (
          <MenuItem
            key={item.id}
            icon={item.icon}
            destructive={item.destructive}
            disabled={item.disabled}
            onSelect={() => {
              item.onSelect();
              setOpen(false);
            }}
          >
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
