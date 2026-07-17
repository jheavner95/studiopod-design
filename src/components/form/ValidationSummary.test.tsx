import { describe, it, expect } from "vitest";
import { render, screen } from "@test/render";
import { runA11yCheck } from "@test/a11y";
import { ValidationSummary, type ValidationSummaryItem } from "./ValidationSummary";

const ITEMS: ValidationSummaryItem[] = [
  { field: "Email", message: "is required", severity: "error" },
  { field: "Phone", message: "looks unusual", severity: "warning" },
];

describe("ValidationSummary", () => {
  describe("rendering", () => {
    it("renders nothing when there are no items", () => {
      // container.firstChild isn't checked directly: the default render()
      // wrapper always mounts LiveRegionProvider's own aria-live region
      // alongside whatever the component renders (see test/render.tsx) —
      // ValidationSummary's own output is what must be absent.
      render(<ValidationSummary items={[]} />);
      expect(screen.queryByRole("alert")).not.toBeInTheDocument();
      expect(screen.queryByRole("status")).not.toBeInTheDocument();
    });

    it("renders every item's field and message", () => {
      render(<ValidationSummary items={ITEMS} />);
      expect(screen.getByText(/Email:/)).toBeInTheDocument();
      expect(screen.getByText(/is required/)).toBeInTheDocument();
      expect(screen.getByText(/Phone:/)).toBeInTheDocument();
    });
  });

  describe("state coverage", () => {
    it("uses role=alert when any item is an error — DS-5B: severity reuses FieldError's own FieldMessageTone/FIELD_MESSAGE_TEXT, not an independent copy", () => {
      render(<ValidationSummary items={ITEMS} />);
      expect(screen.getByRole("alert")).toBeInTheDocument();
    });

    it("uses role=status when every item is only a warning", () => {
      render(<ValidationSummary items={[{ field: "Phone", message: "looks unusual", severity: "warning" }]} />);
      expect(screen.getByRole("status")).toBeInTheDocument();
    });

    it("links a field to its href when one is given", () => {
      render(<ValidationSummary items={[{ field: "Email", message: "is required", severity: "error", href: "#email" }]} />);
      expect(screen.getByRole("link")).toHaveAttribute("href", "#email");
    });
  });

  describe("accessibility", () => {
    it("has no axe violations", async () => {
      const { container } = render(<ValidationSummary items={ITEMS} />);
      expect(await runA11yCheck(container)).toHaveNoA11yViolations();
    });
  });
});
