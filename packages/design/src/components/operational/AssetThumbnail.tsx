"use client";

import { useState, type ReactNode } from "react";
import { ImageOff } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ImageComponent } from "@/framework";

interface AssetThumbnailProps {
  src?: string;
  alt: string;
  /** Shown when src is omitted or fails to load — a type-appropriate icon (a document icon for a PDF, a music icon for audio, ...). */
  fallbackIcon?: ReactNode;
  className?: string;
  /**
   * What renders the image. Defaults to `"img"`. Pass an optimising image
   * component to get resizing and format negotiation — pre-bound to fill mode,
   * since Design always renders images filling their positioned parent:
   *
   * ```tsx
   * const FillImage = (p: ImageComponentProps) => <Image {...p} fill />;
   * ```
   */
  imageComponent?: ImageComponent;
}

/**
 * An asset's preview image, or a type-appropriate icon fallback — the
 * visual anchor AssetCard and AssetList both build on.
 *
 * Renders a plain <img> by default. Until DH-3 this imported next/image
 * directly, which is one of the reasons the package required Next.js of every
 * consumer; the optimising component is now injected via `imageComponent`.
 */
export function AssetThumbnail({ src, alt, fallbackIcon, className, imageComponent }: AssetThumbnailProps) {
  const ImageEl = imageComponent ?? "img";
  const [errored, setErrored] = useState(false);
  const showFallback = !src || errored;

  return (
    <div className={cn("relative flex aspect-square items-center justify-center overflow-hidden rounded-md bg-surface-hover", className)}>
      {showFallback ? (
        <span className="text-ink-tertiary" aria-hidden>
          {fallbackIcon ?? <ImageOff className="size-5" />}
        </span>
      ) : (
        <ImageEl
          src={src}
          alt={alt}
          sizes="(min-width: 1024px) 20vw, 40vw"
          // absolute inset-0 size-full reproduces next/image's `fill` for a
          // plain <img>; an injected component pre-bound to fill mode simply
          // overrides positioning with its own.
          className="absolute inset-0 size-full object-cover"
          onError={() => setErrored(true)}
        />
      )}
    </div>
  );
}
