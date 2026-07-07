"use client";

import { useState } from "react";
import { PublishingDiagram, CommerceDiagram } from "@/capabilities";
import { publishingCapability, commerceCapability } from "@/capabilities/examples";
import { PreviewSection, DemoLabel } from "../_components/preview-primitives";

/** PublishingDiagram and CommerceDiagram: generic, category-scoped views with zero provider-specific rendering code. */
export function PublishingAndCommerceSection() {
  const [publishingSelected, setPublishingSelected] = useState<string | undefined>(undefined);
  const [commerceSelected, setCommerceSelected] = useState<string | undefined>(undefined);

  return (
    <PreviewSection
      id="publishing-commerce"
      eyebrow="publishing and commerce"
      title="Storefronts and fulfillment"
      description="WordPress, Shopify, Printify, Gelato, and Printful only ever appear as data. PublishingDiagram and CommerceDiagram contain no provider-specific code."
    >
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div className="flex flex-col gap-3">
          <DemoLabel>{publishingCapability.title}</DemoLabel>
          <div className="scrollbar-none overflow-x-auto">
            <PublishingDiagram
              registry={publishingCapability}
              selectedId={publishingSelected}
              onSelect={(id) => setPublishingSelected((current) => (current === id ? undefined : id))}
            />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <DemoLabel>{commerceCapability.title}</DemoLabel>
          <div className="scrollbar-none overflow-x-auto">
            <CommerceDiagram
              registry={commerceCapability}
              selectedId={commerceSelected}
              onSelect={(id) => setCommerceSelected((current) => (current === id ? undefined : id))}
            />
          </div>
        </div>
      </div>
    </PreviewSection>
  );
}
