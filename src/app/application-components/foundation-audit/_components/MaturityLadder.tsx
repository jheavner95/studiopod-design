import { cn } from "@/lib/utils";
import type { MaturityLevel } from "../_data/certification";

const LEVELS: MaturityLevel[] = ["Concept", "Prototype", "Production Ready", "Certified", "Locked"];

export function MaturityLadder({ level }: { level: MaturityLevel }) {
  const currentIndex = LEVELS.indexOf(level);
  return (
    <div className="flex items-end gap-1">
      {LEVELS.map((step, index) => (
        <div key={step} className="flex flex-1 flex-col items-center gap-1.5">
          <div
            className={cn(
              "h-1.5 w-full rounded-full",
              index <= currentIndex ? "bg-accent-400" : "bg-border-subtle"
            )}
          />
          <span
            className={cn(
              "text-center text-[10px] uppercase tracking-wide",
              index === currentIndex ? "font-medium text-ink-primary" : "text-ink-tertiary"
            )}
          >
            {step}
          </span>
        </div>
      ))}
    </div>
  );
}
