export interface HierarchyTier {
  id: string;
  name: string;
  description: string;
  components: string[];
}

/** Four tiers, in visual-weight order — the rule that keeps a metadata block from turning into visual noise once every region is populated at once. */
export const INFORMATION_HIERARCHY: HierarchyTier[] = [
  {
    id: "primary",
    name: "Primary information",
    description: "What the object is — Identity. Always the heaviest visual weight, always first.",
    components: ["IdentityBlock"],
  },
  {
    id: "secondary",
    name: "Secondary information",
    description: "What's true about the object — Properties and Relationships. Medium weight, grouped and titled.",
    components: ["PropertyGroup", "PropertySection", "RelationshipList"],
  },
  {
    id: "operational",
    name: "Operational information",
    description: "What's happening to or around the object right now — Status and Health. Deliberately passive, never louder than Identity.",
    components: ["StatusSummary", "HealthSummary"],
  },
  {
    id: "supporting",
    name: "Supporting metadata",
    description: "Everything else — Statistics and Tags. Lowest visual weight, rendered last.",
    components: ["StatGroup", "TagCollection"],
  },
];
