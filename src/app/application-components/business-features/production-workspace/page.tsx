import { ArrowDown } from "lucide-react";
import { SectionShell, DescriptionList, Surface } from "@/components/layout";
import { Card, Badge, Body, Caption, SectionHeader, Eyebrow } from "@/components/ui";
import { DocsShell, DocsPageHeader, DocsTableOfContents } from "@/components/docs";
import { getEntry } from "@/lib/design-system-navigation";
import { PRODUCTION_STAGES, VALIDATION_FLOW_ORDER, VALIDATION_FLOW_LABEL } from "./_data/mock-production";
import { ProductionFeatureWorkspace } from "./_components/ProductionFeatureWorkspace";

const entry = getEntry("production-workspace-feature")!;

interface CompositionTier {
  id: string;
  name: string;
  components: string[];
}

const COMPOSITION_CHAIN: CompositionTier[] = [
  {
    id: "business-feature",
    name: "Business Feature",
    components: [
      "ProductionFeatureWorkspace",
      "ProductionFeatureHeader",
      "ProductionFeatureNavigation",
      "ProductionFeatureCanvas",
      "ProductionFeatureInspector",
      "ProductionFeatureValidation",
      "ProductionFeatureMetrics",
      "ProductionFeatureActions",
      "ProductionFeatureDialogs",
      "useProductionWorkspace (hook)",
      "mock-production.ts (repository)",
    ],
  },
  {
    id: "platform",
    name: "Platform — Production Platform",
    components: [
      "ProductionWorkspace",
      "ProductionHeader",
      "ProductionSidebar",
      "ProductionCanvas",
      "ProductionStagePanel",
      "ProductionInspector",
      "ProductionPipeline",
      "ProductionQueue",
      "ProductionValidationPanel",
      "ProductionMetrics",
      "ProductionActions",
    ],
  },
  {
    id: "workflow",
    name: "Workflow",
    components: ["Workflow", "WorkflowHeader", "WorkflowSidebar", "WorkflowViewport", "WorkflowStep", "PipelineStage", "PipelineGate", "StateInspector", "WorkflowFooter"],
  },
  {
    id: "operational",
    name: "Operational",
    components: ["InspectorPanel", "InspectorSection", "InspectorActions", "InspectorFooter", "PropertyToggle", "Queue"],
  },
  {
    id: "foundation",
    name: "Foundation",
    components: ["Dialog", "Button", "Badge", "SwitchField", "Alert", "InlineMessage", "Tabs / TabsList / Tab", "MetadataField", "StatGroup"],
  },
];

interface LayerOwnership {
  id: string;
  name: string;
  owns: string[];
}

const LAYER_OWNERSHIP: LayerOwnership[] = [
  { id: "business-feature", name: "Business Feature", owns: ["Feature state", "Feature orchestration", "Commands", "Dialog state", "Selection", "Validation state", "Feature navigation", "Feature actions", "Feature-level view switching", "Mock repository"] },
  { id: "platform", name: "Platform", owns: ["Workspace shell", "Pipeline", "Queue", "Inspector", "Metrics", "Validation panel", "Canvas", "Actions"] },
  { id: "workflow", name: "Workflow", owns: ["Pipeline", "Approval", "Timeline", "State", "Workflow orchestration"] },
  { id: "operational", name: "Operational", owns: ["Data Grid", "Inspector", "Property Panel", "Dashboard", "Status", "Health", "Queue", "Bulk Actions"] },
  { id: "foundation", name: "Foundation", owns: ["Layout", "Forms", "Buttons", "Inputs", "Tables", "Navigation", "Feedback", "Metadata"] },
];

interface AnatomyPart {
  part: string;
  file: string;
  description: string;
}

