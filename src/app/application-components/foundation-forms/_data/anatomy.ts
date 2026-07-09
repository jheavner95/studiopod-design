export interface FormAnatomyRegion {
  id: string;
  name: string;
  purpose: string;
  component: string;
  notes: string;
}

/** The eight regions of the canonical form anatomy, top to bottom. */
export const FORM_ANATOMY_REGIONS: FormAnatomyRegion[] = [
  {
    id: "title",
    name: "Title",
    purpose: "What this form does — always present, always first.",
    component: "Heading, rendered by the page/panel hosting the Form",
    notes: "Not owned by Form itself — a Form can live inside a PageIntro, a Panel header, or a Dialog title, so the title stays with whichever container is hosting it.",
  },
  {
    id: "description",
    name: "Description",
    purpose: "A sentence of context before the first field — why this form exists, not what any one field does.",
    component: "Body, rendered above the first FormSection",
    notes: "Distinct from a field's own description prop (InputField, TextareaField, etc.) — this is form-level, not field-level.",
  },
  {
    id: "section",
    name: "Section",
    purpose: "A titled, bounded group of related fields.",
    component: "FormSection",
    notes: "Built on Panel directly — the same base Foundation Metadata's PropertySection uses, not FieldGroup's own hand-rolled card border (see Promotion Candidates).",
  },
  {
    id: "field",
    name: "Field",
    purpose: "One editable value — the unit every *Field component represents.",
    component: "InputField, SelectField, CheckboxField, and the rest of the Field Gallery",
    notes: "FormRow arranges two or three fields side by side when they're short enough to share a row.",
  },
  {
    id: "help",
    name: "Help",
    purpose: "Non-blocking supporting copy below a field.",
    component: "FieldHelp",
    notes: "Neutral tone, no role attribute — it's ambient context, not something that needs an assertive announcement.",
  },
  {
    id: "validation",
    name: "Validation",
    purpose: "What's wrong, at the field level and the form level.",
    component: "FieldError + ValidationSummary",
    notes: "FieldError announces one field's own problem; ValidationSummary aggregates every field's problem in one place at the top of the form.",
  },
  {
    id: "actions",
    name: "Actions",
    purpose: "How the user commits or abandons their changes.",
    component: "FormActions",
    notes: "One primary action, Cancel always available — see Implementation Guidance.",
  },
  {
    id: "completion",
    name: "Completion",
    purpose: "What happens after a successful submit — a confirmation, a redirect, or simply the form closing.",
    component: "Not owned by the Form System",
    notes: "Completion is a consequence handled by whatever code calls the form's onSubmit — the Form System's job ends at a successful submit, not after it.",
  },
];
