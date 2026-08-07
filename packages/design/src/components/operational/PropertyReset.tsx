import { RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

interface PropertyResetProps {
  onReset: () => void;
  label?: string;
  className?: string;
}

/** A small reset-to-default affordance for a modified property row — genuinely new to this family, since Inspector Panel had no concept of a field differing from a default. */
export function PropertyReset({ onReset, label = "Reset to default", className }: PropertyResetProps) {
  return (
    <button
      type="button"
      onClick={onReset}
      aria-label={label}
      title={label}
      className={cn(
        "focus-ring shrink-0 rounded-md p-1 text-ink-tertiary transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:text-ink-primary",
        className,
      )}
    >
      <RotateCcw className="size-3.5" />
    </button>
  );
}
