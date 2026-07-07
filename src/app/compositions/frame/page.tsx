import { FramePreview } from "./FramePreview";

/**
 * Renders exactly one composition example with no page chrome. Used as an
 * <iframe> target so the "mobile preview" on the playground page gets a
 * real, independent viewport — Tailwind's responsive classes are keyed off
 * the actual viewport width, which a shrunk-down <div> can't replicate.
 */
export default async function CompositionFramePage({
  searchParams,
}: {
  searchParams: Promise<{ slug?: string }>;
}) {
  const { slug } = await searchParams;
  return <FramePreview slug={slug} />;
}
