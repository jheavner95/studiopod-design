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

    it("calls onChange with the new checked value as the first argument", () => {
      const onChange = vi.fn();
      renderCell({ onChange });
      fireEvent.click(screen.getByRole("checkbox"));
      expect(onChange.mock.calls[0][0]).toBe(true);
    });

    it("passes the native change event as the second argument", () => {
      const onChange = vi.fn();
      renderCell({ onChange });
      fireEvent.click(screen.getByRole("checkbox"));
      const event = onChange.mock.calls[0][1];
      expect(event).toBeDefined();
      expect(event.target).toBe(screen.getByRole("checkbox"));
      expect(event.nativeEvent).toBeInstanceOf(Event);
    });

    it("exposes modifier keys so a caller can drive a modifier-aware selection model", () => {
      // The blocking case this argument exists for: a caller must be able to
      // tell a plain click from a shift-click at runtime, not just by types.
      const seen: Array<{ checked: boolean; shiftKey: boolean }> = [];
      renderCell({
        onChange: (checked, event) =>
          seen.push({ checked, shiftKey: (event.nativeEvent as MouseEvent).shiftKey }),
      });
      const checkbox = screen.getByRole("checkbox");
      fireEvent.click(checkbox, { shiftKey: true });
      fireEvent.click(checkbox, { shiftKey: false });
      expect(seen).toEqual([
        { checked: true, shiftKey: true },
        { checked: true, shiftKey: false },
      ]);
    });

    it("keeps one-argument callbacks working unchanged", () => {
      // Backward compatibility: every consumer migrated before this change
      // ignores the second argument.
      const received: boolean[] = [];
      const legacy = (checked: boolean) => { received.push(checked); };
      renderCell({ onChange: legacy });
      fireEvent.click(screen.getByRole("checkbox"));
      expect(received).toEqual([true]);
    });

    it("keeps the disabled state on the underlying input", () => {
      // Asserted as state rather than "onChange never fires": fireEvent
      // dispatches programmatically and does not model the browser's own
      // gating of disabled controls, so an event-based assertion here would
      // be testing the test library, not this component.
      renderCell({ onChange: () => {}, disabled: true });
      expect(screen.getByRole("checkbox")).toBeDisabled();
    });

    it("still reports indeterminate on the underlying checkbox", () => {
      renderCell({ indeterminate: true });
      expect((screen.getByRole("checkbox") as HTMLInputElement).indeterminate).toBe(true);
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
