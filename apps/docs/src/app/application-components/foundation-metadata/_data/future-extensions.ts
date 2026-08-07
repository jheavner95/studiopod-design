export interface MetadataFutureExtension {
  title: string;
  description: string;
}

export const METADATA_FUTURE_EXTENSIONS: MetadataFutureExtension[] = [
  { title: "Rich metadata", description: "Formatted/structured values (markdown, code snippets) inside a MetadataValue, beyond plain text." },
  { title: "Expandable sections", description: "A PropertySection that collapses by default for a long property list — not included because it needs local expand/collapse state this primitive layer doesn't own." },
  { title: "Inline previews", description: "A thumbnail or hover preview attached to a RelationshipList item, without navigating away." },
  { title: "Version comparison", description: "Two metadata snapshots shown side by side, with changed fields highlighted." },
  { title: "Semantic metadata", description: "Machine-readable structured data (schema.org-style) emitted alongside the visual presentation, for future search/indexing use." },
  { title: "AI-generated summaries", description: "A generated one-line summary of a PropertySection's contents — reserved, not implemented." },
  { title: "Localization", description: "Locale-aware formatting for MetadataValue's dates and numbers, extending Foundation Layout's own internationalization extension into this system." },
  { title: "Custom metadata renderers", description: "A registry letting a specific object type supply its own MetadataValue rendering for a field, without a bespoke component per type." },
];
