import { SectionShell, CardGrid, DescriptionList } from "@/components/layout";
import { Card, Badge, Body, Caption, SectionHeader, Eyebrow } from "@/components/ui";
import { DocsShell, DocsPageHeader, DocsTableOfContents, DocsRelatedGrid } from "@/components/docs";
import { getEntry } from "@/lib/design-system-navigation";
import { InspectorPanelGallery } from "./_components/InspectorPanelGallery";
import { INSPECTOR_ANATOMY } from "./_data/anatomy";
import { INSPECTOR_STATES } from "./_data/states";
import { RESPONSIVE_TOPICS, BREAKPOINT_NOTES } from "./_data/responsive";
import { INSPECTOR_ACCESSIBILITY_TOPICS } from "./_data/accessibility";
import { IMPLEMENTATION_GUIDANCE } from "./_data/implementation-guidance";
import { INSPECTOR_PROMOTION_CANDIDATES, INSPECTOR_CLEAN_FINDINGS } from "./_data/promotion-candidates";
import { INSPECTOR_FUTURE_EXTENSIONS } from "./_data/future-extensions";

const entry = getEntry("inspector-panel")!;
const relatedComponents = [getEntry("data-grid")!, getEntry("property-panel")!, getEntry("inspector-workspace")!];

const WHEN_TO_USE_LABELS = new Set(["Property grouping", "Progressive disclosure"]);
const whenToUseGuidance = IMPLEMENTATION_GUIDANCE.filter((topic) => WHEN_TO_USE_LABELS.has(topic.label));
const compositionGuidance = IMPLEMENTATION_GUIDANCE.filter((topic) => !WHEN_TO_USE_LABELS.has(topic.label));

export default function InspectorPanelPage() {
  return (
    <DocsShell entry={entry} toc={<DocsTableOfContents />}>
      <DocsPageHeader entry={entry} />

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="overview"
            eyebrow={<Eyebrow tone="accent">Overview</Eyebrow>}
            title="Overview"
            description="Ten regions, top to bottom — every Inspector* component maps to exactly one, and most delegate directly to an already-established Foundation component underneath."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={2}>
            {INSPECTOR_ANATOMY.map((region) => (
              <Card key={region.name} className="flex flex-col gap-2">
                <span className="text-body-md font-medium text-ink-primary">{region.name}</span>
                <Body size="sm" muted>
                  {region.description}
                </Body>
                <Caption className="border-t border-border-subtle pt-3 text-ink-tertiary">{region.component}</Caption>
              </Card>
            ))}
          </CardGrid>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="when-to-use"
            eyebrow={<Eyebrow tone="accent">When to use</Eyebrow>}
            title="When to use"
            description="Two decisions every Inspector composition makes explicitly, rather than defaulting to whatever's fastest to wire up."
            descriptionMaxWidth={false}
          />
          <DescriptionList items={whenToUseGuidance.map((topic) => ({ label: topic.label, value: topic.text }))} />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="examples"
            eyebrow={<Eyebrow tone="accent">Examples</Eyebrow>}
            title="Eight inspector variants, live"
            description="Each demo below is a real, working inspector with real local state — not a static screenshot. Try Asset/Commerce Inspector's editable fields, History Inspector's show-more, and Multi-section Inspector's tabs."
            descriptionMaxWidth={false}
          />
          <InspectorPanelGallery />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-14">
          <SectionHeader
            id="behavior"
            eyebrow={<Eyebrow tone="accent">Behavior</Eyebrow>}
            title="Behavior"
            description="Eight states this family recognizes, grounded in the real implementation detail behind each one, plus how the same panel reflows across breakpoints."
            descriptionMaxWidth={false}
          />

          <div className="flex flex-col gap-6">
            <SectionHeader id="states" title="States" descriptionMaxWidth={false} />
            <DescriptionList items={INSPECTOR_STATES.map((item) => ({ label: item.state, value: item.note }))} />
          </div>

          <div className="flex flex-col gap-6">
            <SectionHeader id="responsive-behavior" title="Responsive behavior" descriptionMaxWidth={false} />
            <CardGrid columns={3}>
              {BREAKPOINT_NOTES.map((item) => (
                <Card key={item.breakpoint} className="flex flex-col gap-2">
                  <span className="text-body-sm font-medium text-ink-primary">{item.breakpoint}</span>
                  <Body size="sm" muted>
                    {item.note}
                  </Body>
                </Card>
              ))}
            </CardGrid>
            <DescriptionList items={RESPONSIVE_TOPICS.map((topic) => ({ label: topic.label, value: topic.note }))} />
          </div>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader id="accessibility" eyebrow={<Eyebrow tone="accent">Accessibility</Eyebrow>} title="Accessibility" descriptionMaxWidth={false} />
          <DescriptionList items={INSPECTOR_ACCESSIBILITY_TOPICS.map((topic) => ({ label: topic.label, value: topic.text }))} />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="composition"
            eyebrow={<Eyebrow tone="accent">Composition</Eyebrow>}
            title="Composition"
            description="How the pieces nest, and where panel-wide validation and object-level actions physically live once you've made the decisions above."
            descriptionMaxWidth={false}
          />
          <DescriptionList items={compositionGuidance.map((topic) => ({ label: topic.label, value: topic.text }))} />
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
              description="Real, grep-verified duplication — not estimated or carried over from memory."
              descriptionMaxWidth={false}
            />
            <div className="flex flex-col gap-6">
              {INSPECTOR_PROMOTION_CANDIDATES.map((candidate) => (
                <Card key={candidate.id} className="flex flex-col gap-3">
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <span className="text-body-md font-medium text-ink-primary">{candidate.pattern}</span>
                    <Badge tone="warning" size="sm" className="w-fit shrink-0 whitespace-nowrap">
                      {candidate.files.length} files
                    </Badge>
                  </div>
                  <Body size="sm" muted>
                    {candidate.description}
                  </Body>
                  <ul className="flex flex-col gap-1 border-t border-border-subtle pt-3">
                    {candidate.files.map((file) => (
                      <li key={file} className="text-metadata text-ink-tertiary">
                        <code className="break-words">{file}</code>
                      </li>
                    ))}
                  </ul>
                  <Body size="sm" muted className="border-t border-border-subtle pt-3">
                    {candidate.migrationNote}
                  </Body>
                </Card>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-body-sm font-medium text-ink-primary">Clean findings</span>
              {INSPECTOR_CLEAN_FINDINGS.map((finding) => (
                <Card key={finding.slice(0, 24)} className="flex flex-col gap-2 border-success/30 bg-success-soft">
                  <Body size="sm" muted>
                    {finding}
                  </Body>
                </Card>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-10">
            <SectionHeader
              id="future-enhancements"
              title="Future enhancements"
              description="Room the current system leaves for later — reserved, not scoped or committed."
              descriptionMaxWidth={false}
            />
            <CardGrid columns={3}>
              {INSPECTOR_FUTURE_EXTENSIONS.map((extension) => (
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
