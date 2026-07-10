export interface ImplementationGuidanceTopic {
  label: string;
  text: string;
}

export const IMPLEMENTATION_GUIDANCE: ImplementationGuidanceTopic[] = [
  {
    label: "Inspector hierarchy",
    text: "InspectorPanel → InspectorSection → InspectorGroup → InspectorProperty is the full nesting depth this family supports — a Property never contains another Section. If content needs a second level of grouping beyond Group, it belongs in its own Section instead of a deeper Group.",
  },
  {
    label: "Property grouping",
    text: "Group properties by what they mean to the object (all Configuration together, all Metadata together), not by data type — a text field and a switch that both configure the same behavior belong in the same InspectorGroup.",
  },
  {
    label: "Progressive disclosure",
    text: "Common fields go in the section's default-open InspectorGroup; advanced/rarely-touched fields go in a second InspectorGroup inside a InspectorSection with defaultOpen={false} — don't hide common fields behind a collapse just to shorten the panel.",
  },
  {
    label: "Validation placement",
    text: "Panel-wide validation (this object has 2 errors) goes in its own InspectorSection near the top, via InspectorValidation. A single field's own validation state (this value is required) stays inline at that InspectorProperty via the Forms field's own error prop — waiting for the panel-wide summary is too late, matching the Inspector Workspace's own Properties region guidance.",
  },
  {
    label: "Action placement",
    text: "Object-level actions (Duplicate, Archive, Publish) belong in InspectorFooter via InspectorActions, pinned to the bottom. Never duplicate a workspace-wide bulk action here — Inspector Actions are always scoped to the one selected object, matching the same rule already documented for the Inspector Workspace's own Inspector Actions region.",
  },
];
