"use client";

import { useState, type FormEvent } from "react";
import { Stack } from "@/components/layout";
import { Button } from "@/components/ui";
import { Form, FormSection, FormActions, InputField, SelectField, SwitchField, ValidationSummary, type ValidationSummaryItem } from "@/components/form";

interface FormState {
  title: string;
  provider: string;
  confirmed: boolean;
}

interface FormErrors {
  title?: string;
  provider?: string;
  confirmed?: string;
}

function validate(state: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!state.title.trim()) errors.title = "Product title is required.";
  if (!state.provider) errors.provider = "Select a print provider.";
  if (!state.confirmed) errors.confirmed = "Confirm before continuing.";
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
  const [state, setState] = useState<FormState>({ title: "", provider: "", confirmed: false });
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

      <FormSection title="Listing details" description="A blocking validation pass runs on Validate; editing a flagged field re-checks it immediately.">
        <Stack gap="md">
          <InputField label="Product title" required value={state.title} onChange={(e) => update("title", e.target.value)} error={touched ? errors.title : undefined} />
          <SelectField
            label="Print provider"
            required
            value={state.provider}
            onChange={(e) => update("provider", e.target.value)}
            error={touched ? errors.provider : undefined}
            options={[
              { value: "printful", label: "Printful" },
              { value: "printify", label: "Printify" },
              { value: "gooten", label: "Gooten" },
            ]}
          />
          <SwitchField
            label="Confirm this listing is ready for Publishing"
            checked={state.confirmed}
            onChange={(checked) => update("confirmed", checked)}
            error={touched ? errors.confirmed : undefined}
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
