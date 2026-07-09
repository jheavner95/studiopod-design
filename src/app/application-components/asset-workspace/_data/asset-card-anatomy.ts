export interface AssetCardAnatomyItem {
  label: string;
  description: string;
}

/** The twelve parts of an Asset Card, documented here and demonstrated live in the interactive card above. */
export const ASSET_CARD_ANATOMY: AssetCardAnatomyItem[] = [
  { label: "Thumbnail", description: "The object's primary visual — an image, a color swatch, or a generic type icon when no image exists. Never blank." },
  { label: "Title", description: "The object's name — the single field every view (Grid, Table, List) always shows, regardless of density." },
  { label: "Subtitle", description: "One line of secondary identity — a SKU, a parent object's name, a category — never a second competing title." },
  { label: "Metadata", description: "Two or three short fields (date, size, owner) — enough to support a decision without opening the object." },
  { label: "Status", description: "The object's own lifecycle state (Draft, Published, Archived) — distinct from Health, which describes whether something's wrong." },
  { label: "Health", description: "A validation or quality signal, when the object type has one — reuses the same concept as the Workspace Header's Status region." },
  { label: "Tags", description: "User- or system-applied labels, shown as compact chips — optional, and the first thing to truncate at Dense density." },
  { label: "Quick Actions", description: "One or two of the object's most common actions, available without opening it — never a substitute for the full Inspector." },
  { label: "Selection", description: "A checkbox or click target, visible on hover and always visible once anything in the workspace is selected." },
  { label: "Hover", description: "A subtle lift and border emphasis — confirms the card is interactive before a user commits to clicking." },
  { label: "Focus", description: "A visible focus ring, keyboard-reachable in the same order the cards read visually — never hover-only feedback." },
  { label: "Expanded State", description: "An optional deeper view of the same card — more Metadata, more Tags — without leaving the Asset Presentation area for the Inspector." },
];
