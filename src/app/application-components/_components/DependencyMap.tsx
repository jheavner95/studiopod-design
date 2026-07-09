import { ArrowRight, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Caption } from "@/components/ui";
import type { DependencyChain, DependencyFanout } from "../_data/dependency-map";

function Pill({ children, emphasis = false }: { children: string; emphasis?: boolean }) {
  return (
    <span
      className={cn(
        "whitespace-nowrap rounded-md border px-3 py-1.5 text-body-sm",
        emphasis
          ? "border-accent-500/40 bg-accent-soft font-medium text-accent-400"
          : "border-border bg-surface text-ink-primary",
      )}
    >
      {children}
    </span>
  );
}

export function DependencyChainRow({ chain }: { chain: DependencyChain }) {
  return (
    <div className="flex flex-col gap-3">
      <Caption className="text-ink-tertiary">{chain.label}</Caption>
      <div className="flex flex-wrap items-center gap-2">
        {chain.chain.map((step, index) => (
          <div key={step} className="flex items-center gap-2">
            <Pill emphasis={index === 0}>{step}</Pill>
            {index < chain.chain.length - 1 ? (
              <ArrowRight className="size-4 shrink-0 text-ink-tertiary" aria-hidden />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

export function DependencyFanoutBlock({ fanout }: { fanout: DependencyFanout }) {
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-border-subtle bg-surface p-4 sm:p-5">
      <Caption className="text-ink-tertiary">{fanout.label}</Caption>
      <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
        <Pill emphasis>{fanout.parent}</Pill>
        <ArrowDown className="size-4 shrink-0 text-ink-tertiary sm:-rotate-90" aria-hidden />
        <div className="flex min-w-0 flex-wrap gap-2">
          {fanout.children.map((child) => (
            <Pill key={child}>{child}</Pill>
          ))}
        </div>
      </div>
    </div>
  );
}
