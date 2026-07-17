import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@test/render";
import { runA11yCheck } from "@test/a11y";
import { TableSelectionCell } from "./TableSelectionCell";

function renderCell(props: Partial<Parameters<typeof TableSelectionCell>[0]>) {
  return render(
    <table>
      <tbody>
        <tr>
          <TableSelectionCell checked={false} onChange={() => {}} label="Select row" {...props} />
        </tr>
      </tbody>
    </table>,
  );
}

describe("TableSelectionCell", () => {
  describe("rendering", () => {
    it("renders a checkbox labeled by the given label", () => {
      renderCell({ label: "Select Homepage banner" });
      expect(screen.getByRole("checkbox", { name: "Select Homepage banner" })).toBeInTheDocument();
    });

    it("renders as a <td> by default, and a <th> when as='th'", () => {
      const { container, rerender } = renderCell({});
      expect(container.querySelector("td")).toBeInTheDocument();
      rerender(
        <table>
          <thead>
            <tr>
              <TableSelectionCell checked={false} onChange={() => {}} label="Select all" as="th" />
            </tr>
          </thead>
        </table>,
      );
      expect(container.querySelector("th")).toBeInTheDocument();
    });
  });

  describe("state coverage", () => {
    it("reflects checked/indeterminate/disabled on the underlying checkbox", () => {
      const { rerender } = renderCell({ checked: true });
      expect(screen.getByRole("checkbox")).toBeChecked();
      rerender(
        <table>
          <tbody>
            <tr>
              <TableSelectionCell checked={false} onChange={() => {}} label="Select row" disabled />
            </tr>
          </tbody>
        </table>,
      );
      expect(screen.getByRole("checkbox")).toBeDisabled();
    });

    it("calls onChange with the new checked value", () => {
      const onChange = vi.fn();
      renderCell({ onChange });
      fireEvent.click(screen.getByRole("checkbox"));
      expect(onChange).toHaveBeenCalledWith(true);
    });

    it("stops the click from propagating to a parent row's own onClick", () => {
      const onRowClick = vi.fn();
      render(
        <table>
          <tbody>
            <tr onClick={onRowClick}>
              <TableSelectionCell checked={false} onChange={() => {}} label="Select row" />
            </tr>
          </tbody>
        </table>,
      );
      fireEvent.click(screen.getByRole("checkbox").closest("td")!);
      expect(onRowClick).not.toHaveBeenCalled();
    });
  });

  describe("accessibility", () => {
    it("has no axe violations", async () => {
      const { container } = renderCell({});
      expect(await runA11yCheck(container)).toHaveNoA11yViolations();
    });
  });
});
