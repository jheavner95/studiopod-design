export interface MetadataAccessibilityTopic {
  label: string;
  text: string;
}

export const METADATA_ACCESSIBILITY_TOPICS: MetadataAccessibilityTopic[] = [
  { label: "Reading order", text: "Identity, then Properties, then Relationships, then Status/Health, then Statistics, then Tags — the DOM order always matches the documented anatomy order, never reordered visually with CSS." },
  { label: "Description lists", text: "Any three-or-more-row list uses DescriptionList's native dl/dt/dd, not a stack of divs — see Foundation Layout's own Accessibility section for the full rationale." },
  { label: "Label associations", text: "MetadataLabel and MetadataValue are always rendered as a pair — a value never appears without its label adjacent in the DOM." },
  { label: "Long values", text: "MetadataValue wraps (min-w-0 break-words) rather than truncating by default — the same CSS Grid blowout fix diagnosed earlier in this design system, applied here at the atom level." },
  { label: "Wrapping", text: "IdentityBlock's name and type are the one deliberate exception — they truncate instead of wrap, to keep Identity a single scannable line even with a long name." },
  { label: "Screen readers", text: "HealthSummary and StatusSummary state their meaning in words in every case — a color dot or Badge tone is reinforcement, never the only signal." },
  { label: "Keyboard navigation", text: "The only interactive element anywhere in the metadata system is RelationshipList's own Link — everything else is static content with no tab stops to manage." },
  { label: "Color independence", text: "HealthSummary's state dot always pairs with a text detail; StatusSummary's Badge always carries its label as text — removing color entirely still leaves the information intact." },
];
