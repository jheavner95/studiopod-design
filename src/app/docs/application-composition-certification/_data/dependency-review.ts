export interface DependencyFinding {
  label: string;
  text: string;
}

export const DEPENDENCY_FINDINGS: DependencyFinding[] = [
  {
    label: "Foundation → Operational → Workflow → Platform → Business Feature → Application",
    text: "Confirmed intact by listing every unique import source across all thirteen pilot files: @/components/{platform/production, workflow, operational, overlay, ui, form, feedback, navigation, layout, metadata, docs}, plus the pilot's own local files, plus React/lucide-react/@/lib/utils. Nothing outside that set.",
  },
  {
    label: "No reverse imports",
    text: "A repo-wide grep of src/components/ for the strings \"business-features\" and \"production-workspace\" returns zero matches — no certified-tier component imports from, or is even aware of, this Business Feature.",
  },
  {
    label: "No cross-feature imports",
    text: "DS-5 has exactly one Business Feature (the pilot), so cross-feature imports are structurally impossible today. The Composition Rules this same pilot follows (DS-5.2's own Forbidden Rules, \"Cross-feature dependencies\") remain untested by real evidence until a second feature exists — disclosed here rather than asserted as proven.",
  },
  {
    label: "No architecture violations",
    text: "Zero components import a lower-tier primitive when a higher-tier equivalent already exists (e.g. the pilot uses ProductionInspector, not a hand-rolled panel; PropertyToggle, not a raw checkbox) — confirmed by cross-referencing every pilot import against DS-5.1's own Composition Rules.",
  },
];
