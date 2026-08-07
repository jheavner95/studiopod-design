import { InputField } from "@/components/form";
import type { SelectOption } from "@/components/ui";
import { PropertyToggle } from "./PropertyToggle";
import { PropertySelect } from "./PropertySelect";
import { PropertyNumber } from "./PropertyNumber";
import { PropertyColor } from "./PropertyColor";

export type PropertyEditorField =
  | { id: string; type: "text"; label: string; value: string; onChange: (value: string) => void; required?: boolean; error?: string }
  | { id: string; type: "number"; label: string; value: number; onChange: (value: number) => void; min?: number; max?: number; step?: number; error?: string }
  | { id: string; type: "select"; label: string; value: string; onChange: (value: string) => void; options: SelectOption[]; error?: string }
  | { id: string; type: "switch"; label: string; value: boolean; onChange: (value: boolean) => void }
  | { id: string; type: "color"; label: string; value: string; onChange: (value: string) => void; error?: string };

interface PropertyEditorProps {
  field: PropertyEditorField;
  className?: string;
}

/**
 * A single-field editor dispatcher — pass one PropertyEditorField, get back
 * the right control. Distinct in scope from Foundation Forms' own
 * src/components/form/PropertyEditor.tsx (a FormRow grid arranging several
 * fields side by side); this dispatches ONE field at a time for use inside
 * one PropertyRow, and extends the type union with number/color, which
 * Foundation Forms' version doesn't cover. Reuses the same InputField/
 * SelectField underneath for the overlapping text/select cases rather than
 * reimplementing them.
 */
export function PropertyEditor({ field, className }: PropertyEditorProps) {
  switch (field.type) {
    case "text":
      return (
        <InputField
          label={field.label}
          value={field.value}
          onChange={(event) => field.onChange(event.target.value)}
          required={field.required}
          error={field.error}
          className={className}
        />
      );
    case "number":
      return (
        <PropertyNumber
          label={field.label}
          value={field.value}
          onChange={field.onChange}
          min={field.min}
          max={field.max}
          step={field.step}
          error={field.error}
          className={className}
        />
      );
    case "select":
      return <PropertySelect label={field.label} value={field.value} onChange={field.onChange} options={field.options} error={field.error} className={className} />;
    case "switch":
      return <PropertyToggle label={field.label} checked={field.value} onChange={field.onChange} className={className} />;
    case "color":
      return <PropertyColor label={field.label} value={field.value} onChange={field.onChange} error={field.error} className={className} />;
    default:
      return null;
  }
}
