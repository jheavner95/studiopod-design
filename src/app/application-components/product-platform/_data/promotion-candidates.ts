export interface ProductPromotionCandidate {
  id: string;
  pattern: string;
  files: string[];
  description: string;
  migrationNote: string;
}

/**
 * A dedicated audit searched the entire repo for real implementations
 * across the seven subdomains this package's own work order names —
 * Product platform, Catalog, Variants, Provider mappings, Validation,
 * Drafts, Library — before a single Product platform component was
 * written. No speculative findings: every entry below traces to a
 * specific file this audit actually read.
 */
export const PRODUCT_PROMOTION_CANDIDATES: ProductPromotionCandidate[] = [];

export const PRODUCT_CLEAN_FINDINGS: string[] = [
  "Product platform (whole-platform level): does not exist. No src/product/ directory exists — no analog to src/production/ (MS-2.5). Platform Component Architecture's own audit (platform-architecture/_data/adoption.ts) already confirmed verdict \"does-not-exist\" for the Product platform, and its own templates.ts documents the Product entry as \"a forward-looking architecture proposal, not a description of existing code.\"",
  "Catalog: diagram/meta-catalog only. Every real hit is this repo's own self-describing catalog of its own components (foundation-components/_data/catalog.ts) or planning prose — not a real product-catalog listing/browsing implementation. Asset Browser's own promotion-candidates audit (DS-2.5.4) already confirmed \"every hit is marketing copy, documentation prose, or an unrelated demo page — nothing product-catalog or style-library shaped.\"",
  "Variants: naming false-positive only. The ~130 repo-wide hits for \"variant\" are dominated by Tailwind/CVA style-variant props (Button's own variant=\"primary\"/\"secondary\"/\"ghost\"/\"destructive\") and Framer Motion Variants objects — neither is a product SKU/size/color concept. The two places \"product variant\" appears as a domain concept (Property Panel and Inspector Panel gallery demos, e.g. \"Studio Tee — Black / M\") are hardcoded label strings on generic demos, not real variant-selection logic.",
  "Provider mappings: diagram-layer or false-positive only. React context providers (MotionProvider and friends) and Operational's own ProviderHealthPanel (a generic DataGrid-backed health table with no marketplace logic) are unrelated domains. The Capability Library's own provider utils (src/capabilities/utils/providers.ts) are real filter/sort functions, but checked directly for fetch/axios/http calls — none found — and operate only over static example fixtures (Printify/Gelato failover, WordPress/Shopify listings), confirmed illustration data by the type's own docstring: values exist to be \"handed to CapabilityRegistryDiagram, never bespoke, provider-specific rendering code.\"",
  "Validation: diagram-layer only, re-confirming Production Platform Components' own finding. Beyond the already-confirmed diagram-only src/production/utils/{gates,status,results}.ts, the only other real hits are generic, product-unaware components — Foundation Feedback's own ValidationSummary and Operational's own InspectorValidation, which its own docstring says delegates \"entirely to Foundation Feedback's own ValidationSummary rather than a second validation-list component.\"",
  "Drafts: does not exist as real logic. Every \"draft\" hit is a status-tone value in demo fixture arrays or a certification-level id — no autosave/save-draft/draft-persistence logic exists anywhere in the repo (zero matches for autosave, saveDraft, or DraftManager identifiers). Autosave is explicitly named only as an unbuilt future idea in Foundation Forms' own future-extensions.",
  "Library: fully covered by the existing generic Asset Browser. The one \"Product Library\" hit (a gallery demo card in Asset Browser's own gallery) is built entirely on the generic, type-parameterized AssetBrowser<T> component with zero product awareness — the same generic surface this package's own ProductLibrary re-exports directly. Asset Browser's own promotion-candidates audit (DS-2.5.4) already confirmed no hand-rolled product-library browsing code exists anywhere in the repo.",
];
