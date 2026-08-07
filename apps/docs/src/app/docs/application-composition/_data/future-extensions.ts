export interface FutureExtension {
  title: string;
  description: string;
}

/**
 * The five extension points this package's own work order names — room the
 * current architecture leaves for later, reserved and not scoped or
 * committed, the same disclosure pattern every prior capstone's own Future
 * Extensions section used.
 */
export const APPLICATION_FUTURE_EXTENSIONS: FutureExtension[] = [
  {
    title: "Plugin features",
    description: "Business Features contributed by a mechanism other than this codebase's own source tree — a formal plugin API is not designed here, but the same Platform-composition discipline (compose, don't recreate) would need to extend to whatever runs a plugin's own code.",
  },
  {
    title: "Marketplace modules",
    description: "Third-party or optional first-party Business Features distributed and installed independently of the core application — would need their own versioning and compatibility story against whichever Platform-tier components they compose.",
  },
  {
    title: "Enterprise modules",
    description: "Business Features gated to specific StudioPOD deployments or tiers — the same Certified/Enterprise Certified ladder every design-system tier already uses could plausibly extend to gate feature availability, not just component maturity.",
  },
  {
    title: "Custom workspaces",
    description: "User- or organization-configurable arrangements of existing Business Features, rather than a fixed one-feature-per-route model — would compose multiple features' own Views into a single custom Workspace Feature shell.",
  },
  {
    title: "Customer extensions",
    description: "Business logic a specific StudioPOD customer adds on top of a standard feature without forking it — the Application Boundaries model (Business Feature owns domain logic) is the natural seam this would need to extend through, not around.",
  },
];
