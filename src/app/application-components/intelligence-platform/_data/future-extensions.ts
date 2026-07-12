export interface IntelligenceFutureExtension {
  title: string;
  description: string;
}

export const INTELLIGENCE_FUTURE_EXTENSIONS: IntelligenceFutureExtension[] = [
  { title: "Realtime intelligence", description: "Live-updating recommendations and health scores as underlying data changes require a real data-streaming integration, which these components do not implement themselves." },
  { title: "Predictive analysis", description: "Forecasting future health/risk from historical trends is not yet implemented. No real analytics or ML-inference logic exists anywhere in the repo yet." },
  { title: "Trend forecasting", description: "Projecting a metric's own future trajectory from IntelligenceInsights' own historical data depends on real Predictive analysis existing first." },
  { title: "AI explanations", description: "Natural-language explanations of why a recommendation or diagnosis was generated — a genuinely different capability layer (external AI service calls) from this package's own single-user, prop-driven components. Not yet implemented." },
  { title: "Root-cause analysis", description: "Automatically tracing an IntelligenceDiagnostics issue back to its originating cause across platforms belongs to Business Feature logic per this platform's own explicit scope boundary, not this component library." },
  { title: "Cross-platform optimization", description: "Recommendations that span Production, Publishing, and Commerce simultaneously rather than one platform at a time require real Business Feature implementations for at least two of those platforms to optimize across." },
];
