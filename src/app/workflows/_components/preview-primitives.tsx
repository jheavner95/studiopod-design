import type { ReactNode } from "react";
import { Caption } from "@/components/ui";

export function DemoLabel({ children }: { children: ReactNode }) {
  return <Caption className="font-mono text-[11px] uppercase tracking-wide text-ink-tertiary">{children}</Caption>;
}
