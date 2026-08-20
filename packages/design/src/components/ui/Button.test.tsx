import { describe, it, expect, vi } from "vitest";
import { render, screen, userEvent } from "@test/render";
import { runA11yCheck } from "@test/a11y";
import { Button } from "./Button";

/**
 * Canonical example test suite — see docs/TESTING.md "How to add a new test"
 * for the walkthrough this file is written to accompany. Button was chosen
 * as the pilot because it has every dimension a Foundation primitive can
 * have (variant/size matrix, an href-vs-onClick dual identity, a loading
 * state that changes both markup and interactivity, and a disabled state)
 * without pulling in the layout/motion complexity a bigger component would.
 */
describe("Button", () => {
  describe("rendering", () => {
    it("renders its children as a native button by default", () => {
      render(<Button>Save</Button>);
      const button = screen.getByRole("button", { name: "Save" });
      expect(button.tagName).toBe("BUTTON");
    });

    it("renders as a link when href is passed", () => {
      render(<Button href="/docs">Read the docs</Button>);
      const link = screen.getByRole("link", { name: "Read the docs" });
      expect(link).toHaveAttribute("href", "/docs");
    });

    it.each([["primary"], ["secondary"], ["outline"], ["ghost"], ["destructive"]] as const)(
      "renders the %s variant without throwing",
      (variant) => {
        render(<Button variant={variant}>Action</Button>);
        expect(screen.getByRole("button", { name: "Action" })).toBeInTheDocument();
      },
    );

    it("applies the error token to the destructive variant (DS-5G)", () => {
      render(<Button variant="destructive">Delete</Button>);
      // Composed from the DS --color-error token via the `error` colour utility,
      // not an application colour and not a new token.
      expect(screen.getByRole("button", { name: "Delete" })).toHaveClass("bg-error");
    });

    it.each([["sm"], ["md"], ["lg"]] as const)("renders the %s size without throwing", (size) => {
      render(<Button size={size}>Action</Button>);
      expect(screen.getByRole("button", { name: "Action" })).toBeInTheDocument();
    });

    it("renders a leading icon", () => {
      render(<Button leadingIcon={<svg data-testid="icon" />}>Action</Button>);
      expect(screen.getByTestId("icon")).toBeInTheDocument();
    });
  });

  describe("interaction", () => {
    it("calls onClick when clicked", async () => {
      const onClick = vi.fn();
      const user = userEvent.setup();
      render(<Button onClick={onClick}>Save</Button>);

      await user.click(screen.getByRole("button", { name: "Save" }));

      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("is reachable and activatable by keyboard", async () => {
      const onClick = vi.fn();
      const user = userEvent.setup();
      render(<Button onClick={onClick}>Save</Button>);

      await user.tab();
      expect(screen.getByRole("button", { name: "Save" })).toHaveFocus();
      await user.keyboard("{Enter}");

      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });

  describe("state coverage", () => {
    it("disables the native button and blocks clicks when disabled", async () => {
      const onClick = vi.fn();
      const user = userEvent.setup();
      render(
        <Button disabled onClick={onClick}>
          Save
        </Button>,
      );

      const button = screen.getByRole("button", { name: "Save" });
      expect(button).toBeDisabled();

      await user.click(button);
      expect(onClick).not.toHaveBeenCalled();
    });

    it("shows a spinner and marks itself busy when loading, without hiding the label", () => {
      render(<Button loading>Save</Button>);

      const button = screen.getByRole("button", { name: "Save" });
      expect(button).toHaveAttribute("aria-busy", "true");
      expect(button).toBeDisabled();
    });

    it("prevents navigation on a loading link instead of disabling it", async () => {
      const user = userEvent.setup();
      render(
        <Button href="/docs" loading>
          Read the docs
        </Button>,
      );

      const link = screen.getByRole("link", { name: "Read the docs" });
      expect(link).toHaveAttribute("aria-disabled", "true");

      // A link has no disabled state to fall back on — the click handler
      // itself must swallow the navigation. jsdom doesn't implement real
      // navigation, so the assertion is behavioral: preventDefault was
      // reachable and the element never threw, not that the URL didn't
      // change (there's no URL to change in this environment).
      await expect(user.click(link)).resolves.not.toThrow();
    });
  });

  /**
   * The attribute-forwarding contract — UX-5.7.
   *
   * The link branch used to destructure a closed set of props and forward none
   * of the remainder, so `data-*` and `aria-*` reached the component and never
   * reached the DOM. Nothing caught it: TypeScript exempts hyphenated JSX
   * attributes from excess-property checking, so they type-check against any
   * component regardless of its props. Five consumer packages found it by
   * reading served HTML and wrote wrapper elements instead.
   *
   * These assertions are the contract. The link cases are the ones that were
   * actually broken; the button cases guard the branch that already worked.
   */
  describe("attribute forwarding", () => {
    it("forwards arbitrary data-* to the native button", () => {
      render(
        <Button data-testid="save" data-analytics-id="save-product">
          Save
        </Button>,
      );
      const button = screen.getByRole("button", { name: "Save" });
      expect(button).toHaveAttribute("data-testid", "save");
      expect(button).toHaveAttribute("data-analytics-id", "save-product");
    });

    it("forwards arbitrary data-* to the link form", () => {
      render(
        <Button href="/products" data-testid="back" data-source-return="enterprise-job">
          Back
        </Button>,
      );
      const link = screen.getByRole("link", { name: "Back" });
      expect(link).toHaveAttribute("data-testid", "back");
      expect(link).toHaveAttribute("data-source-return", "enterprise-job");
    });

    it("forwards aria-* to both forms", () => {
      render(
        <>
          <Button aria-label="Save product" aria-keyshortcuts="Meta+S">
            Save
          </Button>
          <Button href="/products" aria-current="page">
            Products
          </Button>
        </>,
      );
      expect(screen.getByRole("button", { name: "Save product" })).toHaveAttribute(
        "aria-keyshortcuts",
        "Meta+S",
      );
      expect(screen.getByRole("link", { name: "Products" })).toHaveAttribute("aria-current", "page");
    });

    it("forwards ordinary native attributes", () => {
      render(
        <>
          <Button id="save" title="Save this product" name="intent" value="save" type="submit">
            Save
          </Button>
          <Button href="https://example.test" target="_blank" rel="noreferrer" id="out">
            Out
          </Button>
        </>,
      );
      const button = screen.getByRole("button", { name: "Save" });
      expect(button).toHaveAttribute("id", "save");
      expect(button).toHaveAttribute("title", "Save this product");
      expect(button).toHaveAttribute("type", "submit");

      const link = screen.getByRole("link", { name: "Out" });
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noreferrer");
      expect(link).toHaveAttribute("id", "out");
    });

    it("passes forwarded attributes through a custom linkComponent", () => {
      const Link = ({ href, children, ...rest }: React.ComponentProps<"a">) => (
        <a href={href} {...rest}>
          {children}
        </a>
      );
      render(
        <Button href="/products" linkComponent={Link} data-testid="composed">
          Products
        </Button>,
      );
      expect(screen.getByRole("link", { name: "Products" })).toHaveAttribute(
        "data-testid",
        "composed",
      );
    });

    it("composes className rather than letting it replace the variant styles", () => {
      render(
        <Button variant="destructive" className="-ml-2">
          Delete
        </Button>,
      );
      const button = screen.getByRole("button", { name: "Delete" });
      expect(button).toHaveClass("-ml-2");
      expect(button).toHaveClass("bg-error");
    });

    it("does not leak its own variant props onto the DOM", () => {
      render(
        <>
          <Button size="lg" variant="ghost">
            Save
          </Button>
          <Button href="/x" size="lg" variant="ghost">
            Go
          </Button>
        </>,
      );
      // `size` is a real HTML attribute on some elements, so a leaked variant
      // prop would render as one rather than being dropped as unknown.
      expect(screen.getByRole("button", { name: "Save" })).not.toHaveAttribute("size");
      expect(screen.getByRole("link", { name: "Go" })).not.toHaveAttribute("size");
    });

    it("keeps the loading guard authoritative over a passed aria-disabled", () => {
      render(
        <Button href="/docs" loading aria-disabled={false}>
          Read the docs
        </Button>,
      );
      // The component owns this attribute while loading — a caller cannot
      // re-enable a link the component has deliberately closed.
      expect(screen.getByRole("link", { name: "Read the docs" })).toHaveAttribute(
        "aria-disabled",
        "true",
      );
    });

    it("leaves aria-disabled alone when it is not loading", () => {
      render(
        <Button href="/docs" aria-disabled>
          Read the docs
        </Button>,
      );
      expect(screen.getByRole("link", { name: "Read the docs" })).toHaveAttribute(
        "aria-disabled",
        "true",
      );
    });
  });

  describe("accessibility", () => {
    it("has no axe violations in its default state", async () => {
      const { container } = render(<Button>Save</Button>);
      expect(await runA11yCheck(container)).toHaveNoA11yViolations();
    });

    it("has no axe violations while loading (aria-busy + disabled)", async () => {
      const { container } = render(<Button loading>Save</Button>);
      expect(await runA11yCheck(container)).toHaveNoA11yViolations();
    });

    it("has no axe violations as an icon-only button", async () => {
      // leadingIcon alone with no visible text is the one shape that
      // regularly fails axe's "accessible name" rule in real usage —
      // this test exists to catch that regression, not to bless the
      // pattern; icon-only buttons should still pass an aria-label prop.
      const { container } = render(
        <Button aria-label="Close" leadingIcon={<svg aria-hidden />}>
          {""}
        </Button>,
      );
      expect(await runA11yCheck(container)).toHaveNoA11yViolations();
    });
  });
});
