/**
 * DS-5B — the canonical owner of this design system's one shared,
 * general-purpose semantic tone. `src/lib` is the dependency graph's floor
 * (zero internal dependencies, per the certification-history engineering
 * note), so everything else is free to import this without risk of a
 * cycle — the same pattern `src/lib/spacing.ts` established in DS-5A.
 *
 * Audited during DS-4/DS-5B: eight files independently declared the exact
 * same unexported `type StatusTone = "neutral" | "accent" | "success" |
 * "warning" | "error"` (TableStatusCell, DependencyInspector,
 * WorkflowInspector, StateInspector, ApprovalRequest, InspectorHeader,
 * IdentityBlock, StatusSummary) purely because `Badge` — the component
 * every one of them ultimately passes a tone into — exported no type name
 * for its own `tone` prop to type against. `FilterChip` independently
 * reimplemented Badge's exact five class strings for the same reason: no
 * shared constant existed to import. Both root causes are fixed here, not
 * patched at each call site — see
 * docs/engineering-notes/15-tone-consolidation.md for the full audit,
 * including which similarly-shaped vocabularies (`FeedbackTone`,
 * `SystemStatus`, the ~15 workflow-tier lifecycle unions) were
 * deliberately NOT merged into this one, and why.
 */

/**
 * The canonical five-value semantic tone — neutral/accent/success/
 * warning/error. `Badge` re-exports this at its own path
 * (`export type { StatusTone } from "@/lib/tone"`) since that's where a
 * consumer typing a value for `<Badge tone={...}>` will look first; this
 * file is the dependency-floor owner everything else should import from
 * directly.
 */
export type StatusTone = "neutral" | "accent" | "success" | "warning" | "error";

/**
 * The pill treatment (background + text) every tone-driven badge-shaped
 * component in this system renders — `Badge` and `FilterChip` both
 * compose this directly rather than each declaring their own copy.
 */
export const STATUS_TONE_PILL_CLASSES: Record<StatusTone, string> = {
  neutral: "bg-neutral-soft text-neutral",
  accent: "bg-accent-soft text-accent-400",
  success: "bg-success-soft text-success",
  warning: "bg-warning-soft text-warning",
  error: "bg-error-soft text-error",
};

/**
 * The solid dot treatment a badge renders for its OPTIONAL leading indicator
 * (DS-5I). Each value is the solid fill matching that tone's pill *text* color
 * — so the dot reads as part of the same label, its tone inherited from the
 * badge rather than passed a second time. This is a static, decorative dot
 * inside the pill; it is deliberately NOT `PulseStatus`'s recipe (the
 * standalone/animated "live" dot, DS-5B Classification 2) — the same five-key
 * tone concept, a different rendered recipe. Every value is a complete,
 * statically written class string so Tailwind's build-time scanner generates it
 * (the dynamic-string hazard engineering note 15 warns about).
 */
export const STATUS_TONE_DOT_CLASSES: Record<StatusTone, string> = {
  neutral: "bg-neutral",
  accent: "bg-accent-400",
  success: "bg-success",
  warning: "bg-warning",
  error: "bg-error",
};
