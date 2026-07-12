import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SectionShell, CardGrid } from "@/components/layout";
import { Card, Body, Badge, SectionHeader, Eyebrow } from "@/components/ui";
import { DocsShell, DocsPageHeader, DocsTableOfContents } from "@/components/docs";
import { DocsLandingSummary } from "@/app/docs/_components/DocsLandingSummary";
import { DocsSectionLanding } from "@/app/docs/_components/DocsSectionLanding";
import { getEntry, getGroup, getGroupsForSection, getGroupEntries, type NavEntry } from "@/lib/design-system-navigation";

const entry = getEntry("applications")!;

// Every group below is read straight from the registry, skipping this
// page's own "applications-overview" group (order-0 self-entry) the way
// every other top-level landing page does.
const groups = getGroupsForSection("applications").filter((group) => group.id !== "applications-overview");
const platformsGroup = groups.find((group) => group.id === "platforms")!;
const businessFeaturesGroup = groups.find((group) => group.id === "business-features")!;

const platformEntries = getGroupEntries("platforms");
const businessFeatureEntries = getGroupEntries("business-features");
const allChildren = [...platformEntries, ...businessFeatureEntries];

const primaryEntryPoints = [
  getEntry("production-platform")!,
  getEntry("commerce-platform")!,
  getEntry("intelligence-platform")!,
  getEntry("production-workspace-feature")!,
];
const relatedGroups = [getGroup("platform-architecture")!, getGroup("platform-templates")!, getGroup("certifications")!];

// Real counts: 8 domain platforms × 12 components each = 96, verified against
// src/app/docs/platform/page.tsx's own scorecard and each platform's own
// _data/anatomy.ts (10–11 named regions mapping to 12 components apiece).
const STATS = [
  { label: "Domain platforms", value: String(platformEntries.length) },
  { label: "Real components", value: "96" },
  { label: "Business Feature pilots", value: String(businessFeatureEntries.length) },
];

/**
 * Product-first blurbs for each platform, describing what it does for a
 * StudioPOD user rather than restating a component count — pulled from
 * each platform's own _data/anatomy.ts region descriptions, not invented.
 */
const PLATFORM_BLURBS: Record<string, string> = {
  "production-platform":
    "Runs a production job from queue to shipped artifact — the render/print queue, a stage-by-stage pipeline, the quality gate an artifact has to clear, and the per-artifact lifecycle detail behind Approve, Retry, and Cancel.",
  "product-platform":
    "Where a StudioPOD product record lives end to end — a searchable product library and sortable catalog, per-SKU variant editing, mappings out to external provider marketplaces, and the validation gate and lifecycle detail behind Publish, Archive, and Retire.",
  "publishing-platform":
    "Gets a publication out into the world — the destinations it can target (website, app store, print, marketplace), the health of every publishing provider, the job queue and chronological history behind it, and the pre-publish gate that decides whether it goes out.",
  "commerce-platform":
    "The transactional side of StudioPOD — synced catalog, orders, per-SKU stock levels, pick/pack/ship fulfillment, and base/sale pricing, edited in place and kept in sync with Sync, Fulfill, and Cancel.",
  "intelligence-platform":
    "StudioPOD's own recommendation surface — suggested next steps, scored and ranked business opportunities, a full health score with ranked diagnostics, and chart-based insights a user can Apply, Dismiss, or Archive.",
  "operations-platform":
    "The day-to-day operating picture — which systems are monitored and how healthy they are, what's scheduled or queued, automated step-by-step processes in flight, and every active alert waiting on a Retry, Pause, or Resolve.",
  "admin-platform":
    "Where StudioPOD manages itself — user accounts, roles and permissions, system configuration, a full audit trail of administrative actions, and the approval-gated enrollment flow for bringing something new online.",
  "integrations-platform":
    "How StudioPOD talks to the outside world — a registry of available providers, per-connection health, field-level mappings to each provider, live sync state, and the diagnostics behind Reconnect, Sync now, and Disconnect.",
};

const BUSINESS_FEATURE_BLURBS: Record<string, string> = {
  "production-workspace-feature":
    "The one real pilot: a fully wired Production Workspace screen — its own header, canvas, inspector, validation, metrics, actions, and dialogs, running on local state and mock data — proving the certified Production platform tier composes into an actual feature, not just a diagram.",
};

