"use client";

import { useState, type FormEvent } from "react";
import { Stack } from "@/components/layout";
import { Button } from "@/components/ui";
import { Form, FormSection, FormActions, InputField, SwitchField, ValidationSummary, type ValidationSummaryItem } from "@/components/form";

interface FormState {
  name: string;
  email: string;
  agreed: boolean;
}

interface FormErrors {
  name?: string;
  email?: string;
  agreed?: string;
}

function validate(state: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!state.name.trim()) errors.name = "Name is required.";
  if (!state.email.trim()) errors.email = "Email is required.";
  else if (!state.email.includes("@")) errors.email = "Enter a valid email address.";
  if (!state.agreed) errors.agreed = "You must agree before continuing.";
  return errors;
}

/**
 * A real, working form — Validate runs every field's own check at once
 * (blocking Form validation) and populates both inline FieldError
 * messages and the aggregate ValidationSummary above. Once a field has
 * been flagged, editing it re-validates that single field immediately
 * (progressive validation) rather than waiting for another full submit.
 */
export function ValidationDemo() {
  const [state, setState] = useState<FormState>({ name: "", email: "", agreed: false });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState(false);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setTouched(true);
    setErrors(validate(state));
  }

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    const next = { ...state, [key]: value };
    setState(next);
    if (touched) setErrors(validate(next));
  }

  const summaryItems: ValidationSummaryItem[] = Object.entries(errors)
    .filter((entry): entry is [string, string] => Boolean(entry[1]))
    .map(([field, message]) => ({ field, message, severity: "error" }));

  return (
    <Form onSubmit={handleSubmit} className="max-w-lg">
      {touched && summaryItems.length > 0 ? <ValidationSummary items={summaryItems} /> : null}

      <FormSection title="Account details" description="A blocking validation pass runs on Validate; editing a flagged field re-checks it immediately.">
        <Stack gap="md">
          <InputField label="Name" required value={state.name} onChange={(e) => update("name", e.target.value)} error={touched ? errors.name : undefined} />
          <InputField label="Email" required value={state.email} onChange={(e) => update("email", e.target.value)} error={touched ? errors.email : undefined} />
          <SwitchField
            label="I agree to the terms"
            checked={state.agreed}
            onChange={(checked) => update("agreed", checked)}
            error={touched ? errors.agreed : undefined}
          />
        </Stack>
      </FormSection>

      <FormActions
        cancel={
          <Button variant="ghost" type="button">
            Cancel
          </Button>
        }
        primary={<Button type="submit">Validate</Button>}
      />
    </Form>
  );
}
