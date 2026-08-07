"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import { ImageOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface AssetThumbnailProps {
  src?: string;
  alt: string;
  /** Shown when src is omitted or fails to load — a type-appropriate icon (a document icon for a PDF, a music icon for audio, ...). */
  fallbackIcon?: ReactNode;
  className?: string;
}

/**
 * An asset's preview image, or a type-appropriate icon fallback — the
 * visual anchor AssetCard and AssetList both build on. Uses next/image
 * (not a plain <img>) for the same optimization every other image in this
 * codebase would get, were there any others yet.
 */
export function AssetThumbnail({ src, alt, fallbackIcon, className }: AssetThumbnailProps) {
  const [errored, setErrored] = useState(false);
  const showFallback = !src || errored;

  return (
    <div className={cn("relative flex aspect-square items-center justify-center overflow-hidden rounded-md bg-surface-hover", className)}>
      {showFallback ? (
        <span className="text-ink-tertiary" aria-hidden>
          {fallbackIcon ?? <ImageOff className="size-5" />}
        </span>
      ) : (
        <Image src={src} alt={alt} fill sizes="(min-width: 1024px) 20vw, 40vw" className="object-cover" onError={() => setErrored(true)} />
      )}
    </div>
  );
}
