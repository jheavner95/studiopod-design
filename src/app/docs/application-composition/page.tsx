import Link from "next/link";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import { SectionShell, CardGrid, DescriptionList } from "@/components/layout";
import { Card, Badge, Body, Caption, SectionHeader, Eyebrow } from "@/components/ui";
import { DocsShell, DocsPageHeader, DocsTableOfContents, DocsRelatedGrid } from "@/components/docs";
import { getEntry } from "@/lib/design-system-navigation";
import { COMPOSITION_ARCHITECTURE_TOPICS } from "./_data/architecture";
import { LAYER_STACK, COMPOSITION_MODEL_STATEMENT } from "./_data/layers";
import { FEATURE_TRAITS } from "./_data/feature-model";
import { FEATURE_ANATOMY } from "./_data/anatomy";
import { APPLICATION_TEMPLATES } from "./_data/templates";
import { ALLOWED_RULES, FORBIDDEN_RULES } from "./_data/rules";
import { APPLICATION_BOUNDARIES } from "./_data/boundaries";
import { ADOPTION_TARGETS, ADOPTION_SUMMARY, VERDICT_LABEL, type FeatureAdoptionVerdict } from "./_data/adoption";
import { APPLICATION_FUTURE_EXTENSIONS } from "./_data/future-extensions";

const entry = getEntry("application-composition-doc")!;
const relatedComponents = [getEntry("platform-architecture-doc")!, getEntry("platform-certification")!, getEntry("business-features-doc")!];

const LAYER_STATUS_TONE: Record<string, "success" | "warning" | "neutral"> = {
  certified: "success",
  "certified-production-ready": "warning",
  future: "neutral",
};

const LAYER_STATUS_LABEL: Record<string, string> = {
  certified: "Certified",
  "certified-production-ready": "Production Ready",
  future: "Not yet available",
};

const TRAIT_TONE: Record<"defining" | "forbidden", "accent" | "warning"> = {
  defining: "accent",
  forbidden: "warning",
};

const ANATOMY_TONE: Record<"feature" | "internal" | "composition", "accent" | "neutral" | "success"> = {
  feature: "accent",
  internal: "neutral",
  composition: "success",
};

const ADOPTION_TONE: Record<FeatureAdoptionVerdict, "success" | "warning" | "neutral"> = {
  "platform-certified": "success",
  "partial-platform-coverage": "warning",
  "no-platform-coverage": "neutral",
};

