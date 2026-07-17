export { Container, type ContainerSize, type ContainerProps } from "./Container";
export { PageShell } from "./PageShell";
export {
  SectionShell,
  type SectionShellProps,
  type SectionShellBackground,
  type SectionShellSpacing,
} from "./SectionShell";
export {
  ContentColumns,
  type ContentColumnsProps,
  type ContentColumnsRatio,
  type ContentColumnsGap,
  type ContentColumnsAlign,
} from "./ContentColumns";
export { CardGrid, type CardGridProps, type CardGridColumns } from "./CardGrid";
export { GlobalNav } from "./GlobalNav";
export { Footer } from "./Footer";
export { Stack, type StackProps, type StackGap, type StackAlign, type StackJustify } from "./Stack";
export { Inline, type InlineProps, type InlineGap, type InlineAlign, type InlineJustify } from "./Inline";
export { Grid, type GridProps, type GridStrategy, type GridGap } from "./Grid";
export { Cluster, type ClusterProps } from "./Cluster";
export { Surface, type SurfaceProps, type SurfaceElevation, type SurfacePadding } from "./Surface";
export { Panel, type PanelProps } from "./Panel";
export { ScrollArea, type ScrollAreaProps, type ScrollDirection } from "./ScrollArea";
export { Separator, type SeparatorProps, type SeparatorOrientation } from "./Separator";
export {
  DescriptionList,
  type DescriptionListProps,
  type DescriptionListItem,
  type DescriptionListLayout,
} from "./DescriptionList";

// Workspace — generic application-shell primitive (DS-1B2). Distinct from
// PageShell: PageShell wraps a scrolling document, Workspace owns a fixed
// viewport whose content region scrolls.
export {
  Workspace,
  WorkspaceHeader,
  WorkspaceToolbar,
  WorkspaceBody,
  WorkspaceNavigation,
  WorkspaceContent,
  WorkspaceInspector,
  WorkspaceFooter,
  workspaceDensityPadding,
  workspaceDensityHeaderHeight,
} from "./Workspace";
export type {
  WorkspaceProps,
  WorkspaceHeaderProps,
  WorkspaceToolbarProps,
  WorkspaceBodyProps,
  WorkspaceNavigationProps,
  WorkspaceContentProps,
  WorkspaceInspectorProps,
  WorkspaceFooterProps,
  WorkspaceDensity,
} from "./Workspace";

// SplitView — pane-composition primitive (DS-3). Owns dividing a region
// (typically a WorkspaceContent) into resizable panes; Workspace owns
// overall page structure and stays untouched by this.
export { SplitView, SplitPane, SplitDivider } from "./SplitView";
export type { SplitViewProps, SplitPaneProps, SplitDividerProps, SplitOrientation } from "./SplitView";
