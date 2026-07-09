import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageShell, SectionShell, CardGrid } from "@/components/layout";
import { Card, Body, Caption, SectionHeader, Eyebrow } from "@/components/ui";
import { SystemGrid } from "@/components/illustration";
import { PageIntro } from "../_components/PageIntro";
import { PrimitiveGallery } from "./_components/PrimitiveGallery";
import { CompositionExamples } from "./_components/CompositionExamples";
import { PROMOTION_CANDIDATES } from "./_data/promotion-candidates";
import { LAYOUT_RULES } from "./_data/layout-rules";
import { LAYOUT_FUTURE_EXTENSIONS } from "./_data/future-extensions";

function CrossLinks() {
  const links = [
    { label: "Foundation Components", href: "/application-components/foundation-components" },
    { label: "Workspace Layout", href: "/application-components/workspace-layout" },
    { label: "Asset Workspace", href: "/application-components/asset-workspace" },
    { label: "Inspector Workspace", href: "/application-components/inspector-workspace" },
    { label: "Foundation Table System", href: "/application-components/foundation-table" },
    { label: "Foundation Metadata System", href: "/application-components/foundation-metadata" },
  ];
  return (
    <div className="flex flex-wrap gap-4">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="focus-ring flex items-center gap-1 rounded-md text-caption font-medium text-accent-400 transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:text-accent-300"
        >
          {link.label}
          <ArrowUpRight className="size-3.5" aria-hidden />
        </Link>
      ))}
    </div>
  );
}

const ACCESSIBILITY_TOPICS = [
  { label: "Reading order", note: "Every primitive renders its children in the same order they're passed — layout never reorders content visually in a way that diverges from DOM order." },
  { label: "Keyboard flow", note: "Primitives carry no focus behavior of their own; tab order follows DOM order exactly, which follows source order, which follows the order children are passed." },
  { label: "Focus order", note: "Because CSS (not DOM reordering) drives every responsive change here, focus order stays identical at every breakpoint — nothing a keyboard user experiences differs from what a screen-width change alone would suggest." },
  { label: "Responsive reflow", note: "Grid's column collapse and Inline's wrapping both reflow visually without touching DOM order — a sighted user resizing the window and a screen-reader user both encounter content in the same sequence." },
  { label: "Logical DOM order", note: "None of the nine primitives use CSS order or flex-direction: row-reverse — visual position always matches source position, the precondition for reading order and keyboard flow to agree." },
];

