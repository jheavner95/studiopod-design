import { describe, it, expect } from "vitest";
import { render, screen } from "@test/render";
import { runA11yCheck } from "@test/a11y";
import { InspectorPanel, type InspectorPanelProps } from "./InspectorPanel";
import { PropertyPanel as PropertyPanelAlias } from "./PropertyPanel";
import { InspectorHeader } from "./InspectorHeader";

function panel(props: Partial<InspectorPanelProps> = {}) {
  return <InspectorPanel header={<InspectorHeader name="Hero Image" />} {...props} />;
}

describe("InspectorPanel", () => {
  describe("composition and slots", () => {
    it("renders the header slot above the body", () => {
      render(panel({ children: <p>Body</p> }));
      const header = screen.getByText("Hero Image");
      const body = screen.getByText("Body");
      // compareDocumentPosition: header precedes body in document order.
      expect(header.compareDocumentPosition(body) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    });

    it("renders the optional tabs slot, and omits it entirely when not given", () => {
      const { rerender } = render(panel({ children: <p>Body</p> }));
      expect(screen.queryByTestId("tabs")).not.toBeInTheDocument();
      rerender(panel({ tabs: <div data-testid="tabs">Tabs</div>, children: <p>Body</p> }));
      expect(screen.getByTestId("tabs")).toBeInTheDocument();
    });

    it("renders the optional footer slot below the body", () => {
      render(panel({ children: <p>Body</p>, footer: <div>Footer</div> }));
      const body = screen.getByText("Body");
      const footer = screen.getByText("Footer");
      expect(body.compareDocumentPosition(footer) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    });

    it("renders without children — tabs may own all the content", () => {
      render(panel({ tabs: <div>Only tabs</div> }));
      expect(screen.getByText("Only tabs")).toBeInTheDocument();
    });

    it("forwards className to the panel surface", () => {
      const { container } = render(panel({ children: <p>Body</p>, className: "custom-panel" }));
      expect(container.querySelector(".custom-panel")).toBeInTheDocument();
    });

    it("applies maxHeight to the scrolling body, not the whole panel", () => {
      const { container } = render(panel({ children: <p>Body</p>, maxHeight: "42rem" }));
      const scoped = container.querySelector('[style*="42rem"]');
      expect(scoped).toBeInTheDocument();
      // The Surface itself must not be the element carrying maxHeight.
      expect(container.firstElementChild).not.toBe(scoped);
    });
  });

  describe("loading state", () => {
    it("replaces children with a loading state when loading", () => {
      render(panel({ loading: true, children: <p>Body</p> }));
      expect(screen.queryByText("Body")).not.toBeInTheDocument();
    });

    it("renders children when loading is false", () => {
      render(panel({ loading: false, children: <p>Body</p> }));
      expect(screen.getByText("Body")).toBeInTheDocument();
    });

    it("surfaces loadingLabel to the user", () => {
      render(panel({ loading: true, loadingLabel: "Fetching asset…", children: <p>Body</p> }));
      expect(screen.getByText("Fetching asset…")).toBeInTheDocument();
    });

    it("keeps the header visible while loading — identity outlives the fetch", () => {
      render(panel({ loading: true, children: <p>Body</p> }));
      expect(screen.getByText("Hero Image")).toBeInTheDocument();
    });

    it("prefers loading over emptyState when both are supplied", () => {
      render(panel({ loading: true, emptyState: "Pick something", children: <p>Body</p> }));
      expect(screen.queryByText("Pick something")).not.toBeInTheDocument();
      expect(screen.queryByText("Body")).not.toBeInTheDocument();
    });
  });

  describe("empty state", () => {
    it("renders the empty state in place of children when supplied", () => {
      render(panel({ emptyState: "Select an asset to inspect", children: <p>Body</p> }));
      expect(screen.getByText("Select an asset to inspect")).toBeInTheDocument();
      expect(screen.queryByText("Body")).not.toBeInTheDocument();
    });

    it("renders children when emptyState is omitted", () => {
      render(panel({ children: <p>Body</p> }));
      expect(screen.getByText("Body")).toBeInTheDocument();
    });

    /**
     * DS-6.9C2 finding R1, pinned as behaviour rather than asserted as correct.
     * `emptyState` is truthy-checked rather than driven by an explicit
     * `isEmpty` flag, and the EmptyState title is hardcoded to "Nothing
     * selected" with the caller's node used as the DESCRIPTION. A caller who
     * passes a constant emptyState therefore never renders children at all.
     * These two tests exist so that if R1 changes the contract, the change is
     * deliberate and visible rather than silent.
     */
    it("hardcodes the empty-state title and demotes the caller's node to description", () => {
      render(panel({ emptyState: "Select an asset to inspect", children: <p>Body</p> }));
      expect(screen.getByText("Nothing selected")).toBeInTheDocument();
    });

    it("suppresses children whenever emptyState is truthy — even with content available", () => {
      render(panel({ emptyState: <span>Always passed</span>, children: <p>Real content</p> }));
      expect(screen.queryByText("Real content")).not.toBeInTheDocument();
    });
  });

  describe("re-export alias", () => {
    it("PropertyPanel is the same component as InspectorPanel, not a copy", () => {
      expect(PropertyPanelAlias).toBe(InspectorPanel);
    });

    it("renders identically through either name", () => {
      const { container: viaInspector } = render(panel({ children: <p>Body</p> }));
      const { container: viaProperty } = render(
        <PropertyPanelAlias header={<InspectorHeader name="Hero Image" />}>
          <p>Body</p>
        </PropertyPanelAlias>,
      );
      expect(viaProperty.innerHTML).toBe(viaInspector.innerHTML);
    });
  });

  describe("accessibility", () => {
    it("has no axe violations in its default composition", async () => {
      const { container } = render(panel({ children: <p>Body</p>, footer: <div>Footer</div> }));
      expect(await runA11yCheck(container)).toHaveNoA11yViolations();
    });

    it("has no axe violations while loading or empty", async () => {
      const { container: loading } = render(panel({ loading: true }));
      expect(await runA11yCheck(loading)).toHaveNoA11yViolations();
      const { container: empty } = render(panel({ emptyState: "Nothing here" }));
      expect(await runA11yCheck(empty)).toHaveNoA11yViolations();
    });
  });
});
