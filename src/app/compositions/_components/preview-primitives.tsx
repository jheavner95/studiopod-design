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

/** Section wrapper for one composition's group of examples on the playground page. */
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

export function VariantLabel({ children }: { children: ReactNode }) {
  return <Caption className="font-mono text-[11px] uppercase tracking-wide text-ink-tertiary">{children}</Caption>;
}

/** A real, independently-viewported mobile preview via <iframe> — Tailwind's responsive classes key off the actual viewport, so a shrunk <div> alone can't demonstrate them correctly. */
export function DeviceFrame({ slug }: { slug: string }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <VariantLabel>Mobile preview</VariantLabel>
      <div
        className="overflow-hidden rounded-[2rem] border-4 border-border-strong bg-canvas shadow-lg"
        style={{ width: 375, height: 700 }}
      >
        <iframe src={`/compositions/frame?slug=${slug}`} title={`${slug} mobile preview`} className="h-full w-full" />
      </div>
    </div>
  );
}
