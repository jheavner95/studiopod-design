"use client";

import { notFound } from "next/navigation";
import { REGISTRY } from "../_lib/registry";

/**
 * Looks up and renders one registry entry entirely client-side. Keeping
 * the lookup+render here (rather than in the server page) avoids passing
 * a registry entry object — which can contain functions, e.g. Metrics'
 * `format` callbacks — across the Server-to-Client props boundary. Only
 * the plain `slug` string crosses that boundary, which is serializable.
 */
export function FramePreview({ slug }: { slug?: string }) {
  const entry = REGISTRY.find((item) => item.slug === slug);

  if (!entry) {
    notFound();
  }

  return <div className="min-h-screen bg-canvas">{entry.render()}</div>;
}
