import { PLATFORM_TEMPLATES, templateReadiness } from "../../_data/templates";
import { COVERAGE_ROWS, PLATFORMS as COVERAGE_PLATFORMS, type CoverageState, type Platform as CoveragePlatform } from "../../_data/coverage";
import { CERTIFICATION_LEVELS, type CertificationLevelId } from "./certification-levels";

/**
 * The nine platforms StudioPOD's workspace architecture applies to.
 * "Product" is new here — it has no template or coverage tracking
 * anywhere else in the design system yet, which this matrix surfaces
 * honestly rather than papering over.
 */
export const CERTIFICATION_PLATFORMS = [
  "Production",
  "Product",
  "Publishing",
  "Commerce",
  "Assets",
  "Integrations",
  "Admin",
  "Intelligence",
  "Operations",
] as const;

export type CertificationPlatform = (typeof CERTIFICATION_PLATFORMS)[number];

const TEMPLATE_ID_BY_PLATFORM: Partial<Record<CertificationPlatform, string>> = {
  Production: "production",
  Publishing: "publishing",
  Commerce: "commerce",
  Assets: "assets",
  Integrations: "integrations",
  Intelligence: "intelligence",
  Operations: "operations",
};

const CELL_WEIGHT: Record<CoverageState, number> = { Used: 1, Partial: 0.5, Planned: 0 };

function isCoveragePlatform(platform: CertificationPlatform): platform is CertificationPlatform & CoveragePlatform {
  return (COVERAGE_PLATFORMS as readonly string[]).includes(platform);
}

/** Weighted average across every tracked component's cell for this platform — null where the platform isn't tracked in the coverage matrix at all. */
function componentCoveragePercent(platform: CertificationPlatform): number | null {
  if (!isCoveragePlatform(platform)) return null;
  const total = COVERAGE_ROWS.reduce((sum, row) => sum + CELL_WEIGHT[row.cells[platform]], 0);
  return Math.round((total / COVERAGE_ROWS.length) * 100);
}

/** templateReadiness() reused directly from DS-0.3 — null where no platform template exists yet. */
function operationalReadinessPercent(platform: CertificationPlatform): number | null {
  const templateId = TEMPLATE_ID_BY_PLATFORM[platform];
  if (!templateId) return null;
  const template = PLATFORM_TEMPLATES.find((t) => t.id === templateId);
  return template ? templateReadiness(template) : null;
}

export interface PlatformCertificationRow {
  platform: CertificationPlatform;
  architectureDefined: boolean;
  workspaceCertified: boolean;
  componentCoverage: number | null;
  operationalReadiness: number | null;
  currentPhase: CertificationLevelId;
}

/**
 * No platform has gone through a formal Scorecard review yet — this page
 * is what defines that review. So `workspaceCertified` is honestly false
 * for all nine today, and `currentPhase` never exceeds "Production Ready"
 * until a real review happens.
 */
function derivePhase(architectureDefined: boolean, operationalReadiness: number | null): CertificationLevelId {
  if (!architectureDefined) return "draft";
  if (operationalReadiness === null || operationalReadiness < 50) return "prototype";
  return "production-ready";
}

export const PLATFORM_CERTIFICATION_ROWS: PlatformCertificationRow[] = CERTIFICATION_PLATFORMS.map((platform) => {
  const architectureDefined = platform in TEMPLATE_ID_BY_PLATFORM;
  const operationalReadiness = operationalReadinessPercent(platform);
  return {
    platform,
    architectureDefined,
    workspaceCertified: false,
    componentCoverage: componentCoveragePercent(platform),
    operationalReadiness,
    currentPhase: derivePhase(architectureDefined, operationalReadiness),
  };
});

export function phaseLabel(id: CertificationLevelId): string {
  return CERTIFICATION_LEVELS.find((level) => level.id === id)?.name ?? id;
}
