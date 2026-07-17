import { SectionShell, CardGrid } from "@/components/layout";
import { DescriptionList } from "@/components/metadata";
import { Card, Body, Caption, SectionHeader, Eyebrow, Badge } from "@/components/ui";
import { DocsShell, DocsPageHeader, DocsTableOfContents, DocsRelatedGrid, CertificationPanel } from "@/components/docs";
import { getEntry, getRelatedLinks } from "@/lib/design-system-navigation";
import {
  TwoPanelExample,
  ThreePanelExample,
  InspectorLayoutExample,
  CollapsedNavigationExample,
  ResponsiveMobileExample,
  DenseProductionExample,
} from "./_components/WorkspaceExamples";

const entry = getEntry("foundation-workspace")!;
const relatedComponents = getRelatedLinks(entry);

const SLOTS: { name: string; role: string; landmark: string }[] = [
  { name: "Workspace", role: "The root shell — owns density, height mode, and background.", landmark: "div" },
  { name: "WorkspaceHeader", role: "Identity and context — title, breadcrumb, global status.", landmark: "header" },
  { name: "WorkspaceToolbar", role: "Actions and interaction — never repeats what Header already said.", landmark: "div (see anatomy)" },
  { name: "WorkspaceBody", role: "The horizontal row holding Navigation, Content, and Inspector.", landmark: "div" },
  { name: "WorkspaceNavigation", role: "Browsing and selection — feeds Content, never the reverse.", landmark: "nav" },
  { name: "WorkspaceContent", role: "The primary work surface.", landmark: "main" },
  { name: "WorkspaceInspector", role: "Detail on whatever Content currently shows.", landmark: "aside" },
  { name: "WorkspaceFooter", role: "Passive operational status — never takes focus from the task.", landmark: "footer" },
];

