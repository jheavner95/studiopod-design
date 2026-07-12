import Link from "next/link";
import { Waves } from "lucide-react";
import { PageShell, SectionShell, CardGrid } from "@/components/layout";
import { SectionBadge, Display, Body, Card, SectionHeader, Eyebrow } from "@/components/ui";
import { SystemGrid } from "@/components/illustration";
import { getEntry } from "@/lib/design-system-navigation";
import { ControlDock } from "./_components/ControlDock";
import { TokensSection } from "./_sections/TokensSection";
import { MotionControlsSection, SpeedControlsSection, ReducedMotionSection } from "./_sections/ControlsSection";
import { FadeSection, SlideSection, ScaleSection } from "./_sections/EntranceSection";
import { CollapseExpandSection } from "./_sections/CollapseExpandSection";
import { CrossfadeSection, StaggerSection } from "./_sections/CrossfadeStaggerSection";
import { ProgressSection, ConnectorFlowSection } from "./_sections/ProgressConnectorSection";
import { PulseSection, HighlightSection } from "./_sections/PulseHighlightSection";
import { ActivateFlowSection } from "./_sections/ActivateFlowSection";
import { DiagnosticsSection } from "./_sections/DiagnosticsSection";
import { LivePreviewSection } from "./_sections/LivePreviewSection";

const WHEN_TO_USE = [
  { title: "Fade", guidance: "Opacity only, no position change — text and metadata that shouldn't shift the layout as it appears." },
  { title: "Slide", guidance: "Opacity plus a directional translate — the default entrance for cards, headings, and sections." },
  { title: "Scale", guidance: "Opacity plus a scale entrance — icons, badges, and nodes appearing from nothing rather than sliding in." },
  { title: "Collapse & Expand", guidance: "One height-animation mechanism for two directions of intent: shrinking existing content away, or growing new content into view." },
  { title: "Crossfade", guidance: "Swaps between differently-keyed content with a fade instead of both states existing at once — tab panels, step content, anything that replaces rather than reveals." },
  { title: "Stagger", guidance: "Times each child's own entrance so identical siblings reveal in sequence instead of all at once." },
  { title: "Progress & Connector Flow", guidance: "The animated-fill mechanism behind progress rails, connector fills, and pipeline diagrams." },
  { title: "Pulse & Highlight", guidance: "A looping breathing effect for something live or in-progress, and a one-off accent flash for something that just changed." },
  { title: "Activate, Queue Flow & Publish Flow", guidance: "System-style motion: a node's state transition, a stream of items moving through a queue, and a repeating 'item published' loop." },
];

const relatedComponents = [getEntry("tokens")!, getEntry("illustrations")!];

export default function MotionPlaygroundPage() {
  return (
    <PageShell background={<SystemGrid />}>
      <SectionShell spacing="xl">
        <div className="flex flex-col gap-6">
          <SectionBadge icon={<Waves className="size-3.5" />}>Playground</SectionBadge>
          <Display>Motion engine</Display>
          <Body size="lg" muted className="max-w-[var(--container-narrow)]">
            The reusable motion architecture every future illustration and page animation is built on: semantic
            tokens, a global provider, five hooks, fourteen primitives, and the utilities that hold them together.
            Nothing on this page is a homepage animation, it&apos;s the engine underneath one.
          </Body>
        </div>
      </SectionShell>

      <ControlDock />

      <SectionShell id="overview" spacing="lg" divider>
        <SectionHeader
          eyebrow={<Eyebrow tone="accent">Overview</Eyebrow>}
          title="Overview"
          description="Five durations, four delays, four distances, and five easing curves — the resolved-value vocabulary every primitive on this page reads from. Nothing is hardcoded per component."
          descriptionMaxWidth={false}
        />
      </SectionShell>
      <TokensSection />

      <SectionShell id="when-to-use" spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            eyebrow={<Eyebrow tone="accent">When to use</Eyebrow>}
            title="When to use"
            description="A quick reference for which primitive fits which moment — the full, live version of each is in Examples below."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={3}>
            {WHEN_TO_USE.map((item) => (
              <Card key={item.title} className="flex flex-col gap-2">
                <span className="text-body-sm font-medium text-ink-primary">{item.title}</span>
                <Body size="sm" muted>
                  {item.guidance}
                </Body>
              </Card>
            ))}
          </CardGrid>
        </div>
      </SectionShell>

      <SectionShell id="examples" spacing="lg" divider>
        <SectionHeader
          eyebrow={<Eyebrow tone="accent">Examples</Eyebrow>}
          title="Examples"
          description="Eleven primitives, live: entrances, transitions, and system-style motion, each with its own timing already resolved from the token layer above."
          descriptionMaxWidth={false}
        />
      </SectionShell>
      <FadeSection />
      <SlideSection />
      <ScaleSection />
      <CollapseExpandSection />
      <CrossfadeSection />
      <StaggerSection />
      <ProgressSection />
      <ConnectorFlowSection />
      <PulseSection />
      <HighlightSection />
      <ActivateFlowSection />

      <SectionShell id="behavior" spacing="lg" divider>
        <SectionHeader
          eyebrow={<Eyebrow tone="accent">Behavior</Eyebrow>}
          title="Behavior"
          description="The dock at the top of this page is a real control surface, not a demo: Play/Pause and Replay write to the same MotionProvider every example on this page reads from, and the 0.5x/1x/2x speed control divides every resolved duration and delay."
          descriptionMaxWidth={false}
        />
      </SectionShell>
      <MotionControlsSection />
      <SpeedControlsSection />

      <SectionShell id="accessibility" spacing="lg" divider>
        <SectionHeader eyebrow={<Eyebrow tone="accent">Accessibility</Eyebrow>} title="Accessibility" descriptionMaxWidth={false} />
      </SectionShell>
      <ReducedMotionSection />

      <SectionShell id="composition" spacing="lg" divider>
        <SectionHeader
          eyebrow={<Eyebrow tone="accent">Composition</Eyebrow>}
          title="Composition"
          description="Proof that independently built primitives compose into one coherent scene with nothing but ordinary React composition, plus the developer diagnostics used to inspect that composition while building it."
          descriptionMaxWidth={false}
        />
      </SectionShell>
      <LivePreviewSection />
      <DiagnosticsSection />

      <SectionShell id="related-components" spacing="lg" divider>
        <div className="flex flex-col gap-6">
          <SectionHeader
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

      <SectionShell id="reference" spacing="xl" background="raised">
        <div className="flex flex-col items-center gap-4 text-center">
          <SectionHeader eyebrow={<Eyebrow tone="accent">Reference</Eyebrow>} title="Reference" align="center" descriptionMaxWidth={false} />
          <Body muted className="max-w-[var(--container-narrow)]">
            Fourteen primitives, five hooks, one provider, one token set — the complete engine this page documents.
            It underpins the Illustration Engine, which composes these primitives into StudioPOD&apos;s actual
            workflow and architecture diagrams.
          </Body>
        </div>
      </SectionShell>
    </PageShell>
  );
}