export default function ApplicationCompositionPage() {
  return (
    <DocsShell entry={entry} toc={<DocsTableOfContents />}>
      <DocsPageHeader entry={entry} />

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="overview"
            eyebrow={<Eyebrow tone="accent">Overview</Eyebrow>}
            title="Why Business Features exist, and what they own"
            descriptionMaxWidth={false}
          />
          <DescriptionList items={COMPOSITION_ARCHITECTURE_TOPICS.map((t) => ({ label: t.label, value: t.text }))} />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="when-to-use"
            eyebrow={<Eyebrow tone="accent">When to use</Eyebrow>}
            title="Seven traits, one prohibition"
            description="“Business Features” is not a new term — Platform Architecture coined it one tier down. This section is the first to define what one actually looks like, and where the line sits: six traits describe when something qualifies as a Business Feature, the seventh names the one thing it must never do."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={2}>
            {FEATURE_TRAITS.map((trait) => (
              <Card key={trait.trait} className="flex flex-col gap-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-body-md font-medium text-ink-primary">{trait.trait}</span>
                  <Badge tone={TRAIT_TONE[trait.polarity]} size="sm">
                    {trait.polarity === "defining" ? "Defining" : "Forbidden"}
                  </Badge>
                </div>
                <Body size="sm" muted>
                  {trait.description}
                </Body>
              </Card>
            ))}
          </CardGrid>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-14">
          <SectionHeader id="examples" eyebrow={<Eyebrow tone="accent">Examples</Eyebrow>} title="Examples" descriptionMaxWidth={false} />

          <div className="flex flex-col gap-10">
            <SectionHeader
              id="composition-model"
              title="Foundation → Operational → Workflow → Platform → Business Features → Application"
              description={COMPOSITION_MODEL_STATEMENT}
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

          <div className="flex flex-col gap-10">
            <SectionHeader
              id="application-templates"
              title="Eight templates, one composition plan each"
              description="Every field below is a composition plan citing real, already-certified components by name. Business Feature coverage varies by area — see Reference, below, for the current state of each. A real feature is expected to blend more than one template, not be a pure instance of exactly one."
              descriptionMaxWidth={false}
            />
            <div className="flex flex-col gap-6">
              {APPLICATION_TEMPLATES.map((template) => (
                <Card key={template.id} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <span className="text-body-lg font-medium text-ink-primary">{template.name}</span>
                    <Body size="sm" muted>
                      {template.purpose}
                    </Body>
                  </div>
                  <DescriptionList
                    items={[
                      { label: "Platform composition", value: template.platformComposition },
                      { label: "Workflow composition", value: template.workflowComposition },
                      { label: "Operational composition", value: template.operationalComposition },
                      { label: "Foundation composition", value: template.foundationComposition },
                      { label: "Extension boundary", value: template.extensionBoundary },
                    ]}
                  />
                </Card>
              ))}
            </div>
          </div>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-14">
          <SectionHeader id="behavior" eyebrow={<Eyebrow tone="accent">Behavior</Eyebrow>} title="Behavior" descriptionMaxWidth={false} />

          <div className="flex flex-col gap-10">
            <SectionHeader id="composition-rules" title="Allowed and forbidden dependency directions" descriptionMaxWidth={false} />
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <Caption className="uppercase tracking-wide text-success">Allowed</Caption>
                <DescriptionList items={ALLOWED_RULES.map((r) => ({ label: r.category, value: r.rule }))} />
              </div>
              <div className="flex flex-col gap-3">
                <Caption className="uppercase tracking-wide text-warning">Forbidden</Caption>
                <DescriptionList items={FORBIDDEN_RULES.map((r) => ({ label: r.category, value: r.rule }))} />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-10">
            <SectionHeader id="application-boundaries" title="Nine ownership questions, answered" descriptionMaxWidth={false} />
            <CardGrid columns={2}>
              {APPLICATION_BOUNDARIES.map((boundary) => (
                <Card key={boundary.concern} className="flex flex-col gap-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-body-sm font-medium text-ink-primary">{boundary.concern}</span>
                    <Badge tone="accent" size="sm">
                      {boundary.owner}
                    </Badge>
                  </div>
                  <Body size="sm" muted>
                    {boundary.description}
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
            id="composition"
            eyebrow={<Eyebrow tone="accent">Composition</Eyebrow>}
            title="One feature, eleven parts"
            description="Five internal UI regions, one internal non-UI region, and four composition points — the same “what does this own, what does it compose” shape Platform Architecture used one tier down."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={2}>
            {FEATURE_ANATOMY.map((region) => (
              <Card key={region.name} className="flex flex-col gap-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-body-md font-medium text-ink-primary">{region.name}</span>
                  <Badge tone={ANATOMY_TONE[region.kind]} size="sm">
                    {region.kind === "feature" ? "Feature" : region.kind === "internal" ? "Internal" : "Composition"}
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

      <SectionShell spacing="lg">
        <div className="flex flex-col gap-14">
          <SectionHeader id="reference" eyebrow={<Eyebrow tone="accent">Reference</Eyebrow>} title="Reference" descriptionMaxWidth={false} />

          <div className="flex flex-col gap-10">
            <SectionHeader
              id="migration-notes"
              title="Platform-tier coverage, by candidate feature"
              description={ADOPTION_SUMMARY}
              descriptionMaxWidth={false}
            />
            <CardGrid columns={2}>
              {ADOPTION_TARGETS.map((target) => (
                <Card key={target.candidate} className="flex flex-col gap-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-body-sm font-medium text-ink-primary">{target.candidate}</span>
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
              {APPLICATION_FUTURE_EXTENSIONS.map((extension) => (
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
