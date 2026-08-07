import { describe, it, expect } from "vitest";
import { render, screen } from "@test/render";
import { runA11yCheck } from "@test/a11y";
import { Grid, gapMap } from "./Grid";

describe("Grid", () => {
  describe("rendering", () => {
    it("renders its children in a grid", () => {
      render(<Grid>Body</Grid>);
      expect(screen.getByText("Body")).toHaveClass("grid");
    });

    it("switches to an inline gridTemplateColumns for auto-fit/auto-fill", () => {
      render(
        <Grid columns="auto-fit" minChildWidth="200px">
          Body
        </Grid>,
      );
      expect(screen.getByText("Body")).toHaveStyle({ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" });
    });
  });

  describe("state coverage", () => {
    it("defaults to md gap", () => {
      render(<Grid>Body</Grid>);
      expect(screen.getByText("Body")).toHaveClass("gap-6");
    });

    it("supports every value on its own 3-level gap scale — CardGrid imports this exact map (DS-5A/DS-4 dedup)", () => {
      const { rerender } = render(<Grid gap="sm">Body</Grid>);
      expect(screen.getByText("Body")).toHaveClass("gap-4");
      rerender(<Grid gap="lg">Body</Grid>);
      expect(screen.getByText("Body")).toHaveClass("gap-8");
    });

    it("exports gapMap with exactly the three documented keys", () => {
      expect(Object.keys(gapMap).sort()).toEqual(["lg", "md", "sm"]);
    });
  });

  describe("accessibility", () => {
    it("has no axe violations", async () => {
      const { container } = render(<Grid>Body</Grid>);
      expect(await runA11yCheck(container)).toHaveNoA11yViolations();
    });
  });
});
