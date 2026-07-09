import { cn } from "@/lib/utils";

interface BarRowProps {
  label: string;
  value: number;
  max: number;
  suffix?: string;
  tone?: "accent" | "success" | "warning" | "neutral";
  className?: string;
}

const TONE_CLASSES: Record<NonNullable<BarRowProps["tone"]>, string> = {
  accent: "bg-accent-400",
  success: "bg-success",
  warning: "bg-warning",
  neutral: "bg-ink-tertiary",
};

export function BarRow({ label, value, max, suffix, tone = "accent", className }: BarRowProps) {
  const percent = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0;
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-body-sm font-medium text-ink-primary">{label}</span>
        <span className="shrink-0 text-body-sm text-ink-secondary">
          {value}
          {suffix ?? ""}
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-canvas-raised">
        <div className={cn("h-full rounded-full", TONE_CLASSES[tone])} style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
