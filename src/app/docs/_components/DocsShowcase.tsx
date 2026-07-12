"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { motionDuration, motionEase } from "@/lib/tokens";
import { useMotionPreference } from "@/components/motion";
import { SectionShell } from "@/components/layout";
import { SectionHeader, Eyebrow, Caption } from "@/components/ui";

interface PreviewSectionProps {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
  background?: "transparent" | "raised" | "surface";
}

/** Consistent section shell for every showcase section: anchor id, eyebrow, heading, optional action slot. */
export function PreviewSection({
  id,
  eyebrow,
  title,
  description,
  actions,
  children,
  background = "transparent",
}: PreviewSectionProps) {
  return (
    <SectionShell id={id} spacing="lg" divider background={background}>
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeader
            id={id}
            eyebrow={<Eyebrow tone="accent">{eyebrow}</Eyebrow>}
            title={title}
            description={description}
            descriptionMaxWidth={false}
          />
          {actions ? <div className="shrink-0">{actions}</div> : null}
        </div>
        {children}
      </div>
    </SectionShell>
  );
}

interface SwatchProps {
  /** A Tailwind utility (e.g. "bg-canvas") for tokens that have one. Omit for raw `--palette-*` values, which have none by design — the swatch then fills itself directly from `cssVar`. */
  swatchClassName?: string;
  name: string;
  cssVar: string;
  usage?: string;
  /**
   * Resolves and displays the CSS variable's live computed value beneath
   * the name, instead of a second hardcoded hex string that could drift
   * from the token — for the Foundation Palette, where showing the literal
   * value matters.
   */
  showHex?: boolean;
}

/** A color token tile: swatch, name, CSS variable, and a one-line usage note. */
export function Swatch({ swatchClassName, name, cssVar, usage, showHex = false }: SwatchProps) {
  const swatchRef = useRef<HTMLDivElement>(null);
  const [hex, setHex] = useState("");

  useEffect(() => {
    if (!showHex || !swatchRef.current) return;
    setHex(getComputedStyle(swatchRef.current).getPropertyValue(cssVar).trim());
  }, [showHex, cssVar]);

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-border-subtle bg-surface p-3">
      <div
        ref={swatchRef}
        className={cn("h-14 w-full rounded-md border border-border-subtle", swatchClassName)}
        style={swatchClassName ? undefined : { backgroundColor: `var(${cssVar})` }}
      />
      <div className="flex flex-col gap-0.5">
        <span className="text-body-sm font-medium text-ink-primary">{name}</span>
        {showHex && hex ? <span className="text-caption font-mono text-ink-tertiary">{hex}</span> : null}
        <span className="text-caption font-mono text-ink-tertiary">{cssVar}</span>
        {usage ? <span className="text-caption text-ink-secondary">{usage}</span> : null}
      </div>
    </div>
  );
}

interface TypeSampleProps {
  label: string;
  spec: string;
  className: string;
  sample: string;
  paragraph?: string;
}

/** One row in the typography gallery: token name, size/line-height spec, a live sample, and an optional paragraph. */
export function TypeSample({ label, spec, className, sample, paragraph }: TypeSampleProps) {
  return (
    <div className="flex flex-col gap-3 border-b border-border-subtle py-8 first:pt-0 last:border-b-0">
      <div className="flex items-baseline justify-between gap-4">
        <span className="text-metadata font-mono text-ink-tertiary">{label}</span>
        <span className="text-caption font-mono text-ink-tertiary">{spec}</span>
      </div>
      <span className={className}>{sample}</span>
      {paragraph ? (
        <p className="max-w-[var(--container-narrow)] text-body-sm text-ink-secondary">{paragraph}</p>
      ) : null}
    </div>
  );
}

interface SpacingBarProps {
  px: number;
  token: string;
}

/** An animated bar whose width equals the literal pixel value of a spacing token. */
export function SpacingBar({ px, token }: SpacingBarProps) {
  const reduceMotion = useMotionPreference();

  return (
    <div className="flex items-center gap-4">
      <span className="w-16 shrink-0 font-mono text-caption text-ink-secondary">{px}px</span>
      {reduceMotion ? (
        <div className="h-3 rounded-full bg-accent-500/70" style={{ width: px }} />
      ) : (
        <motion.div
          className="h-3 rounded-full bg-accent-500/70"
          initial={{ width: 0 }}
          whileInView={{ width: px }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: motionDuration.slow, ease: motionEase.standard }}
        />
      )}
      <span className="font-mono text-caption text-ink-tertiary">{token}</span>
    </div>
  );
}

interface RadiusCardProps {
  name: string;
  value: string;
  radiusClassName: string;
}

/** Demonstrates one radius token on a fixed-size tile. */
export function RadiusCard({ name, value, radiusClassName }: RadiusCardProps) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className={cn(
          "flex size-20 items-center justify-center border border-border bg-surface",
          radiusClassName,
        )}
      >
        <span className="font-mono text-caption text-ink-tertiary">{value}</span>
      </div>
      <span className="text-body-sm font-medium text-ink-primary">{name}</span>
    </div>
  );
}

interface ShadowCardProps {
  name: string;
  shadowClassName: string;
  description: string;
}

/** An elevation tile. Hover lifts it slightly to make the shadow's depth cue legible. */
export function ShadowCard({ name, shadowClassName, description }: ShadowCardProps) {
  return (
    <div
      className={cn(
        "flex h-28 flex-col justify-between rounded-lg border border-border-subtle bg-surface p-4 transition-transform duration-[var(--duration-base)] ease-[var(--ease-standard)] hover:-translate-y-1",
        shadowClassName,
      )}
    >
      <span className="text-body-sm font-medium text-ink-primary">{name}</span>
      <span className="text-caption text-ink-tertiary">{description}</span>
    </div>
  );
}

/**
 * Labels a single state variant (Hover, Focus, Disabled, Loading...) inside
 * the component gallery. Stretches its content to the full column width —
 * `items-start` would let a content-less demo (e.g. a loading skeleton)
 * collapse to zero width instead of matching its siblings.
 */
export function StateLabel({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col items-stretch gap-3">
      <Caption className="font-mono text-[11px] uppercase tracking-wide text-ink-tertiary">{label}</Caption>
      {children}
    </div>
  );
}
