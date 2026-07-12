import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageShell, SectionShell, CardGrid, DescriptionList } from "@/components/layout";
import { SectionBadge, Display, Body, Badge, Card, StatCard, SectionHeader, Eyebrow } from "@/components/ui";
import { SystemGrid } from "@/components/illustration";
import { DESIGN_SYSTEM_SECTIONS } from "@/lib/design-system-nav";
import { getGroupsForSection } from "@/lib/design-system-navigation";

const section = DESIGN_SYSTEM_SECTIONS.find((s) => s.id === "core-components")!;

/** Real, grep-verifiable accessibility affordances built into this kit's primitives — carried over from the retired /design-system showcase page, which was the only place this was written down. */
const ACCESSIBILITY_NOTES = [
  {
    label: "Focus visibility",
    text: "Buttons, checkboxes, radios, toggles, sliders, and search inputs all share the same .focus-ring utility (src/styles/utilities.css), so a visible focus outline on :focus-visible is systemic rather than added per component.",
  },
  {
    label: "Reduced motion",
    text: "Every animated primitive reads its motion preference from the same MotionPreferenceProvider context, rather than each component implementing its own reduced-motion check.",
  },
  {
    label: "Toggle and control state",
    text: "Pressable toggles expose aria-pressed, and grouped controls like SegmentedControl carry an explicit aria-label — View, Density, Speed — since their visual caption lives outside the control markup.",
  },
  {
    label: "Decorative icons",
    text: "Icons that repeat information already given as text are marked aria-hidden so assistive tech skips the redundant glyph.",
  },
];

// Real entry points, unchanged from the section's own reference list.
const primaryEntryPoints = section.references;

// Real counts, verified against src/components/ui/index.ts (30 exported
// components) and the two showcase sections that demonstrate them:
// ComponentGallerySection (Button, Card, Badge, SectionBadge, SectionHeader,
// GlassPanel, SurfacePanel, StatCard, FeatureCard, CTAGroup, Skeleton = 11)
// and FormControlsSection (TextInput, Textarea, Select, Checkbox, RadioGroup,
// ToggleSwitch, SegmentedControl, Slider, SearchInput, FormField, FieldGroup,
// FilterBar = 12).
const STATS = [
  { value: "30", label: "Real components", description: "Exported from src/components/ui" },
  { value: "11", label: "General UI primitives", description: "Buttons, cards, badges, panels & more" },
  { value: "12", label: "Form control components", description: "Inputs, selects, toggles & wrappers" },
];

const relatedGroups = getGroupsForSection("components").filter((group) =>
  ["components-overview", "foundations-tokens", "marketing"].includes(group.id),
);

export default function CoreComponentsPage() {
  return (
    <PageShell background={<SystemGrid />}>
      <SectionShell spacing="xl">
        <div className="flex flex-col gap-6">
          <SectionBadge>{section.eyebrow}</SectionBadge>
          <Display>{section.title}</Display>
          <Body size="lg" muted className="max-w-[var(--container-narrow)]">
            {section.description}
          </Body>
          <Badge size="sm" className="w-fit">
            {section.status}
          </Badge>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div className="flex flex-col gap-3">
            <Eyebrow tone="accent">Purpose</Eyebrow>
            <Body size="lg" className="max-w-[65ch]">
              Core Components is the shared UI kit every product surface — marketing or application — pulls
              from: buttons, cards, badges, and the full set of form controls. The components themselves live
              and are demonstrated inside the Design System showcase page today rather than as standalone
              reference pages here; this section is the signpost into that showcase until each family earns
              its own dedicated documentation.
            </Body>
          </div>
          <div className="flex flex-col gap-3">
            <Eyebrow tone="accent">What you&apos;ll learn</Eyebrow>
            <ul className="flex flex-col gap-2">
              {[
                "The two families that make up the shared UI kit: general-purpose display primitives and form controls.",
                "Where each component's variants and interaction states — hover, disabled, loading, error — are actually demonstrated today.",
                "The real split between the 11 general UI primitives and the 12 form control components.",
                "How this kit relates to Foundations underneath it and to Marketing Sections and the rest of Components, which build on top of it.",
              ].map((item) => (
                <li key={item} className="flex gap-2 text-body-sm text-ink-secondary">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent-500" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <CardGrid columns={3} gap="md">
          {STATS.map((stat) => (
            <StatCard key={stat.label} value={stat.value} label={stat.label} description={stat.description} />
          ))}
        </CardGrid>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-6">
          <SectionHeader
            id="accessibility"
            eyebrow={<Eyebrow tone="accent">Accessibility</Eyebrow>}
            title="Accessibility"
            description="Affordances that are systemic across this kit's primitives, not one-off additions."
            descriptionMaxWidth={false}
          />
          <DescriptionList items={ACCESSIBILITY_NOTES.map((note) => ({ label: note.label, value: note.text }))} />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-6">
          <SectionHeader
            id="entry-points"
            eyebrow={<Eyebrow tone="accent">Start here</Eyebrow>}
            title="Primary entry points"
            descriptionMaxWidth={false}
          />
          <CardGrid columns={2} gap="md">
            {primaryEntryPoints.map((ref) =>
              ref.href ? (
                <Link
                  key={ref.title}
                  href={ref.href}
                  className="focus-ring block rounded-lg"
                  aria-label={`${ref.title}: ${ref.description}`}
                >
                  <Card interactive className="flex h-full flex-col gap-3">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-body-lg font-medium text-ink-primary">{ref.title}</span>
                      <ArrowUpRight className="size-4 shrink-0 text-ink-tertiary" aria-hidden />
                    </div>
                    <Body size="sm" muted>
                      {ref.description}
                    </Body>
                  </Card>
                </Link>
              ) : (
                <Card key={ref.title} className="flex h-full flex-col gap-3">
                  <span className="text-body-lg font-medium text-ink-primary">{ref.title}</span>
                  <Body size="sm" muted>
                    {ref.description}
                  </Body>
                </Card>
              ),
            )}
          </CardGrid>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-6">
          <SectionHeader
            id="related-sections"
            eyebrow={<Eyebrow tone="accent">Continue exploring</Eyebrow>}
            title="Related sections"
            descriptionMaxWidth={false}
          />
          <CardGrid columns={3} gap="md">
            {relatedGroups.map((group) => (
              <Link key={group.id} href={group.href} className="focus-ring block rounded-lg">
                <Card interactive className="flex h-full flex-col gap-2">
                  <span className="text-body-md font-medium text-ink-primary">{group.title}</span>
                  <Body size="sm" muted>
                    {group.description}
                  </Body>
                </Card>
              </Link>
            ))}
          </CardGrid>
        </div>
      </SectionShell>
    </PageShell>
  );
}
