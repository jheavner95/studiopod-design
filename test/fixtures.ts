/**
 * Test fixtures re-export the same canonical demo data every page and
 * example file already uses (`@/lib/canonical.ts`) rather than inventing
 * parallel "test-only" data. A test asserting on "Creative Brief" is
 * asserting on the same string a screenshot or a manual QA pass would see —
 * one vocabulary, not two.
 */
export {
  CANONICAL_PRODUCTS,
  CANONICAL_JOBS,
  CANONICAL_PEOPLE,
  CANONICAL_PRODUCTION_FLOW,
  CANONICAL_PRODUCTION_FLOW_ICONS,
  CANONICAL_VOCABULARY,
} from "@/lib/canonical";
