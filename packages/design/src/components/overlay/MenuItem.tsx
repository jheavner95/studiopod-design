"use client";

import type { ReactNode, KeyboardEvent as ReactKeyboardEvent, MouseEvent as ReactMouseEvent } from "react";
import { cn } from "@/lib/utils";

export interface MenuItemProps {
  children: ReactNode;
  icon?: ReactNode;
  destructive?: boolean;
  disabled?: boolean;
  onSelect?: () => void;
  /** Injected by Menu — do not pass directly. */
  highlighted?: boolean;
  onMouseEnter?: (event: ReactMouseEvent<HTMLLIElement>) => void;
  onKeyDown?: (event: ReactKeyboardEvent<HTMLLIElement>) => void;
  tabIndex?: number;
}

/** A single action or option inside Menu. Composed as JSX children, matching this codebase's own composition style (TableRow/TableCell) rather than a data-list prop. */
export function MenuItem({
  children,
  icon,
  destructive = false,
  disabled = false,
  onSelect,
  highlighted = false,
  onMouseEnter,
  onKeyDown,
  tabIndex,
}: MenuItemProps) {
  return (
    <li
      role="menuitem"
      aria-disabled={disabled || undefined}
      tabIndex={tabIndex}
      onMouseEnter={onMouseEnter}
      onKeyDown={onKeyDown}
      onClick={disabled ? undefined : onSelect}
      className={cn(
        "flex cursor-pointer items-center gap-2 rounded-md px-2.5 py-2 text-body-sm outline-none transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)]",
        destructive ? "text-error" : "text-ink-primary",
        highlighted && !disabled && (destructive ? "bg-error-soft" : "bg-surface-hover"),
        disabled && "pointer-events-none opacity-40",
      )}
    >
      {icon ? (
        <span className="shrink-0" aria-hidden>
          {icon}
        </span>
      ) : null}
      <span className="min-w-0 truncate">{children}</span>
    </li>
  );
}
