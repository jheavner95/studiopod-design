import type { FormHTMLAttributes, ReactNode } from "react";
import { Stack } from "@/components/layout";

interface FormProps extends Omit<FormHTMLAttributes<HTMLFormElement>, "className"> {
  children: ReactNode;
  className?: string;
}

/** The root of any StudioPOD form — a real <form> element with Form Anatomy's own vertical rhythm, built on Stack rather than a bespoke flex-col. */
export function Form({ children, className, ...formProps }: FormProps) {
  return (
    <form className={className} {...formProps}>
      <Stack gap="lg">{children}</Stack>
    </form>
  );
}
