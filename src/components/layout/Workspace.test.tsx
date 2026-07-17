import { describe, it, expect } from "vitest";
import { render, screen } from "@test/render";
import { runA11yCheck } from "@test/a11y";
import {
  Workspace,
  WorkspaceHeader,
  WorkspaceToolbar,
  WorkspaceBody,
  WorkspaceNavigation,
  WorkspaceContent,
  WorkspaceInspector,
  WorkspaceFooter,
} from "./Workspace";

/**
 * DS-2 — companion to docs/CERTIFICATION.md's Button pilot as the second
 * real example of the full test shape a component certifies against. This
 * primitive has no built-in click-driven interaction (it's a layout shell,
 * not a control) — its "interaction" is a controlled prop (`collapsed`)
 * changing over time, exactly the shape a consumer's own toggle button would
 * drive. Tested via rerender, the correct tool for a controlled component
 * that owns no state of its own.
 */
function FullWorkspace(props: { collapsed?: boolean; density?: "comfortable" | "compact" }) {
  return (
    <Workspace fullHeight density={props.density}>
      <WorkspaceHeader>Header</WorkspaceHeader>
      <WorkspaceToolbar>Toolbar</WorkspaceToolbar>
      <WorkspaceBody>
        <WorkspaceNavigation label="Primary" collapsed={props.collapsed}>
          Nav
        </WorkspaceNavigation>
        <WorkspaceContent label="Main content" scroll>
          Content
        </WorkspaceContent>
        <WorkspaceInspector label="Details" hideBelowLg={false}>
          Inspector
        </WorkspaceInspector>
      </WorkspaceBody>
      <WorkspaceFooter>Footer</WorkspaceFooter>
    </Workspace>
  );
}

