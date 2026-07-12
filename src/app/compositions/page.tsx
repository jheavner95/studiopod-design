import Link from "next/link";
import { Boxes } from "lucide-react";
import { PageShell, SectionShell, CardGrid, DescriptionList } from "@/components/layout";
import { SectionBadge, Display, Body, Card, SectionHeader, Eyebrow } from "@/components/ui";
import { SystemGrid } from "@/components/illustration";
import { getEntry, getGroup, getSection } from "@/lib/design-system-navigation";
import { PlaygroundBody } from "./_components/PlaygroundBody";
import { REGISTRY } from "./_lib/registry";

const entry = getEntry("compositions")!;
const entrySection = getSection(entry.section)!;
const entryGroup = getGroup(entry.group)!;

const groupNames = Array.from(new Set(REGISTRY.map((entry) => entry.group)));
const variantCount = REGISTRY.length;

const relatedComponents = [getEntry("marketing-components")!, getEntry("core-components")!, getEntry("foundations")!];

const WHEN_TO_USE = [
  {
    title: "Start from the registry",
    explanation: "Reach for one of the compositions below before writing a new one-off section — every common marketing-page job (opener, feature list, closer, FAQ) already has one.",
  },
  {
    title: "Pass real content as props",
    explanation: "Nothing on this page is hardcoded copy baked into a layout. Every heading, metric, and testimonial you see comes in through props, so the same composition works with any real content.",
  },
  {
    title: "One family, one job",
    explanation: "Hero opens a page, CTA closes one, FAQ answers questions, Empty stands in for what hasn't been built yet. Pick the family that matches the job, not just the closest-looking layout.",
  },
];

const BEHAVIOR_NOTES = [
  {
    title: "Expandable step detail",
    description: "Workflow's steps open on click to reveal detail copy, using the same Expandable primitive as the FAQ accordion below.",
  },
  {
    title: "Synced selection state",
    description: "Platform's architecture diagram and its module cards read and write one shared active-selection state — clicking either updates both.",
  },
  {
    title: "Live search and filtering",
    description: "FAQ wires up real search-as-you-type plus category chip filtering; narrowing the list happens client-side as you type.",
  },
  {
    title: "Animated counters",
    description: "Metrics' stats variant animates each value in rather than rendering the final number immediately.",
  },
  {
    title: "A real mobile viewport",
    description: "Every composition marked primary in the registry also renders in an actual iframe below its desktop preview, at /compositions/frame, since Tailwind's responsive classes need a genuine viewport width to evaluate — a shrunk-down div can't fake one.",
  },
];

const ACCESSIBILITY_TOPICS = [
  {
    label: "Keyboard",
    text: "Every interactive control across the compositions — accordion triggers, category filter chips, platform-module buttons — is a native <button>, focusable and operable from the keyboard, with the shared focus-ring treatment for a visible focus state.",
  },
  {
    label: "Reduced motion",
    text: "The Expandable primitive behind Workflow's step detail and the FAQ accordion checks the reduced-motion preference and swaps its animated expand/collapse for an instant show/hide when reduced motion is requested.",
  },
  {
    label: "Filter groups",
    text: "FAQ's category chips sit inside a role=\"group\" with an aria-label of \"Filter by category,\" and each accordion trigger exposes its open/closed state through aria-expanded.",
  },
];

const COMPOSITION_LAYERS = [
  {
    title: "Foundations underneath",
    description: "Layout, motion, and illustration primitives — SectionShell, ContentColumns, CardGrid, the Fade/Slide/Stagger motion primitives, AnimatedNode, AnimatedConnector — appear in every composition's own imports.",
  },
  {
    title: "Core Components for the UI kit",
    description: "Button, Card, Badge, SectionHeader, SurfacePanel, GlassPanel, FilterBar, and Expandable all come from the shared Core Components package, not from a composition-specific copy.",
  },
  {
    title: "Compositions assemble, they don't invent",
    description: "None of the 11 families define their own buttons, cards, or animation curves. Each one only arranges existing Foundation and Core Components primitives into a marketing-shaped layout, then exposes the result as a single component that takes data as props.",
  },
];

const FUTURE_ENHANCEMENTS = [
  {
    title: "Real pages built from this layer",
    description: "The playground proves the 11 composition types compose cleanly. Assembling actual marketing pages from them, rather than new one-off sections, hasn't started — that work is paused while the Components section is the priority.",
  },
  {
    title: "Screen-reader affordances for active selection",
    description: "Platform's diagram-and-card selection state updates visually (border and background) when a module is active, but isn't yet exposed to assistive technology through aria-current or aria-pressed.",
  },
];

