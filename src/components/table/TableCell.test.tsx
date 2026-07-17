import { describe, it, expect } from "vitest";
import { render, screen } from "@test/render";
import { runA11yCheck } from "@test/a11y";
import { TableCell } from "./TableCell";

function renderCell(props: Partial<Parameters<typeof TableCell>[0]> = {}, children = "Value") {
  return render(
    <table>
      <tbody>
        <tr>
          <TableCell {...props}>{children}</TableCell>
        </tr>
      </tbody>
    </table>,
  );
}

describe("TableCell", () => {
  describe("rendering", () => {
    it("renders its children inside a real <td>", () => {
      const { container } = renderCell();
      expect(container.querySelector("td")).toBeInTheDocument();
      expect(screen.getByText("Value")).toBeInTheDocument();
    });
  });

  describe("state coverage", () => {
    it("defaults to left alignment", () => {
      const { container } = renderCell();
      expect(container.querySelector("td")).toHaveClass("text-left");
    });

    it("supports every alignment", () => {
      const { container, rerender } = renderCell({ align: "center" });
      expect(container.querySelector("td")).toHaveClass("text-center");
      rerender(
        <table>
          <tbody>
            <tr>
              <TableCell align="right">Value</TableCell>
            </tr>
          </tbody>
        </table>,
      );
      expect(container.querySelector("td")).toHaveClass("text-right");
    });

    it("truncates with an ellipsis when truncate is set, instead of wrapping", () => {
      const { container, rerender } = renderCell();
      expect(container.querySelector("td")).toHaveClass("break-words");
      rerender(
        <table>
          <tbody>
            <tr>
              <TableCell truncate>Value</TableCell>
            </tr>
          </tbody>
        </table>,
      );
      expect(container.querySelector("td")).toHaveClass("overflow-hidden", "text-ellipsis", "whitespace-nowrap");
    });

    it("passes colSpan and title through to the native td", () => {
      const { container } = renderCell({ colSpan: 3, title: "Full value" });
      const td = container.querySelector("td")!;
      expect(td).toHaveAttribute("colspan", "3");
      expect(td).toHaveAttribute("title", "Full value");
    });
  });

  describe("accessibility", () => {
    it("has no axe violations", async () => {
      const { container } = renderCell();
      expect(await runA11yCheck(container)).toHaveNoA11yViolations();
    });
  });
});
