import Link from "next/link";
import { ArrowUpRight, ArrowDown, ShieldCheck } from "lucide-react";
import { SectionShell, CardGrid, DescriptionList } from "@/components/layout";
import { Card, Badge, Body, Caption, SectionHeader, Eyebrow } from "@/components/ui";
import { DocsShell, DocsPageHeader, DocsTableOfContents } from "@/components/docs";
import { getEntry } from "@/lib/design-system-navigation";
import { PLATFORM_ARCHITECTURE_TOPICS } from "./_data/architecture";
import { PLATFORM_ANATOMY } from "./_data/anatomy";
import { PLATFORM_TEMPLATES } from "./_data/templates";
import { LAYER_STACK, LAYERING_STATEMENT } from "./_data/layers";
import { OWNERSHIP_MODEL, BUSINESS_FEATURES_NOTE } from "./_data/ownership";
import { PLATFORM_RULES } from "./_data/rules";
import { CERTIFICATION_LEVELS, CERTIFICATION_MODEL_NOTE } from "./_data/certification";
import { ADOPTION_TARGETS, ADOPTION_SUMMARY, ADOPTION_TARGETS_STALENESS_NOTE, PLATFORM_LIST_DISCREPANCY, VERDICT_LABEL, type AdoptionVerdict } from "./_data/adoption";
import { PLATFORM_FUTURE_EXTENSIONS } from "./_data/future-extensions";

const entry = getEntry("platform-architecture")!;

const LAYER_STATUS_TONE: Record<string, "success" | "warning" | "accent" | "neutral"> = {
  certified: "success",
  "certified-production-ready": "warning",
  defined: "accent",
  future: "neutral",
};

const LAYER_STATUS_LABEL: Record<string, string> = {
  certified: "Certified",
  "certified-production-ready": "Production Ready",
  defined: "Defined",
  future: "Future",
};

const ADOPTION_TONE: Record<AdoptionVerdict, "warning" | "neutral"> = {
  "no-candidate": "warning",
  "diagram-layer-only": "warning",
  "does-not-exist": "neutral",
};

