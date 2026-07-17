import { PreviewSection, SpacingBar } from "@/app/docs/_components/DocsShowcase";
import { DescriptionList } from "@/components/metadata";

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

/**
 * DS-4: this project defines two more spacing tokens beyond Tailwind's
 * built-in numeric scale below — --spacing-gutter and the fluid
 * --spacing-section-{xs..xl} clamp() scale (both in src/styles/theme.css's
 * @theme block). They were previously undocumented here even though every
 * page's horizontal padding (Container, GlobalNav, DocsShell) and every
 * SectionShell's spacing prop actually reach for these, not the numeric
 * scale — the numeric scale below is real and in constant use for
 * component-local gaps/padding, but it isn't the *whole* spacing story.
 */
const FLUID_SPACING_TOKENS = [
  { name: "--spacing-gutter", formula: "clamp(1.25rem, 4vw, 3rem)", usage: "Horizontal page padding — Container, GlobalNav, DocsShell." },
  { name: "--spacing-section-xs", formula: "clamp(2.5rem, 2rem + 2.5vw, 3.5rem)", usage: "SectionShell spacing=\"xs\"" },
  { name: "--spacing-section-sm", formula: "clamp(3.5rem, 2.75rem + 3.5vw, 5rem)", usage: "SectionShell spacing=\"sm\"" },
  { name: "--spacing-section-md", formula: "clamp(5rem, 3.75rem + 5.5vw, 7rem)", usage: "SectionShell spacing=\"md\"" },
  { name: "--spacing-section-lg", formula: "clamp(5rem, 3.75rem + 6vw, 7.5rem)", usage: "SectionShell spacing=\"lg\" — the most common section gap on docs pages." },
  { name: "--spacing-section-xl", formula: "clamp(6.5rem, 4.75rem + 8vw, 9.5rem)", usage: "SectionShell spacing=\"xl\"" },
];

export function SpacingSection() {
  return (
    <>
      <PreviewSection
        id="spacing"
        eyebrow="spacing"
        title="Spacing scale"
        description="Tailwind's built-in 4px-base numeric scale — reach for these for component-local gaps and padding (gap-4, p-6, and so on). Every gap/padding/margin utility in the system is a multiple of this unit."
      >
        <div className="flex flex-col gap-4">
          {SPACING_SCALE.map((step) => (
            <SpacingBar key={step.px} px={step.px} token={step.token} />
          ))}
        </div>
      </PreviewSection>

      <PreviewSection
        id="spacing-fluid"
        eyebrow="spacing"
        title="Fluid section rhythm"
        description="A second, purpose-built scale for page-level rhythm — viewport-responsive via clamp(), so section gaps and page gutters scale smoothly between mobile and wide desktop instead of jumping at breakpoints. Reach for these through SectionShell's spacing prop and Container, not by writing clamp() by hand."
      >
        <DescriptionList items={FLUID_SPACING_TOKENS.map((t) => ({ label: t.name, value: `${t.formula} — ${t.usage}` }))} bordered={false} />
      </PreviewSection>
    </>
  );
}
