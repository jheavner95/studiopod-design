import Link from "next/link";
import { SectionShell, CardGrid, DescriptionList } from "@/components/layout";
import { Card, Badge, Body, Caption, SectionHeader, Eyebrow } from "@/components/ui";
import { DocsShell, DocsPageHeader, DocsTableOfContents } from "@/components/docs";
import { getEntry } from "@/lib/design-system-navigation";
import { FormAnatomyExplorer } from "./_components/FormAnatomyExplorer";
import { FieldGallery } from "./_components/FieldGallery";
import { FieldStatesDemo } from "./_components/FieldStatesDemo";
import { ValidationDemo } from "./_components/ValidationDemo";
import { PropertyEditingDemo } from "./_components/PropertyEditingDemo";
import { FIELD_STATE_DOCS } from "./_data/states";
import { FORM_ACCESSIBILITY_TOPICS } from "./_data/accessibility";
import { FORM_GUIDANCE } from "./_data/implementation-guidance";
import { FORM_PROMOTION_CANDIDATES, totalPromotionLines } from "./_data/promotion-candidates";
import { FORM_FUTURE_EXTENSIONS } from "./_data/future-extensions";

const EFFORT_TONE: Record<string, "success" | "warning" | "accent"> = {
  Low: "success",
  Medium: "warning",
  High: "accent",
};

const entry = getEntry("foundation-forms")!;
const relatedComponents = [getEntry("foundation-metadata")!, getEntry("property-panel")!, getEntry("foundation-layout")!];

export default function FoundationFormsPage() {
  return (
    <DocsShell entry={entry} toc={<DocsTableOfContents />}>
      <DocsPageHeader entry={entry} />

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="overview"
            eyebrow={<Eyebrow tone="accent">Overview</Eyebrow>}
            title="Overview"
            description="Eight regions, top to bottom — select one to see the component that owns it."
            descriptionMaxWidth={false}
          />
          <FormAnatomyExplorer />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="when-to-use"
            eyebrow={<Eyebrow tone="accent">When to use</Eyebrow>}
            title="When to use"
            description="The rules every field, row, and section in this system follows — and where the line sits against Foundation Metadata's own read-only display."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={4}>
            {FORM_GUIDANCE.map((rule) => (
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
            description="Ten fields, each with a live, working example plus when — and when not — to reach for it."
            descriptionMaxWidth={false}
          />
          <FieldGallery />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="behavior"
            eyebrow={<Eyebrow tone="accent">Behavior</Eyebrow>}
            title="Behavior"
            description="Eleven states every field can be in — three of them live below, the rest documented alongside — plus a real, working form: Validate runs a blocking form-level check, and fixing a flagged field re-validates it immediately (progressive validation), with every problem aggregated once in the Validation Summary above the fields."
            descriptionMaxWidth={false}
          />
          <FieldStatesDemo />
          <CardGrid columns={4}>
            {FIELD_STATE_DOCS.map((state) => (
              <Card key={state.id} className="flex flex-col gap-2">
                <span className="text-body-sm font-medium text-ink-primary">{state.name}</span>
                <Body size="sm" muted>
                  {state.behavior}
                </Body>
              </Card>
            ))}
          </CardGrid>
          <ValidationDemo />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader id="accessibility" eyebrow={<Eyebrow tone="accent">Accessibility</Eyebrow>} title="Accessibility" descriptionMaxWidth={false} />
          <DescriptionList items={FORM_ACCESSIBILITY_TOPICS.map((topic) => ({ label: topic.label, value: topic.text }))} />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="composition"
            eyebrow={<Eyebrow tone="accent">Composition</Eyebrow>}
            title="Composition"
            description="Four ways PropertyEditor composes into a real editing surface."
            descriptionMaxWidth={false}
          />
          <PropertyEditingDemo />
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

          <div className="flex flex-col gap-10">
            <SectionHeader
              id="migration-notes"
              title="Migration notes"
              description={`Real, grep-verifiable form patterns found in this codebase today — ${FORM_PROMOTION_CANDIDATES.length} categories, ${totalPromotionLines()} lines combined across the two that measure in lines.`}
              descriptionMaxWidth={false}
            />
            <CardGrid columns={2}>
              {FORM_PROMOTION_CANDIDATES.map((candidate) => (
                <Card key={candidate.id} className="flex flex-col gap-3">
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <span className="text-body-md font-medium text-ink-primary">{candidate.title}</span>
                    <Badge tone={EFFORT_TONE[candidate.migrationEffort]} size="sm" className="w-fit shrink-0 whitespace-nowrap">
                      {candidate.migrationEffort} effort
                    </Badge>
                  </div>
                  <Body size="sm" muted>
                    {candidate.description}
                  </Body>
                  <div className="flex flex-col gap-1">
                    <Caption className="text-ink-tertiary">
                      {candidate.count} file{candidate.count === 1 ? "" : "s"}
                      {candidate.lineTotal > 0 ? ` · ${candidate.lineTotal} lines` : ""} · verified with
                    </Caption>
                    <code className="min-w-0 overflow-x-auto whitespace-pre rounded-md bg-canvas-raised px-3 py-2 text-metadata text-ink-secondary">
                      {candidate.findingCommand}
                    </code>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {candidate.files.slice(0, 5).map((file) => (
                      <span
                        key={file}
                        className="min-w-0 max-w-full truncate rounded-full border border-border-subtle bg-surface px-2.5 py-1 text-metadata text-ink-tertiary"
                      >
                        {file}
                      </span>
                    ))}
                  </div>
                  <Body size="sm" muted className="border-t border-border-subtle pt-3">
                    {candidate.migrationNote}
                  </Body>
                </Card>
              ))}
            </CardGrid>
          </div>

          <div className="flex flex-col gap-10">
            <SectionHeader
              id="future-enhancements"
              title="Future enhancements"
              description="Room the current system leaves for later — reserved, not scoped or committed."
              descriptionMaxWidth={false}
            />
            <CardGrid columns={4}>
              {FORM_FUTURE_EXTENSIONS.map((extension) => (
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
