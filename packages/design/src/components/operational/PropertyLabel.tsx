/**
 * Re-export, not a rebuild. Foundation Metadata's MetadataLabel already
 * covers this — consistent label styling wherever one appears. Exported
 * standalone (not just used internally by PropertyRow) for the same reason
 * Foundation Metadata splits MetadataField into MetadataLabel/MetadataValue:
 * some rows need a custom arrangement (a label with a tooltip icon, for
 * instance) that PropertyRow's own default layout doesn't cover.
 */
export { MetadataLabel as PropertyLabel } from "@/components/metadata";
