import { describe, it, expect } from "vitest";
import { render, screen } from "@test/render";
import { runA11yCheck } from "@test/a11y";
import { Stepper, type Step } from "./Stepper";

const STEPS: Step[] = [
  { id: "details", label: "Details" },
  { id: "review", label: "Review" },
  { id: "publish", label: "Publish" },
];

describe("Stepper", () => {
  describe("rendering", () => {
    it("renders every step's label", () => {
      render(<Stepper steps={STEPS} currentIndex={1} />);
      expect(screen.getByText("Details")).toBeInTheDocument();
      expect(screen.getByText("Review")).toBeInTheDocument();
      expect(screen.getByText("Publish")).toBeInTheDocument();
    });

    it("renders each marker's number when numbered", () => {
      render(<Stepper steps={STEPS} currentIndex={0} />);
      expect(screen.getByText("2")).toBeInTheDocument();
      expect(screen.getByText("3")).toBeInTheDocument();
    });
  });

  describe("state coverage", () => {
    it("marks the step at currentIndex as current, via aria-current=step — not 'page', correctly distinct from every other navigation-family component's current-item convention", () => {
      const { container } = render(<Stepper steps={STEPS} currentIndex={1} />);
      const current = container.querySelector('[aria-current="step"]');
      expect(current).toBeInTheDocument();
      expect(current?.closest("li")).toHaveTextContent("Review");
    });

    it("marks every step before currentIndex as complete", () => {
      const { container } = render(<Stepper steps={STEPS} currentIndex={2} />);
      expect(container.querySelectorAll("span.bg-success")).toHaveLength(2);
    });

    it("marks the step at errorIndex as errored instead of its computed status", () => {
      const { container } = render(<Stepper steps={STEPS} currentIndex={2} errorIndex={0} />);
      expect(container.querySelectorAll("span.bg-error")).toHaveLength(1);
    });

    it("is not interactive — no clickable markers, per its own read-only-progress contract", () => {
      const { container } = render(<Stepper steps={STEPS} currentIndex={0} />);
      expect(container.querySelector("button")).not.toBeInTheDocument();
    });

    it("supports vertical orientation", () => {
      render(<Stepper steps={STEPS} currentIndex={0} orientation="vertical" />);
      expect(screen.getByRole("list")).toHaveClass("flex-col");
    });
  });

  describe("accessibility", () => {
    it("has no axe violations", async () => {
      const { container } = render(<Stepper steps={STEPS} currentIndex={1} errorIndex={2} />);
      expect(await runA11yCheck(container)).toHaveNoA11yViolations();
    });
  });
});
