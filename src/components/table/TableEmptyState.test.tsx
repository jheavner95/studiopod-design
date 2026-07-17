import { describe, it, expect } from "vitest";
import { render, screen } from "@test/render";
import { runA11yCheck } from "@test/a11y";
import { TableEmptyState } from "./TableEmptyState";

function renderRow(props: Partial<Parameters<typeof TableEmptyState>[0]>) {
  return render(
    <table>
      <tbody>
        <TableEmptyState title="No assets yet" colSpan={4} {...props} />
      </tbody>
    </table>,
  );
}

describe("TableEmptyState", () => {
  describe("rendering", () => {
    it("renders its title inside a single full-width row", () => {
      const { container } = renderRow({});
      expect(container.querySelectorAll("tr")).toHaveLength(1);
      expect(screen.getByText("No assets yet")).toBeInTheDocument();
    });

    it("renders description and action only when given", () => {
      const { rerender } = renderRow({});
      expect(screen.queryByText("Upload your first file.")).not.toBeInTheDocument();
      rerender(
        <table>
          <tbody>
            <TableEmptyState title="No assets yet" colSpan={4} description="Upload your first file." action={<button type="button">Upload</button>} />
          </tbody>
        </table>,
      );
      expect(screen.getByText("Upload your first file.")).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Upload" })).toBeInTheDocument();
    });
  });

  describe("state coverage", () => {
    it("spans the cell across the given column count", () => {
      const { container } = renderRow({ colSpan: 6 });
      expect(container.querySelector("td")).toHaveAttribute("colspan", "6");
    });
  });

  describe("accessibility", () => {
    it("has no axe violations", async () => {
      const { container } = renderRow({ description: "Nothing here yet.", action: <button type="button">Retry</button> });
      expect(await runA11yCheck(container)).toHaveNoA11yViolations();
    });
  });
});
