/**
 * Test fixtures re-export the same canonical demo data every page and
 * example file already uses (`@/lib/canonical.ts`) rather than inventing
 * parallel "test-only" data. A test asserting on "Creative Brief" is
 * asserting on the same string a screenshot or a manual QA pass would see —
 * one vocabulary, not two.
 *
 * DH-2 note: this lives in the documentation application because
 * `@/lib/canonical` does — it is the doc site's example vocabulary, not
 * library data. It currently has no importers and has had none since DS-1C;
 * see docs/certification/DH-2.md § Unexpected discoveries. Kept rather than
 * deleted because removing it is a judgement outside DH-2's scope.
 */
export {
  CANONICAL_PRODUCTS,
  CANONICAL_JOBS,
  CANONICAL_PEOPLE,
  CANONICAL_PRODUCTION_FLOW,
  CANONICAL_PRODUCTION_FLOW_ICONS,
  CANONICAL_VOCABULARY,
} from "@/lib/canonical";