function ApplicationCard({ entry: item, blurb }: { entry: NavEntry; blurb: string }) {
  return (
    <Link href={item.href} className="focus-ring block rounded-lg">
      <Card interactive className="flex h-full flex-col gap-3">
        <div className="flex items-center justify-between gap-2">
          <span className="text-body-md font-medium text-ink-primary">{item.title}</span>
          <ArrowRight className="size-4 shrink-0 text-ink-tertiary" aria-hidden />
        </div>
        <Body size="sm" muted className="flex-1">
          {blurb}
        </Body>
      </Card>
    </Link>
  );
}

export default function ApplicationsPage() {
  return (
    <DocsShell entry={entry} toc={<DocsTableOfContents />}>
      <DocsPageHeader entry={entry}>
        <DocsLandingSummary entries={allChildren} />
      </DocsPageHeader>

      <DocsSectionLanding
        purpose="Applications is the eight domain-specific platform libraries — Production, Product, Publishing, Commerce, Intelligence, Operations, Administration, and Integrations — plus the one real Business Feature pilot, presented as application compositions rather than simply another documentation page. Every platform here scopes the certified Foundation, Operational, and Workflow tiers into screens a real StudioPOD user would recognize, almost entirely by re-exporting already-certified components; the Business Feature pilot goes one step further, wiring one of those platforms into an actual running screen with local state and mock data."
        whatYoullLearn={[
          "The eight domain platforms and what each one actually does for a StudioPOD user — not a component count, but the job it performs: running production, managing a product, publishing, transacting commerce, surfacing intelligence, operating the system, administering it, or integrating it with the outside world.",
          "The one real Business Feature pilot, Production Workspace, and how it composes the certified Production platform tier into an actual running screen rather than staying diagram-only.",
          "Why this section is distinct from Components and Patterns: these are domain compositions carrying real StudioPOD business vocabulary — Order, Artwork, Provider Connection — not generic, reusable building blocks.",
          "Where to go next for the architecture behind these compositions (Platform Architecture, Application Composition) or their certification record (Platform Certification and friends).",
        ]}
        stats={STATS}
        primaryEntryPoints={primaryEntryPoints}
        relatedGroups={relatedGroups}
      />

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-6">
          <SectionHeader
            id="platforms"
            eyebrow={<Eyebrow tone="accent">{platformsGroup.title}</Eyebrow>}
            title="Eight domain platforms"
            description={platformsGroup.description}
            descriptionMaxWidth={false}
          />
          <CardGrid columns={3} gap="md">
            {platformEntries.map((item) => (
              <ApplicationCard key={item.id} entry={item} blurb={PLATFORM_BLURBS[item.id] ?? item.description} />
            ))}
          </CardGrid>
        </div>
      </SectionShell>

      <SectionShell spacing="lg">
        <div className="flex flex-col gap-6">
          <SectionHeader
            id="business-features"
            eyebrow={<Eyebrow tone="accent">{businessFeaturesGroup.title}</Eyebrow>}
            title="The real pilot"
            description={businessFeaturesGroup.description}
            descriptionMaxWidth={false}
          />
          <CardGrid columns={businessFeatureEntries.length === 1 ? 2 : 3} gap="md">
            {businessFeatureEntries.map((item) => (
              <ApplicationCard key={item.id} entry={item} blurb={BUSINESS_FEATURE_BLURBS[item.id] ?? item.description} />
            ))}
          </CardGrid>
          <Card className="flex flex-col gap-2 border-accent-500/30 bg-accent-soft/40 sm:flex-row sm:items-start">
            <Badge tone="accent" size="sm">
              Why only one
            </Badge>
            <Body size="sm" muted>
              Business Features is deliberately thin today — Production Workspace is the only pilot that exists, proving
              the composition pattern works before more feature areas adopt it. See{" "}
              <Link
                href={getEntry("application-composition-doc")!.href}
                className="focus-ring inline-flex items-center gap-1 font-medium text-accent-400 hover:text-accent-300"
              >
                Application Composition
                <ArrowUpRight className="size-3.5" aria-hidden />
              </Link>{" "}
              for the framework the next pilot will follow.
            </Body>
          </Card>
        </div>
      </SectionShell>
    </DocsShell>
  );
}
