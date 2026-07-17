export { Container, type ContainerSize } from "./Container";
export { PageShell } from "./PageShell";
export { SectionShell } from "./SectionShell";
export { ContentColumns } from "./ContentColumns";
export { CardGrid } from "./CardGrid";
export { GlobalNav } from "./GlobalNav";
export { Footer } from "./Footer";
export { Stack, type StackGap, type StackAlign, type StackJustify } from "./Stack";
export { Inline, type InlineGap, type InlineAlign, type InlineJustify } from "./Inline";
export { Grid, type GridStrategy, type GridGap } from "./Grid";
export { Cluster } from "./Cluster";
export { Surface, type SurfaceElevation, type SurfacePadding } from "./Surface";
export { Panel } from "./Panel";
export { ScrollArea, type ScrollDirection } from "./ScrollArea";
export { Separator, type SeparatorOrientation } from "./Separator";
export { DescriptionList, type DescriptionListItem, type DescriptionListLayout } from "./DescriptionList";

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
