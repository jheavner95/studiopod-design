export interface MetadataGuidanceRule {
  title: string;
  explanation: string;
}

export const METADATA_GUIDANCE: MetadataGuidanceRule[] = [
  {
    title: "Metadata presents",
    explanation: "Every component in this system renders information — none of them accept an onChange or own any editable state.",
  },
  {
    title: "Forms edit",
    explanation: "The moment a value needs to change, that's the Foundation Form System's job (Input, Select, and the rest of the Inputs group in the Foundation Component Catalog), not this one's.",
  },
  {
    title: "Identity first",
    explanation: "An IdentityBlock is the first thing rendered in any metadata layout — a user should never have to guess what they're looking at before anything else loads in.",
  },
  {
    title: "Status before health",
    explanation: "What an object is (Status) matters more than how its dependencies are doing (Health) — Status renders above Health whenever both appear together.",
  },
  {
    title: "Relationships after properties",
    explanation: "An object's own facts (Properties) are established before what it connects to (Relationships) — the same order Inspector Workspace's own anatomy already uses.",
  },
  {
    title: "Statistics grouped",
    explanation: "Numeric metrics belong in a StatGroup, never scattered as individual MetadataRows mixed in with text properties.",
  },
  {
    title: "Tags last",
    explanation: "TagCollection renders after everything else — tags are supporting metadata, the lowest tier in Information Hierarchy.",
  },
  {
    title: "Actions belong elsewhere",
    explanation: "A metadata block's only acceptable action is a Link to go do something — a real action button belongs in a Workspace Toolbar or TableActionCell, not inside metadata itself.",
  },
];
