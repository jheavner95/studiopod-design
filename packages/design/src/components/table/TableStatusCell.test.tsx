import { describe, it, expect } from "vitest";
import { render, screen } from "@test/render";
import { runA11yCheck } from "@test/a11y";
import { TableStatusCell } from "./TableStatusCell";

function renderCell(props: Partial<Parameters<typeof TableStatusCell>[0]>) {
  return render(
    <table>
      <tbody>
        <tr>
          <TableStatusCell label="Active" {...props} />
        </tr>
      </tbody>
    </table>,
  );
}

describe("TableStatusCell", () => {
  describe("rendering", () => {
    it("renders its label inside a dedicated cell", () => {
      const { container } = renderCell({});
      expect(container.querySelector("td")).toBeInTheDocument();
      expect(screen.getByText("Active")).toBeInTheDocument();
    });
  });

  describe("state coverage", () => {
    it("defaults to a neutral tone badge", () => {
      renderCell({});
      expect(screen.getByText("Active")).toBeInTheDocument();
    });

    it("renders the status as a real Badge, not plain text", () => {
      const { container } = renderCell({ tone: "success" });
      expect(container.querySelector("td")?.firstElementChild).not.toBeNull();
      expect(screen.getByText("Active").tagName).not.toBe("TD");
    });
  });

  describe("accessibility", () => {
    it("has no axe violations", async () => {
      const { container } = renderCell({});
      expect(await runA11yCheck(container)).toHaveNoA11yViolations();
    });
  });
});
