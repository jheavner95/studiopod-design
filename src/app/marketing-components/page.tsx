import { Info } from "lucide-react";
import { SectionShell } from "@/components/layout";
import { Card, Body } from "@/components/ui";
import { DocsShell, DocsPageHeader, DocsTableOfContents } from "@/components/docs";
import { DocsLandingSummary } from "@/app/docs/_components/DocsLandingSummary";
import { DocsSectionLanding } from "@/app/docs/_components/DocsSectionLanding";
import { getEntry, getGroup } from "@/lib/design-system-navigation";

const entry = getEntry("marketing-components")!;

// Real counts, verified against src/app/compositions/_lib/registry.tsx: 11 distinct
// `group` values (Hero, Workflow, Platform, Feature grid, Comparison, Metrics,
// Timeline, CTA, FAQ, Testimonial, Empty), 24 total registry entries across them.
const STATS = [
  { label: "Composition types", value: "11" },
  { label: "Composition variants", value: "24" },
  { label: "Pages in this section", value: "1" },
];

const primaryEntryPoints = [getEntry("compositions")!, getEntry("core-components")!, getEntry("foundations")!];
const relatedGroups = [getGroup("core-ui")!, getGroup("foundations-tokens")!];

export default function MarketingComponentsPage() {
  return (
    <DocsShell entry={entry} toc={<DocsTableOfContents />}>
      <DocsPageHeader entry={entry}>
        <DocsLandingSummary entries={[entry]} />
      </DocsPageHeader>

      <SectionShell spacing="md">
        <Card className="flex flex-col gap-3 sm:flex-row sm:items-start">
          <Info className="size-5 shrink-0 text-accent-400" aria-hidden />
          <Body size="sm" muted>
            The compositions on the Composition Playground are design-system examples of how Foundation and Core
            Components compose into marketing page sections — not a roadmap toward a finished marketing site.
            Assembling real marketing pages from them is intentionally out of scope while{" "}
            <span className="font-medium text-ink-secondary">the Components section</span> is the priority.
          </Body>
        </Card>
      </SectionShell>

      <DocsSectionLanding
        purpose="Marketing Components is the composition layer that turns Foundation and Core Components primitives into ready-to-use marketing page sections — heroes, feature grids, CTAs, FAQs, testimonials, and more. Its one page, the Composition Playground, is the reference implementation for all 11 composition types and their 24 variants, proving the composition model end to end rather than serving as this project's actual marketing site."
        whatYoullLearn={[
          "The 11 reusable section types this layer provides: Hero, Feature grid, Comparison, Metrics, Timeline, CTA, FAQ, Testimonial, Workflow, Platform, and Empty-state stand-ins.",
          "How every composition accepts data as props instead of hardcoded copy, so a real page gets assembled from these instead of new one-off sections.",
          "How many variants each composition type ships with today, on the Composition Playground.",
          "Where the underlying primitives live — Core Components for the shared UI kit, Foundations for layout and tokens — since every composition here is built entirely from those two packages.",
        ]}
        stats={STATS}
        primaryEntryPoints={primaryEntryPoints}
        relatedGroups={relatedGroups}
      />
    </DocsShell>
  );
}
