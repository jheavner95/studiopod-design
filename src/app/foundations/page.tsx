import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionShell } from "@/components/layout";
import { Card, Body, SectionHeader, Eyebrow } from "@/components/ui";
import { DocsShell, DocsPageHeader, DocsTableOfContents } from "@/components/docs";
import { DocsLandingSummary } from "@/app/docs/_components/DocsLandingSummary";
import { DocsSectionLanding } from "@/app/docs/_components/DocsSectionLanding";
import { getEntry, getGroupsForSection } from "@/lib/design-system-navigation";

const entry = getEntry("foundations")!;
const tokensEntry = getEntry("tokens")!;

// The richest, most fully built pages this layer underpins.
const primaryEntryPoints = [tokensEntry, getEntry("motion")!, getEntry("illustrations")!];
const relatedGroups = getGroupsForSection("components").filter((group) =>
  ["core-ui", "marketing", "components-overview"].includes(group.id),
);

// Real counts, grounded in the motion engine page's own copy ("five hooks,
// fourteen primitives, one provider, one token set") and this family's own
// registry membership — never guessed.
const STATS = [
  { label: "Pages in this family", value: "2" },
  { label: "Animation primitives", value: "14" },
  { label: "Motion hooks", value: "5" },
];

export default function FoundationsPage() {
  return (
    <DocsShell entry={entry} toc={<DocsTableOfContents />}>
      <DocsPageHeader entry={entry}>
        <DocsLandingSummary entries={[entry, tokensEntry]} />
      </DocsPageHeader>

      <DocsSectionLanding
        purpose="Foundations is the structural, token, and motion layer every other package in the system builds on. It covers the raw and semantic design tokens that drive color, typography, spacing, radius, and shadow across the whole site — see Tokens for the full reference — the layout primitives (Container, PageShell, SectionShell, CardGrid) every page composes from, the motion engine's tokens, hooks, and primitives that every animation traces back to, and the illustration engine every workflow and architecture diagram renders through. Nothing in Core UI Kit, the rest of Components, or Patterns exists without this layer coming first."
        whatYoullLearn={[
          "Where the raw and semantic token scales live — color ramps, typography, spacing, radius, and shadow — on the Tokens reference page.",
          "The layout primitives every page in the system composes from: Container, PageShell, SectionShell, CardGrid.",
          "How the motion engine's five hooks and fourteen reusable animation primitives compose into every future animation, instead of one-off page effects.",
          "How the illustration engine renders diagrams from data through a single IllustrationCanvas component.",
        ]}
        stats={STATS}
        primaryEntryPoints={primaryEntryPoints}
        relatedGroups={relatedGroups}
      />

      <SectionShell spacing="lg">
        <div className="flex flex-col gap-6">
          <SectionHeader
            id="also-in-this-family"
            eyebrow={<Eyebrow tone="accent">Also in this family</Eyebrow>}
            title="Also in this family"
            description="The other page in Foundations & Tokens."
            descriptionMaxWidth={false}
          />
          {/* A single entry inside a multi-column CardGrid would occupy one
              cell and leave a large empty gutter beside it — constrain it
              to a narrow standalone card instead. */}
          <Link href={tokensEntry.href} className="focus-ring block w-full max-w-sm rounded-lg">
            <Card interactive className="flex h-full flex-col gap-3">
              <div className="flex items-center justify-between gap-3">
                <span className="text-body-md font-medium text-ink-primary">{tokensEntry.title}</span>
                <ArrowRight className="size-4 shrink-0 text-ink-tertiary" aria-hidden />
              </div>
              <Body size="sm" muted>
                {tokensEntry.description}
              </Body>
            </Card>
          </Link>
        </div>
      </SectionShell>
    </DocsShell>
  );
}
