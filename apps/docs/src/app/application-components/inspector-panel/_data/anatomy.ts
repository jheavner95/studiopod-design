export interface InspectorAnatomyRegion {
  name: string;
  description: string;
  component: string;
}

/** The ten regions an inspector is built from — every Inspector* component below maps to exactly one. */
export const INSPECTOR_ANATOMY: InspectorAnatomyRegion[] = [
  { name: "Header", description: "Confirming what's selected, before inspecting anything about it — icon, name, type, quick status.", component: "InspectorHeader (Foundation Metadata's IdentityBlock underneath)" },
  { name: "Tabs", description: "Switching between panel views without leaving the Inspector.", component: "InspectorTabs (Foundation Navigation's Tabs underneath)" },
  { name: "Sections", description: "Top-level, titled regions of the panel — Identity, Properties, Relationships, and so on — collapsible by default.", component: "InspectorSection" },
  { name: "Groups", description: "Finer clustering within a section — related fields grouped together rather than one long list.", component: "InspectorGroup (Foundation Metadata's PropertyGroup underneath)" },
  { name: "Properties", description: "A single field, read or editable.", component: "InspectorProperty (Foundation Metadata's MetadataField, or a Foundation Forms field passed as children)" },
  { name: "Validation", description: "Whether the selected object is actually correct, not just complete.", component: "InspectorValidation (Foundation Feedback's ValidationSummary underneath)" },
  { name: "Status", description: "Read-only operational awareness for the selected object.", component: "InspectorStatus (Foundation Feedback's StatusIndicator underneath)" },
  { name: "History", description: "What's happened to this object over time, newest first.", component: "InspectorHistory" },
  { name: "Actions", description: "What can be done to this specific object, and only this object.", component: "InspectorActions" },
  { name: "Footer", description: "Pinning Actions to the bottom of the panel regardless of scroll.", component: "InspectorFooter" },
];
