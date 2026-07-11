import { DocsShell, DocsPageHeader, DocsTableOfContents } from "@/components/docs";
import { DocsEntryGrid } from "../docs/_components/DocsEntryGrid";
import { DocsLandingSummary } from "../docs/_components/DocsLandingSummary";
import { DocsSectionLanding } from "../docs/_components/DocsSectionLanding";
import { SectionShell } from "@/components/layout";
import { SectionHeader, Eyebrow } from "@/components/ui";
import { getEntry, getGroup, getGroupEntries } from "@/lib/design-system-navigation";

const entry = getEntry("documentation")!;
const children = getGroupEntries("documentation").filter((e) => e.id !== entry.id);

const primaryEntryPoints = children.filter((e) => e.id === "docs-root" || e.id === "application-composition");
const commonPages = children.filter((e) => !primaryEntryPoints.includes(e));
const relatedGroups = [getGroup("business-features")!, getGroup("certification")!, getGroup("platform-systems")!];

// Real counts, verified against the registry's own "documentation" group entries
// and src/app/docs/business-features/_data/categories.ts + business-feature-templates/_data/templates.ts.
const certifiedCount = children.filter((e) => e.status === "certified").length;
const STATS = [
  { label: "Pages in this section", value: String(children.length) },
  { label: "Feature categories templated", value: "8 of 9" },
  { label: "Certified capstone reviews", value: `${certifiedCount} of ${children.length}` },
];

export default function DocumentationPage() {
  return (
    <DocsShell entry={entry} toc={<DocsTableOfContents />}>
      <DocsPageHeader entry={entry}>
        <DocsLandingSummary entries={children} />
      </DocsPageHeader>

      <DocsSectionLanding
        purpose="Documentation is the entry point into the system's architecture record — the /docs overlay covering Workspace, Foundation, Operational, Workflow, Platform, and Certification in one place, plus the Application Composition layer that explains how real Business Features are assembled from those certified building blocks. It exists so that whoever builds the next application screen or business feature can trace exactly which certified components they're allowed to compose from, and why."
        whatYoullLearn={[
          "How the documentation overlay organizes the whole system into six sections, and where to start browsing.",
          "The Application Composition Architecture defining how Business Features compose the certified Foundation, Operational, Workflow, and Platform layers into the real application.",
          "The Business Feature Composition Framework's canonical internal structure, standard template, reusable categories, and composition rules.",
          "The reusable Business Feature Templates, covering eight of the framework's nine Feature Categories with standard layouts and a composition matrix.",
          "How Application Composition Certification re-audited the whole tier against its own real source, resolved two real defects, and certified it.",
        ]}
        stats={STATS}
        primaryEntryPoints={primaryEntryPoints}
        relatedGroups={relatedGroups}
      />

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-6">
          <SectionHeader
            id="all-pages"
            eyebrow={<Eyebrow tone="accent">Browse everything</Eyebrow>}
            title="The rest of the documentation"
            descriptionMaxWidth={false}
          />
          <DocsEntryGrid entries={commonPages} />
        </div>
      </SectionShell>
    </DocsShell>
  );
}
