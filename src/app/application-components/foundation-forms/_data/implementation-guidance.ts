export interface FormGuidanceRule {
  title: string;
  explanation: string;
}

export const FORM_GUIDANCE: FormGuidanceRule[] = [
  { title: "Forms edit", explanation: "Every component in src/components/form/ accepts a value and an onChange — none of them render a read-only mode." },
  { title: "Metadata presents", explanation: "The moment a value stops being editable, it's Foundation Metadata's job (MetadataValue, DescriptionList) to show it, not a disabled Form field." },
  { title: "Validation should guide", explanation: "FieldError explains what to fix, not just that something's wrong — \"Enter a valid email\" over \"Invalid input.\"" },
  { title: "Do not overwhelm users", explanation: "FormSection and progressive disclosure exist specifically so a 20-field settings page never renders as one undifferentiated wall of inputs." },
  { title: "Group related fields", explanation: "FormSection titles a group; FormRow places short, related fields side by side within it — see Property Editing below." },
  { title: "Use progressive disclosure", explanation: "Advanced or rarely-needed fields belong behind an explicit expand action, not visible by default alongside the fields everyone needs." },
  { title: "One primary action", explanation: "FormActions accepts exactly one primary slot — a form with two \"equally important\" buttons is a sign the form should split into two steps." },
  { title: "Cancel is always available", explanation: "FormActions requires a cancel prop, not an optional one — there's no supported way to render a form with no way out." },
];
