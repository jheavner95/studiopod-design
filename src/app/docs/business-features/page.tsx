import Link from "next/link";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import { SectionShell, CardGrid, DescriptionList } from "@/components/layout";
import { Card, Badge, Body, Caption, SectionHeader, Eyebrow } from "@/components/ui";
import { DocsShell, DocsPageHeader, DocsTableOfContents } from "@/components/docs";
import { getEntry } from "@/lib/design-system-navigation";
import { FRAMEWORK_TOPICS } from "./_data/framework";
import { FEATURE_STRUCTURE, type StructureKind } from "./_data/structure";
import { COMPOSITION_STACK, type StackStatus } from "./_data/composition-stack";
import { FEATURE_TEMPLATE } from "./_data/template";
import { FEATURE_CATEGORIES, CATEGORY_SUMMARY } from "./_data/categories";
import { ALLOWED_RULES, FORBIDDEN_RULES } from "./_data/rules";
import { FEATURE_LIFECYCLE } from "./_data/lifecycle";
import { CANDIDATE_FEATURES, CANDIDATE_SUMMARY } from "./_data/candidates";
import { FUTURE_EXTENSIONS } from "./_data/future-extensions";
import type { FeatureAdoptionVerdict } from "@/app/docs/application-composition/_data/adoption";

const entry = getEntry("business-features")!;

const STRUCTURE_TONE: Record<StructureKind, "neutral" | "accent" | "warning" | "success"> = {
  root: "neutral",
  ui: "accent",
  service: "warning",
  data: "success",
};

const STRUCTURE_LABEL: Record<StructureKind, string> = {
  root: "Root",
  ui: "UI",
  service: "Service",
  data: "Data",
};

const STACK_STATUS_TONE: Record<StackStatus, "success" | "warning" | "accent" | "neutral"> = {
  certified: "success",
  "certified-production-ready": "warning",
  documented: "accent",
  future: "neutral",
};

const STACK_STATUS_LABEL: Record<StackStatus, string> = {
  certified: "Certified",
  "certified-production-ready": "Production Ready",
  documented: "Documented",
  future: "Future",
};

const VERDICT_TONE: Record<FeatureAdoptionVerdict, "success" | "warning" | "neutral"> = {
  "platform-certified": "success",
  "partial-platform-coverage": "warning",
  "no-platform-coverage": "neutral",
};

