export interface ImplementationGuidanceTopic {
  label: string;
  text: string;
}

export const IMPLEMENTATION_GUIDANCE: ImplementationGuidanceTopic[] = [
  {
    label: "Grouping",
    text: "Group properties by what they mean to the object (all Appearance together, all Publishing settings together), not by editor type — a color and a switch that both configure the same visual behavior belong in the same PropertyGroup.",
  },
  {
    label: "Progressive disclosure",
    text: "Common properties go in a section's default-open PropertyGroup; advanced/rarely-touched properties go in a PropertySection with defaultOpen={false} — see the Advanced Settings gallery variant below.",
  },
  {
    label: "Defaults",
    text: "PropertyRow's modified prop is the caller's own comparison (typically value !== defaultValue) — this family stores no default-value bookkeeping itself, matching the same \"controlled, caller owns the state\" rule every Foundation Forms field already follows.",
  },
  {
    label: "Reset behavior",
    text: "PropertyReset always sits next to the row it resets, never in a separate panel-wide \"reset all\" location — a per-property decision, not a bulk one. A true reset-all belongs in PropertyActions instead, as its own explicit button.",
  },
  {
    label: "Validation",
    text: "Per-field validation stays inline at that PropertyEditor via its own error prop. A panel-wide validation summary (this object has 2 errors) is Inspector Panel's own InspectorValidation, re-exported from the same operational/ family — Property Panel doesn't duplicate it with a second summary component.",
  },
  {
    label: "Action placement",
    text: "Object-level property actions (Save, Reset all, Duplicate) belong in PropertyActions inside the panel's Footer, pinned to the bottom — never a workspace-wide bulk action, the same rule Inspector Panel already established for InspectorActions.",
  },
];
