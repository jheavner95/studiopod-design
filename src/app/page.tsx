import Link from "next/link";
import { PageShell } from "@/components/layout";
import { Eyebrow } from "@/components/ui";

/**
 * Placeholder root route. The marketing homepage is built in a later
 * milestone — this page only exists so the design-system foundation has
 * somewhere to link from.
 */
export default function Home() {
  return (
    <PageShell>
      <main className="flex flex-1 flex-col items-center justify-center gap-6 px-[var(--spacing-gutter)] py-24 text-center">
        <Eyebrow tone="accent">StudioPOD</Eyebrow>
        <h1 className="text-heading-1 text-ink-primary">Design system foundation</h1>
        <p className="max-w-[var(--container-narrow)] text-body-lg text-ink-secondary">
          The marketing pages haven&apos;t been built yet. This milestone establishes the
          tokens, primitives, and motion system every future page will share.
        </p>
        <Link
          href="/design-system"
          className="focus-ring text-body-md font-medium text-accent-400 underline underline-offset-4 hover:text-accent-300"
        >
          View the design system preview →
        </Link>
      </main>
    </PageShell>
  );
}
