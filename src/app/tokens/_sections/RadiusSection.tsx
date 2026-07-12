import { PreviewSection, RadiusCard } from "@/app/docs/_components/DocsShowcase";

const RADII = [
  { name: "xs", value: "6px", radiusClassName: "rounded-xs" },
  { name: "sm", value: "8px", radiusClassName: "rounded-sm" },
  { name: "md", value: "12px", radiusClassName: "rounded-md" },
  { name: "lg", value: "16px", radiusClassName: "rounded-lg" },
  { name: "xl", value: "20px", radiusClassName: "rounded-xl" },
  { name: "2xl", value: "28px", radiusClassName: "rounded-2xl" },
  { name: "full", value: "9999px", radiusClassName: "rounded-full" },
];

export function RadiusSection() {
  return (
    <PreviewSection
      id="radius"
      eyebrow="radius"
      title="Border radius"
      description="Seven steps, from a crisp 6px to a full pill. Cards default to lg; buttons and badges default to md/full."
    >
      <div className="flex flex-wrap gap-6">
        {RADII.map((radius) => (
          <RadiusCard key={radius.name} {...radius} />
        ))}
      </div>
    </PreviewSection>
  );
}
