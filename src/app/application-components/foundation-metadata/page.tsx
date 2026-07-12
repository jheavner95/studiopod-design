import { SectionShell, CardGrid, DescriptionList } from "@/components/layout";
import { Card, Badge, Body, Caption, SectionHeader, Eyebrow } from "@/components/ui";
import { DocsShell, DocsPageHeader, DocsTableOfContents, DocsRelatedGrid } from "@/components/docs";
import { getEntry } from "@/lib/design-system-navigation";
import { MetadataAnatomyExplorer } from "./_components/MetadataAnatomyExplorer";
import { ComponentGallery } from "./_components/ComponentGallery";
import { PatternGallery } from "./_components/PatternGallery";
import { HierarchyDemo } from "./_components/HierarchyDemo";
import { INFORMATION_HIERARCHY } from "./_data/hierarchy";
import { METADATA_ACCESSIBILITY_TOPICS } from "./_data/accessibility";
import { METADATA_GUIDANCE } from "./_data/implementation-guidance";
import { METADATA_PROMOTION_CANDIDATES, METADATA_RESOLVED_MIGRATIONS, totalPromotionFiles } from "./_data/promotion-candidates";
import { METADATA_FUTURE_EXTENSIONS } from "./_data/future-extensions";

const EFFORT_TONE: Record<string, "success" | "warning" | "accent"> = {
  Low: "success",
  Medium: "warning",
  High: "accent",
};

const entry = getEntry("foundation-metadata")!;
const relatedComponents = [getEntry("foundation-layout")!, getEntry("foundation-forms")!, getEntry("foundation-table")!];

export default function FoundationMetadataPage() {
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
          <MetadataAnatomyExplorer />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="when-to-use"
            eyebrow={<Eyebrow tone="accent">When to use</Eyebrow>}
            title="When to use"
            description="The rules every region of a metadata block follows — and where the line sits against the Foundation Form System's own editable fields."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={4}>
            {METADATA_GUIDANCE.map((rule) => (
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
            description="Ten components, each with a live example plus when — and when not — to reach for it."
            descriptionMaxWidth={false}
          />
          <ComponentGallery />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="behavior"
            eyebrow={<Eyebrow tone="accent">Behavior</Eyebrow>}
            title="Behavior"
            description="Four tiers, in visual-weight order — the rule that keeps a fully-populated metadata block from turning into visual noise — plus a real, working example showing all four composed together at once."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={4}>
            {INFORMATION_HIERARCHY.map((tier) => (
              <Card key={tier.id} className="flex flex-col gap-2">
                <span className="text-body-sm font-medium text-ink-primary">{tier.name}</span>
                <Body size="sm" muted>
                  {tier.description}
                </Body>
                <div className="mt-auto flex flex-wrap gap-1.5 border-t border-border-subtle pt-3">
                  {tier.components.map((component) => (
                    <Badge key={component} tone="neutral" size="sm">
                      {component}
                    </Badge>
                  ))}
                </div>
              </Card>
            ))}
          </CardGrid>
          <HierarchyDemo />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader id="accessibility" eyebrow={<Eyebrow tone="accent">Accessibility</Eyebrow>} title="Accessibility" descriptionMaxWidth={false} />
          <DescriptionList items={METADATA_ACCESSIBILITY_TOPICS.map((topic) => ({ label: topic.label, value: topic.text }))} />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="composition"
            eyebrow={<Eyebrow tone="accent">Composition</Eyebrow>}
            title="Composition"
            description="Seven ways the same metadata components can be arranged, with the advantages and tradeoffs of each."
            descriptionMaxWidth={false}
          />
          <PatternGallery />
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
              title="Migration notes"
              description={`Real, grep-verifiable repeated metadata patterns found in this codebase today — ${METADATA_PROMOTION_CANDIDATES.length} categories, ${totalPromotionFiles()} files combined.`}
              descriptionMaxWidth={false}
            />
            <CardGrid columns={2}>
              {METADATA_PROMOTION_CANDIDATES.map((candidate) => (
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
                      {candidate.count} file{candidate.count === 1 ? "" : "s"} · verified with
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
            {METADATA_RESOLVED_MIGRATIONS.map((migration) => (
              <Card key={migration.id} className="flex flex-col gap-2 border-success/30 bg-success-soft">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <span className="text-body-md font-medium text-ink-primary">{migration.title} — resolved</span>
                  <Badge tone="success" size="sm" className="w-fit shrink-0 whitespace-nowrap">
                    Adoption In Progress
                  </Badge>
                </div>
                <Caption className="text-ink-tertiary">
                  {migration.filesMigrated} files migrated in {migration.resolvedIn}
                </Caption>
                <Body size="sm" muted>
                  {migration.note}
                </Body>
              </Card>
            ))}
          </div>

          <div className="flex flex-col gap-10">
            <SectionHeader
              id="future-enhancements"
              title="Future enhancements"
              description="Room the current system leaves for later — reserved, not scoped or committed."
              descriptionMaxWidth={false}
            />
            <CardGrid columns={4}>
              {METADATA_FUTURE_EXTENSIONS.map((extension) => (
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
