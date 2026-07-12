import { SectionShell, CardGrid, DescriptionList } from "@/components/layout";
import { Card, Body, Caption, SectionHeader, Eyebrow } from "@/components/ui";
import { DocsShell, DocsPageHeader, DocsTableOfContents, DocsRelatedGrid } from "@/components/docs";
import { getEntry } from "@/lib/design-system-navigation";
import { OperationsPlatformGallery } from "./_components/OperationsPlatformGallery";
import { OPERATIONS_ANATOMY } from "./_data/anatomy";
import { OPERATIONS_STATES } from "./_data/states";
import { RESPONSIVE_TOPICS, BREAKPOINT_NOTES } from "./_data/responsive";
import { OPERATIONS_ACCESSIBILITY_TOPICS } from "./_data/accessibility";
import { IMPLEMENTATION_GUIDANCE } from "./_data/implementation-guidance";
import { OPERATIONS_FUTURE_EXTENSIONS } from "./_data/future-extensions";

const entry = getEntry("operations-platform")!;
const relatedComponents = [getEntry("intelligence-platform")!, getEntry("admin-platform")!, getEntry("status-health")!];

// Where each component's responsibility ends and caller-supplied (Business Feature) logic begins.
const WHEN_TO_USE_LABELS = ["Monitoring presentation", "Automation workflows", "Alert presentation", "Health organization"];
// How the 12 components compose from the Workflow and Operational tiers beneath them.
const COMPOSITION_LABELS = ["Platform composition", "Workflow integration", "Operational integration"];

const whenToUseGuidance = IMPLEMENTATION_GUIDANCE.filter((item) => WHEN_TO_USE_LABELS.includes(item.label));
const compositionGuidance = IMPLEMENTATION_GUIDANCE.filter((item) => COMPOSITION_LABELS.includes(item.label));

export default function OperationsPlatformPage() {
  return (
    <DocsShell entry={entry} toc={<DocsTableOfContents />}>
      <DocsPageHeader entry={entry} />

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="overview"
            eyebrow={<Eyebrow tone="accent">Overview</Eyebrow>}
            title="Overview"
            description="Eleven regions, twelve components — every component in this family maps to one of the regions below. OperationsAlerts and OperationsMonitoring are this platform's first reuse of OperationalAlertPanel and ProviderHealthPanel, checked directly against each one's own prop surface before composing rather than rebuilding it."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={3}>
            {OPERATIONS_ANATOMY.map((region) => (
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
            description="Four places where a component's job stops at presentation, and the actual decision — whether a system is being monitored, whether an automation step is running, which condition fires an alert, how health is scored — stays outside it as Business Feature logic."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={4}>
            {whenToUseGuidance.map((topic) => (
              <Card key={topic.label} className="flex flex-col gap-2">
                <span className="text-body-sm font-medium text-ink-primary">{topic.label}</span>
                <Body size="sm" muted>
                  {topic.text}
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
            title="Eight operations patterns, live"
            description="Each demo below is a real, working composition with real props — not a static screenshot."
            descriptionMaxWidth={false}
          />
          <OperationsPlatformGallery />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="behavior"
            eyebrow={<Eyebrow tone="accent">Behavior</Eyebrow>}
            title="Behavior"
            description="Eight states this platform recognizes, plus how the layout responds across breakpoints. Seven of eight states have at least one verbatim vocabulary match, with Monitoring the sole disclosed gap, a close analog rather than an exact match."
            descriptionMaxWidth={false}
          />
          <DescriptionList items={OPERATIONS_STATES.map((item) => ({ label: item.state, value: item.note }))} />
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
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader id="accessibility" eyebrow={<Eyebrow tone="accent">Accessibility</Eyebrow>} title="Accessibility" descriptionMaxWidth={false} />
          <DescriptionList items={OPERATIONS_ACCESSIBILITY_TOPICS.map((topic) => ({ label: topic.label, value: topic.text }))} />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="composition"
            eyebrow={<Eyebrow tone="accent">Composition</Eyebrow>}
            title="Composition"
            description="How the 12 components in this platform compose from the Workflow and Operational tiers beneath them."
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
              id="future-enhancements"
              title="Future enhancements"
              description="Capabilities these components do not implement today, and what each would require."
              descriptionMaxWidth={false}
            />
            <CardGrid columns={3}>
              {OPERATIONS_FUTURE_EXTENSIONS.map((extension) => (
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