export default function PlatformArchitecturePage() {
  return (
    <DocsShell entry={entry} toc={<DocsTableOfContents />}>
      <DocsPageHeader entry={entry} />

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="platform-architecture"
            eyebrow={<Eyebrow tone="accent">Platform architecture</Eyebrow>}
            title="Why Platform exists, and what it owns"
            descriptionMaxWidth={false}
          />
          <DescriptionList items={PLATFORM_ARCHITECTURE_TOPICS.map((t) => ({ label: t.label, value: t.text }))} />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="platform-anatomy"
            eyebrow={<Eyebrow tone="accent">Platform anatomy</Eyebrow>}
            title="Six regions, two layers"
            description="Four regions belong to Platform itself; the last two belong to Business Features, the layer this page defines the boundary against."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={3}>
            {PLATFORM_ANATOMY.map((region) => (
              <Card key={region.name} className="flex flex-col gap-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-body-md font-medium text-ink-primary">{region.name}</span>
                  <Badge tone={region.layer === "Platform" ? "accent" : "neutral"} size="sm">
                    {region.layer}
                  </Badge>
                </div>
                <Body size="sm" muted>
                  {region.description}
                </Body>
              </Card>
            ))}
          </CardGrid>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="platform-templates"
            eyebrow={<Eyebrow tone="accent">Platform templates</Eyebrow>}
            title="Eight platforms, one composition plan each"
            description="Every field below is a forward-looking architecture proposal, not existing code — Adoption Targets confirms zero real components exist for any of these eight platforms today. Workflow/Operational/Foundation usage cites real, already-certified systems by name."
            descriptionMaxWidth={false}
          />
          <div className="flex flex-col gap-6">
            {PLATFORM_TEMPLATES.map((template) => (
              <Card key={template.id} className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <span className="text-body-lg font-medium text-ink-primary">{template.name}</span>
                  <Body size="sm" muted>
                    {template.purpose}
                  </Body>
                </div>
                <div className="flex flex-wrap gap-2">
                  {template.businessObjects.map((obj) => (
                    <Badge key={obj} tone="neutral" size="sm">
                      {obj}
                    </Badge>
                  ))}
                </div>
                <DescriptionList
                  items={[
                    { label: "Workspace model", value: template.workspaceModel },
                    { label: "Workflow usage", value: template.workflowUsage },
                    { label: "Operational usage", value: template.operationalUsage },
                    { label: "Foundation usage", value: template.foundationUsage },
                    { label: "Extension boundary", value: template.extensionBoundary },
                  ]}
                />
              </Card>
            ))}
          </div>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="layer-composition"
            eyebrow={<Eyebrow tone="accent">Layer composition</Eyebrow>}
            title="Foundation → Operational → Workflow → Platform → Business Features"
            description={LAYERING_STATEMENT}
            descriptionMaxWidth={false}
          />
          <div className="flex flex-col items-stretch gap-2">
            {LAYER_STACK.map((layer, index) => (
              <div key={layer.id} className="flex flex-col items-center gap-2">
                <Card className="flex w-full flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <span className="text-body-md font-medium text-ink-primary">{layer.name}</span>
                      <Badge tone={LAYER_STATUS_TONE[layer.status]} size="sm">
                        {LAYER_STATUS_LABEL[layer.status]}
                      </Badge>
                    </div>
                    <Body size="sm" muted className="max-w-[var(--container-narrow)]">
                      {layer.owns}
                    </Body>
                    {layer.composesFrom ? <Caption className="text-ink-tertiary">Composes from: {layer.composesFrom}</Caption> : null}
                  </div>
                  {layer.certificationRef ? (
                    <Link
                      href={layer.certificationRef.href}
                      className="focus-ring flex shrink-0 items-center gap-1 text-caption font-medium text-accent-400 hover:text-accent-300"
                    >
                      {layer.certificationRef.label}
                      <ArrowUpRight className="size-3.5" aria-hidden />
                    </Link>
                  ) : null}
                </Card>
                {index < LAYER_STACK.length - 1 ? <ArrowDown className="size-4 text-ink-tertiary" aria-hidden /> : null}
              </div>
            ))}
          </div>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader id="component-ownership" eyebrow={<Eyebrow tone="accent">Component ownership</Eyebrow>} title="Component ownership" descriptionMaxWidth={false} />
          <div className="flex flex-col gap-3">
            {OWNERSHIP_MODEL.map((entry) => (
              <Card key={entry.layer} className="flex flex-col gap-2">
                <span className="text-body-sm font-medium text-ink-primary">{entry.layer}</span>
                <Body size="sm" muted>
                  <span className="font-medium text-ink-secondary">Owns: </span>
                  {entry.owns}
                </Body>
                <Body size="sm" muted>
                  <span className="font-medium text-ink-secondary">Does not own: </span>
                  {entry.doesNotOwn}
                </Body>
              </Card>
            ))}
          </div>
          <Card className="flex flex-col gap-2 border-accent-500/30 bg-accent-soft/40">
            <span className="text-body-sm font-medium text-ink-primary">A genuinely new term</span>
            <Body size="sm" muted>
              {BUSINESS_FEATURES_NOTE}
            </Body>
          </Card>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader id="platform-rules" eyebrow={<Eyebrow tone="accent">Platform rules</Eyebrow>} title="Platform rules" descriptionMaxWidth={false} />
          <DescriptionList items={PLATFORM_RULES.map((r) => ({ label: r.category, value: r.rule }))} />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="certification-model"
            eyebrow={<Eyebrow tone="accent">Certification model</Eyebrow>}
            title="A four-level ladder, consistent with Foundation and Workflow"
            description={CERTIFICATION_MODEL_NOTE}
            descriptionMaxWidth={false}
          />
          <CardGrid columns={2}>
            {CERTIFICATION_LEVELS.map((level) => (
              <Card key={level.id} className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="size-4 text-accent-400" aria-hidden />
                  <span className="text-body-md font-medium text-ink-primary">{level.name}</span>
                </div>
                <Body size="sm" muted>
                  {level.description}
                </Body>
                <div className="flex flex-col gap-1 border-t border-border-subtle pt-3">
                  <Caption className="text-ink-tertiary">Entry criteria</Caption>
                  <Body size="sm" muted>
                    {level.entryCriteria}
                  </Body>
                </div>
                <div className="flex flex-col gap-1">
                  <Caption className="text-ink-tertiary">Exit criteria</Caption>
                  <Body size="sm" muted>
                    {level.exitCriteria}
                  </Body>
                </div>
              </Card>
            ))}
          </CardGrid>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="adoption-targets"
            eyebrow={<Eyebrow tone="accent">Adoption targets</Eyebrow>}
            title="Eight platforms audited, zero real candidates found"
            description={ADOPTION_SUMMARY}
            descriptionMaxWidth={false}
          />
          <Card className="flex flex-col gap-2 border-accent-500/30 bg-accent-soft/40">
            <span className="text-body-sm font-medium text-ink-primary">Updated at DS-4.10</span>
            <Body size="sm" muted>
              {ADOPTION_TARGETS_STALENESS_NOTE}
            </Body>
          </Card>
          <div className="flex flex-col gap-3">
            {ADOPTION_TARGETS.map((entry) => (
              <Card key={entry.platform} className="flex flex-col gap-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-body-sm font-medium text-ink-primary">{entry.platform}</span>
                  <Badge tone={ADOPTION_TONE[entry.verdict]} size="sm">
                    {VERDICT_LABEL[entry.verdict]}
                  </Badge>
                </div>
                <Body size="sm" muted>
                  {entry.finding}
                </Body>
              </Card>
            ))}
          </div>
          <Card className="flex flex-col gap-2 border-warning/30 bg-warning-soft">
            <span className="text-body-sm font-medium text-ink-primary">Platform-list discrepancy</span>
            <Body size="sm" muted>
              {PLATFORM_LIST_DISCREPANCY}
            </Body>
          </Card>
        </div>
      </SectionShell>

      <SectionShell spacing="lg">
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="future-extensions"
            eyebrow={<Eyebrow tone="accent">Future extensions</Eyebrow>}
            title="Future extensions"
            description="Room the current architecture leaves for later — reserved, not scoped or committed."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={3}>
            {PLATFORM_FUTURE_EXTENSIONS.map((extension) => (
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
    </DocsShell>
  );
}
