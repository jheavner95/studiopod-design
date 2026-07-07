"use client";

import { CardGrid } from "@/components/layout";
import { Body } from "@/components/ui";
import { Fade, Slide, Scale, type SlideDirection } from "@/motion";
import { PreviewSection } from "../_components/preview-primitives";
import { DemoCard } from "../_components/DemoCard";

const DIRECTIONS: SlideDirection[] = ["up", "down", "left", "right"];

export function FadeSection() {
  return (
    <PreviewSection
      id="fade"
      eyebrow="fade"
      title="Fade"
      description="Opacity only, no position change. Use for text and metadata that shouldn't shift the layout as it appears."
    >
      <CardGrid columns={3}>
        <DemoCard label="fast" timingLabel="fast · enter · 0ms">
          <Fade duration="fast" repeat>
            <Body size="sm" className="font-medium">
              Fade / fast
            </Body>
          </Fade>
        </DemoCard>
        <DemoCard label="normal" timingLabel="normal · enter · 0ms">
          <Fade duration="normal" repeat>
            <Body size="sm" className="font-medium">
              Fade / normal
            </Body>
          </Fade>
        </DemoCard>
        <DemoCard label="slow + delay" timingLabel="slow · enter · 160ms">
          <Fade duration="slow" delay="medium" repeat>
            <Body size="sm" className="font-medium">
              Fade / slow, delayed
            </Body>
          </Fade>
        </DemoCard>
      </CardGrid>
    </PreviewSection>
  );
}

export function SlideSection() {
  return (
    <PreviewSection
      id="slide"
      eyebrow="slide"
      title="Slide"
      description="Opacity + directional translate. The default entrance for cards, headings, and sections: four directions, all built on the same distance tokens."
    >
      <CardGrid columns={4}>
        {DIRECTIONS.map((direction) => (
          <DemoCard key={direction} label={direction} timingLabel="normal · enter · medium distance">
            <Slide direction={direction} repeat>
              <Body size="sm" className="font-medium">
                {direction}
              </Body>
            </Slide>
          </DemoCard>
        ))}
      </CardGrid>
    </PreviewSection>
  );
}

export function ScaleSection() {
  return (
    <PreviewSection
      id="scale"
      eyebrow="scale"
      title="Scale"
      description="Opacity + scale entrance. Use for icons, badges, and nodes appearing 'from nothing' rather than sliding in. Distance controls how far from 1.0 it starts."
    >
      <CardGrid columns={3}>
        <DemoCard label="micro" timingLabel="normal · enter · micro">
          <Scale distance="micro" repeat>
            <div className="flex size-12 items-center justify-center rounded-lg bg-accent-soft text-accent-400">A</div>
          </Scale>
        </DemoCard>
        <DemoCard label="medium" timingLabel="normal · enter · medium">
          <Scale distance="medium" repeat>
            <div className="flex size-12 items-center justify-center rounded-lg bg-accent-soft text-accent-400">B</div>
          </Scale>
        </DemoCard>
        <DemoCard label="large" timingLabel="normal · enter · large">
          <Scale distance="large" repeat>
            <div className="flex size-12 items-center justify-center rounded-lg bg-accent-soft text-accent-400">C</div>
          </Scale>
        </DemoCard>
      </CardGrid>
    </PreviewSection>
  );
}
