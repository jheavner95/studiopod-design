import { describe, it, expect } from "vitest";
import { render, screen } from "@test/render";
import { runA11yCheck } from "@test/a11y";
import { Table } from "./Table";
import { TableHeader } from "./TableHeader";
import { TableBody } from "./TableBody";
import { TableRow } from "./TableRow";
import { TableHead } from "./TableHead";
import { TableCell } from "./TableCell";

function SimpleTable(props: Partial<Parameters<typeof Table>[0]>) {
  return (
    <Table caption="Assets" {...props}>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Homepage banner</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

describe("Table", () => {
  describe("rendering", () => {
    it("renders a real <table> with its children", () => {
      const { container } = render(<SimpleTable />);
      expect(container.querySelector("table")).toBeInTheDocument();
      expect(screen.getByText("Homepage banner")).toBeInTheDocument();
    });

    it("renders a visually-hidden caption when given, announced to screen readers", () => {
      const { container } = render(<SimpleTable />);
      const caption = container.querySelector("caption");
      expect(caption).toHaveTextContent("Assets");
      expect(caption).toHaveClass("sr-only");
    });

    it("renders no caption element when omitted", () => {
      const { container } = render(<SimpleTable caption={undefined} />);
      expect(container.querySelector("caption")).not.toBeInTheDocument();
    });
  });

  describe("state coverage", () => {
    it("defaults minWidth to 640px", () => {
      const { container } = render(<SimpleTable />);
      expect(container.querySelector("table")).toHaveStyle({ minWidth: "640px" });
    });

    it("accepts a custom minWidth", () => {
      const { container } = render(<SimpleTable minWidth="900px" />);
      expect(container.querySelector("table")).toHaveStyle({ minWidth: "900px" });
    });

    it("provides its density to descendant cells via context — comfortable by default", () => {
      const { container } = render(<SimpleTable />);
      expect(container.querySelector("td")).toHaveClass("px-4", "py-3");
    });

    it("propagates a non-default density down to TableCell/TableHead", () => {
      const { container } = render(<SimpleTable density="dense" />);
      expect(container.querySelector("td")).toHaveClass("px-2", "py-1.5");
      expect(container.querySelector("th")).toHaveClass("px-2", "py-1");
    });
  });

  describe("accessibility", () => {
    it("has no axe violations", async () => {
      const { container } = render(<SimpleTable />);
      expect(await runA11yCheck(container)).toHaveNoA11yViolations();
    });
  });
});
