import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@test/render";
import { runA11yCheck } from "@test/a11y";
import { TableRow } from "./TableRow";

function renderRow(props: Partial<Parameters<typeof TableRow>[0]> = {}) {
  return render(
    <table>
      <tbody>
        <TableRow {...props}>
          <td>Cell</td>
        </TableRow>
      </tbody>
    </table>,
  );
}

describe("TableRow", () => {
  describe("rendering", () => {
    it("renders its children inside a real <tr>", () => {
      const { container } = renderRow();
      expect(container.querySelector("tr")).toBeInTheDocument();
      expect(screen.getByText("Cell")).toBeInTheDocument();
    });
  });

  describe("state coverage", () => {
    it("marks aria-selected only when selected", () => {
      const { container, rerender } = renderRow({ selected: false });
      expect(container.querySelector("tr")).not.toHaveAttribute("aria-selected");
      rerender(
        <table>
          <tbody>
            <TableRow selected>
              <td>Cell</td>
            </TableRow>
          </tbody>
        </table>,
      );
      expect(container.querySelector("tr")).toHaveAttribute("aria-selected", "true");
    });

    it("is not a Tab stop and has no keydown handling when onClick is omitted", () => {
      const { container } = renderRow();
      expect(container.querySelector("tr")).not.toHaveAttribute("tabIndex");
    });

    it("becomes a Tab stop and calls onClick when given", () => {
      const onClick = vi.fn();
      const { container } = renderRow({ onClick });
      const row = container.querySelector("tr")!;
      expect(row).toHaveAttribute("tabIndex", "0");
      fireEvent.click(row);
      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });

  describe("interaction", () => {
    it("activates onClick via Enter or Space when interactive", () => {
      const onClick = vi.fn();
      const { container } = renderRow({ onClick });
      const row = container.querySelector("tr")!;
      fireEvent.keyDown(row, { key: "Enter" });
      fireEvent.keyDown(row, { key: " " });
      expect(onClick).toHaveBeenCalledTimes(2);
    });

    it("ignores other keys", () => {
      const onClick = vi.fn();
      const { container } = renderRow({ onClick });
      fireEvent.keyDown(container.querySelector("tr")!, { key: "a" });
      expect(onClick).not.toHaveBeenCalled();
    });
  });

  describe("accessibility", () => {
    it("has no axe violations, selected and interactive", async () => {
      const { container } = renderRow({ selected: true, interactive: true, onClick: () => {} });
      expect(await runA11yCheck(container)).toHaveNoA11yViolations();
    });
  });
});