export default function FoundationLayoutPage() {
  return (
    <PageShell background={<SystemGrid />}>
      <SectionShell spacing="xl">
        <PageIntro
          eyebrow="package · application components · foundation layout"
          title="Foundation layout primitives"
          description="The nine structural primitives every higher-level StudioPOD component is composed from — eliminating repeated flex/grid implementations across Web and App. Documentation, inventory, and an interactive demonstration only; this doesn't touch the production application."
        >
          <div className="pt-2">
            <CrossLinks />
          </div>
        </PageIntro>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader eyebrow={<Eyebrow tone="accent">Overview</Eyebrow>} title="Primitives vs. components" descriptionMaxWidth={false} />
          <CardGrid columns={2}>
            <Card className="flex flex-col gap-2">
              <span className="text-body-sm font-medium text-ink-primary">Components compose primitives</span>
              <Body size="sm" muted>
                A Queue Table is a Table (once built) arranging Job Status Cards inside a Stack — the operational
                component owns the domain meaning, the primitive owns the arrangement.
              </Body>
            </Card>
            <Card className="flex flex-col gap-2">
              <span className="text-body-sm font-medium text-ink-primary">Primitives never contain business logic</span>
              <Body size="sm" muted>
                None of the nine primitives on this page know what an asset, a job, or a provider is — they take
                children and a small set of layout props, nothing else. That&rsquo;s what makes them safe to reuse
                everywhere.
              </Body>
            </Card>
          </CardGrid>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            eyebrow={<Eyebrow tone="accent">Gallery</Eyebrow>}
            title="Interactive gallery"
            description="Select a primitive for its purpose, a live example, usage guidance, and common mistakes."
            descriptionMaxWidth={false}
          />
          <PrimitiveGallery />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            eyebrow={<Eyebrow tone="accent">Composition</Eyebrow>}
            title="Composition examples"
            description="Five recognizable shapes, each assembled entirely from the primitives above — no business logic, no fetched data."
            descriptionMaxWidth={false}
          />
          <CompositionExamples />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            eyebrow={<Eyebrow tone="accent">Promotion candidates</Eyebrow>}
            title="Promotion candidates"
            description="Real, grep-verifiable counts of repeated implementations across this design system — not estimates."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={2}>
            {PROMOTION_CANDIDATES.map((candidate) => (
              <Card key={candidate.primitiveId} className="flex flex-col gap-3">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-body-md font-medium text-ink-primary">{candidate.primitiveName}</span>
                  <span className="shrink-0 text-body-sm text-accent-400">{candidate.occurrenceCount}×</span>
                </div>
                <Body size="sm" muted>
                  {candidate.note}
                </Body>
                <div className="flex flex-col gap-1">
                  <Caption className="text-ink-tertiary">Verified with</Caption>
                  <code className="min-w-0 overflow-x-auto whitespace-pre rounded-md bg-canvas-raised px-3 py-2 text-metadata text-ink-secondary">
                    {candidate.findingCommand}
                  </code>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {candidate.examples.slice(0, 5).map((example) => (
                    <span
                      key={example}
                      className="min-w-0 max-w-full truncate rounded-full border border-border-subtle bg-surface px-2.5 py-1 text-metadata text-ink-tertiary"
                    >
                      {example}
                    </span>
                  ))}
                </div>
              </Card>
            ))}
          </CardGrid>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader eyebrow={<Eyebrow tone="accent">Layout rules</Eyebrow>} title="Layout rules" descriptionMaxWidth={false} />
          <CardGrid columns={3}>
            {LAYOUT_RULES.map((rule) => (
              <Card key={rule.title} className="flex flex-col gap-2">
                <span className="text-body-sm font-medium text-ink-primary">{rule.title}</span>
                <Body size="sm" muted>
                  {rule.explanation}
                </Body>
              </Card>
            ))}
          </CardGrid>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader eyebrow={<Eyebrow tone="accent">Accessibility</Eyebrow>} title="Accessibility" descriptionMaxWidth={false} />
          <div className="rounded-lg border border-border-subtle bg-surface p-4 sm:p-6">
            <dl className="flex flex-col">
              {ACCESSIBILITY_TOPICS.map((item, index) => (
                <div
                  key={item.label}
                  className={
                    index < ACCESSIBILITY_TOPICS.length - 1
                      ? "flex flex-col gap-1.5 border-b border-border-subtle py-4 first:pt-0 sm:flex-row sm:gap-6"
                      : "flex flex-col gap-1.5 py-4 first:pt-0 sm:flex-row sm:gap-6"
                  }
                >
                  <dt className="w-full shrink-0 text-body-sm font-medium text-ink-primary sm:w-56">{item.label}</dt>
                  <dd className="min-w-0 break-words text-body-sm text-ink-secondary">{item.note}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            eyebrow={<Eyebrow tone="accent">Future extensions</Eyebrow>}
            title="Future extensions"
            description="Room the current nine primitives leave for later — reserved, not scoped or committed."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={3}>
            {LAYOUT_FUTURE_EXTENSIONS.map((extension) => (
              <Card key={extension.title} className="flex flex-col gap-2 border-dashed">
                <span className="text-body-sm font-medium text-ink-primary">{extension.title}</span>
                <Body size="sm" muted>
                  {extension.description}
                </Body>
              </Card>
            ))}
          </CardGrid>
        </div>
      </SectionShell>
    </PageShell>
  );
}
