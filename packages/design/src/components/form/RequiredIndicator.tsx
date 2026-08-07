/** The small red asterisk every required field's label carries — one implementation, not re-typed as `<span className="text-error">*</span>` per field. */
export function RequiredIndicator() {
  return (
    <span className="ml-0.5 text-error" aria-hidden>
      *
    </span>
  );
}
