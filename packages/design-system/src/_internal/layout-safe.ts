/**
 * Build-time replacement for "@/components/layout" used ONLY by this
 * package's build (see the `alias` entry in tsup.config.ts) — it never
 * touches the canonical app source.
 *
 * Why this exists: dozens of files this package re-exports from
 * (src/components/form/*, feedback/Alert.tsx, metadata/*,
 * operational/*, workflow/*, and all 11 src/compositions/* files)
 * import layout primitives via the barrel path "@/components/layout",
 * not from individual files. The real barrel
 * (src/components/layout/index.ts) also re-exports GlobalNav and Footer,
 * which import "@/components/docs" and "@/lib/design-system-navigation"
 * — internal documentation-site chrome and nav config that must not
 * ship in the package. Since the app's own root layout imports
 * GlobalNav/Footer from that same barrel, removing them from the real
 * barrel would break the existing documentation app — not an option.
 * Aliasing the bare "@/components/layout" specifier to this file, for
 * this package's build only, keeps every consumer's existing import
 * working unchanged while guaranteeing GlobalNav.tsx/Footer.tsx (and
 * their doc-site imports) are never reached by this build.
 */
export { Container, type ContainerSize } from "@/components/layout/Container";
export { PageShell } from "@/components/layout/PageShell";
export { SectionShell } from "@/components/layout/SectionShell";
export { ContentColumns } from "@/components/layout/ContentColumns";
export { CardGrid } from "@/components/layout/CardGrid";
export { Stack, type StackGap, type StackAlign, type StackJustify } from "@/components/layout/Stack";
export { Inline, type InlineGap, type InlineAlign, type InlineJustify } from "@/components/layout/Inline";
export { Grid, type GridStrategy, type GridGap } from "@/components/layout/Grid";
export { Cluster } from "@/components/layout/Cluster";
export { Surface, type SurfaceElevation, type SurfacePadding } from "@/components/layout/Surface";
export { Panel } from "@/components/layout/Panel";
export { ScrollArea, type ScrollDirection } from "@/components/layout/ScrollArea";
export { Separator, type SeparatorOrientation } from "@/components/layout/Separator";
export {
  DescriptionList,
  type DescriptionListItem,
  type DescriptionListLayout,
} from "@/components/layout/DescriptionList";
