/**
 * Re-export, not a rebuild. Foundation Metadata's MetadataValue already
 * covers this — wraps rather than truncates by default, with an explicit
 * "—" fallback for a genuinely empty value. Exported standalone alongside
 * PropertyLabel for the same composability reason.
 */
export { MetadataValue as PropertyValue } from "@/components/metadata";
