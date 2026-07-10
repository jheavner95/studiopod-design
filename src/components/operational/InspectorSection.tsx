import type { ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Surface } from "@/components/layout";
import { Expandable } from "@/components/ui";
import { PropertySection } from "@/components/metadata";

interface InspectorSectionProps {
  title: ReactNode;
  children: ReactNode;
  /** Progressive disclosure — on by default, matching the Inspector Workspace's own Properties region guidance ("common fields first, advanced behind an expand"). */
  collapsible?: boolean;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

/**
 * A top-level, titled region of the panel (Identity, Properties,
 * Relationships, ...) holding one or more InspectorGroups. Collapsible by
 * default via Foundation UI's own Expandable rather than a bespoke
 * disclosure widget; falls back to Foundation Metadata's static
 * PropertySection when collapsible is off.
 */
export function InspectorSection({ title, children, collapsible = true, defaultOpen = true, open, onOpenChange, className }: InspectorSectionProps) {
  if (!collapsible) {
    return (
      <PropertySection title={title} className={className}>
        {children}
      </PropertySection>
    );
  }

  return (
    <Surface border elevation="panel" className={cn("flex flex-col overflow-hidden", className)}>
      <Expandable
        open={open}
        defaultOpen={defaultOpen}
        onOpenChange={onOpenChange}
        trigger={
          <div className="flex w-full items-center justify-between gap-2 px-6 py-4">
            <span className="text-body-sm font-medium text-ink-primary">{title}</span>
            <ChevronDown className="size-4 shrink-0 text-ink-tertiary" aria-hidden />
          </div>
        }
        contentClassName="px-6 pb-6"
      >
        <div className="flex flex-col gap-6">{children}</div>
      </Expandable>
    </Surface>
  );
}
