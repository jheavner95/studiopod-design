export interface PropertyFutureExtension {
  title: string;
  description: string;
}

export const PROPERTY_FUTURE_EXTENSIONS: PropertyFutureExtension[] = [
  { title: "Property search", description: "Filtering rows across every section by name — no current gallery variant has enough properties at once to need it." },
  { title: "Favorites", description: "Pinning specific properties to the top of the panel regardless of which section they live in — depends on a real screen with enough properties that scanning becomes the bottleneck." },
  { title: "Bulk edit", description: "Applying one value across multiple selected objects at once — a genuinely different interaction model from this family's single-object PropertyRow, closer to Data Grid's own bulk-action concept than anything Property Panel does today." },
  { title: "Linked properties", description: "One property's value deriving from or constraining another (e.g. a max that must exceed a min). Not currently supported — each PropertyEditor only validates its own independent error prop, with no cross-field validation." },
  { title: "Expression editor", description: "A property whose value is a formula rather than a literal — a distinct editor type from the five PropertyEditorField variants this package ships (text/number/select/switch/color)." },
  { title: "AI-assisted editing", description: "A suggested value or explanation surfaced near a property. Not currently supported — this capability belongs to an AI Operations Center, which doesn't exist yet." },
];
