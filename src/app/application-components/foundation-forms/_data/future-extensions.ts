export interface FormFutureExtension {
  title: string;
  description: string;
}

export const FORM_FUTURE_EXTENSIONS: FormFutureExtension[] = [
  { title: "Schema-driven forms", description: "Generating a full Form from a JSON schema, rather than hand-composing FormSection/FormRow/*Field for every property." },
  { title: "AI-assisted editing", description: "Suggested values or auto-fill surfaced inline in a field, deferred to stay consistent with Foundation Metadata's own AI-generated-summaries extension." },
  { title: "Conditional fields", description: "A field's visibility or requiredness driven by another field's value — deferred since it needs a small rules engine PropertyEditor doesn't own today." },
  { title: "Collaborative editing", description: "Multiple users editing the same form concurrently, with presence and conflict indicators." },
  { title: "Undo history", description: "A per-field or per-form undo stack, distinct from the browser's own native undo inside a single text input." },
  { title: "Autosave", description: "Saving in the background as a user edits, with UnsavedChangesBanner's own messaging adapting to reflect it instead of a manual Save action." },
  { title: "Generated forms", description: "A form assembled at runtime from a remote provider's own configuration schema — the Provider Configuration use case this system is meant to eventually power." },
  { title: "Plugin fields", description: "A registry letting a third-party plugin contribute its own field type to PropertyEditor, the form-system counterpart to Foundation Metadata's own custom metadata renderers extension." },
];
