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

describe("TableRow — row identity and pointer coordination", () => {
  it("forwards id onto the tr so another control can target it", () => {
    const { container } = renderRow({ id: "trace-layer-7" });
    const tr = container.querySelector("tr")!;
    expect(tr).toHaveAttribute("id", "trace-layer-7");
    // The row must be reachable the way aria-controls resolves it.
    expect(tr.ownerDocument.getElementById("trace-layer-7")).toBe(tr);
  });

  it("omits id entirely when not supplied", () => {
    const { container } = renderRow();
    expect(container.querySelector("tr")).not.toHaveAttribute("id");
  });

  it("passes the native row event to onMouseEnter and onMouseLeave", () => {
    // currentTarget must be read INSIDE the handler: React nulls it out once
    // dispatch completes, so a post-hoc assertion on mock.calls would see null.
    const seen: Array<{ phase: string; target: EventTarget | null }> = [];
    const { container } = renderRow({
      onMouseEnter: (e) => seen.push({ phase: "enter", target: e.currentTarget }),
      onMouseLeave: (e) => seen.push({ phase: "leave", target: e.currentTarget }),
    });
    const tr = container.querySelector("tr")!;

    fireEvent.mouseEnter(tr);
    fireEvent.mouseLeave(tr);

    expect(seen.map((s) => s.phase)).toEqual(["enter", "leave"]);
    expect(seen[0].target).toBe(tr);
    expect(seen[1].target).toBe(tr);
  });

  it("keeps the hovered row stable while the pointer moves between its cells", () => {
    // The whole reason these handlers belong on the row: cell-level handlers
    // would fire a leave on every internal boundary crossing.
    const onMouseEnter = vi.fn();
    const onMouseLeave = vi.fn();
    const { container } = render(
      <table>
        <tbody>
          <TableRow onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            <td>First</td>
            <td>Second</td>
          </TableRow>
        </tbody>
      </table>,
    );
    const tr = container.querySelector("tr")!;

    const first  = screen.getByText("First");
    const second = screen.getByText("Second");

    // Pointer enters the row from outside.
    fireEvent.mouseOver(first, { relatedTarget: document.body });
    expect(onMouseEnter).toHaveBeenCalledTimes(1);

    // Pointer travels across the internal cell boundary. React synthesises
    // enter/leave from mouseout/mouseover plus relatedTarget, so the traversal
    // must be modelled with a relatedTarget — `fireEvent.mouseLeave(cell)`
    // alone reports a null relatedTarget, which reads as leaving the document
    // and is a harness artefact rather than real pointer behaviour.
    fireEvent.mouseOut(first,   { relatedTarget: second });
    fireEvent.mouseOver(second, { relatedTarget: first });

    expect(onMouseLeave).not.toHaveBeenCalled();
    expect(onMouseEnter).toHaveBeenCalledTimes(1);

    // Leaving the row entirely does fire once.
    fireEvent.mouseOut(second, { relatedTarget: document.body });
    expect(onMouseLeave).toHaveBeenCalledTimes(1);
  });

  it("leaves click, keyboard and selected behaviour untouched alongside the new props", () => {
    const onClick = vi.fn();
    const { container } = renderRow({
      id: "row-1",
      onClick,
      selected: true,
      interactive: true,
      onMouseEnter: () => {},
      onMouseLeave: () => {},
    });
    const tr = container.querySelector("tr")!;

    expect(tr).toHaveAttribute("aria-selected", "true");
    expect(tr).toHaveAttribute("tabIndex", "0");

    fireEvent.click(tr);
    fireEvent.keyDown(tr, { key: "Enter" });
    fireEvent.keyDown(tr, { key: " " });
    expect(onClick).toHaveBeenCalledTimes(3);
  });

  it("stays inert by default — no id, tabIndex or pointer wiring", () => {
    const { container } = renderRow();
    const tr = container.querySelector("tr")!;
    expect(tr).not.toHaveAttribute("id");
    expect(tr).not.toHaveAttribute("tabIndex");
    expect(tr).not.toHaveAttribute("aria-selected");
  });
});