describe("Workspace", () => {
  describe("rendering", () => {
    it("renders every region with the correct semantic landmark", () => {
      render(<FullWorkspace />);
      expect(screen.getByRole("banner")).toHaveTextContent("Header");
      expect(screen.getByRole("navigation", { name: "Primary" })).toHaveTextContent("Nav");
      expect(screen.getByRole("main", { name: "Main content" })).toHaveTextContent("Content");
      expect(screen.getByRole("complementary", { name: "Details" })).toHaveTextContent("Inspector");
      expect(screen.getByRole("contentinfo")).toHaveTextContent("Footer");
    });

    it("WorkspaceToolbar renders as a plain div, not a toolbar role, by design", () => {
      render(<FullWorkspace />);
      const toolbar = screen.getByText("Toolbar");
      expect(toolbar).not.toHaveAttribute("role", "toolbar");
    });

    it("asDiv renders a plain div instead of the semantic tag for Header/Content/Footer", () => {
      render(
        <Workspace>
          <WorkspaceHeader asDiv>Header</WorkspaceHeader>
          <WorkspaceBody>
            <WorkspaceContent asDiv>Content</WorkspaceContent>
          </WorkspaceBody>
          <WorkspaceFooter asDiv>Footer</WorkspaceFooter>
        </Workspace>,
      );
      expect(screen.queryByRole("banner")).not.toBeInTheDocument();
      expect(screen.queryByRole("contentinfo")).not.toBeInTheDocument();
    });

    it("every region is independently optional — a minimal composition doesn't throw", () => {
      expect(() =>
        render(
          <Workspace>
            <WorkspaceBody>
              <WorkspaceContent>Just content</WorkspaceContent>
            </WorkspaceBody>
          </Workspace>,
        ),
      ).not.toThrow();
    });
  });

  describe("state coverage", () => {
    it("fullHeight toggles h-dvh vs h-full", () => {
      const { container, rerender } = render(<Workspace fullHeight>x</Workspace>);
      expect(container.firstChild).toHaveClass("h-dvh");
      rerender(<Workspace>x</Workspace>);
      expect(container.firstChild).toHaveClass("h-full");
    });

    it("density publishes data-density for group-variant consumers, not context", () => {
      const { container, rerender } = render(<Workspace density="compact">x</Workspace>);
      expect(container.firstChild).toHaveAttribute("data-density", "compact");
      rerender(<Workspace density="comfortable">x</Workspace>);
      expect(container.firstChild).toHaveAttribute("data-density", "comfortable");
    });

    it("hideBelowLg hides Navigation and Inspector via CSS, not via unmounting", () => {
      render(
        <WorkspaceBody>
          <WorkspaceNavigation label="Nav" hideBelowLg>
            Nav
          </WorkspaceNavigation>
          <WorkspaceInspector label="Inspector" hideBelowLg>
            Inspector
          </WorkspaceInspector>
        </WorkspaceBody>,
      );
      // Still in the DOM (queryable by role) — CSS `hidden`, not removed.
      expect(screen.getByRole("navigation", { name: "Nav" })).toHaveClass("hidden");
      expect(screen.getByRole("complementary", { name: "Inspector" })).toHaveClass("hidden");
    });

    it("WorkspaceInspector's width prop sets an inline style; collapsed overrides it", () => {
      const { rerender } = render(
        <WorkspaceInspector label="Inspector" width={280} hideBelowLg={false}>
          x
        </WorkspaceInspector>,
      );
      expect(screen.getByRole("complementary", { name: "Inspector" })).toHaveStyle({ width: "280px" });

      rerender(
        <WorkspaceInspector label="Inspector" width={280} collapsed hideBelowLg={false}>
          x
        </WorkspaceInspector>,
      );
      const collapsedInspector = screen.getByRole("complementary", { name: "Inspector" });
      expect(collapsedInspector).toHaveAttribute("data-collapsed", "true");
      expect(collapsedInspector).toHaveClass("w-14");
    });

    it("WorkspaceNavigation's width prop mirrors WorkspaceInspector's — the API-symmetry fix", () => {
      render(
        <WorkspaceNavigation label="Nav" width="16rem">
          x
        </WorkspaceNavigation>,
      );
      expect(screen.getByRole("navigation", { name: "Nav" })).toHaveStyle({ width: "16rem" });
    });

    it("the collapse width transition respects prefers-reduced-motion via a CSS-only variant", () => {
      // Workspace has no "use client" boundary, so it cannot read the
      // JS-based useMotionPreference context the rest of the codebase uses —
      // this asserts the CSS-only fallback (motion-reduce:) is actually
      // present, not just documented in a comment.
      render(
        <WorkspaceNavigation label="Nav">x</WorkspaceNavigation>,
      );
      expect(screen.getByRole("navigation", { name: "Nav" })).toHaveClass("motion-reduce:transition-none");

      render(
        <WorkspaceInspector label="Inspector" hideBelowLg={false}>
          x
        </WorkspaceInspector>,
      );
      expect(screen.getByRole("complementary", { name: "Inspector" })).toHaveClass("motion-reduce:transition-none");
    });
  });

  describe("interaction", () => {
    // Workspace owns no click handlers of its own — "interaction" here means
    // the controlled `collapsed` prop transitioning correctly over time, the
    // same contract a consumer's own toggle button would exercise.
    it("WorkspaceNavigation responds correctly to collapsed toggling from false to true and back", () => {
      const { rerender } = render(
        <WorkspaceNavigation label="Nav" collapsed={false}>
          x
        </WorkspaceNavigation>,
      );
      let nav = screen.getByRole("navigation", { name: "Nav" });
      expect(nav).toHaveAttribute("data-collapsed", "false");
      expect(nav).not.toHaveClass("w-14");

      rerender(
        <WorkspaceNavigation label="Nav" collapsed={true}>
          x
        </WorkspaceNavigation>,
      );
      nav = screen.getByRole("navigation", { name: "Nav" });
      expect(nav).toHaveAttribute("data-collapsed", "true");
      expect(nav).toHaveClass("w-14");

      rerender(
        <WorkspaceNavigation label="Nav" collapsed={false}>
          x
        </WorkspaceNavigation>,
      );
      nav = screen.getByRole("navigation", { name: "Nav" });
      expect(nav).toHaveAttribute("data-collapsed", "false");
      expect(nav).not.toHaveClass("w-14");
    });

    it("collapsed content stays in the DOM and focus order, unlike hideBelowLg", () => {
      render(
        <WorkspaceNavigation label="Nav" collapsed>
          <button>Reachable</button>
        </WorkspaceNavigation>,
      );
      expect(screen.getByRole("button", { name: "Reachable" })).toBeInTheDocument();
      expect(screen.getByRole("navigation", { name: "Nav" })).not.toHaveClass("hidden");
    });
  });

  describe("accessibility", () => {
    it("a full composed workspace has no axe violations", async () => {
      const { container } = render(<FullWorkspace />);
      expect(await runA11yCheck(container)).toHaveNoA11yViolations();
    });

    it("a collapsed-navigation workspace has no axe violations", async () => {
      const { container } = render(<FullWorkspace collapsed />);
      expect(await runA11yCheck(container)).toHaveNoA11yViolations();
    });

    it("WorkspaceContent requires no more than one <main> per composed workspace", () => {
      render(<FullWorkspace />);
      expect(screen.getAllByRole("main")).toHaveLength(1);
    });
  });
});
