import type { ReactNode } from "react";
import { Panel } from "@/components/layout";

interface PropertySectionProps {
  children: ReactNode;
  title?: ReactNode;
  className?: string;
}

/** A bounded section holding one or more PropertyGroups — built directly on Panel rather than re-declaring border, background, and header layout. */
export function PropertySection({ children, title, className }: PropertySectionProps) {
  return (
    <Panel header={title ? <span className="text-body-sm font-medium text-ink-primary">{title}</span> : undefined} className={className}>
      <div className="flex flex-col gap-6">{children}</div>
    </Panel>
  );
}
