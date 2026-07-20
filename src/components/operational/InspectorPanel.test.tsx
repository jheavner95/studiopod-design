import { describe, it, expect } from "vitest";
import { render, screen } from "@test/render";
import { runA11yCheck } from "@test/a11y";
import { InspectorPanel, type InspectorPanelProps } from "./InspectorPanel";
import { PropertyPanel as PropertyPanelAlias } from "./PropertyPanel";
import { InspectorHeader } from "./InspectorHeader";
import { EmptyState } from "@/components/feedback";

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

    it("prefers loading over an explicit isEmpty — precedence is loading, empty, children", () => {
      render(panel({ loading: true, isEmpty: true, emptyState: <span>Nothing here</span>, children: <p>Body</p> }));
      expect(screen.queryByText("Nothing here")).not.toBeInTheDocument();
      expect(screen.queryByText("Nothing selected")).not.toBeInTheDocument();
      expect(screen.queryByText("Body")).not.toBeInTheDocument();
    });
  });

  describe("empty state", () => {
    describe("isEmpty ownership (DS-6.9C3B / R1)", () => {
      it("renders children when isEmpty is false, even with an emptyState supplied", () => {
        render(panel({ isEmpty: false, emptyState: <span>Nothing here</span>, children: <p>Body</p> }));
        expect(screen.getByText("Body")).toBeInTheDocument();
        expect(screen.queryByText("Nothing here")).not.toBeInTheDocument();
      });

      it("renders the empty state when isEmpty is true, suppressing children", () => {
        render(panel({ isEmpty: true, emptyState: <span>Nothing here</span>, children: <p>Body</p> }));
        expect(screen.getByText("Nothing here")).toBeInTheDocument();
        expect(screen.queryByText("Body")).not.toBeInTheDocument();
      });

      it("renders the default empty state when isEmpty is true and no node is given", () => {
        render(panel({ isEmpty: true, children: <p>Body</p> }));
        expect(screen.getByText("Nothing selected")).toBeInTheDocument();
        expect(screen.queryByText("Body")).not.toBeInTheDocument();
      });
    });

    describe("custom empty content", () => {
      it("renders a supplied element as given — the caller owns its title", () => {
        render(
          panel({
            isEmpty: true,
            emptyState: <EmptyState title="No asset selected" description="Pick one from the list." />,
            children: <p>Body</p>,
          }),
        );
        // The caller's title wins; the old hardcoded one must not appear.
        expect(screen.getByText("No asset selected")).toBeInTheDocument();
        expect(screen.getByText("Pick one from the list.")).toBeInTheDocument();
        expect(screen.queryByText("Nothing selected")).not.toBeInTheDocument();
      });

      it("renders arbitrary non-EmptyState content untouched", () => {
        render(panel({ isEmpty: true, emptyState: <button type="button">Create the first asset</button> }));
        expect(screen.getByRole("button", { name: "Create the first asset" })).toBeInTheDocument();
        expect(screen.queryByText("Nothing selected")).not.toBeInTheDocument();
      });
    });

    describe("backwards compatibility", () => {
      /**
       * The pre-R1 contract: a truthy `emptyState` alone switched the panel to
       * its empty state, and a string became the DESCRIPTION under the fixed
       * title "Nothing selected". Both are preserved so no existing caller
       * had to change.
       */
      it("a string still renders as the description under the fixed title", () => {
        render(panel({ emptyState: "Select an asset to inspect", children: <p>Body</p> }));
        expect(screen.getByText("Nothing selected")).toBeInTheDocument();
        expect(screen.getByText("Select an asset to inspect")).toBeInTheDocument();
        expect(screen.queryByText("Body")).not.toBeInTheDocument();
      });

      it("a string still obeys isEmpty when the caller opts in", () => {
        render(panel({ isEmpty: false, emptyState: "Select an asset to inspect", children: <p>Body</p> }));
        expect(screen.getByText("Body")).toBeInTheDocument();
        expect(screen.queryByText("Nothing selected")).not.toBeInTheDocument();
      });

      it("without isEmpty, a truthy emptyState still switches the panel", () => {
        render(panel({ emptyState: <span>Legacy node</span>, children: <p>Body</p> }));
        expect(screen.getByText("Legacy node")).toBeInTheDocument();
        expect(screen.queryByText("Body")).not.toBeInTheDocument();
      });

      it("without isEmpty and without emptyState, children render normally", () => {
        render(panel({ children: <p>Body</p> }));
        expect(screen.getByText("Body")).toBeInTheDocument();
        expect(screen.queryByText("Nothing selected")).not.toBeInTheDocument();
      });
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
      const { container: customEmpty } = render(
        panel({ isEmpty: true, emptyState: <EmptyState title="No asset selected" /> }),
      );
      expect(await runA11yCheck(customEmpty)).toHaveNoA11yViolations();
    });
  });
});
