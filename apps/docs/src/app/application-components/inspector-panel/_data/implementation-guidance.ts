export interface ImplementationGuidanceTopic {
  label: string;
  text: string;
}

export const IMPLEMENTATION_GUIDANCE: ImplementationGuidanceTopic[] = [
  {
    label: "Header status vs metadata",
    text: "InspectorHeader.status is for STATE dimensions — lifecycle, health, sync — each a labelled badge, one object or an array for independent dimensions. InspectorHeader.metadata is for DESCRIPTIVE information that is not state: version, counts, ownership, timestamps. Metadata renders on its own subordinate line that WRAPS rather than truncates, so it never disappears on a narrow panel and never pushes status badges out. Do not encode metadata into type (it truncates) or into status (it is not a state). Metadata formatting is caller-owned — pass a string or your own inline runs with aria-hidden separators.",
  },
  {
    label: "Header status dimensions",
    text: "Pass ONE status object when the header communicates a single dimension. Pass an ARRAY when it communicates independent dimensions a reader needs at a glance — lifecycle AND health, for instance. Badges render in the order given and that order is yours: InspectorHeader never merges labels, infers priority, deduplicates or drops entries, and an empty array renders no status region at all. Arbitrary JSX is deliberately unsupported — describe what the status IS, and let the design system decide how a status badge looks.",
  },
  {
    label: "Empty-state ownership",
    text: "Drive the empty state from isEmpty, set from your own selection state — not from whether emptyState happens to be present. Pass a full EmptyState element when the panel needs its own wording (\"No asset selected\", \"Select a layer to inspect\"); omit emptyState entirely for the default. Passing a bare string still works and still renders as the description under \"Nothing selected\", but new code should prefer an element so the title says something specific.",
  },
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
