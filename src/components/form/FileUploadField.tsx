"use client";

import { useId, useState, type DragEvent, type ReactNode } from "react";
import { UploadCloud, File as FileIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Stack, Inline } from "@/components/layout";
import { Button, Caption } from "@/components/ui";
import { RequiredIndicator } from "./RequiredIndicator";
import { FieldError } from "./FieldError";

interface FileUploadFieldProps {
  label?: ReactNode;
  description?: ReactNode;
  helperText?: ReactNode;
  error?: ReactNode;
  required?: boolean;
  files: File[];
  onChange: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  id?: string;
  className?: string;
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/** A drag-and-drop zone over a real, always-present native file input — dropping never replaces the fallback, it's an enhancement on top of it. */
export function FileUploadField({
  label,
  description,
  helperText,
  error,
  required = false,
  files,
  onChange,
  accept,
  multiple = false,
  disabled = false,
  id,
  className,
}: FileUploadFieldProps) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  const [dragOver, setDragOver] = useState(false);

  function handleDrop(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    setDragOver(false);
    if (disabled) return;
    const dropped = Array.from(event.dataTransfer.files);
    onChange(multiple ? [...files, ...dropped] : dropped.slice(0, 1));
  }

  function removeFile(index: number) {
    onChange(files.filter((_, i) => i !== index));
  }

  return (
    <Stack gap="xs" className={className}>
      {description ? <p className="text-caption text-ink-tertiary">{description}</p> : null}
      {label ? (
        <label htmlFor={fieldId} className="text-body-sm font-medium text-ink-primary">
          {label}
          {required ? <RequiredIndicator /> : null}
        </label>
      ) : null}

      <label
        htmlFor={fieldId}
        onDragOver={(event) => {
          event.preventDefault();
          if (!disabled) setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={cn(
          "flex flex-col items-center gap-2 rounded-lg border border-dashed px-6 py-8 text-center transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)]",
          dragOver ? "border-accent-500 bg-accent-soft/20" : "border-border-subtle",
          disabled ? "cursor-not-allowed opacity-40" : "cursor-pointer hover:border-border-strong",
          error && "border-error/60",
        )}
      >
        <UploadCloud className="size-6 text-ink-tertiary" aria-hidden />
        <span className="text-body-sm text-ink-secondary">Drag a file here, or click to browse</span>
        <input
          id={fieldId}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          onChange={(event) => {
            const selected = Array.from(event.target.files ?? []);
            onChange(multiple ? [...files, ...selected] : selected.slice(0, 1));
          }}
          className="sr-only"
        />
      </label>

      {files.length > 0 ? (
        <Stack gap="xs">
          {files.map((file, index) => (
            <Inline key={`${file.name}-${index}`} justify="between" className="rounded-md border border-border-subtle bg-surface px-3 py-2">
              <Inline gap="sm" wrap={false}>
                <FileIcon className="size-4 shrink-0 text-ink-tertiary" aria-hidden />
                <span className="min-w-0 truncate text-body-sm text-ink-secondary">{file.name}</span>
              </Inline>
              <Inline gap="sm" wrap={false}>
                <Caption className="shrink-0 text-ink-tertiary">{formatSize(file.size)}</Caption>
                <Button variant="ghost" size="sm" aria-label={`Remove ${file.name}`} onClick={() => removeFile(index)}>
                  <X className="size-3.5" aria-hidden />
                </Button>
              </Inline>
            </Inline>
          ))}
        </Stack>
      ) : null}

      {error ? <FieldError>{error}</FieldError> : helperText ? <p className="text-caption text-ink-tertiary">{helperText}</p> : null}
    </Stack>
  );
}
