export interface PhilosophyTopic {
  label: string;
  text: string;
}

/**
 * The four philosophy topics this package's own work order names. DS-5.2
 * (Business Feature Composition Framework) defined one generic thirteen-part
 * Feature Template shared by every Business Feature; this page is the next
 * step down — eight concrete, category-specific blueprints, each a tailored
 * arrangement of that generic template's parts for one Feature Category.
 * DS-5.2's own ninth category, Automation Feature, has no template here —
 * called out explicitly in Purpose rather than silently dropped.
 */
export const PHILOSOPHY_TOPICS: PhilosophyTopic[] = [
  {
    label: "Purpose",
    text: "The Business Feature Composition Framework defined the parts every Business Feature is built from — a ten-part ownership tree (Feature Architecture) and a generic thirteen-part checklist (Feature Template) — plus nine reusable Feature Categories. This page is the templates layer: a concrete standard layout for eight of those nine categories, naming which parts a real feature in that category needs and what each part composes from. Automation Feature, the ninth category, has no template here — its own composition (Operations Platform's OperationsAutomation plus Queue & Jobs) is scheduling/trigger-driven rather than layout-driven, and doesn't fit this page's \"standard layout\" shape; a dedicated treatment is left for later.",
  },
  {
    label: "Reuse goals",
    text: "Every named layout part in every template below composes an already-certified Foundation, Operational, Workflow, or Platform component — none invents new reusable UI. The goal is that a developer building a real Workspace Feature, say, can read this page's own Workspace Feature Template and know exactly which certified components to reach for, in what arrangement, before writing a single line of feature-specific code.",
  },
  {
    label: "Consistency goals",
    text: "Two features in the same category should look and behave alike by default. A Commerce Library Feature and a Publishing Library Feature both compose Filter & Search, a Data Grid or Asset Browser, and Bulk Actions in the same arrangement — the domain-specific difference is which Platform component fills the Data Grid slot, not whether search or bulk actions exist at all.",
  },
  {
    label: "Composition strategy",
    text: "Every template favors a domain's own certified Platform component where Platform Architecture's own Adoption Targets found one, and falls back to composing Workflow, Operational, or Foundation directly where no Platform-tier equivalent exists yet — the same two-path reuse strategy the Business Feature Composition Framework already established, applied here at the level of a named layout part rather than a whole feature.",
  },
];
