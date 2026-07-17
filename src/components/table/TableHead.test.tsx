import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@test/render";
import { runA11yCheck } from "@test/a11y";
import { TableHead } from "./TableHead";

function renderHead(props: Partial<Parameters<typeof TableHead>[0]> = {}) {
  return render(
    <table>
      <thead>
        <tr>
          <TableHead {...props}>Name</TableHead>
        </tr>
      </thead>
    </table>,
  );
}

describe("TableHead", () => {
  describe("rendering", () => {
    it("renders its children inside a real <th>", () => {
      const { container } = renderHead();
      expect(container.querySelector("th")).toBeInTheDocument();
      expect(screen.getByText("Name")).toBeInTheDocument();
    });

    it("renders a plain header with no button when not sortable", () => {
      renderHead();
      expect(screen.queryByRole("button")).not.toBeInTheDocument();
    });

    it("renders a real button wrapping the label when sortable — keyboard-operable, unlike a clickable th", () => {
      renderHead({ sortable: true });
      expect(screen.getByRole("button", { name: "Name" })).toBeInTheDocument();
    });
  });

  describe("state coverage", () => {
    it("defaults scope to col, and supports row", () => {
      const { container, rerender } = renderHead();
      expect(container.querySelector("th")).toHaveAttribute("scope", "col");
      rerender(
        <table>
          <thead>
            <tr>
              <TableHead scope="row">Name</TableHead>
            </tr>
          </thead>
        </table>,
      );
      expect(container.querySelector("th")).toHaveAttribute("scope", "row");
    });

    it("omits aria-sort entirely when not sortable", () => {
      const { container } = renderHead();
      expect(container.querySelector("th")).not.toHaveAttribute("aria-sort");
    });

    it("wires aria-sort to the correct native value for every sortDirection, only when sortable", () => {
      const { container, rerender } = renderHead({ sortable: true, sortDirection: null });
      expect(container.querySelector("th")).toHaveAttribute("aria-sort", "none");
      rerender(
        <table>
          <thead>
            <tr>
              <TableHead sortable sortDirection="asc">
                Name
              </TableHead>
            </tr>
          </thead>
        </table>,
      );
      expect(container.querySelector("th")).toHaveAttribute("aria-sort", "ascending");
      rerender(
        <table>
          <thead>
            <tr>
              <TableHead sortable sortDirection="desc">
                Name
              </TableHead>
            </tr>
          </thead>
        </table>,
      );
      expect(container.querySelector("th")).toHaveAttribute("aria-sort", "descending");
    });
  });

  describe("interaction", () => {
    it("calls onSort when the sort button is clicked", () => {
      const onSort = vi.fn();
      renderHead({ sortable: true, onSort });
      fireEvent.click(screen.getByRole("button", { name: "Name" }));
      expect(onSort).toHaveBeenCalledTimes(1);
    });
  });

  describe("accessibility", () => {
    it("has no axe violations, sortable and plain", async () => {
      const { container, rerender } = renderHead();
      expect(await runA11yCheck(container)).toHaveNoA11yViolations();
      rerender(
        <table>
          <thead>
            <tr>
              <TableHead sortable sortDirection="asc" onSort={() => {}}>
                Name
              </TableHead>
            </tr>
          </thead>
        </table>,
      );
      expect(await runA11yCheck(container)).toHaveNoA11yViolations();
    });
  });
});
