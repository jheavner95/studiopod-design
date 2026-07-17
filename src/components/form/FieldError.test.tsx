import { describe, it, expect } from "vitest";
import { render, screen } from "@test/render";
import { runA11yCheck } from "@test/a11y";
import { FieldError } from "./FieldError";

describe("FieldError", () => {
  describe("rendering", () => {
    it("renders its message", () => {
      render(<FieldError>This field is required</FieldError>);
      expect(screen.getByText("This field is required")).toBeInTheDocument();
    });
  });

  describe("state coverage", () => {
    it("defaults to error tone — role=alert, text-error (DS-5B: from the shared FIELD_MESSAGE_TEXT map)", () => {
      render(<FieldError>Required</FieldError>);
      const message = screen.getByText("Required");
      expect(message).toHaveClass("text-error");
      expect(message).toHaveAttribute("role", "alert");
    });

    it("supports warning tone — role=status, text-warning", () => {
      render(<FieldError tone="warning">Consider reviewing</FieldError>);
      const message = screen.getByText("Consider reviewing");
      expect(message).toHaveClass("text-warning");
      expect(message).toHaveAttribute("role", "status");
    });
  });

  describe("accessibility", () => {
    it("has no axe violations", async () => {
      const { container } = render(<FieldError>Required</FieldError>);
      expect(await runA11yCheck(container)).toHaveNoA11yViolations();
    });
  });
});