const FEATURE_ANATOMY: AnatomyPart[] = [
  { part: "Workspace", file: "ProductionFeatureWorkspace.tsx", description: "The outer shell — calls the hook once and composes ProductionWorkspace as the shell, ProductionSidebar as the object-detail rail." },
  { part: "Header", file: "ProductionFeatureHeader.tsx", description: "Identity, feature-global undo/redo, and the view-switch navigation." },
  { part: "Navigation", file: "ProductionFeatureNavigation.tsx", description: "Pipeline / Queue / Dashboard view switching via Foundation Tabs." },
  { part: "Primary View", file: "ProductionFeatureCanvas.tsx", description: "Switches between the three feature-owned views and renders the composed content for each." },
  { part: "Inspector", file: "ProductionFeatureInspector.tsx", description: "Selected artwork's properties, composing ProductionInspector with this feature's own Actions in its footer." },
  { part: "Validation", file: "ProductionFeatureValidation.tsx", description: "The artwork's own validation gate and quality-issue checklist." },
  { part: "Metrics", file: "ProductionFeatureMetrics.tsx", description: "Feature-computed KPIs, rendered via ProductionMetrics." },
  { part: "Commands", file: "ProductionFeatureActions.tsx", description: "Every user-triggerable action, each opening a dialog or advancing state directly." },
  { part: "Dialogs", file: "ProductionFeatureDialogs.tsx", description: "Validation, Delete, Publish, Export, and Confirmation — all five, switched on one piece of dialog state." },
  { part: "Services", file: "useProductionWorkspace.ts", description: "State, orchestration, undo/redo, selection, dialog state, and every command — the feature's own non-visual core." },
  { part: "Repositories", file: "mock-production.ts", description: "Seed data plus pure transform functions standing in for a real backend, per this package's own local-state-only instruction." },
];

