import { Boxes } from "lucide-react";
import { PageShell, SectionShell } from "@/components/layout";
import { SectionBadge, Display, Body } from "@/components/ui";
import { SystemGrid } from "@/components/illustration";
import { PlaygroundBody } from "./_components/PlaygroundBody";

export default function CompositionsPage() {
  return (
    <PageShell background={<SystemGrid />}>
      <SectionShell spacing="xl">
        <div className="flex flex-col gap-6">
          <SectionBadge icon={<Boxes className="size-3.5" />}>StudioPOD / MS-1.3</SectionBadge>
          <Display>Composition playground</Display>
          <Body size="lg" muted className="max-w-[var(--container-narrow)]">
            Reusable section compositions, built entirely from the design system below them. Every example on this
            page accepts data as props, nothing here is hardcoded copy baked into a layout. A homepage should be
            assembled from these, not new one-off sections.
          </Body>
        </div>
      </SectionShell>

      <PlaygroundBody />

      <SectionShell spacing="xl" background="raised">
        <div className="flex flex-col items-center gap-4 text-center">
          <Body muted className="max-w-[var(--container-narrow)]">
            Eleven compositions, built entirely from MS-1.1 and MS-1.2 primitives. Ready for MS-1.4, real pages,
            assembled from this layer instead of new layout patterns.
          </Body>
        </div>
      </SectionShell>
    </PageShell>
  );
}
