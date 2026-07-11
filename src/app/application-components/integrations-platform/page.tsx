import Link from "next/link";
import { SectionShell, CardGrid, DescriptionList } from "@/components/layout";
import { Card, Body, Caption, SectionHeader, Eyebrow } from "@/components/ui";
import { DocsShell, DocsPageHeader, DocsTableOfContents } from "@/components/docs";
import { getEntry } from "@/lib/design-system-navigation";
import { IntegrationsPlatformGallery } from "./_components/IntegrationsPlatformGallery";
import { INTEGRATIONS_ANATOMY } from "./_data/anatomy";
import { INTEGRATIONS_STATES } from "./_data/states";
import { RESPONSIVE_TOPICS, BREAKPOINT_NOTES } from "./_data/responsive";
import { INTEGRATIONS_ACCESSIBILITY_TOPICS } from "./_data/accessibility";
import { IMPLEMENTATION_GUIDANCE } from "./_data/implementation-guidance";
import { INTEGRATIONS_PROMOTION_CANDIDATES, INTEGRATIONS_CLEAN_FINDINGS } from "./_data/promotion-candidates";
import { INTEGRATIONS_FUTURE_EXTENSIONS } from "./_data/future-extensions";

const entry = getEntry("integrations-platform")!;
const relatedComponents = [getEntry("admin-platform")!, getEntry("platform-architecture")!, getEntry("capabilities-library")!];

// Guidance entries that describe choosing between two overlapping options read as "when to use"
// material; the rest describe how a region is scoped/composed and read as "composition" material.
const WHEN_TO_USE_LABELS = ["Workflow integration", "Operational integration"];
const whenToUseGuidance = IMPLEMENTATION_GUIDANCE.filter((topic) => WHEN_TO_USE_LABELS.includes(topic.label));
const compositionGuidance = IMPLEMENTATION_GUIDANCE.filter((topic) => !WHEN_TO_USE_LABELS.includes(topic.label));

export default function IntegrationsPlatformPage() {
  return (
    <DocsShell entry={entry} toc={<DocsTableOfContents />}>
      <DocsPageHeader entry={entry} />

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="overview"
            eyebrow={<Eyebrow tone="accent">Overview</Eyebrow>}
            title="Eleven regions, twelve components"
            description="Every component in this family maps to one of the regions below. IntegrationsMappings reuses Dependency & Relationship Views' own RelationshipView — the same composition Product Platform's own ProductProviderMappings already established."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={3}>
            {INTEGRATIONS_ANATOMY.map((region) => (
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
            title="Choosing the right composition"
            description="How this platform's components choose between overlapping Workflow and Operational options — grounded in each option's own prop surface, not a new integrations-specific rule."
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
            title="Eight integration patterns, live"
            description="Each demo below is a real, working composition with real props — not a static screenshot."
            descriptionMaxWidth={false}
          />
          <IntegrationsPlatformGallery />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-14">
          <div className="flex flex-col gap-10">
            <SectionHeader
              id="behavior"
              eyebrow={<Eyebrow tone="accent">Behavior</Eyebrow>}
              title="States"
              description="Eight states this platform recognizes. Six carry at least one verbatim match, the strongest ratio of any Platform package to date — Connecting (close analog only) and Archived (no analog at all) are the two genuine, disclosed gaps."
              descriptionMaxWidth={false}
            />
            <DescriptionList items={INTEGRATIONS_STATES.map((item) => ({ label: item.state, value: item.note }))} />
          </div>

          <div className="flex flex-col gap-10">
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
          <DescriptionList items={INTEGRATIONS_ACCESSIBILITY_TOPICS.map((topic) => ({ label: topic.label, value: topic.text }))} />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="composition"
            eyebrow={<Eyebrow tone="accent">Composition</Eyebrow>}
            title="Composition"
            description="How each region composes an existing Workflow or Operational component, and where that component's own contract draws the line on what this platform layer is responsible for."
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
              description="Real, grep-verified findings across the seven areas this audit covered — Integrations platform, Providers, Connections, Mappings, Synchronization, Diagnostics, Infrastructure — not estimated or carried over from memory."
              descriptionMaxWidth={false}
            />
            {INTEGRATIONS_PROMOTION_CANDIDATES.length === 0 ? (
              <Card className="flex flex-col gap-2 border-success/30 bg-success-soft">
                <span className="text-body-sm font-medium text-ink-primary">No real migration targets found</span>
                <Body size="sm" muted>
                  No area surfaced real execution logic (an OAuth/provider-connector implementation, a
                  connection-persistence store, a field-mapping engine, a sync-job scheduler, a diagnostic-check
                  engine, or integrations-specific infrastructure) that this platform&rsquo;s own components would
                  duplicate. The pre-existing Capability Library (src/capabilities/) is the closest adjacent system —
                  a separate architecture audit already found it &ldquo;diagram-layer-only,&rdquo; and this audit
                  independently re-confirmed that finding by reading its actual provider/failover source. See the
                  clean findings below for what was actually checked.
                </Body>
              </Card>
            ) : null}
            <div className="flex flex-col gap-3">
              <span className="text-body-sm font-medium text-ink-primary">Clean findings</span>
              {INTEGRATIONS_CLEAN_FINDINGS.map((finding) => (
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
              {INTEGRATIONS_FUTURE_EXTENSIONS.map((extension) => (
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
