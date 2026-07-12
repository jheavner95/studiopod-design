import { SectionShell, CardGrid, DescriptionList } from "@/components/layout";
import { Card, Body, Caption, SectionHeader, Eyebrow } from "@/components/ui";
import { DocsShell, DocsPageHeader, DocsTableOfContents, DocsRelatedGrid } from "@/components/docs";
import { getEntry } from "@/lib/design-system-navigation";
import { AdminPlatformGallery } from "./_components/AdminPlatformGallery";
import { ADMIN_ANATOMY } from "./_data/anatomy";
import { ADMIN_STATES } from "./_data/states";
import { RESPONSIVE_TOPICS, BREAKPOINT_NOTES } from "./_data/responsive";
import { ADMIN_ACCESSIBILITY_TOPICS } from "./_data/accessibility";
import { IMPLEMENTATION_GUIDANCE } from "./_data/implementation-guidance";
import { ADMIN_PROMOTION_CANDIDATES, ADMIN_CLEAN_FINDINGS } from "./_data/promotion-candidates";
import { ADMIN_FUTURE_EXTENSIONS } from "./_data/future-extensions";

const entry = getEntry("admin-platform")!;
const relatedComponents = [getEntry("platform-architecture-doc")!, getEntry("operations-platform")!, getEntry("integrations-platform")!];

// IMPLEMENTATION_GUIDANCE holds two kinds of notes: how these components compose from
// other tiers (Composition), and where each component's own responsibility stops
// (When to use). Split by label rather than duplicating the data file.
const COMPOSITION_LABELS = new Set(["Platform composition", "Workflow integration", "Operational integration"]);
const compositionGuidance = IMPLEMENTATION_GUIDANCE.filter((item) => COMPOSITION_LABELS.has(item.label));
const usageGuidance = IMPLEMENTATION_GUIDANCE.filter((item) => !COMPOSITION_LABELS.has(item.label));

export default function AdminPlatformPage() {
  return (
    <DocsShell entry={entry} toc={<DocsTableOfContents />}>
      <DocsPageHeader entry={entry} />

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="overview"
            eyebrow={<Eyebrow tone="accent">Overview</Eyebrow>}
            title="Overview"
            description="Eleven regions, twelve components. Every component in this family maps to one of the regions below — AdminEnrollment is the first Platform-tier reuse of Approval & Review's own ApprovalStage, checked directly against Pipeline Components' own PipelineStage before composing."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={3}>
            {ADMIN_ANATOMY.map((region) => (
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
            description="Where each admin component's own responsibility ends, and real business logic — access decisions, persistence, step gating — begins for the caller."
            descriptionMaxWidth={false}
          />
          <DescriptionList items={usageGuidance.map((topic) => ({ label: topic.label, value: topic.text }))} />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="examples"
            eyebrow={<Eyebrow tone="accent">Examples</Eyebrow>}
            title="Examples"
            description="Eight admin patterns, each a real, working composition with real props — not a static screenshot. Try the Configuration demo's live toggle and role select."
            descriptionMaxWidth={false}
          />
          <AdminPlatformGallery />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="behavior"
            eyebrow={<Eyebrow tone="accent">Behavior</Eyebrow>}
            title="Behavior"
            description="Eight states this platform recognizes. Configured and Archived have no verbatim match or close analog anywhere — two genuine, disclosed vocabulary gaps, the same count Commerce Platform's own Draft/Archived pair already established and fewer than Product Platform's own four — while Disabled and Auditing are disclosed close analogs only."
            descriptionMaxWidth={false}
          />
          <DescriptionList items={ADMIN_STATES.map((item) => ({ label: item.state, value: item.note }))} />

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
          <DescriptionList items={ADMIN_ACCESSIBILITY_TOPICS.map((topic) => ({ label: topic.label, value: topic.text }))} />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="composition"
            eyebrow={<Eyebrow tone="accent">Composition</Eyebrow>}
            title="Composition"
            description="How these twelve components compose from already-built Workflow and Operational components, rather than introducing new logic of their own."
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
              description="Real, grep-verified findings across the six subdomains this page covers — Admin platform, Users, Permissions, Configuration, Audit, Enrollment — plus Governance, not estimated or carried over from memory."
              descriptionMaxWidth={false}
            />
            {ADMIN_PROMOTION_CANDIDATES.length === 0 ? (
              <Card className="flex flex-col gap-2 border-success/30 bg-success-soft">
                <span className="text-body-sm font-medium text-ink-primary">No real findings</span>
                <Body size="sm" muted>
                  No subdomain surfaced real execution logic (a user-account system, an RBAC engine, a
                  configuration-persistence store, an audit-log writer, or an enrollment-workflow engine) that this
                  platform&rsquo;s own components would duplicate. Unlike every other Platform section on this site,
                  Admin has no dedicated directory, diagram component, or static fixture module anywhere in the
                  repo — its only footprint is a single planning-schema row in Platform Component Architecture&rsquo;s
                  own templates. See the clean findings below for what was actually checked.
                </Body>
              </Card>
            ) : null}
            <div className="flex flex-col gap-3">
              <span className="text-body-sm font-medium text-ink-primary">Clean findings</span>
              {ADMIN_CLEAN_FINDINGS.map((finding) => (
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
              {ADMIN_FUTURE_EXTENSIONS.map((extension) => (
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
