import type { ReactNode } from "react";
import { SectionShell } from "@/components/layout";
import { SectionHeader, Eyebrow, Caption } from "@/components/ui";
import { IllustrationNode, type IllustrationNodeProps } from "@/illustrations";

interface PreviewSectionProps {
  id: string;
  /** Omit to continue a canonical section already introduced by an earlier PreviewSection (no repeated eyebrow pill). */
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
}

export function PreviewSection({ id, eyebrow, title, description, children }: PreviewSectionProps) {
  return (
    <SectionShell id={id} spacing="lg" divider>
      <div className="flex flex-col gap-10">
        <SectionHeader
          eyebrow={eyebrow ? <Eyebrow tone="accent">{eyebrow}</Eyebrow> : undefined}
          title={title}
          description={description}
          descriptionMaxWidth={false}
        />
        {children}
      </div>
    </SectionShell>
  );
}

export function DemoLabel({ children }: { children: ReactNode }) {
  return <Caption className="font-mono text-[11px] uppercase tracking-wide text-ink-tertiary">{children}</Caption>;
}

/**
 * Wraps a standalone IllustrationNode demo (i.e. one not rendered inside
 * an IllustrationCanvas). IllustrationNode's label overflows below its
 * icon box via absolute positioning — this reserves the clearance so it
 * doesn't overlap whatever sits below it in a grid.
 */
export function NodeDemo({ label, ...nodeProps }: { label: string } & IllustrationNodeProps) {
  return (
    <div className="flex flex-col items-center gap-6 pb-10">
      <DemoLabel>{label}</DemoLabel>
      <IllustrationNode {...nodeProps} />
    </div>
  );
}
