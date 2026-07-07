import type { ReactNode } from "react";
import { SectionShell } from "@/components/layout";
import { SectionHeader, Eyebrow, Caption } from "@/components/ui";

interface PreviewSectionProps {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  children: ReactNode;
}

/** Section wrapper for one topic's group of examples on the motion playground. */
export function PreviewSection({ id, eyebrow, title, description, children }: PreviewSectionProps) {
  return (
    <SectionShell id={id} spacing="lg" divider>
      <div className="flex flex-col gap-10">
        <SectionHeader
          eyebrow={<Eyebrow tone="accent">{eyebrow}</Eyebrow>}
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
