import { describe, it, expect } from "vitest";
import { render } from "@test/render";
import { runA11yCheck } from "@test/a11y";
import { TableLoadingState } from "./TableLoadingState";

function renderRows(props: Partial<Parameters<typeof TableLoadingState>[0]>) {
  return render(
    <table>
      <tbody>
        <TableLoadingState columns={3} {...props} />
      </tbody>
    </table>,
  );
}

describe("TableLoadingState", () => {
  describe("rendering", () => {
    it("renders 5 skeleton rows by default", () => {
      const { container } = renderRows({});
      expect(container.querySelectorAll("tr")).toHaveLength(5);
    });

    it("renders the given number of rows and columns", () => {
      const { container } = renderRows({ rows: 2, columns: 4 });
      expect(container.querySelectorAll("tr")).toHaveLength(2);
      expect(container.querySelectorAll("tr")[0].querySelectorAll("td")).toHaveLength(4);
    });
  });

  describe("state coverage", () => {
    it("renders a Skeleton placeholder in every cell", () => {
      const { container } = renderRows({ rows: 1, columns: 2 });
      expect(container.querySelectorAll("td .animate-pulse")).toHaveLength(2);
    });
  });

  describe("accessibility", () => {
    it("has no axe violations", async () => {
      const { container } = renderRows({});
      expect(await runA11yCheck(container)).toHaveNoA11yViolations();
    });
  });
});
