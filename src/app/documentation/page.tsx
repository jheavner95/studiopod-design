import { DocsShell, DocsPageHeader, DocsTableOfContents, DocsLinkCard } from "@/components/docs";
import { DocsLandingSummary } from "../docs/_components/DocsLandingSummary";
import { DocsSectionLanding } from "../docs/_components/DocsSectionLanding";
import { SectionShell, CardGrid } from "@/components/layout";
import { SectionHeader, Eyebrow, Card, Body } from "@/components/ui";
import { NAV_SECTIONS, NAV_REGISTRY, getEntry, getGroup } from "@/lib/design-system-navigation";

const entry = getEntry("documentation")!;

const primaryEntryPoints = [getEntry("home")!, getEntry("docs-root")!];
const relatedGroups = [getGroup("components-overview")!, getGroup("patterns-overview")!, getGroup("applications-overview")!];

// The other five sections this "About & Principles" page points out to —
// everything except Overview, which this page and the homepage already are.
const OTHER_SECTIONS = NAV_SECTIONS.filter((section) => section.id !== "overview");

const ACCESSIBILITY_CONVENTIONS = [
  {
    title: "Live announcements",
    description: "Value and status changes that aren't the direct result of a user's own action announce themselves non-visually through a shared useAnnounce() hook, so a screen reader user doesn't have to be focused on a region to know it changed.",
  },
  {
    title: "Modal focus containment",
    description: "Every overlay that blocks the page — Dialog, Drawer, Menu, Command Palette — locks the background into a genuinely inert state, not just a visually dimmed one, and traps focus inside itself until it closes.",
  },
  {
    title: "Accessible names, independent of hover",
    description: "An icon-only control carries its own aria-label rather than depending on Tooltip for one — Tooltip supplies a hover or focus description, not an object's only name.",
  },
  {
    title: "Roving tabindex for composite widgets",
    description: "Tree and list-style navigation moves focus with arrow keys through a single tab stop, per the standard ARIA composite-widget pattern, instead of making every item its own stop in the tab order.",
  },
  {
    title: "One severity-to-role mapping, shared",
    description: "Alert, FieldError, Notification, and ValidationSummary all compute their ARIA role from the same tone through one shared helper, so an error reads as alert and everything else as status, consistently, everywhere feedback appears.",
  },
  {
    title: "Escalating urgency for transient messages",
    description: "Toast raises its live-region politeness to assertive specifically when the leading message is an error, and stays polite otherwise — an interruption is reserved for the moments that actually need one.",
  },
  {
    title: "Field errors wired to their fields",
    description: "Error and helper text are associated with their input through aria-describedby across the form field components, so the relationship is available to assistive technology, not just implied by layout.",
  },
  {
    title: "A minimum size for anything tappable",
    description: "Icon-only affordances follow the WCAG 24×24 CSS-pixel minimum target size, so precision isn't a requirement for using them.",
  },
];

// Real counts, derived from NAV_REGISTRY rather than hardcoded, so this
// stays correct as the registry grows.
const STATS = [
  { label: "Top-level sections", value: String(NAV_SECTIONS.length) },
  { label: "Pages in the system", value: String(NAV_REGISTRY.length) },
  { label: "Accessibility conventions", value: String(ACCESSIBILITY_CONVENTIONS.length) },
];

const CONTRIBUTION_DOCS = [
  { title: "README.md", description: "Project purpose, architecture overview, package map, and local dev workflow." },
  { title: "AGENTS.md", description: "Conventions and constraints for this repo's customized Next.js fork." },
];

export default function DocumentationPage() {
  return (
    <DocsShell entry={entry} toc={<DocsTableOfContents />}>
      <DocsPageHeader entry={entry}>
        <DocsLandingSummary entries={NAV_REGISTRY} />
      </DocsPageHeader>

      <DocsSectionLanding
        purpose="This is the design system's own about page: what it is, why it's organized goal-first — Overview, Components, Patterns, Applications, Architecture, Playground — instead of tier-first, and how to find the right place to add something new. It's the second stop after the homepage, not a catch-all listing of every historical group in the old tier-first index."
        whatYoullLearn={[
          "Why the system is organized by what you're trying to do (goal-first) instead of by which package built it (tier-first), and how the six top-level sections map onto routes that already existed before this restructure.",
          "Where the deeper composition rules and the old Foundation/Operational/Workflow/Platform tier model still live, for anyone who needs that architectural detail — see Architecture.",
          "The accessibility conventions every component follows — live announcements, focus containment, accessible naming, and more.",
          "How to contribute: which section a new component, pattern, platform library, or architecture doc belongs in.",
        ]}
        stats={STATS}
        primaryEntryPoints={primaryEntryPoints}
        relatedGroups={relatedGroups}
      />

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-6">
          <SectionHeader
            id="package-structure"
            eyebrow={<Eyebrow tone="accent">Package structure</Eyebrow>}
            title="The six sections"
            description="The full taxonomy this page and the homepage are both organized around."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={3} gap="md">
            {OTHER_SECTIONS.map((section) => (
              <DocsLinkCard
                key={section.id}
                href={section.href}
                title={section.title}
                description={section.description}
                actionLabel={`For: ${section.audience}`}
              />
            ))}
          </CardGrid>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-6">
          <SectionHeader
            id="accessibility"
            eyebrow={<Eyebrow tone="accent">Accessibility</Eyebrow>}
            title="Conventions every component follows"
            description="These aren't one-time fixes — they're standing rules the component library is built against, enforced the same way across Foundation, Operational, Workflow, and Platform."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={2} gap="md">
            {ACCESSIBILITY_CONVENTIONS.map((convention) => (
              <Card key={convention.title} className="flex h-full flex-col gap-2">
                <span className="text-body-md font-medium text-ink-primary">{convention.title}</span>
                <Body size="sm" muted>
                  {convention.description}
                </Body>
              </Card>
            ))}
          </CardGrid>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-6">
          <SectionHeader
            id="contribution-workflow"
            eyebrow={<Eyebrow tone="accent">Contribution workflow</Eyebrow>}
            title="Where the rules are written down"
            description="This page describes the system's own principles; these two repo-root documents govern how to actually work in it."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={2} gap="md">
            {CONTRIBUTION_DOCS.map((doc) => (
              <Card key={doc.title} className="flex h-full flex-col gap-2">
                <span className="text-body-md font-medium text-ink-primary">{doc.title}</span>
                <Body size="sm" muted>
                  {doc.description}
                </Body>
              </Card>
            ))}
          </CardGrid>
        </div>
      </SectionShell>
    </DocsShell>
  );
}
