import { Separator } from "@/components/layout";

interface FormDividerProps {
  className?: string;
}

/** A labeled break between form sections — Separator with the vertical spacing forms specifically need, not a second rule implementation. */
export function FormDivider({ className }: FormDividerProps) {
  return (
    <div className={className}>
      <Separator />
    </div>
  );
}
