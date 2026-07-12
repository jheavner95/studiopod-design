import Link from "next/link";
import { ArrowUpRight, ArrowDown, ShieldCheck } from "lucide-react";
import { SectionShell, CardGrid, DescriptionList } from "@/components/layout";
import { Card, Badge, Body, Caption, SectionHeader, Eyebrow } from "@/components/ui";
import { DocsShell, DocsPageHeader, DocsTableOfContents, DocsRelatedGrid } from "@/components/docs";
import { getEntry } from "@/lib/design-system-navigation";
import { PLATFORM_ARCHITECTURE_TOPICS } from "./_data/architecture";
import { PLATFORM_ANATOMY } from "./_data/anatomy";
import { PLATFORM_TEMPLATES } from "./_data/templates";
import { LAYER_STACK, LAYERING_STATEMENT } from "./_data/layers";
import { OWNERSHIP_MODEL } from "./_data/ownership";
import { PLATFORM_RULES } from "./_data/rules";
import { CERTIFICATION_LEVELS, CERTIFICATION_MODEL_NOTE } from "./_data/certification";
import { ADOPTION_TARGETS, ADOPTION_SUMMARY, VERDICT_LABEL, type AdoptionVerdict } from "./_data/adoption";
import { PLATFORM_FUTURE_EXTENSIONS } from "./_data/future-extensions";

const entry = getEntry("platform-architecture-doc")!;
const relatedComponents = [getEntry("production-platform")!, getEntry("platform-certification")!, getEntry("application-composition-doc")!];

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

const ADOPTION_TONE: Record<AdoptionVerdict, "accent" | "neutral"> = {
  "composed-with-precedent": "accent",
  "composed-new": "neutral",
};

export default function PlatformArchitecturePage() {
  return (
    <DocsShell entry={entry} toc={<DocsTableOfContents />}>
      <DocsPageHeader entry={entry} />

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-14">
          <SectionHeader
            id="overview"
            eyebrow={<Eyebrow tone="accent">Overview</Eyebrow>}
            title="Why Platform exists, and what it owns"
            description="Platform is the layer where StudioPOD's real business domains get their own reusable, domain-specific components — composed entirely from the certified Foundation, Operational, and Workflow tiers below it."
            descriptionMaxWidth={false}
          />

          <div className="flex flex-col gap-10">
            <DescriptionList items={PLATFORM_ARCHITECTURE_TOPICS.map((t) => ({ label: t.label, value: t.text }))} />
          </div>

          <div className="flex flex-col gap-10">
            <SectionHeader
              id="platform-anatomy"
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
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="how-this-fits-together"
            eyebrow={<Eyebrow tone="accent">How this fits together</Eyebrow>}
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
          <SectionHeader
            id="examples"
            eyebrow={<Eyebrow tone="accent">Examples</Eyebrow>}
            title="Eight platforms, one composition plan each"
            description="This is the architecture every domain platform is built against today. Workflow/Operational/Foundation usage cites real, already-certified systems by name."
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
            id="behavior"
            eyebrow={<Eyebrow tone="accent">Behavior</Eyebrow>}
            title="Platform rules"
            description="The concrete, checkable rules a future audit should verify against real Platform component source — what a Platform component may and may not import, and what it must be built from."
            descriptionMaxWidth={false}
          />
          <DescriptionList items={PLATFORM_RULES.map((r) => ({ label: r.category, value: r.rule }))} />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="composition"
            eyebrow={<Eyebrow tone="accent">Composition</Eyebrow>}
            title="Component ownership"
            description="What each of the five layers owns going into Platform, and — just as important — what it explicitly does not own, so a future contributor knows which layer to reach for instead."
            descriptionMaxWidth={false}
          />
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
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-6">
          <SectionHeader
            id="related-components"
            eyebrow={<Eyebrow tone="accent">Related components</Eyebrow>}
            title="Related components"
            description="Where this architecture is built, certified, and composed into real screens."
            descriptionMaxWidth={false}
          />
          <DocsRelatedGrid entries={relatedComponents} />
        </div>
      </SectionShell>

      <SectionShell spacing="lg">
        <div className="flex flex-col gap-14">
          <SectionHeader id="reference" eyebrow={<Eyebrow tone="accent">Reference</Eyebrow>} title="Reference" descriptionMaxWidth={false} />

          <div className="flex flex-col gap-10">
            <SectionHeader
              id="certification-model"
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

          <div className="flex flex-col gap-10">
            <SectionHeader
              id="migration-notes"
              title="Platform composition status, by platform"
              description={ADOPTION_SUMMARY}
              descriptionMaxWidth={false}
            />
            <CardGrid columns={2}>
              {ADOPTION_TARGETS.map((target) => (
                <Card key={target.platform} className="flex flex-col gap-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-body-sm font-medium text-ink-primary">{target.platform}</span>
                    <Badge tone={ADOPTION_TONE[target.verdict]} size="sm">
                      {VERDICT_LABEL[target.verdict]}
                    </Badge>
                  </div>
                  <Body size="sm" muted>
                    {target.finding}
                  </Body>
                </Card>
              ))}
            </CardGrid>
          </div>

          <div className="flex flex-col gap-10">
            <SectionHeader
              id="future-enhancements"
              title="Future enhancements"
              description="Capabilities this architecture does not implement today, and what each would require."
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
        </div>
      </SectionShell>
    </DocsShell>
  );
}
