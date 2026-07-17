import { SectionShell, CardGrid } from "@/components/layout";
import { DescriptionList } from "@/components/metadata";
import { Card, Body, Caption, SectionHeader, Eyebrow, Badge } from "@/components/ui";
import { DocsShell, DocsPageHeader, DocsTableOfContents, DocsRelatedGrid, CertificationPanel } from "@/components/docs";
import { getEntry, getRelatedLinks } from "@/lib/design-system-navigation";
import {
  TwoPaneEditorExample,
  ThreePaneInspectorExample,
  VerticalSplitExample,
  NestedSplitExample,
  CollapsibleInspectorExample,
  IdeStyleLayoutExample,
} from "./_components/SplitViewExamples";

const entry = getEntry("foundation-splitview")!;
const relatedComponents = getRelatedLinks(entry);

const SLOTS: { name: string; role: string; landmark: string }[] = [
  { name: "SplitView", role: "The row/column container — owns size state, drag/keyboard resizing, and orientation.", landmark: "div" },
  { name: "SplitPane", role: "One resizable region. Declares its own defaultSize/minSize/maxSize/collapsible.", landmark: "div" },
  { name: "SplitDivider", role: "The draggable, keyboard-operable boundary between two panes.", landmark: "role=\"separator\"" },
];

export default function FoundationSplitViewPage() {
  return (
    <DocsShell entry={entry} toc={<DocsTableOfContents />}>
      <DocsPageHeader entry={entry} />

      {/* Overview / Purpose */}
      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-6">
          <SectionHeader
            id="overview"
            eyebrow={<Eyebrow tone="accent">Overview</Eyebrow>}
            title="Pane composition, not page structure"
            description="SplitView divides whatever region it's placed in — typically a WorkspaceContent, but it has no dependency on Workspace at all — into two or more independently resizable, scrollable panes. Workspace owns overall page structure (header/toolbar/nav/content/inspector/footer); SplitView owns pane composition inside any one of those regions. Reach for it whenever a screen needs a user-adjustable division of space: a file list beside an editor, a preview stacked over a console, an inspector that can be dragged wider or collapsed away."
            descriptionMaxWidth={false}
          />
          <Body size="sm" muted className="max-w-[var(--container-narrow)]">
            Composition, not configuration: there is no <code>panes</code> array or <code>layout</code> prop. You
            compose <code>SplitPane</code>/<code>SplitDivider</code> elements directly, alternating, exactly as they
            should appear on screen.
          </Body>
        </div>
      </SectionShell>

      {/* Architecture */}
      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-6">
          <SectionHeader
            id="architecture"
            eyebrow={<Eyebrow tone="accent">Architecture</Eyebrow>}
            title="How the three pieces fit together"
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
            <code>SplitPane</code> and <code>SplitDivider</code> must be direct children of <code>SplitView</code> —
            not wrapped in an intermediate component. SplitView reads its children synchronously to compute each
            pane&rsquo;s index and each divider&rsquo;s two flanking panes, then clones every pane/divider element
            with the size and ARIA-value data it needs. The actual drag/keyboard handlers travel through React
            context instead, wired up inside SplitDivider&rsquo;s own render — those handlers close over refs (drag
            position, the measured container size), and passing a ref-touching function through a cloned element
            during render is exactly what the React Compiler&rsquo;s ref-safety analysis correctly refuses to let
            through. Full prop reference lives in <code>src/components/layout/SplitView.tsx</code>&rsquo;s own doc
            comments — every prop is documented at the source, not restated here where it can drift.
          </Body>
        </div>
      </SectionShell>

      {/* Pane anatomy */}
      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-6">
          <SectionHeader
            id="pane-anatomy"
            eyebrow={<Eyebrow tone="accent">Pane anatomy</Eyebrow>}
            title="What a SplitPane owns"
            descriptionMaxWidth={false}
          />
          <DescriptionList
            items={[
              { label: "defaultSize", value: "Initial size as a percent of SplitView's main axis (uncontrolled). Panes without one split whatever's left evenly." },
              { label: "minSize / maxSize", value: "Percent bounds this pane can be dragged or keyboard-resized to. Default 10 / 90." },
              { label: "collapsible", value: "Lets dragging past this pane's edge, or the flanking divider's Enter key, collapse it fully to 0%. Off by default — most panes shouldn't disappear by accident." },
              { label: "collapsed", value: "A separate, consumer-controlled override — pass it to fully own this pane's collapse state yourself, mirroring WorkspaceNavigation/WorkspaceInspector's own collapsed prop." },
              { label: "scroll", value: "Give this pane its own scrollbar. Off by default, matching WorkspaceContent's own opt-in convention." },
            ]}
          />
        </div>
      </SectionShell>

      {/* Divider anatomy */}
      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-6">
          <SectionHeader
            id="divider-anatomy"
            eyebrow={<Eyebrow tone="accent">Divider anatomy</Eyebrow>}
            title="A WAI-ARIA Window Splitter, not a decorative rule"
            description="SplitDivider implements the WAI-ARIA APG's Window Splitter pattern: role=&quot;separator&quot;, aria-orientation, aria-valuenow/min/max, and full keyboard operation — it is never just a styled <div>."
            descriptionMaxWidth={false}
          />
          <DescriptionList
            items={[
              { label: "aria-orientation is inverted from SplitView's orientation prop", value: "Side-by-side panes (orientation=\"horizontal\") are divided by a VERTICAL line, so the separator's own aria-orientation is \"vertical\" — it describes the divider's own axis, not the layout's." },
              { label: "1px visual line, wider hit target", value: "The drag handle you can actually grab extends past the visible line via spacing-scale padding, not an arbitrary pixel value — precision dragging on a thin line is a real usability problem this avoids." },
              { label: "Arrow keys resize by 2%, Shift+Arrow by 10%", value: "Left/Right on a horizontal split, Up/Down on a vertical one — matching the axis a mouse drag would actually move along." },
              { label: "Home / End", value: "Jump the pane before the divider to its minimum or maximum in one keypress." },
              { label: "Enter / Space", value: "Toggles collapse on whichever flanking pane declared collapsible — a no-op if neither did." },
              { label: "Cursor feedback", value: "col-resize for a vertical (horizontally-draggable) line, row-resize for a horizontal one — standard browser resize cursors, not custom art." },
            ]}
          />
        </div>
      </SectionShell>

      {/* Sizing model */}
      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-6">
          <SectionHeader
            id="sizing-model"
            eyebrow={<Eyebrow tone="accent">Sizing model</Eyebrow>}
            title="Percentages, exchanged locally between neighbors"
            descriptionMaxWidth={false}
          />
          <CardGrid columns={2}>
            <Card className="flex flex-col gap-2">
              <Body size="sm" className="font-medium text-ink-primary">
                Everything is a percent of the main axis
              </Body>
              <Body size="sm" muted>
                <code>defaultSize</code>/<code>minSize</code>/<code>maxSize</code>, and the array passed to{" "}
                <code>onSizesChange</code>, are always percentages summing to 100 across every pane — never pixels.
              </Body>
            </Card>
            <Card className="flex flex-col gap-2">
              <Body size="sm" className="font-medium text-ink-primary">
                A divider only ever moves its two neighbors
              </Body>
              <Body size="sm" muted>
                Dragging or keyboard-resizing one divider transfers size between exactly its two flanking panes,
                clamped to each one&rsquo;s own bounds — it never &ldquo;pushes&rdquo; a third pane further down the
                row. A divider&rsquo;s effect is always local, never a cascade.
              </Body>
            </Card>
            <Card className="flex flex-col gap-2">
              <Body size="sm" className="font-medium text-ink-primary">
                Uncontrolled by default
              </Body>
              <Body size="sm" muted>
                Each <code>SplitPane</code>&rsquo;s <code>defaultSize</code> seeds SplitView&rsquo;s internal size
                state. This is the common case — most consumers never need <code>sizes</code>/
                <code>onSizesChange</code> at all.
              </Body>
            </Card>
            <Card className="flex flex-col gap-2">
              <Body size="sm" className="font-medium text-ink-primary">
                Controlled sizing lives on SplitView, not per-pane
              </Body>
              <Body size="sm" muted>
                Pass <code>sizes</code>/<code>onSizesChange</code> on <code>SplitView</code> itself — sizes are a
                group concern (one divider moves two panes at once). SplitView has no built-in persistence; wiring
                the pair to <code>localStorage</code> to remember a user&rsquo;s layout is a few lines in your own
                Client Component, not a hidden feature here.
              </Body>
            </Card>
          </CardGrid>
        </div>
      </SectionShell>

      {/* Examples */}
      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="examples"
            eyebrow={<Eyebrow tone="accent">Examples</Eyebrow>}
            title="Six representative compositions"
            description="Each one demonstrates a real composition, built from the actual SplitView family plus real UI kit primitives — not decorative placeholder boxes. Drag any divider, or focus one and use the arrow keys."
            descriptionMaxWidth={false}
          />

          <div className="flex flex-col gap-3">
            <Caption className="text-ink-tertiary">Two-pane editor</Caption>
            <TwoPaneEditorExample />
          </div>

          <div className="flex flex-col gap-3">
            <Caption className="text-ink-tertiary">Three-pane inspector</Caption>
            <ThreePaneInspectorExample />
          </div>

          <div className="flex flex-col gap-3">
            <Caption className="text-ink-tertiary">Vertical split</Caption>
            <VerticalSplitExample />
          </div>

          <div className="flex flex-col gap-3">
            <Caption className="text-ink-tertiary">Nested split</Caption>
            <NestedSplitExample />
          </div>

          <div className="flex flex-col gap-3">
            <Caption className="text-ink-tertiary">Collapsible inspector</Caption>
            <CollapsibleInspectorExample />
          </div>

          <div className="flex flex-col gap-3">
            <Caption className="text-ink-tertiary">IDE-style layout</Caption>
            <IdeStyleLayoutExample />
          </div>
        </div>
      </SectionShell>

      {/* Nested layouts */}
      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-6">
          <SectionHeader
            id="nested-layouts"
            eyebrow={<Eyebrow tone="accent">Nested layouts</Eyebrow>}
            title="No special API — nesting is just composition"
            description="Put a <SplitView> inside a <SplitPane>'s children and it works: each SplitView reads only its own direct children, and shares its size state through its own context, so an inner SplitView never sees or affects its parent's sizes. The Nested split example above is a horizontal split whose right pane contains a fully independent vertical split."
            descriptionMaxWidth={false}
          />
        </div>
      </SectionShell>

      {/* Responsive behavior */}
      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-6">
          <SectionHeader
            id="responsive"
            eyebrow={<Eyebrow tone="accent">Responsive behavior</Eyebrow>}
            title="Percentages scale for free; breakpoints are the consumer's call"
            descriptionMaxWidth={false}
          />
          <DescriptionList
            items={[
              { label: "Proportional by construction", value: "Because every pane's width/height is a percent, not a pixel value, the whole split scales smoothly as its container resizes — no resize-observer plumbing needed for that alone." },
              { label: "No built-in breakpoint collapsing", value: "Unlike WorkspaceNavigation/WorkspaceInspector's hideBelowLg, SplitView does not hide or stack panes at narrow widths on its own. That's a deliberate scope line: SplitView owns resizing, not responsive layout policy." },
              { label: "The pattern for \"stack on mobile\"", value: "Switch the orientation prop yourself from a media-query hook (e.g. horizontal on lg and up, vertical below it) — a few lines in your own Client Component, the same 'don't invent it here' stance Workspace takes on its own missing mobile drawer." },
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
                Give every <code>SplitDivider</code> an <code>aria-label</code> describing what it resizes — &ldquo;
                Resize sidebar&rdquo;, not &ldquo;Divider 1&rdquo;.
              </Body>
            </Card>
            <Card className="flex flex-col gap-2 border-error/30">
              <Badge tone="warning" size="sm" className="w-fit">
                Don&rsquo;t
              </Badge>
              <Body size="sm" muted>
                Wrap <code>SplitPane</code> or <code>SplitDivider</code> in your own component before placing it in{" "}
                <code>SplitView</code> — they must be direct children, or SplitView can&rsquo;t compute their index.
              </Body>
            </Card>
            <Card className="flex flex-col gap-2 border-success/30">
              <Badge tone="success" size="sm" className="w-fit">
                Do
              </Badge>
              <Body size="sm" muted>
                Reach for <code>collapsible</code> on a sidebar or inspector pane the user should be able to fully
                dismiss — a properties panel, a file explorer.
              </Body>
            </Card>
            <Card className="flex flex-col gap-2 border-error/30">
              <Badge tone="warning" size="sm" className="w-fit">
                Don&rsquo;t
              </Badge>
              <Body size="sm" muted>
                Reach for <code>SplitView</code> to build overall page chrome — header, navigation, status footer.
                That&rsquo;s <code>Workspace</code>&rsquo;s job; SplitView only divides one region of it.
              </Body>
            </Card>
          </CardGrid>
        </div>
      </SectionShell>

      {/* Relationship to Workspace */}
      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-6">
          <SectionHeader
            id="relationship-workspace"
            eyebrow={<Eyebrow tone="accent">Relationship to Workspace</Eyebrow>}
            title="A clean, deliberate split of responsibility"
            descriptionMaxWidth={false}
          />
          <DescriptionList
            items={[
              { label: "Workspace owns page structure", value: "Header, toolbar, navigation, content, inspector, footer — the six-tier shell every StudioPOD tool shares. It has zero knowledge of resizing." },
              { label: "SplitView owns pane composition", value: "It divides whatever region it's placed in — typically WorkspaceContent — into resizable panes. It has zero knowledge of Workspace; it doesn't import from it, reference it, or assume it's present." },
              { label: "Workspace needed no changes to support this", value: "WorkspaceBody was already a plain flex row with a load-bearing min-h-0, specifically so a primitive like this could slot in without a breaking change. This phase touched Workspace's doc comments only — updating two \"future SplitView\" mentions that are no longer hypothetical — not its behavior or API." },
            ]}
          />
        </div>
      </SectionShell>

      {/* Relationship to future editors */}
      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-6">
          <SectionHeader
            id="relationship-editors"
            eyebrow={<Eyebrow tone="accent">Relationship to future editors</Eyebrow>}
            title="The shell an IDE-shaped tool would compose, not a Storybook-specific one"
            description="A future code editor, canvas editor, or any multi-pane authoring tool doesn't need a bespoke layout primitive of its own — it composes SplitView (nested, if needed) the same way the IDE-style layout example above does, plus whatever editor-specific components (a Monaco instance, a canvas surface) it hangs inside each pane. SplitView doesn't anticipate that API any more than Workspace anticipated SplitView's — it just doesn't block it."
            descriptionMaxWidth={false}
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
          <CertificationPanel componentName="SplitView" className="max-w-md" />
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
