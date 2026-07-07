import { Waves } from "lucide-react";
import { PageShell, SectionShell } from "@/components/layout";
import { SectionBadge, Display, Body } from "@/components/ui";
import { SystemGrid } from "@/components/illustration";
import { ControlDock } from "./_components/ControlDock";
import { TokensSection } from "./_sections/TokensSection";
import { MotionControlsSection, SpeedControlsSection, ReducedMotionSection } from "./_sections/ControlsSection";
import { FadeSection, SlideSection, ScaleSection } from "./_sections/EntranceSection";
import { CollapseExpandSection } from "./_sections/CollapseExpandSection";
import { CrossfadeSection, StaggerSection } from "./_sections/CrossfadeStaggerSection";
import { ProgressSection, ConnectorFlowSection } from "./_sections/ProgressConnectorSection";
import { PulseSection, HighlightSection } from "./_sections/PulseHighlightSection";
import { ActivateFlowSection } from "./_sections/ActivateFlowSection";
import { DiagnosticsSection } from "./_sections/DiagnosticsSection";
import { LivePreviewSection } from "./_sections/LivePreviewSection";

export default function MotionPlaygroundPage() {
  return (
    <PageShell background={<SystemGrid />}>
      <SectionShell spacing="xl">
        <div className="flex flex-col gap-6">
          <SectionBadge icon={<Waves className="size-3.5" />}>StudioPOD / MS-2.1</SectionBadge>
          <Display>Motion engine</Display>
          <Body size="lg" muted className="max-w-[var(--container-narrow)]">
            The reusable motion architecture every future illustration and page animation is built on: semantic
            tokens, a global provider, five hooks, fourteen primitives, and the utilities that hold them together.
            Nothing on this page is a homepage animation, it&apos;s the engine underneath one.
          </Body>
        </div>
      </SectionShell>

      <ControlDock />

      <TokensSection />
      <MotionControlsSection />
      <SpeedControlsSection />
      <ReducedMotionSection />
      <FadeSection />
      <SlideSection />
      <ScaleSection />
      <CollapseExpandSection />
      <CrossfadeSection />
      <StaggerSection />
      <ProgressSection />
      <ConnectorFlowSection />
      <PulseSection />
      <HighlightSection />
      <ActivateFlowSection />
      <DiagnosticsSection />
      <LivePreviewSection />

      <SectionShell spacing="xl" background="raised">
        <div className="flex flex-col items-center gap-4 text-center">
          <Body muted className="max-w-[var(--container-narrow)]">
            Fourteen primitives, five hooks, one provider, one token set. Ready for MS-2.2, the illustration engine
            that composes these into StudioPOD&apos;s actual workflow diagrams.
          </Body>
        </div>
      </SectionShell>
    </PageShell>
  );
}
