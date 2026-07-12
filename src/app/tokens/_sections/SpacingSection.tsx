import { PreviewSection, SpacingBar } from "@/app/docs/_components/DocsShowcase";

const SPACING_SCALE = [
  { px: 4, token: "space-1" },
  { px: 8, token: "space-2" },
  { px: 12, token: "space-3" },
  { px: 16, token: "space-4" },
  { px: 20, token: "space-5" },
  { px: 24, token: "space-6" },
  { px: 32, token: "space-8" },
  { px: 40, token: "space-10" },
  { px: 48, token: "space-12" },
  { px: 64, token: "space-16" },
  { px: 80, token: "space-20" },
  { px: 96, token: "space-24" },
];

export function SpacingSection() {
  return (
    <PreviewSection
      id="spacing"
      eyebrow="spacing"
      title="Spacing scale"
      description="A single 4px base unit. Every gap, padding, and margin in the system is a multiple of it."
    >
      <div className="flex flex-col gap-4">
        {SPACING_SCALE.map((step) => (
          <SpacingBar key={step.px} px={step.px} token={step.token} />
        ))}
      </div>
    </PreviewSection>
  );
}
