/**
 * @jheavner95/design/internal — NOT PUBLIC API.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * This entry point carries no compatibility promise of any kind. Anything
 * exported here may change, move, or disappear in any release, including a
 * patch. It is not documented in API.md's frozen-entry contract, it is not
 * covered by the versioning policy, and no application may import it.
 * Cloud, Web, and every future consumer use the four public entries.
 * ─────────────────────────────────────────────────────────────────────────
 *
 * Why it exists (DH-2)
 *
 * The documentation application is a consumer of this package like any
 * other, and it documents more than the public API: it demonstrates the
 * motion engine, hosts the illustration-authoring debug overlay, and
 * renders control-sizing constants in its own layout chrome. Those symbols
 * are deliberately not public — RM-5.5 removed roughly thirty motion-engine
 * exports and four illustration dev-tooling exports from the root entry
 * precisely because they are not consumer-facing. That decision was
 * correct and DH-2 does not reverse it.
 *
 * But the modules cannot move to the documentation application either: the
 * library's own components depend on them. Overlay, feedback, illustration,
 * workflow, platform, production and capability components all import
 * motion primitives (Expand, Progress, Activate, Pulse, transition), and
 * the capability diagram components reach the illustration dev context
 * through the illustrations barrel.
 *
 * So there are exactly three options: widen the public API (reversing a
 * deliberate decision, and permanently, for one consumer's benefit), let
 * the documentation site keep reaching into library source (the defect
 * DH-2 exists to remove), or give it a declared, clearly-labelled internal
 * door through the package boundary. This is the third.
 *
 * The distinction that makes it worth having: imports here are resolved
 * and type-checked through the package's built output, exactly as a
 * consumer's are. The documentation site cannot see library source, cannot
 * compile it, and cannot pull anything into its build that the package did
 * not choose to emit. What it gets is a smaller, explicit, reviewable list
 * instead of unrestricted reach.
 *
 * This contradicts ADR 0005 § 3 ("if it is reachable from an entry point,
 * it is public, whatever it is named"), written before the split had been
 * attempted. See docs/decisions/0011-internal-entry-point.md for the
 * amendment and the alternatives that lost.
 *
 * Adding to this file requires the same review as a public export, and the
 * standing expectation is that it shrinks. Every symbol here is either a
 * future public export or a sign that a documentation page is reaching for
 * something it should not need.
 */

// The motion engine. Public motion surface (MotionProvider, useMotion,
// useMotionControls, the motion components) is on the root entry; this is
// the engine underneath it — primitives, easing/duration resolution, the
// debug overlay, and the control dock shell.
export * from "@/motion";

// The illustration-authoring debug overlay: node bounds, anchor points,
// connector routing, grid, animation-path visualisation. Scoped to the
// documentation playground in its own source comments.
export {
  IllustrationDevProvider,
  useIllustrationDev,
  useIllustrationDevControls,
  type IllustrationDevState,
} from "@/illustrations/dev";

// Control-sizing class constants, shared between the library's own form and
// navigation controls and the documentation site's chrome.
export * from "@/lib/control-size";
