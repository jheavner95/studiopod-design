import type { ReactNode } from "react";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";

interface BulkActionButtonProps {
  children: ReactNode;
  icon?: ReactNode;
  onClick?: () => void;
  /** Overlays error-tone styling — the same text-error/hover:bg-error-soft treatment Foundation Overlay's own MenuItem already uses for its destructive prop, not a new variant on Button itself. */
  destructive?: boolean;
  disabled?: boolean;
  className?: string;
}

/** One action inside a BulkActionGroup — a thin Button preset, not a second button implementation. */
export function BulkActionButton({ children, icon, onClick, destructive = false, disabled = false, className }: BulkActionButtonProps) {
  return (
    <Button
      size="sm"
      variant="secondary"
      leadingIcon={icon}
      onClick={onClick}
      disabled={disabled}
      className={cn(destructive && "border-error/40 text-error hover:border-error/60 hover:bg-error-soft", className)}
    >
      {children}
    </Button>
  );
}
