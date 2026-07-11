export interface IntelligencePromotionCandidate {
  id: string;
  pattern: string;
  files: string[];
  description: string;
  migrationNote: string;
}

/**
 * A dedicated audit searched the entire repo for real implementations
 * across the six subdomains this package's own work order names —
 * Intelligence platform, Recommendations, Opportunities, Health,
 * Diagnostics, Insights — plus Decision support, before a single
 * Intelligence platform component was written. No speculative findings:
 * every entry below traces to a specific file this audit actually read.
 */
export const INTELLIGENCE_PROMOTION_CANDIDATES: IntelligencePromotionCandidate[] = [];

export const INTELLIGENCE_CLEAN_FINDINGS: string[] = [
  "Intelligence platform (whole-platform level): diagram-layer only. No src/intelligence/ directory exists. Platform Component Architecture's own adoption audit already confirmed this with an explicit verdict of \"diagram-layer-only\", quoting src/platforms/examples/intelligencePlatform.tsx (a static PlatformArchitecture fixture demoing an Observe→Analyze→Recommend→Automate flow) as the only Intelligence-adjacent code — no dedicated intelligence module, analytics engine, or ML pipeline exists anywhere.",
  "Recommendations: re-confirmed clean. Operational's own RecommendationWidget and HealthRecommendation take caller-supplied data with zero scoring, ranking, or generation logic — their own callers in the repo are static gallery demo fixtures, not generated recommendations.",
  "Opportunities: prose/planning-metadata only. The only real hits for \"opportunity\" are an audit-tracking taxonomy value (\"New opportunity\") and reuseOpportunities description strings on workspace-template cards — neither is business logic. No opportunity-scoring or business-opportunity code exists anywhere.",
  "Health: re-confirmed clean, extending Status & Health System's own prior audit. HealthScore's only logic is a three-branch tone threshold on a caller-supplied score number; HealthWidget composes HealthScore/StatGroup/HealthIssueList over caller-supplied props. No real health-monitoring, uptime-check, heartbeat, or alerting logic exists anywhere in the repo.",
  "Diagnostics: one naming false-positive, no root-cause engine. The only real, working \"diagnostics\" code in the repo is the Motion Playground's own developer-facing debug overlay (bounds/origins/timing/frame toggles) — an unrelated concept already correctly classified by two prior packages' own audits as \"not an operational grid\"/not a business diagnostics engine. No root-cause-analysis logic exists anywhere.",
  "Insights: prose only, and the prose itself disclaims building it. Platform Component Architecture's own template for the Intelligence platform states its own extension boundary explicitly: \"the actual analytics computation, ML inference, and data pipeline stay in Business Features... Platform only owns how an insight is displayed and navigated, not how it's computed.\" No real analytics/insight-generation logic exists anywhere.",
  "Decision support: confirmed genuinely nonexistent, repo-wide. A repo-wide search for scoring/ranking/inference function definitions returns zero real algorithmic hits — the only \"ranking\" mentions are unbuilt future-extension notes elsewhere in this design system. src/capabilities/examples/aiCapabilityLayer.tsx (the Intelligence-adjacent analog to Publishing/Commerce's own capability fixtures) is a static CapabilityRegistry object modeling AI art-generation providers with fabricated latency/version strings — no fetch, no inference call, no real logic. A repo-wide fetch/axios/XMLHttpRequest search re-confirms zero real-code matches anywhere in src/.",
];
