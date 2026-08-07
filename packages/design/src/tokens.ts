/**
 * @studiopod/design/tokens — canonical token metadata.
 *
 * JS-side motion/z-index token constants. No application-specific theme
 * configuration — those are the raw values, framework-agnostic. See
 * "@studiopod/design/styles.css" for the CSS custom properties
 * these mirror.
 */
// This star export is deliberate, and is the one place DH-5 kept aggregation.
//
// @/lib/tokens is GENERATED from @studiopod/foundation by the token bridge and
// is never hand-edited. Naming its exports here would mean a Foundation token
// could be generated into the package and still not reach consumers until
// somebody remembered to add a line — a second, manual, silently-drifting
// source of truth for a surface whose whole point is that it is derived.
//
// The token bridge check is what governs this entry's contents; the API
// baseline still records every name, so an addition is visible in review.
export * from "@/lib/tokens";
