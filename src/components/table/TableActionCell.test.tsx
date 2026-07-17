import { describe, it, expect } from "vitest";
import { render, screen } from "@test/render";
import { runA11yCheck } from "@test/a11y";
import { TableActionCell } from "./TableActionCell";

describe("TableActionCell", () => {
  describe("rendering", () => {
    it("renders its children inside a dedicated cell", () => {
      const { container } = render(
        <table>
          <tbody>
            <tr>
              <TableActionCell>
                <button type="button">Edit</button>
              </TableActionCell>
            </tr>
          </tbody>
        </table>,
      );
      expect(container.querySelector("td")).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Edit" })).toBeInTheDocument();
    });

    it("never wraps multiple actions onto a second line", () => {
      const { container } = render(
        <table>
          <tbody>
            <tr>
              <TableActionCell>
                <button type="button">Edit</button>
                <button type="button">Delete</button>
              </TableActionCell>
            </tr>
          </tbody>
        </table>,
      );
      expect(container.querySelector('[class*="justify-end"]')).toBeInTheDocument();
    });
  });

  describe("accessibility", () => {
    it("has no axe violations", async () => {
      const { container } = render(
        <table>
          <tbody>
            <tr>
              <TableActionCell>
                <button type="button">Edit</button>
              </TableActionCell>
            </tr>
          </tbody>
        </table>,
      );
      expect(await runA11yCheck(container)).toHaveNoA11yViolations();
    });
  });
});