export default function ProductionWorkspaceFeaturePage() {
  return (
    <DocsShell entry={entry} toc={<DocsTableOfContents />}>
      <DocsPageHeader entry={entry} />

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-6">
          <SectionHeader
            id="live-pilot"
            eyebrow={<Eyebrow tone="accent">Live pilot</Eyebrow>}
            title="Production Workspace Feature"
            description="Fully interactive — local React state and the mock repository below, no network calls. Select an artwork, advance its stage or validation flow, toggle a quality issue, or open a dialog."
            descriptionMaxWidth={false}
          />
          <Surface border elevation="panel" className="overflow-hidden">
            <ProductionFeatureWorkspace />
          </Surface>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="composition-diagram"
            eyebrow={<Eyebrow tone="accent">Composition diagram</Eyebrow>}
            title="Business Feature → Platform → Workflow → Operational → Foundation"
            description="Every concrete component this pilot actually imports, one row per tier — not an abstract description, the real import graph."
            descriptionMaxWidth={false}
          />
          <div className="flex flex-col items-stretch gap-2">
            {COMPOSITION_CHAIN.map((tier, index) => (
              <div key={tier.id} className="flex flex-col items-center gap-2">
                <Card className="flex w-full flex-col gap-3">
                  <span className="text-body-md font-medium text-ink-primary">{tier.name}</span>
                  <div className="flex flex-wrap gap-1.5">
                    {tier.components.map((component) => (
                      <Badge key={component} tone={index === 0 ? "accent" : "neutral"} size="sm">
                        {component}
                      </Badge>
                    ))}
                  </div>
                </Card>
                {index < COMPOSITION_CHAIN.length - 1 ? <ArrowDown className="size-4 text-ink-tertiary" aria-hidden /> : null}
              </div>
            ))}
          </div>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="layer-ownership"
            eyebrow={<Eyebrow tone="accent">Layer ownership</Eyebrow>}
            title="What each tier owns in this pilot"
            descriptionMaxWidth={false}
          />
          <div className="flex flex-col gap-3">
            {LAYER_OWNERSHIP.map((layer) => (
              <Card key={layer.id} className="flex flex-col gap-2">
                <span className="text-body-sm font-medium text-ink-primary">{layer.name}</span>
                <div className="flex flex-wrap gap-1.5">
                  {layer.owns.map((item) => (
                    <Badge key={item} tone="neutral" size="sm">
                      {item}
                    </Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="feature-anatomy"
            eyebrow={<Eyebrow tone="accent">Feature anatomy</Eyebrow>}
            title="DS-5.2's own ten parts, this pilot's own eleven files"
            description="Feature Architecture (Application Composition Architecture's own DS-5.2) named the parts; here is the concrete file behind each one."
            descriptionMaxWidth={false}
          />
          <div className="flex flex-col gap-3">
            {FEATURE_ANATOMY.map((item) => (
              <Card key={item.part} className="flex flex-col gap-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-body-sm font-medium text-ink-primary">{item.part}</span>
                  <Badge tone="accent" size="sm">
                    {item.file}
                  </Badge>
                </div>
                <Body size="sm" muted>
                  {item.description}
                </Body>
              </Card>
            ))}
          </div>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="state-diagram"
            eyebrow={<Eyebrow tone="accent">State diagram</Eyebrow>}
            title="Two orthogonal flows, both local state"
            description="An artwork's pipeline stage and its validation flow move independently — an artwork can be Validating while sitting in any pipeline stage."
            descriptionMaxWidth={false}
          />
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <Caption className="uppercase tracking-wide text-ink-tertiary">Validation flow</Caption>
              <div className="flex flex-wrap items-center gap-2">
                {VALIDATION_FLOW_ORDER.map((status, index) => (
                  <div key={status} className="flex items-center gap-2">
                    <Badge tone={index === VALIDATION_FLOW_ORDER.length - 1 ? "success" : "neutral"} size="sm">
                      {VALIDATION_FLOW_LABEL[status]}
                    </Badge>
                    {index < VALIDATION_FLOW_ORDER.length - 1 ? <span className="text-ink-tertiary">→</span> : null}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <Caption className="uppercase tracking-wide text-ink-tertiary">Production pipeline stage</Caption>
              <div className="flex flex-wrap items-center gap-2">
                {PRODUCTION_STAGES.map((stage, index) => (
                  <div key={stage.id} className="flex items-center gap-2">
                    <Badge tone={index === PRODUCTION_STAGES.length - 1 ? "success" : "neutral"} size="sm">
                      {stage.label}
                    </Badge>
                    {index < PRODUCTION_STAGES.length - 1 ? <span className="text-ink-tertiary">→</span> : null}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </SectionShell>

      <SectionShell spacing="lg">
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="interaction-flow"
            eyebrow={<Eyebrow tone="accent">Interaction flow</Eyebrow>}
            title="A full round trip through the pilot"
            descriptionMaxWidth={false}
          />
          <DescriptionList
            items={[
              { label: "1. Select", value: "Click an artwork's WorkflowStep in the Pipeline view — the feature sets selectedId, the sidebar's Inspector and Validation panels update." },
              { label: "2. Inspect", value: "ProductionInspector renders the artwork's properties; ProductionValidationPanel renders its current gate status and any open quality issues as toggles." },
              { label: "3. Toggle an issue", value: "Flipping a PropertyToggle calls toggleIssue, which updates that one issue's resolved flag in the mock repository and re-renders the gate's reason text." },
              { label: "4. Advance", value: "Advance stage or Advance validation opens a Confirmation or Validation dialog naming the exact transition, then commits it into the undo history on confirm." },
              { label: "5. Publish / Export / Delete", value: "Each opens its own dialog with contextual copy (a warning if publishing before validation, a note that export is local-only), then commits on confirm." },
              { label: "6. Undo / Redo", value: "Every commit pushes the prior artwork array onto a history stack; Undo/Redo in the Header pop and replay it, with no server round-trip." },
              { label: "7. Switch views", value: "The Navigation tabs swap the Canvas between Pipeline, Queue, and Dashboard without touching selection or dialog state." },
            ]}
          />
        </div>
      </SectionShell>
    </DocsShell>
  );
}
