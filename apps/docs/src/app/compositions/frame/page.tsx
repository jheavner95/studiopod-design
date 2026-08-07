import { FramePreview } from "./FramePreview";

/**
 * Renders exactly one composition example with no page chrome. Used as an
 * <iframe> target so the "mobile preview" on the playground page gets a
 * real, independent viewport — Tailwind's responsive classes are keyed off
 * the actual viewport width, which a shrunk-down <div> can't replicate.
 *
 * Intentionally standalone (DS-7.3 Part 5): not in NAV_REGISTRY, doesn't
 * render DocsShell, and isn't reachable from any sidebar/breadcrumb/search
 * path — it's an embed target, not a destination a person navigates to.
 */
export default async function CompositionFramePage({
  searchParams,
}: {
  searchParams: Promise<{ slug?: string }>;
}) {
  const { slug } = await searchParams;
  return <FramePreview slug={slug} />;
}
