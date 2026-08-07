import type { KeyboardEvent, MouseEvent, MouseEventHandler, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TableRowProps {
  children: ReactNode;
  className?: string;
  /**
   * A stable DOM identifier for the row.
   *
   * Exists so another control can point at this row — an expand toggle's
   * `aria-controls` naming the detail row it discloses, for example. The design
   * system neither generates nor namespaces the value; uniqueness is the
   * caller's responsibility.
   */
  id?: string;
  selected?: boolean;
  /** Adds hover feedback and a pointer cursor — set when the whole row (not just an action inside it) responds to a click. */
  interactive?: boolean;
  /** Receives the native click event so callers can read modifier keys (event.shiftKey) for range selection. */
  onClick?: (event: MouseEvent<HTMLTableRowElement>) => void;
  /**
   * Row-level pointer handlers, forwarded to the `tr` unchanged.
   *
   * These exist for coordination *outside* the row — highlighting the matching
   * shape in a canvas or preview, prefetching a detail panel, driving a
   * companion visualisation. The boundary matters: because they sit on the row
   * rather than its cells, moving the pointer between cells does not fire
   * `onMouseLeave`, so the hovered row stays stable while the pointer travels
   * across it.
   *
   * The design system does not own or store hover state — it only delivers the
   * events. `interactive`'s own hover styling is independent of these handlers.
   */
  onMouseEnter?: MouseEventHandler<HTMLTableRowElement>;
  onMouseLeave?: MouseEventHandler<HTMLTableRowElement>;
}

export function TableRow({
  children,
  className,
  id,
  selected = false,
  interactive = false,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: TableRowProps) {
  function handleKeyDown(event: KeyboardEvent<HTMLTableRowElement>) {
    if (!onClick) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onClick(event as unknown as MouseEvent<HTMLTableRowElement>);
    }
  }

  return (
    <tr
      id={id}
      onClick={onClick}
      onKeyDown={onClick ? handleKeyDown : undefined}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      tabIndex={onClick ? 0 : undefined}
      aria-selected={selected || undefined}
      className={cn(
        "border-b border-border-subtle last:border-b-0",
        selected && "bg-accent-soft/20",
        interactive &&
          "cursor-pointer transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:bg-canvas-raised focus-ring",
        className,
      )}
    >
      {children}
    </tr>
  );
}
