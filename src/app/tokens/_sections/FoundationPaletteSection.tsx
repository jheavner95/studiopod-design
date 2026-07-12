import { ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Caption, Body } from "@/components/ui";
import { PreviewSection, Swatch } from "@/app/docs/_components/DocsShowcase";

const STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;

interface RampItem {
  name: string;
  cssVar: string;
  usage?: string;
}

/** Builds the 11-step 50–950 ramp for one hue, attaching a usage note only to the steps a semantic token actually derives from. */
function buildRamp(hue: string, usageByStep: Partial<Record<(typeof STEPS)[number], string>>): RampItem[] {
  const slug = hue.toLowerCase();
  return STEPS.map((step) => ({
    name: `${hue} ${step}`,
    cssVar: `--palette-${slug}-${step}`,
    usage: usageByStep[step],
  }));
}

const slateRamp = buildRamp("Slate", {
  100: "Ink Primary",
  400: "Ink Secondary · Neutral · Border base",
  500: "Ink Tertiary",
  600: "Ink Disabled",
  800: "Surface (active)",
  900: "Panel",
  950: "Canvas",
});
const blueRamp = buildRamp("Blue", {
  300: "Accent 300",
  400: "Accent 400",
  500: "Accent — the brand color",
  600: "Accent 600 (pressed)",
  700: "Accent 700",
});
const greenRamp = buildRamp("Green", { 500: "Success" });
const amberRamp = buildRamp("Amber", { 500: "Warning" });
const redRamp = buildRamp("Red", { 500: "Base for Error (see mapping below)" });

const neutralRamp: RampItem[] = [
  { name: "Neutral", cssVar: "--palette-neutral", usage: "Alias of Slate 400" },
  { name: "White", cssVar: "--palette-white" },
  { name: "Black", cssVar: "--palette-black" },
];

const CROSS_REFERENCE: { token: string; source: string }[] = [
  { token: "Canvas", source: "Slate 950" },
  { token: "Panel", source: "Slate 900" },
  { token: "Surface", source: "≈ Slate 900 (fine-tuned between 900/800)" },
  { token: "Surface (active)", source: "Slate 800" },
  { token: "Border", source: "Slate 400, at varying opacity" },
  { token: "Ink Primary", source: "Slate 100" },
  { token: "Ink Secondary", source: "Slate 400" },
  { token: "Ink Tertiary", source: "Slate 500" },
  { token: "Ink Disabled", source: "Slate 600" },
  { token: "Neutral", source: "Slate 400" },
  { token: "Accent", source: "Blue 500" },
  { token: "Success", source: "Green 500" },
  { token: "Warning", source: "Amber 500" },
  { token: "Error", source: "Lightened past Red 500, for AA contrast" },
];

function RampRow({ label, items, dense = false }: { label: string; items: RampItem[]; dense?: boolean }) {
  return (
    <div>
      <Caption className="mb-4">{label}</Caption>
      <div
        className={cn(
          "grid gap-3",
          dense ? "grid-cols-3" : "grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-11",
        )}
      >
        {items.map((item) => (
          <Swatch key={item.cssVar} name={item.name} cssVar={item.cssVar} usage={item.usage} showHex />
        ))}
      </div>
    </div>
  );
}

/**
 * The raw color ramps StudioPOD's semantic tokens (see the Semantic
 * Colors section right after this one) are built from. Placed first so
 * the derivation reads top-down: foundation, then the meaning layered on
 * top of it — components should consume the latter almost exclusively.
 */
export function FoundationPaletteSection() {
  return (
    <PreviewSection
      id="foundation-palette"
      eyebrow="foundation"
      title="Color palette"
      description="The raw ramps underneath every semantic token. Components should almost never reach for these directly."
    >
      <div className="flex flex-col gap-10">
        <div className="rounded-lg border border-border-subtle bg-surface/50 p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
            <div className="flex flex-col gap-1">
              <span className="text-body-md font-medium text-ink-primary">Foundation Palette</span>
              <Body size="sm" muted>
                Raw color ramps used to build the StudioPOD visual language. Rarely referenced directly.
              </Body>
            </div>
            <ArrowDown className="size-5 shrink-0 text-ink-tertiary sm:-rotate-90" aria-hidden />
            <div className="flex flex-col gap-1 sm:text-right">
              <span className="text-body-md font-medium text-ink-primary">Semantic Tokens</span>
              <Body size="sm" muted>
                Canvas · Surface · Panel · Border · Ink · Accent · Success · Warning · Error
              </Body>
            </div>
          </div>
        </div>

        <RampRow label="Slate" items={slateRamp} />
        <RampRow label="Blue" items={blueRamp} />
        <RampRow label="Green" items={greenRamp} />
        <RampRow label="Amber" items={amberRamp} />
        <RampRow label="Red" items={redRamp} />
        <RampRow label="Neutral, white, black" items={neutralRamp} dense />

        <div>
          <Caption className="mb-4">Semantic mapping — where each token is derived from</Caption>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {CROSS_REFERENCE.map((entry) => (
              <div
                key={entry.token}
                className="flex items-center justify-between gap-3 rounded-md border border-border-subtle bg-surface px-4 py-3"
              >
                <span className="text-body-sm font-medium text-ink-primary">{entry.token}</span>
                <span className="text-caption font-mono text-ink-tertiary">{entry.source}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PreviewSection>
  );
}
