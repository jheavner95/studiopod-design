import { SectionShell, DescriptionList } from "@/components/layout";
import { SectionHeader, Eyebrow } from "@/components/ui";
import { DocsShell, DocsPageHeader, DocsTableOfContents } from "@/components/docs";
import { DocsLandingSummary } from "@/app/docs/_components/DocsLandingSummary";
import { DocsSectionLanding } from "@/app/docs/_components/DocsSectionLanding";
import { getEntry, getGroupsForSection } from "@/lib/design-system-navigation";
import { ComponentGallerySection } from "./_sections/ComponentGallerySection";
import { FormControlsSection } from "./_sections/FormControlsSection";

const entry = getEntry("core-components")!;

/** Real, grep-verifiable accessibility affordances built into this kit's primitives. */
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

// Real counts, verified against src/components/ui/index.ts (30 exported
// components) and the two gallery sections that demonstrate them:
// ComponentGallerySection (Button, Card, Badge, SectionBadge, SectionHeader,
// GlassPanel, SurfacePanel, StatCard, FeatureCard, CTAGroup, Skeleton = 11)
// and FormControlsSection (TextInput, Textarea, Select, Checkbox, RadioGroup,
// ToggleSwitch, SegmentedControl, Slider, SearchInput, FormField, FieldGroup,
// FilterBar = 12).
const STATS = [
  { label: "Real components", value: "30" },
  { label: "General UI primitives", value: "11" },
  { label: "Form control components", value: "12" },
];

const primaryEntryPoints = [getEntry("foundations")!, getEntry("tokens")!, getEntry("marketing-components")!];
const relatedGroups = getGroupsForSection("components").filter((group) =>
  ["foundations-tokens", "marketing", "components-overview"].includes(group.id),
);

export default function CoreComponentsPage() {
  return (
    <DocsShell entry={entry} toc={<DocsTableOfContents />}>
      <DocsPageHeader entry={entry}>
        <DocsLandingSummary entries={[entry]} />
      </DocsPageHeader>

      <DocsSectionLanding
        purpose="Core Components is the shared UI kit every product surface — marketing or application — pulls from: buttons, cards, badges, and the full set of form controls, each with its real interaction states demonstrated live below rather than described in prose. It sits directly on top of Foundations & Tokens and underneath both Marketing Sections and the rest of Components."
        whatYoullLearn={[
          "The two families that make up the shared UI kit: general-purpose display primitives and form controls, with every variant and interaction state — hover, disabled, loading, error — demonstrated live.",
          "The real split between the 11 general UI primitives and the 12 form control components.",
          "The accessibility affordances that are systemic across this kit — focus visibility, reduced motion, toggle state, decorative icons — rather than one-off additions per component.",
          "How this kit relates to Foundations & Tokens underneath it and to Marketing Sections and the rest of Components, which build on top of it.",
        ]}
        stats={STATS}
        primaryEntryPoints={primaryEntryPoints}
        relatedGroups={relatedGroups}
      />

      <ComponentGallerySection />
      <FormControlsSection />

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
    </DocsShell>
  );
}
