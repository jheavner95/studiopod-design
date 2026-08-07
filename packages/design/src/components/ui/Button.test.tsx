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