export default function BusinessFeaturesPage() {
  return (
    <DocsShell entry={entry} toc={<DocsTableOfContents />}>
      <DocsPageHeader entry={entry} />

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="business-feature-framework"
            eyebrow={<Eyebrow tone="accent">Business Feature framework</Eyebrow>}
            title="How a Business Feature is actually built"
            descriptionMaxWidth={false}
          />
          <DescriptionList items={FRAMEWORK_TOPICS.map((t) => ({ label: t.label, value: t.text }))} />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="feature-architecture"
            eyebrow={<Eyebrow tone="accent">Feature architecture</Eyebrow>}
            title="Ten parts, one ownership model"
            description="The canonical tree every Business Feature's own source code follows — ownership for every part is pulled directly from Application Composition Architecture's own Application Boundaries, not re-derived."
            descriptionMaxWidth={false}
          />
          <div className="flex flex-col gap-3">
            {FEATURE_STRUCTURE.map((part) => (
              <Card key={part.name} className="flex flex-col gap-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-body-md font-medium text-ink-primary">{part.name}</span>
                  <div className="flex items-center gap-2">
                    <Badge tone="accent" size="sm">
                      {part.owner}
                    </Badge>
                    <Badge tone={STRUCTURE_TONE[part.kind]} size="sm">
                      {STRUCTURE_LABEL[part.kind]}
                    </Badge>
                  </div>
                </div>
                <Body size="sm" muted>
                  {part.description}
                </Body>
              </Card>
            ))}
          </div>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="composition-stack"
            eyebrow={<Eyebrow tone="accent">Composition stack</Eyebrow>}
            title="Foundation → Operational → Workflow → Platform → Business Feature → Application"
            description="The same six-layer chain Application Composition Architecture established, reframed around what each layer hands a Business Feature specifically."
            descriptionMaxWidth={false}
          />
          <div className="flex flex-col items-stretch gap-2">
            {COMPOSITION_STACK.map((layer, index) => (
              <div key={layer.id} className="flex flex-col items-center gap-2">
                <Card className="flex w-full flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <span className="text-body-md font-medium text-ink-primary">{layer.name}</span>
                      <Badge tone={STACK_STATUS_TONE[layer.status]} size="sm">
                        {STACK_STATUS_LABEL[layer.status]}
                      </Badge>
                    </div>
                    <Body size="sm" muted className="max-w-[var(--container-narrow)]">
                      {layer.contributes}
                    </Body>
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
                {index < COMPOSITION_STACK.length - 1 ? <ArrowDown className="size-4 text-ink-tertiary" aria-hidden /> : null}
              </div>
            ))}
          </div>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="feature-template"
            eyebrow={<Eyebrow tone="accent">Feature template</Eyebrow>}
            title="Thirteen parts, one checklist"
            description="Where Feature Architecture is the abstract ownership tree, this is the concrete part list a real feature is built against — each grounded in a representative already-certified component."
            descriptionMaxWidth={false}
          />
          <div className="flex flex-col gap-3">
            {FEATURE_TEMPLATE.map((part) => (
              <Card key={part.name} className="flex flex-col gap-2">
                <span className="text-body-sm font-medium text-ink-primary">{part.name}</span>
                <Body size="sm" muted>
                  {part.description}
                </Body>
                <Caption className="text-ink-tertiary">Composes from: {part.composesFrom}</Caption>
              </Card>
            ))}
          </div>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="feature-categories"
            eyebrow={<Eyebrow tone="accent">Feature categories</Eyebrow>}
            title="Nine reusable shapes"
            description={CATEGORY_SUMMARY}
            descriptionMaxWidth={false}
          />
          <CardGrid columns={3}>
            {FEATURE_CATEGORIES.map((category) => (
              <Card key={category.id} className="flex flex-col gap-2">
                <span className="text-body-md font-medium text-ink-primary">{category.name}</span>
                <Body size="sm" muted>
                  {category.description}
                </Body>
                {category.namingNote ? <Caption className="text-ink-tertiary">{category.namingNote}</Caption> : null}
              </Card>
            ))}
          </CardGrid>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="composition-rules"
            eyebrow={<Eyebrow tone="accent">Composition rules</Eyebrow>}
            title="Six allowed, five forbidden"
            descriptionMaxWidth={false}
          />
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
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="feature-lifecycle"
            eyebrow={<Eyebrow tone="accent">Feature lifecycle</Eyebrow>}
            title="Seven stages, one gate each"
            description="The same Concept → Prototype → Production Ready → Certified → Locked maturity ladder every certified tier below Business Features already uses, extended one tier further."
            descriptionMaxWidth={false}
          />
          <div className="flex flex-col items-stretch gap-2">
            {FEATURE_LIFECYCLE.map((stage, index) => (
              <div key={stage.id} className="flex flex-col items-center gap-2">
                <Card className="flex w-full flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <Badge tone="accent" size="sm">
                      {index + 1}
                    </Badge>
                    <span className="text-body-md font-medium text-ink-primary">{stage.name}</span>
                  </div>
                  <Body size="sm" muted>
                    {stage.description}
                  </Body>
                  <Caption className="text-ink-tertiary">Gate: {stage.gate}</Caption>
                </Card>
                {index < FEATURE_LIFECYCLE.length - 1 ? <ArrowDown className="size-4 text-ink-tertiary" aria-hidden /> : null}
              </div>
            ))}
          </div>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="candidate-business-features"
            eyebrow={<Eyebrow tone="accent">Candidate Business Features</Eyebrow>}
            title="Ten candidates, one suggested category each"
            description={CANDIDATE_SUMMARY}
            descriptionMaxWidth={false}
          />
          <div className="flex flex-col gap-3">
            {CANDIDATE_FEATURES.map((candidate) => (
              <Card key={candidate.name} className="flex flex-col gap-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-body-sm font-medium text-ink-primary">{candidate.name}</span>
                  <div className="flex items-center gap-2">
                    <Badge tone="neutral" size="sm">
                      {FEATURE_CATEGORIES.find((c) => c.id === candidate.suggestedCategory)?.name ?? candidate.suggestedCategory}
                    </Badge>
                    <Badge tone={VERDICT_TONE[candidate.verdict]} size="sm">
                      {candidate.verdictLabel}
                    </Badge>
                  </div>
                </div>
                <Body size="sm" muted>
                  {candidate.finding}
                </Body>
              </Card>
            ))}
          </div>
        </div>
      </SectionShell>

      <SectionShell spacing="lg">
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="future-extensions"
            eyebrow={<Eyebrow tone="accent">Future extensions</Eyebrow>}
            title="Future extensions"
            description="Room this framework leaves for later — reserved, not scoped or committed."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={3}>
            {FUTURE_EXTENSIONS.map((extension) => (
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
