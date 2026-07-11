export interface FutureExtension {
  title: string;
  description: string;
}

/**
 * The five extension points this package's own work order names. Four
 * overlap DS-5.1's own Future Extensions in substance under a renamed
 * title (Plugin features → Feature plugins, Marketplace modules →
 * Marketplace extensions, Customer extensions → Customer customization);
 * DS-5.1's own "Custom workspaces" is dropped and a new item, Feature SDK,
 * takes its place — the one extension point specific to this package's own
 * framework rather than to the composition model DS-5.1 defined.
 */
export const FUTURE_EXTENSIONS: FutureExtension[] = [
  {
    title: "Feature plugins",
    description: "A Business Feature contributed by a mechanism other than this codebase's own source tree. Application Composition Architecture named this \"Plugin features\" first; the same Platform-composition discipline (compose, don't recreate) would need to extend to whatever runs a plugin's own code, and a plugin would still be expected to follow Feature Structure and Feature Template unchanged.",
  },
  {
    title: "Enterprise modules",
    description: "Business Features gated to specific StudioPOD deployments or tiers. The same Certified/Enterprise Certified ladder every design-system tier already uses could plausibly extend to gate feature availability, not just component maturity — unchanged from Application Composition Architecture's own naming.",
  },
  {
    title: "Marketplace extensions",
    description: "Third-party or optional first-party Business Features distributed and installed independently of the core application. Application Composition Architecture named this \"Marketplace modules\"; would need their own versioning and compatibility story against whichever Platform-tier components they compose.",
  },
  {
    title: "Customer customization",
    description: "Business logic a specific StudioPOD customer adds on top of a standard feature without forking it. Application Composition Architecture named this \"Customer extensions\"; the Application Boundaries model (Business Feature owns domain logic) is the natural seam this would need to extend through, not around.",
  },
  {
    title: "Feature SDK",
    description: "New on this page. A formalized set of Feature Structure, Feature Template, and Composition Rules as installable scaffolding — generate a new feature's own Workspace/Views/Panels/Services skeleton pre-wired to the right Platform composition for its chosen Feature Category, rather than a developer assembling one by hand against this documentation each time.",
  },
];
