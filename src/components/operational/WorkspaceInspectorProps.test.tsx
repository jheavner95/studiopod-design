/**
 * DS-6.9C3A — supplementary coverage for WorkspaceInspector.
 *
 * WorkspaceInspector lives in `layout` and is already partly covered by
 * Workspace.test.tsx, which asserts `width`, `collapsed` and the shared
 * hide-below-lg behaviour. This file closes the remaining gaps so that every
 * exported prop of the Inspector family — including its container — carries at
 * least one behavioural assertion: `label`, `scroll`, `hideBelowLg` in both
 * directions, `className`, and the semantic element it renders.
 *
 * It lives beside the Inspector family rather than in Workspace.test.tsx so
 * the family's coverage can be audited as one unit.
 */
import { describe, it, expect } from "vitest";
import { render, screen } from "@test/render";
import { runA11yCheck } from "@test/a11y";
import { WorkspaceInspector } from "@/components/layout";
import { InspectorPanel } from "./InspectorPanel";
import { InspectorHeader } from "./InspectorHeader";

describe("WorkspaceInspector (Inspector family container)", () => {
  describe("semantics", () => {
    it("renders a complementary landmark — an aside, not a plain div", () => {
      render(
        <WorkspaceInspector label="Asset Inspector" hideBelowLg={false}>
          x
        </WorkspaceInspector>,
      );
      const aside = screen.getByRole("complementary", { name: "Asset Inspector" });
      expect(aside.tagName).toBe("ASIDE");
    });

    it("takes its accessible name from label", () => {
      render(
        <WorkspaceInspector label="Product Inspector" hideBelowLg={false}>
          x
        </WorkspaceInspector>,
      );
      expect(screen.getByRole("complementary", { name: "Product Inspector" })).toBeInTheDocument();
    });
  });

  describe("width handling", () => {
    it("defaults to 20rem when no width is given", () => {
      render(
        <WorkspaceInspector label="Inspector" hideBelowLg={false}>
          x
        </WorkspaceInspector>,
      );
      expect(screen.getByRole("complementary", { name: "Inspector" })).toHaveStyle({ width: "20rem" });
    });

    it("accepts a string width as well as a number", () => {
      render(
        <WorkspaceInspector label="Inspector" width="22.5rem" hideBelowLg={false}>
          x
        </WorkspaceInspector>,
      );
      expect(screen.getByRole("complementary", { name: "Inspector" })).toHaveStyle({ width: "22.5rem" });
    });

    it("drops the inline width entirely when collapsed, so the rail class governs", () => {
      render(
        <WorkspaceInspector label="Inspector" width={400} collapsed hideBelowLg={false}>
          x
        </WorkspaceInspector>,
      );
      const aside = screen.getByRole("complementary", { name: "Inspector" });
      expect(aside.style.width).toBe("");
      expect(aside).toHaveClass("w-14");
    });
  });

  describe("responsive behaviour", () => {
    /**
     * The default hides the inspector below `lg`. DS-6.9C2 flagged this as a
     * documentation gap rather than a defect: it is a sensible default, but
     * not universal — /settings/overlay-generator deliberately keeps a panel
     * visible on small screens and must opt out.
     */
    it("hides below lg by default", () => {
      render(<WorkspaceInspector label="Inspector">x</WorkspaceInspector>);
      const aside = screen.getByRole("complementary", { name: "Inspector" });
      expect(aside).toHaveClass("hidden", "lg:flex");
    });

    it("stays visible at every width when hideBelowLg is false", () => {
      render(
        <WorkspaceInspector label="Inspector" hideBelowLg={false}>
          x
        </WorkspaceInspector>,
      );
      const aside = screen.getByRole("complementary", { name: "Inspector" });
      expect(aside).not.toHaveClass("hidden");
      expect(aside).toHaveClass("flex");
    });
  });

  describe("scroll ownership", () => {
    it("does not scroll by default — the panel inside owns scrolling", () => {
      render(
        <WorkspaceInspector label="Inspector" hideBelowLg={false}>
          x
        </WorkspaceInspector>,
      );
      expect(screen.getByRole("complementary", { name: "Inspector" })).toHaveClass("overflow-hidden");
    });

    it("takes over scrolling when scroll is set", () => {
      render(
        <WorkspaceInspector label="Inspector" scroll hideBelowLg={false}>
          x
        </WorkspaceInspector>,
      );
      expect(screen.getByRole("complementary", { name: "Inspector" })).toHaveClass("overflow-y-auto");
    });
  });

  describe("composition with InspectorPanel", () => {
    it("hosts a full panel without either layer swallowing the other's content", () => {
      render(
        <WorkspaceInspector label="Asset Inspector" hideBelowLg={false}>
          <InspectorPanel header={<InspectorHeader name="Hero Image" type="Asset" />}>
            <p>Panel body</p>
          </InspectorPanel>
        </WorkspaceInspector>,
      );
      expect(screen.getByRole("complementary", { name: "Asset Inspector" })).toBeInTheDocument();
      expect(screen.getByText("Hero Image")).toBeInTheDocument();
      expect(screen.getByText("Panel body")).toBeInTheDocument();
    });

    it("forwards className", () => {
      render(
        <WorkspaceInspector label="Inspector" className="custom-aside" hideBelowLg={false}>
          x
        </WorkspaceInspector>,
      );
      expect(screen.getByRole("complementary", { name: "Inspector" })).toHaveClass("custom-aside");
    });

    it("has no axe violations hosting a real panel", async () => {
      const { container } = render(
        <WorkspaceInspector label="Asset Inspector" hideBelowLg={false}>
          <InspectorPanel header={<InspectorHeader name="Hero Image" onCollapse={() => {}} />}>
            <p>Panel body</p>
          </InspectorPanel>
        </WorkspaceInspector>,
      );
      expect(await runA11yCheck(container)).toHaveNoA11yViolations();
    });
  });
});
