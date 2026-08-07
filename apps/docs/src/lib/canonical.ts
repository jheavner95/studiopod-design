import { Lightbulb, FolderOpen, Layers, ShieldCheck, Package, Rocket, ShoppingCart, Sparkles, type LucideIcon } from "lucide-react";

/**
 * The single canonical set of StudioPOD production vocabulary, demo data, and
 * recurring personas. Any page that needs an example product, job, person, or
 * process-stage name should import from here instead of inventing a new one —
 * the point is that the same handful of names recur across the documentation
 * until they read as a real, coherent business rather than scattered examples.
 */

export interface CanonicalProduct {
  id: string;
  name: string;
  sku: string;
  kind: "apparel" | "print" | "drinkware" | "collection";
}

/** The recurring set of production examples reused across component, pattern, and application pages. */
export const CANONICAL_PRODUCTS: CanonicalProduct[] = [
  { id: "trailhead-mug-wrap", name: "Trailhead mug wrap", sku: "MUG-TH-014", kind: "drinkware" },
  { id: "studio-tee-black-m", name: "Studio Tee — Black / M", sku: "TEE-ST-014", kind: "apparel" },
  { id: "sunset-ridge-tee", name: "Sunset ridge tee — front print", sku: "TEE-SR-001", kind: "apparel" },
];

export interface CanonicalJob {
  id: string;
  name: string;
  ref: string;
}

/** Recurring named jobs and batches — the same references a real production floor would reuse day to day. */
export const CANONICAL_JOBS: CanonicalJob[] = [
  { id: "poster-proof-118", name: "Poster proof", ref: "#118" },
  { id: "batch-run-204", name: "Batch run", ref: "#204" },
  { id: "holiday-collection", name: "Holiday collection", ref: "" },
  { id: "launch-campaign", name: "Launch campaign", ref: "" },
  { id: "catalog-refresh", name: "Catalog refresh", ref: "" },
];

export interface CanonicalPerson {
  id: string;
  name: string;
  role: string;
}

/** Recurring demo personas — reused wherever an example needs an assignee, reviewer, or requester. */
export const CANONICAL_PEOPLE: CanonicalPerson[] = [
  { id: "priya-n", name: "Priya N.", role: "Production" },
  { id: "marcus-d", name: "Marcus D.", role: "Production" },
];

/**
 * The eight canonical production-flow stages, in order. This is the one
 * official shape of "how work moves through StudioPOD" — every diagram or
 * description of the end-to-end flow should reuse these stage names rather
 * than a competing sequence.
 */
export const CANONICAL_PRODUCTION_FLOW = [
  { id: "creative-brief", title: "Creative Brief", description: "Define the concept, constraints, and target product." },
  { id: "artwork-project", title: "Artwork Project", description: "Set up the working file and asset references." },
  { id: "composition", title: "Composition", description: "Arrange artwork and layout against the product template." },
  { id: "validation", title: "Validation", description: "Clear the quality gates a design has to pass before production." },
  { id: "production-package", title: "Production Package", description: "Bundle the validated artifact for manufacturing." },
  { id: "publishing", title: "Publishing", description: "Create the marketplace listing and syndicate it to sales channels." },
  { id: "commerce", title: "Commerce", description: "Take the order, capture payment, and route it to fulfillment." },
  { id: "performance-intelligence", title: "Performance Intelligence", description: "Learn from sell-through and feed recommendations back into the next brief." },
] as const;

/**
 * One icon per canonical production-flow stage, keyed by stage id — import
 * from here wherever a stage is drawn so "Creative Brief" (etc.) renders as
 * the same icon on the homepage, in workflow examples, and in the production
 * pipeline, instead of each diagram hand-picking its own.
 */
export const CANONICAL_PRODUCTION_FLOW_ICONS: Record<string, LucideIcon> = {
  "creative-brief": Lightbulb,
  "artwork-project": FolderOpen,
  composition: Layers,
  validation: ShieldCheck,
  "production-package": Package,
  publishing: Rocket,
  commerce: ShoppingCart,
  "performance-intelligence": Sparkles,
};

/**
 * The canonical production glossary — one preferred term per concept.
 * Generic synonyms ("item," "record," "asset," "task") should be retired in
 * favor of these wherever the example is production-shaped.
 */
export const CANONICAL_VOCABULARY: { term: string; definition: string }[] = [
  { term: "Creative Brief", definition: "The concept and constraints a production run starts from." },
  { term: "Artwork Project", definition: "The working file a Creative Brief becomes once design starts." },
  { term: "Composition", definition: "Arranging artwork and layout against a product template." },
  { term: "Quality Gate", definition: "A checkpoint an artifact must clear before it can advance." },
  { term: "Production Package", definition: "A validated artifact bundled and ready for manufacturing." },
  { term: "Print Job", definition: "A single unit of manufacturing work moving through a queue." },
  { term: "Batch Run", definition: "A group of print jobs processed together through the same pipeline." },
  { term: "Render Queue", definition: "The ordered list of print jobs waiting on production capacity." },
  { term: "Publishing", definition: "Getting a finished product listed and syndicated to sales channels." },
  { term: "Marketplace Listing", definition: "A published product's presence on a specific sales channel." },
  { term: "Provider Connection", definition: "A configured link to an external production or sales provider." },
  { term: "Commerce", definition: "The order, payment, and fulfillment lifecycle once a listing sells." },
  { term: "Production Artifact", definition: "The finished, shippable output of a production run." },
  { term: "Performance Intelligence", definition: "Insight fed back from sell-through into the next Creative Brief." },
];