export default function FoundationWorkspacePage() {
  return (
    <DocsShell entry={entry} toc={<DocsTableOfContents />}>
      <DocsPageHeader entry={entry} />

      {/* Overview / Purpose */}
      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-6">
          <SectionHeader
            id="overview"
            eyebrow={<Eyebrow tone="accent">Overview</Eyebrow>}
            title="The full-bleed shell a tool lives in"
            description="A workspace is the application-level layout every StudioPOD platform screen composes from — distinct from PageShell, which wraps a scrolling document. A workspace does not scroll; its content region does. It exists so every tool — Production, Publishing, Commerce, Admin — shares one recognizable structure instead of each team inventing its own header/sidebar/content arrangement."
            descriptionMaxWidth={false}
          />
          <Body size="sm" muted className="max-w-[var(--container-narrow)]">
            Composition, not configuration: every region below is a real component you assemble yourself. There is no
            single <code>layout</code> prop that switches between arrangements — you compose the regions your screen
            actually needs, in the order the anatomy below specifies, and omit the ones you don&rsquo;t.
          </Body>
        </div>
      </SectionShell>

      {/* Layout anatomy */}
      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-6">
          <SectionHeader
            id="anatomy"
            eyebrow={<Eyebrow tone="accent">Layout anatomy</Eyebrow>}
            title="Six tiers, one canonical order"
            description="Workspace maps directly onto the six-tier blueprint every StudioPOD workspace shares (see the Workspace Shell architecture page). Tier 5 is documented there as deliberately unoccupied — this primitive intentionally has no region for it."
            descriptionMaxWidth={false}
          />
          <Card className="flex flex-col gap-1 font-mono text-caption text-ink-secondary">
            <div>Tier 1 — Global Navigation (site chrome, outside Workspace)</div>
            <div>Tier 2 — WorkspaceHeader</div>
            <div>Tier 3 — WorkspaceToolbar (reads Header&rsquo;s context, never repeats it)</div>
            <div>Tier 4 — WorkspaceBody: WorkspaceNavigation | WorkspaceContent | WorkspaceInspector (peers)</div>
            <div className="text-ink-tertiary">Tier 5 — reserved, deliberately unoccupied</div>
            <div>Tier 6 — WorkspaceFooter (operational status)</div>
          </Card>
        </div>
      </SectionShell>

      {/* Slots */}
      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-6">
          <SectionHeader
            id="slots"
            eyebrow={<Eyebrow tone="accent">Slots</Eyebrow>}
            title="Every region, and what it's for"
            descriptionMaxWidth={false}
          />
          <div className="flex flex-col gap-2">
            {SLOTS.map((slot) => (
              <div key={slot.name} className="flex flex-col gap-1 rounded-md border border-border-subtle p-3 sm:flex-row sm:items-center sm:justify-between">
                <code className="text-body-sm font-medium text-ink-primary">{slot.name}</code>
                <Body size="sm" muted className="sm:max-w-md">
                  {slot.role}
                </Body>
                <Badge tone="neutral" size="sm">
                  {slot.landmark}
                </Badge>
              </div>
            ))}
          </div>
          <Body size="sm" muted>
            Full prop reference lives in <code>src/components/layout/Workspace.tsx</code>&rsquo;s own doc comments —
            every prop is documented at the source, not restated here where it can drift.
          </Body>
        </div>
      </SectionShell>

      {/* Examples */}
      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="examples"
            eyebrow={<Eyebrow tone="accent">Examples</Eyebrow>}
            title="Six representative compositions"
            description="Each one demonstrates a real composition, built from the actual Workspace family plus real UI kit primitives — not decorative placeholder boxes."
            descriptionMaxWidth={false}
          />

          <div className="flex flex-col gap-3">
            <Caption className="text-ink-tertiary">Two-panel workspace</Caption>
            <TwoPanelExample />
          </div>

          <div className="flex flex-col gap-3">
            <Caption className="text-ink-tertiary">Three-panel workspace</Caption>
            <ThreePanelExample />
          </div>

          <div className="flex flex-col gap-3">
            <Caption className="text-ink-tertiary">Inspector layout</Caption>
            <InspectorLayoutExample />
          </div>

          <div className="flex flex-col gap-3">
            <Caption className="text-ink-tertiary">Collapsed navigation</Caption>
            <CollapsedNavigationExample />
          </div>

          <div className="flex flex-col gap-3">
            <Caption className="text-ink-tertiary">Responsive mobile layout</Caption>
            <ResponsiveMobileExample />
          </div>

          <div className="flex flex-col gap-3">
            <Caption className="text-ink-tertiary">Dense production workspace</Caption>
            <DenseProductionExample />
          </div>
        </div>
      </SectionShell>

      {/* Composition guidance */}
      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-6">
          <SectionHeader
            id="composition"
            eyebrow={<Eyebrow tone="accent">Composition guidance</Eyebrow>}
            title="How the regions actually fit together"
            descriptionMaxWidth={false}
          />
          <CardGrid columns={2}>
            <Card className="flex flex-col gap-2">
              <Body size="sm" className="font-medium text-ink-primary">
                WorkspaceBody owns the row
              </Body>
              <Body size="sm" muted>
                Header and Footer stack vertically; Navigation, Content, and Inspector sit in a horizontal row inside
                WorkspaceBody. Its <code>min-h-0</code> is load-bearing — without it, a flex child refuses to shrink
                below its content and every descendant&rsquo;s scroll silently breaks.
              </Body>
            </Card>
            <Card className="flex flex-col gap-2">
              <Body size="sm" className="font-medium text-ink-primary">
                Exactly one region should scroll
              </Body>
              <Body size="sm" muted>
                Workspace itself is always <code>overflow-hidden</code>. Opt a region in with <code>scroll</code> —
                usually Content. Leave it off for canvas/map views that manage their own viewport.
              </Body>
            </Card>
            <Card className="flex flex-col gap-2">
              <Body size="sm" className="font-medium text-ink-primary">
                Density is a data attribute, not context
              </Body>
              <Body size="sm" muted>
                <code>density</code> publishes <code>data-density</code>, consumed via Tailwind group variants — no
                React context, so the whole family stays server-component-safe. No component in this file has a{" "}
                <code>&quot;use client&quot;</code> directive.
              </Body>
            </Card>
            <Card className="flex flex-col gap-2">
              <Body size="sm" className="font-medium text-ink-primary">
                Collapse is consumer-controlled
              </Body>
              <Body size="sm" muted>
                <code>collapsed</code> on Navigation/Inspector is a plain boolean — Workspace owns the resulting
                width and <code>data-collapsed</code> attribute, never the toggle button or the state. Wire your own
                button and <code>useState</code> in your own Client Component.
              </Body>
            </Card>
          </CardGrid>
        </div>
      </SectionShell>

      {/* Responsive behavior */}
      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-6">
          <SectionHeader
            id="responsive"
            eyebrow={<Eyebrow tone="accent">Responsive behavior</Eyebrow>}
            title="hideBelowLg vs. collapsed — not the same thing"
            descriptionMaxWidth={false}
          />
          <DescriptionList
            items={[
              { label: "hideBelowLg", value: "CSS-only, viewport-driven. Below lg, the region is hidden and removed from the focus order. No JavaScript, no consumer state — the primitive decides this is genuinely unusable at that width." },
              { label: "collapsed", value: "Explicit, consumer-controlled, works at any viewport. The region stays in the DOM and the focus order — a deliberate user choice to save space is not the same as content being unusable." },
              { label: "No built-in drawer", value: "At narrow widths with Navigation hidden, Workspace does not invent a drawer or menu. That's a real product decision the consumer makes — see GlobalNav's own mobile drawer for a worked example elsewhere in this codebase." },
            ]}
          />
        </div>
      </SectionShell>

      {/* Accessibility */}
      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-6">
          <SectionHeader
            id="accessibility"
            eyebrow={<Eyebrow tone="accent">Accessibility</Eyebrow>}
            title="Landmarks, focus, and reduced motion"
            descriptionMaxWidth={false}
          />
          <DescriptionList
            items={[
              { label: "Landmarks", value: "header / nav / main / aside / footer by default, each with an asDiv escape hatch for when the surrounding page already owns that landmark (a document must not contain two <main>s)." },
              { label: "Labels", value: "Navigation and Inspector accept a label prop — required in practice whenever a page has more than one of either landmark, which is the norm for a workspace nested in a site." },
              { label: "Focus order", value: "Natural DOM order: Header, Toolbar, Navigation, Content, Inspector, Footer — browse before work, work before inspect, matching the architecture's own \"discovery before work\" principle." },
              { label: "hideBelowLg removes from focus order", value: "A CSS-hidden region cannot strand a keyboard user in an invisible panel." },
              { label: "collapsed keeps focus order intact", value: "Collapsing to a rail is a size change, not a usability judgment — content must stay reachable. The consumer is responsible for making collapsed content make sense (icon-only, with accessible names on each icon)." },
              { label: "Reduced motion", value: "The collapse width transition uses Tailwind's motion-reduce: variant (CSS-only), not the JS-based useMotionPreference the rest of this codebase uses — deliberately, since Workspace has no \"use client\" boundary to read that context from." },
            ]}
          />
        </div>
      </SectionShell>

      {/* Do / Don't */}
      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-6">
          <SectionHeader id="do-dont" eyebrow={<Eyebrow tone="accent">Do / Don&rsquo;t</Eyebrow>} title="Do / Don't" descriptionMaxWidth={false} />
          <CardGrid columns={2}>
            <Card className="flex flex-col gap-2 border-success/30">
              <Badge tone="success" size="sm" className="w-fit">
                Do
              </Badge>
              <Body size="sm" muted>
                Give Navigation and Inspector a <code>label</code> whenever more than one of either landmark exists
                on the page.
              </Body>
            </Card>
            <Card className="flex flex-col gap-2 border-error/30">
              <Badge tone="warning" size="sm" className="w-fit">
                Don&rsquo;t
              </Badge>
              <Body size="sm" muted>
                Put page identity or status text inside WorkspaceToolbar — that duplicates Header and breaks the
                &ldquo;context before interaction&rdquo; rule the architecture depends on.
              </Body>
            </Card>
            <Card className="flex flex-col gap-2 border-success/30">
              <Badge tone="success" size="sm" className="w-fit">
                Do
              </Badge>
              <Body size="sm" muted>
                Use <code>PageShell</code>, not <code>Workspace</code>, for a document that should scroll as a
                whole — a marketing page, a settings form.
              </Body>
            </Card>
            <Card className="flex flex-col gap-2 border-error/30">
              <Badge tone="warning" size="sm" className="w-fit">
                Don&rsquo;t
              </Badge>
              <Body size="sm" muted>
                Reach for resizable panels here. Resizing is explicitly a future SplitView primitive&rsquo;s job —
                Workspace has no drag-to-resize API on purpose.
              </Body>
            </Card>
          </CardGrid>
        </div>
      </SectionShell>

      {/* Common patterns */}
      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-6">
          <SectionHeader
            id="patterns"
            eyebrow={<Eyebrow tone="accent">Common patterns</Eyebrow>}
            title="Shapes this primitive is built to support"
            descriptionMaxWidth={false}
          />
          <DescriptionList
            items={[
              { label: "List + detail", value: "Navigation (or Content itself, as a list) feeds a selection into Content or Inspector — the Asset → Primary → Inspector flow the architecture calls \"discovery before work.\"" },
              { label: "Dense operational tool", value: "density=\"compact\" plus a real WorkspaceToolbar for bulk actions and filters — see the dense production example above." },
              { label: "Icon rail navigation", value: "collapsed Navigation, consumer-rendered icon-only content, expanded by the consumer's own toggle button." },
              { label: "Embedded, not full-page", value: "fullHeight={false} (the default) fills whatever height the parent gives it — used for every example on this page, and the shape a docs playground or a modal-hosted workspace needs." },
            ]}
          />
        </div>
      </SectionShell>

      {/* Relationship to SplitView & future layouts */}
      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-6">
          <SectionHeader
            id="relationship"
            eyebrow={<Eyebrow tone="accent">Relationship to other primitives</Eyebrow>}
            title="What Workspace deliberately doesn't do"
            descriptionMaxWidth={false}
          />
          <DescriptionList
            items={[
              { label: "SplitView (future)", value: "Resizing and drag-to-adjust panel widths are explicitly out of Workspace's scope — WorkspaceBody exists as a plain row specifically so a future SplitView primitive has a place to slot in without Workspace needing a breaking change. Workspace does not anticipate SplitView's API; it just doesn't block it." },
              { label: "Future application layouts", value: "Any new layout shape (e.g. a canvas-first or timeline-first tool) should compose Workspace's existing regions first — a new top-level layout primitive is justified only once a real pattern can't be expressed through Header/Toolbar/Navigation/Content/Inspector/Footer at all, not as a starting assumption." },
            ]}
          />
        </div>
      </SectionShell>

      {/* Certification */}
      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-6">
          <SectionHeader
            id="certification"
            eyebrow={<Eyebrow tone="accent">Certification</Eyebrow>}
            title="Production-readiness, checked"
            description="Read live from the DS-1F certification registry — see docs/CERTIFICATION.md."
            descriptionMaxWidth={false}
          />
          <CertificationPanel componentName="Workspace" className="max-w-md" />
        </div>
      </SectionShell>

      {/* Related components */}
      <SectionShell spacing="lg">
        <div className="flex flex-col gap-6">
          <SectionHeader
            id="related-components"
            eyebrow={<Eyebrow tone="accent">Related components</Eyebrow>}
            title="Related components"
            descriptionMaxWidth={false}
          />
          <DocsRelatedGrid entries={relatedComponents} />
        </div>
      </SectionShell>
    </DocsShell>
  );
}
