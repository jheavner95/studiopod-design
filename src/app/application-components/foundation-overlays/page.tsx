import Link from "next/link";
import { SectionShell, CardGrid, DescriptionList } from "@/components/layout";
import { Card, Badge, Body, SectionHeader, Eyebrow } from "@/components/ui";
import { DocsShell, DocsPageHeader, DocsTableOfContents } from "@/components/docs";
import { getEntry } from "@/lib/design-system-navigation";
import { OverlayGallery } from "./_components/OverlayGallery";
import { OVERLAY_ACCESSIBILITY_TOPICS } from "./_data/accessibility";
import { RESPONSIVE_TOPICS, BREAKPOINT_NOTES } from "./_data/responsive";
import { IMPLEMENTATION_GUIDANCE } from "./_data/implementation-guidance";
import { OVERLAY_FUTURE_EXTENSIONS } from "./_data/future-extensions";

const entry = getEntry("foundation-overlays")!;
const relatedComponents = [getEntry("foundation-forms")!, getEntry("foundation-navigation")!, getEntry("foundation-feedback")!];

const COMPONENTS = [
  { name: "Dialog", purpose: "A focused, modal surface that blocks the rest of the page until dismissed.", states: "Entering, Open, Exiting" },
  { name: "Drawer", purpose: "A panel that slides in from an edge without fully blocking the page behind it.", states: "Entering, Open, Exiting" },
  { name: "Popover", purpose: "A small, anchored surface of contextual content, dismissed on outside click.", states: "Open, Closed" },
  { name: "Menu", purpose: "A list of actions or options anchored to a trigger, dismissed on selection or outside click.", states: "Open, Closed, Item highlighted" },
  { name: "Tooltip", purpose: "A brief label revealed on hover or focus, clarifying an otherwise unlabeled control.", states: "Hidden, Visible" },
  { name: "Command Palette", purpose: "A searchable, keyboard-first overlay for jumping to an action or destination without the mouse.", states: "Open, Closed, Searching, No results" },
];

export default function FoundationOverlaysPage() {
  return (
    <DocsShell entry={entry} toc={<DocsTableOfContents />}>
      <DocsPageHeader entry={entry} />

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="overview"
            eyebrow={<Eyebrow tone="accent">Overview</Eyebrow>}
            title="Six components, one shared foundation"
            description="Every component in this family is built from the same three hooks (useFocusTrap, useOutsideClick, useEscapeKey) and the same Portal + z-index scale — the differences between them are placement, dismissal rules, and ARIA pattern, not infrastructure."
            descriptionMaxWidth={false}
          />
          <div className="flex flex-wrap gap-2">
            {COMPONENTS.map((component) => (
              <Badge key={component.name} tone="neutral" size="md">
                {component.name}
              </Badge>
            ))}
          </div>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="when-to-use"
            eyebrow={<Eyebrow tone="accent">When to use</Eyebrow>}
            title="Which overlay fits which situation"
            description="Six purposes with no overlap — pick based on how much of the page needs to stay reachable while the overlay is open, not on habit."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={3}>
            {COMPONENTS.map((component) => (
              <Card key={component.name} className="flex flex-col gap-2">
                <span className="text-body-md font-medium text-ink-primary">{component.name}</span>
                <Body size="sm" muted>
                  {component.purpose}
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
            title="Every component, live"
            description="Each trigger below opens a real, functioning overlay — not a screenshot. Try Tab/Shift+Tab inside an open Dialog or Drawer, arrow keys inside Menu, and the ⌘K / Ctrl+K shortcut for Command Palette."
            descriptionMaxWidth={false}
          />
          <OverlayGallery />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="behavior"
            eyebrow={<Eyebrow tone="accent">Behavior</Eyebrow>}
            title="States, and how they hold up across screen sizes"
            description="Each component's own state model, plus how anchored and edge-docked overlays adapt from desktop down to mobile."
            descriptionMaxWidth={false}
          />
          <DescriptionList items={COMPONENTS.map((component) => ({ label: component.name, value: `States: ${component.states}` }))} />
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
          <DescriptionList items={OVERLAY_ACCESSIBILITY_TOPICS.map((topic) => ({ label: topic.label, value: topic.text }))} />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="composition"
            eyebrow={<Eyebrow tone="accent">Composition</Eyebrow>}
            title="Composition"
            description="How the six components share conventions with the rest of the system, and with each other."
            descriptionMaxWidth={false}
          />
          <DescriptionList items={IMPLEMENTATION_GUIDANCE.map((topic) => ({ label: topic.label, value: topic.text }))} />
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
              id="future-enhancements"
              title="Future enhancements"
              description="Room the current system leaves for later — reserved, not scoped or committed."
              descriptionMaxWidth={false}
            />
            <CardGrid columns={3}>
              {OVERLAY_FUTURE_EXTENSIONS.map((extension) => (
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
