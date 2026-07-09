import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageShell, SectionShell, CardGrid, DescriptionList } from "@/components/layout";
import { Card, Badge, Body, SectionHeader, Eyebrow } from "@/components/ui";
import { SystemGrid } from "@/components/illustration";
import { PageIntro } from "../_components/PageIntro";
import { OverlayGallery } from "./_components/OverlayGallery";
import { OVERLAY_ACCESSIBILITY_TOPICS } from "./_data/accessibility";
import { RESPONSIVE_TOPICS, BREAKPOINT_NOTES } from "./_data/responsive";
import { IMPLEMENTATION_GUIDANCE } from "./_data/implementation-guidance";
import { OVERLAY_FUTURE_EXTENSIONS } from "./_data/future-extensions";

function CrossLinks() {
  const links = [
    { label: "Foundation Components", href: "/application-components/foundation-components" },
    { label: "Foundation Layout Primitives", href: "/application-components/foundation-layout" },
    { label: "Foundation Table System", href: "/application-components/foundation-table" },
    { label: "Foundation Metadata System", href: "/application-components/foundation-metadata" },
    { label: "Foundation Form System", href: "/application-components/foundation-forms" },
    { label: "Foundation Layer Audit", href: "/application-components/foundation-audit" },
  ];
  return (
    <div className="flex flex-wrap gap-4">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="focus-ring flex items-center gap-1 rounded-md text-caption font-medium text-accent-400 transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:text-accent-300"
        >
          {link.label}
          <ArrowUpRight className="size-3.5" aria-hidden />
        </Link>
      ))}
    </div>
  );
}

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
    <PageShell background={<SystemGrid />}>
      <SectionShell spacing="xl">
        <PageIntro
          eyebrow="package · application components · foundation overlays"
          title="Foundation overlay system"
          description="Dialog, Drawer, Popover, Menu, Tooltip, and Command Palette — six components sharing one focus-trap, portal, positioning, and dismissal foundation, so accessibility and stacking behavior are solved once instead of six times. Built in DS-2.2; not yet adopted by any real screen — migration is a later work package, the same sequencing Table, Metadata, and Forms followed."
        >
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Badge tone="warning" size="sm" className="w-fit">
              Production Ready — DS-2.2
            </Badge>
          </div>
          <div className="pt-2">
            <CrossLinks />
          </div>
        </PageIntro>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            eyebrow={<Eyebrow tone="accent">Anatomy</Eyebrow>}
            title="Six components, one shared foundation"
            description="Every component in this family is built from the same three hooks (useFocusTrap, useOutsideClick, useEscapeKey) and the same Portal + z-index scale — the differences between them are placement, dismissal rules, and ARIA pattern, not infrastructure."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={3}>
            {COMPONENTS.map((component) => (
              <Card key={component.name} className="flex flex-col gap-2">
                <span className="text-body-md font-medium text-ink-primary">{component.name}</span>
                <Body size="sm" muted>
                  {component.purpose}
                </Body>
                <span className="text-caption text-ink-tertiary">States: {component.states}</span>
              </Card>
            ))}
          </CardGrid>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            eyebrow={<Eyebrow tone="accent">Live demonstration</Eyebrow>}
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
            eyebrow={<Eyebrow tone="accent">Responsive behavior</Eyebrow>}
            title="Responsive behavior"
            descriptionMaxWidth={false}
          />
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
          <SectionHeader eyebrow={<Eyebrow tone="accent">Accessibility</Eyebrow>} title="Accessibility" descriptionMaxWidth={false} />
          <DescriptionList items={OVERLAY_ACCESSIBILITY_TOPICS.map((topic) => ({ label: topic.label, value: topic.text }))} />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            eyebrow={<Eyebrow tone="accent">Implementation guidance</Eyebrow>}
            title="Implementation guidance"
            descriptionMaxWidth={false}
          />
          <DescriptionList items={IMPLEMENTATION_GUIDANCE.map((topic) => ({ label: topic.label, value: topic.text }))} />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            eyebrow={<Eyebrow tone="accent">Future extensions</Eyebrow>}
            title="Future extensions"
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
      </SectionShell>
    </PageShell>
  );
}