export default function CompositionsPage() {
  return (
    <PageShell background={<SystemGrid />}>
      <SectionShell spacing="xl">
        <div className="flex flex-col gap-6">
          <SectionBadge icon={<Boxes className="size-3.5" />}>{entrySection.title} / {entryGroup.title}</SectionBadge>
          <Display>Composition playground</Display>
          <Body size="lg" muted className="max-w-[var(--container-narrow)]">
            {variantCount} reusable marketing section compositions, built entirely from the design system below them.
            A homepage should be assembled from these, not new one-off sections.
          </Body>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="overview"
            eyebrow={<Eyebrow tone="accent">Overview</Eyebrow>}
            title="Overview"
            description={`${groupNames.length} composition types and ${variantCount} total variants, each accepting its content as props instead of hardcoded copy — nothing on this page is a one-off layout.`}
            descriptionMaxWidth={false}
          />
          <div className="flex flex-wrap gap-1.5">
            {groupNames.map((group) => (
              <span
                key={group}
                className="min-w-0 max-w-full truncate rounded-full border border-border-subtle bg-surface px-2.5 py-1 text-metadata text-ink-tertiary"
              >
                {group}
              </span>
            ))}
          </div>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="when-to-use"
            eyebrow={<Eyebrow tone="accent">When to use</Eyebrow>}
            title="When to use"
            description="The rules every composition on this page follows."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={3}>
            {WHEN_TO_USE.map((rule) => (
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
          <SectionHeader
            id="examples"
            eyebrow={<Eyebrow tone="accent">Examples</Eyebrow>}
            title="Examples"
            description={`Every one of the ${groupNames.length} composition types below, with its own variants rendered live.`}
            descriptionMaxWidth={false}
          />
          <PlaygroundBody />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="behavior"
            eyebrow={<Eyebrow tone="accent">Behavior</Eyebrow>}
            title="Behavior"
            description="What's actually interactive above, beyond the static layout."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={3}>
            {BEHAVIOR_NOTES.map((note) => (
              <Card key={note.title} className="flex flex-col gap-2">
                <span className="text-body-sm font-medium text-ink-primary">{note.title}</span>
                <Body size="sm" muted>
                  {note.description}
                </Body>
              </Card>
            ))}
          </CardGrid>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader id="accessibility" eyebrow={<Eyebrow tone="accent">Accessibility</Eyebrow>} title="Accessibility" descriptionMaxWidth={false} />
          <DescriptionList items={ACCESSIBILITY_TOPICS.map((topic) => ({ label: topic.label, value: topic.text }))} />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="composition"
            eyebrow={<Eyebrow tone="accent">Composition</Eyebrow>}
            title="Composition"
            description="How the 11 families layer on top of the rest of the design system."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={3}>
            {COMPOSITION_LAYERS.map((layer) => (
              <Card key={layer.title} className="flex flex-col gap-2">
                <span className="text-body-sm font-medium text-ink-primary">{layer.title}</span>
                <Body size="sm" muted>
                  {layer.description}
                </Body>
              </Card>
            ))}
          </CardGrid>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-6">
          <SectionHeader
            id="related-components"
            eyebrow={<Eyebrow tone="accent">Related components</Eyebrow>}
            title="Related components"
            descriptionMaxWidth={false}
          />
          <CardGrid columns={3}>
            {relatedComponents.map((related) => (
              <Link key={related.id} href={related.href} className="focus-ring block rounded-lg">
                <Card interactive className="flex h-full flex-col gap-2">
                  <span className="text-body-md font-medium text-ink-primary">{related.title}</span>
                  <Body size="sm" muted>
                    {related.description}
                  </Body>
                </Card>
              </Link>
            ))}
          </CardGrid>
        </div>
      </SectionShell>

      <SectionShell spacing="lg">
        <div className="flex flex-col gap-14">
          <SectionHeader id="reference" eyebrow={<Eyebrow tone="accent">Reference</Eyebrow>} title="Reference" descriptionMaxWidth={false} />

          <div className="flex flex-col gap-6">
            <SectionHeader id="migration-notes" title="Migration notes" descriptionMaxWidth={false} />
            <Card className="flex flex-col gap-2">
              <Body size="sm" muted>
                This composition layer was originally the entire project&rsquo;s scope. It has since been
                reclassified as an early proof of the composition model — showing how Foundation and Core Components
                primitives compose into marketing sections — rather than a roadmap toward a finished marketing site.
                That work is paused while the Components section is the priority; see{" "}
                <Link href="/marketing-components" className="font-medium text-ink-secondary underline underline-offset-2">
                  Marketing Components
                </Link>{" "}
                for the full context.
              </Body>
            </Card>
          </div>

          <div className="flex flex-col gap-10">
            <SectionHeader
              id="future-enhancements"
              title="Future enhancements"
              description="Room the current system leaves for later — reserved, not scoped or committed."
              descriptionMaxWidth={false}
            />
            <CardGrid columns={2}>
              {FUTURE_ENHANCEMENTS.map((extension) => (
                <Card key={extension.title} className="flex flex-col gap-2 border-dashed">
                  <span className="text-body-sm font-medium text-ink-primary">{extension.title}</span>
                  <Body size="sm" muted>
                    {extension.description}
                  </Body>
                </Card>
              ))}
            </CardGrid>
          </div>
        </div>
      </SectionShell>
    </PageShell>
  );
}
