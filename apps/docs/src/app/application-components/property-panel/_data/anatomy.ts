export interface PropertyAnatomyRegion {
  name: string;
  description: string;
  component: string;
}

/** The nine regions a property panel is built from — every Property* component below maps to exactly one. */
export const PROPERTY_ANATOMY: PropertyAnatomyRegion[] = [
  { name: "Header", description: "Confirming what's selected, before editing anything about it.", component: "Inspector Panel's own InspectorHeader — reused directly, not re-wrapped" },
  { name: "Sections", description: "Top-level, titled regions of the panel — collapsible by default.", component: "PropertySection (Inspector Panel's InspectorSection underneath)" },
  { name: "Groups", description: "Finer clustering within a section — related fields grouped together.", component: "PropertyGroup (Foundation Metadata's PropertyGroup underneath)" },
  { name: "Rows", description: "A single property, read or editable.", component: "PropertyRow" },
  { name: "Label", description: "The name of the property.", component: "PropertyLabel (Foundation Metadata's MetadataLabel underneath)" },
  { name: "Value", description: "The property's current value, read-only.", component: "PropertyValue (Foundation Metadata's MetadataValue underneath)" },
  { name: "Editor", description: "The control for changing the property's value — text, number, choice, boolean, or color.", component: "PropertyEditor (dispatches to PropertyToggle/PropertySelect/PropertyNumber/PropertyColor, or Foundation Forms' InputField directly for text)" },
  { name: "Actions", description: "What can be done to this specific object's properties, and only this object.", component: "PropertyActions (Inspector Panel's InspectorActions underneath)" },
  { name: "Footer", description: "Pinning Actions to the bottom of the panel regardless of scroll.", component: "Inspector Panel's own InspectorFooter — reused directly, not re-wrapped" },
];
