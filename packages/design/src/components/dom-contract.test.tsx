import { describe, it, expect, vi } from "vitest";
import { render, screen, userEvent } from "@test/render";
import { Alert } from "./feedback/Alert";
import { Badge } from "./ui/Badge";
import { Panel } from "./layout/Panel";
import { Stack } from "./layout/Stack";
import { Surface } from "./layout/Surface";

/**
 * The DOM contract, as one suite — UX-5.7A.
 *
 * A component that owns a native element exposes that element's contract.
 * These assertions are what makes that claim checkable rather than aspirational,
 * and they exist because the failure mode is silent: TypeScript exempts
 * hyphenated JSX attributes from excess-property checking, so `data-*` and
 * `aria-*` type-check against any component whether or not its props admit
 * them. A closed component accepts the attribute at compile time and discards
 * it at render, leaving the served DOM as the only place to notice.
 *
 * Each primitive here is tested for the same four things — arbitrary `data-*`,
 * `aria-*`, an identifier, and that the component's own semantics still win —
 * because the contract is meant to be uniform enough to rely on without
 * reading each implementation.
 */

/** The element a caller addresses, per component. See the DOM ownership model. */
const OWNERS = [
  { name: "Surface", render: (p: object) => <Surface {...p}>content</Surface>, tag: "DIV" },
  { name: "Stack", render: (p: object) => <Stack {...p}>content</Stack>, tag: "DIV" },
  { name: "Panel", render: (p: object) => <Panel {...p}>content</Panel>, tag: "DIV" },
  { name: "Badge", render: (p: object) => <Badge {...p}>ready</Badge>, tag: "SPAN" },
  { name: "Alert", render: (p: object) => <Alert {...p}>something happened</Alert>, tag: "DIV" },
] as const;

describe("DOM contract", () => {
  describe.each(OWNERS)("$name", ({ render: renderIt, tag }) => {
    it("forwards arbitrary data-* to the element it owns", () => {
      const { container } = render(renderIt({ "data-example": "value", "data-testid": "owned" }));
      const el = container.querySelector("[data-example]");
      expect(el).not.toBeNull();
      expect(el).toHaveAttribute("data-example", "value");
      expect(el).toHaveAttribute("data-testid", "owned");
      expect(el?.tagName).toBe(tag);
    });

    it("forwards aria-* so a caller can draw a real relationship", () => {
      const { container } = render(
        renderIt({ "aria-label": "described thing", "aria-describedby": "somewhere" }),
      );
      const el = container.querySelector("[aria-describedby]");
      expect(el).toHaveAttribute("aria-describedby", "somewhere");
      expect(el).toHaveAttribute("aria-label", "described thing");
    });

    it("forwards an identifier, so aria-describedby can point at it", () => {
      const { container } = render(renderIt({ id: "an-id" }));
      expect(container.querySelector("#an-id")).not.toBeNull();
    });

    it("applies className to the element it owns", () => {
      const { container } = render(renderIt({ className: "caller-class", "data-root": "" }));
      expect(container.querySelector("[data-root]")).toHaveClass("caller-class");
    });
  });

  /*
   * Composition is asserted only where the component actually brings classes
   * of its own. `Alert` is the exception and it is not a defect: its owned
   * element is a semantic wrapper carrying the role, and the visual treatment
   * sits on the `Surface` inside it. A test that demanded composition there
   * would be demanding the component have styling it deliberately does not.
   */
  describe.each([
    { name: "Surface", render: (p: object) => <Surface {...p}>c</Surface> },
    { name: "Stack", render: (p: object) => <Stack {...p}>c</Stack> },
    { name: "Panel", render: (p: object) => <Panel {...p}>c</Panel> },
    { name: "Badge", render: (p: object) => <Badge {...p}>c</Badge> },
  ])("$name composes rather than replaces", ({ render: renderIt }) => {
    it("keeps its own classes alongside the caller's", () => {
      const { container } = render(renderIt({ className: "caller-class", "data-root": "" }));
      const el = container.querySelector("[data-root]");
      expect(el).toHaveClass("caller-class");
      expect(el?.className.split(" ").length).toBeGreaterThan(1);
    });
  });

  /*
   * Precedence — the component keeps what it must, and yields what it need not.
   */
  describe("precedence", () => {
    it("Alert keeps the role it derives from tone", () => {
      // `role` is computed from severity by a documented rule; a caller cannot
      // silently turn a warning into an assertive announcement.
      const { container } = render(
        <Alert tone="warning" role="alert">
          careful
        </Alert>,
      );
      expect(container.querySelector("[role]")).toHaveAttribute("role", "status");
    });

    it("Alert announces an error assertively and everything else politely", () => {
      const { container: error } = render(<Alert tone="error">broken</Alert>);
      const { container: info } = render(<Alert tone="info">noted</Alert>);
      expect(error.querySelector("[role]")).toHaveAttribute("role", "alert");
      expect(info.querySelector("[role]")).toHaveAttribute("role", "status");
    });

    it("Surface yields role, because nothing it computes depends on one", () => {
      const { container } = render(<Surface role="region">content</Surface>);
      expect(container.querySelector("[role]")).toHaveAttribute("role", "region");
    });
  });

  describe("event handlers", () => {
    it("reach the element that owns them", async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();
      render(
        <Stack onClick={onClick} data-root="">
          <span>click target</span>
        </Stack>,
      );
      await user.click(screen.getByText("click target"));
      expect(onClick).toHaveBeenCalledOnce();
    });
  });

  describe("intentional restrictions", () => {
    it("Badge is a status, not a control", () => {
      // Nothing here makes it interactive: no role, no tabindex, no handler
      // by default. A status that needs an action gets a Button beside it.
      const { container } = render(<Badge tone="success">Ready</Badge>);
      const el = container.querySelector("span");
      expect(el).not.toHaveAttribute("role");
      expect(el).not.toHaveAttribute("tabindex");
    });

    it("Badge's dot never carries the meaning on its own", () => {
      const { container } = render(
        <Badge tone="error" dot>
          Blocked
        </Badge>,
      );
      // The mark is decorative; the word is the state.
      expect(container.querySelector("[aria-hidden='true']")).not.toBeNull();
      expect(container.textContent).toContain("Blocked");
    });
  });
});
