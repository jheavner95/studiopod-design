import { SectionShell, CardGrid, DescriptionList } from "@/components/layout";
import { Card, Body, Caption, SectionHeader, Eyebrow } from "@/components/ui";
import { DocsShell, DocsPageHeader, DocsTableOfContents, DocsRelatedGrid } from "@/components/docs";
import { getEntry } from "@/lib/design-system-navigation";
import { NavigationGallery } from "./_components/NavigationGallery";
import { NAVIGATION_ANATOMY } from "./_data/anatomy";
import { NAVIGATION_STATES } from "./_data/states";
import { RESPONSIVE_TOPICS, BREAKPOINT_NOTES } from "./_data/responsive";
import { NAVIGATION_ACCESSIBILITY_TOPICS } from "./_data/accessibility";
import { IMPLEMENTATION_GUIDANCE } from "./_data/implementation-guidance";
import { NAVIGATION_FUTURE_EXTENSIONS } from "./_data/future-extensions";

const entry = getEntry("foundation-navigation")!;
const relatedComponents = [getEntry("foundation-overlays")!, getEntry("foundation-forms")!, getEntry("foundation-feedback")!];

// Behavior groups interaction states together with cross-breakpoint behavior; the third RESPONSIVE_TOPICS
// entry (nesting) is compositional rather than behavioral, so it's shown under Composition instead.
const RESPONSIVE_BEHAVIOR_TOPICS = RESPONSIVE_TOPICS.slice(0, 2);
const NESTING_TOPIC = RESPONSIVE_TOPICS[2];

// Real composition relationships already documented elsewhere on this page (anatomy, accessibility,
// responsive behavior), gathered into their own section rather than left scattered.
const COMPOSITION_NOTES = [
  {
    label: "SideNavigation",
    note: "Composed from NavigationSection, NavigationGroup, and NavigationItem — a workspace sidebar is an assembly of the smaller pieces below it, not one monolithic component.",
  },
  {
    label: "NavigationRail (scroll-spy mode)",
    note: "Generalizes the scroll-spy pattern already used by src/app/design-system/_components/PlaygroundNav.tsx, rather than introducing a second, competing implementation of the same behavior.",
  },
  {
    label: "CommandNavigation",
    note: "A trigger only — the search input, keyboard handling, and ARIA behavior behind it belong to the Overlay System's CommandPalette, which this component composes rather than duplicates.",
  },
  {
    label: "Breadcrumbs' overflow menu",
    note: "Collapses hidden middle crumbs behind the Overlay System's Menu directly — the same composition CommandNavigation's trigger relies on, so focus is never trapped outside an overlay by either.",
  },
  {
    label: NESTING_TOPIC.label,
    note: NESTING_TOPIC.note,
  },
];

export default function FoundationNavigationPage() {
  return (
    <DocsShell entry={entry} toc={<DocsTableOfContents />}>
      <DocsPageHeader entry={entry} />

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="overview"
            eyebrow={<Eyebrow tone="accent">Overview</Eyebrow>}
            title="Six categories, one family"
            description="Global, Workspace, Section, Context, Inline, and Command — every component below belongs to exactly one."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={3}>
            {NAVIGATION_ANATOMY.map((region) => (
              <Card key={region.name} className="flex flex-col gap-2">
                <span className="text-body-md font-medium text-ink-primary">{region.name}</span>
                <Body size="sm" muted>
                  {region.description}
                </Body>
                <Caption className="border-t border-border-subtle pt-3 text-ink-tertiary">{region.components}</Caption>
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
            description="Which of two similar-looking components actually fits — and when the right move is to reuse one that already exists instead of hand-rolling another."
            descriptionMaxWidth={false}
          />
          <DescriptionList items={IMPLEMENTATION_GUIDANCE.map((topic) => ({ label: topic.label, value: topic.text }))} />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="examples"
            eyebrow={<Eyebrow tone="accent">Examples</Eyebrow>}
            title="Every component, live"
            description="Each demo below is a real, working component with real local state — not a static screenshot. Try Breadcrumbs' overflow menu, Tabs' arrow keys, and Tree Navigation's expand/collapse."
            descriptionMaxWidth={false}
          />
          <NavigationGallery />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="behavior"
            eyebrow={<Eyebrow tone="accent">Behavior</Eyebrow>}
            title="Behavior"
            description="Nine states this family recognizes, grounded in the real implementation detail behind each one, plus how the same components hold up from desktop down to mobile."
            descriptionMaxWidth={false}
          />
          <DescriptionList items={NAVIGATION_STATES.map((item) => ({ label: item.state, value: item.note }))} />
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
          <DescriptionList items={RESPONSIVE_BEHAVIOR_TOPICS.map((topic) => ({ label: topic.label, value: topic.note }))} />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader id="accessibility" eyebrow={<Eyebrow tone="accent">Accessibility</Eyebrow>} title="Accessibility" descriptionMaxWidth={false} />
          <DescriptionList items={NAVIGATION_ACCESSIBILITY_TOPICS.map((topic) => ({ label: topic.label, value: topic.text }))} />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="composition"
            eyebrow={<Eyebrow tone="accent">Composition</Eyebrow>}
            title="Composition"
            description="Five places this family composes with itself or with the Overlay System, rather than each component reimplementing its own version."
            descriptionMaxWidth={false}
          />
          <DescriptionList items={COMPOSITION_NOTES.map((topic) => ({ label: topic.label, value: topic.note }))} />
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
              description="Capabilities this system does not currently include:"
              descriptionMaxWidth={false}
            />
            <CardGrid columns={3}>
              {NAVIGATION_FUTURE_EXTENSIONS.map((extension) => (
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
