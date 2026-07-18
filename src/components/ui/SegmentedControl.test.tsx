import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@test/render";
import { runA11yCheck } from "@test/a11y";
import { SegmentedControl } from "./SegmentedControl";
import { CONTROL_SEGMENT_CLASSES, CONTROL_SEGMENT_TRACK_CLASSES } from "@/lib/control-size";

const OPTIONS = [
  { value: "grid", label: "Grid" },
  { value: "list", label: "List" },
  { value: "table", label: "Table" },
] as const;

type View = (typeof OPTIONS)[number]["value"];

function Group(props: Partial<React.ComponentProps<typeof SegmentedControl<View>>> = {}) {
  return (
    <SegmentedControl<View>
      aria-label="View mode"
      options={[...OPTIONS]}
      value="grid"
      onChange={() => {}}
      {...props}
    />
  );
}

describe("SegmentedControl", () => {
  describe("rendering", () => {
    it("renders one radio per option inside a labelled radiogroup", () => {
      render(<Group />);
      expect(screen.getByRole("radiogroup", { name: "View mode" })).toBeInTheDocument();
      expect(screen.getAllByRole("radio")).toHaveLength(3);
    });

    it("marks only the active option aria-checked", () => {
      render(<Group value="list" />);
      expect(screen.getByRole("radio", { name: "List" })).toHaveAttribute("aria-checked", "true");
      expect(screen.getByRole("radio", { name: "Grid" })).toHaveAttribute("aria-checked", "false");
    });

    it("uses an option's aria-label when its label is icon-only", () => {
      render(
        <Group
          options={[
            { value: "grid", label: <svg />, "aria-label": "Grid view" },
            { value: "list", label: "List" },
          ]}
        />,
      );
      expect(screen.getByRole("radio", { name: "Grid view" })).toBeInTheDocument();
    });
  });

  /**
   * DS-5O — the size scale. These assert against the shared `control-size`
   * maps rather than literal class strings, so the scale stays the single
   * source of truth: retuning `sm` there cannot leave a test asserting the
   * old value.
   */
  describe("size (DS-5O)", () => {
    it("defaults to md, preserving pre-DS-5O rendering", () => {
      render(<Group />);
      const segment = screen.getByRole("radio", { name: "Grid" });
      for (const cls of CONTROL_SEGMENT_CLASSES.md.split(" ")) {
        expect(segment).toHaveClass(cls);
      }
      expect(segment).toHaveClass("py-1.5", "text-body-sm");
    });

    it("applies the sm scale to every segment when size=sm", () => {
      render(<Group size="sm" />);
      for (const name of ["Grid", "List", "Table"]) {
        const segment = screen.getByRole("radio", { name });
        for (const cls of CONTROL_SEGMENT_CLASSES.sm.split(" ")) {
          expect(segment).toHaveClass(cls);
        }
      }
    });

    it("sm pins an explicit segment height AND tightens the track, so the OUTER pill is 28px", () => {
      // Live measurement caught this: the track's padding and 1px border sit
      // outside the segment, so h-6 + p-0.5 + border rendered 30px, not 28.
      // 24 (h-6) + 2 (p-px) + 2 (border) = 28.
      expect(CONTROL_SEGMENT_CLASSES.sm).toContain("h-6");
      render(<Group size="sm" />);
      expect(screen.getByRole("radio", { name: "Grid" })).toHaveClass("h-6");
      expect(screen.getByRole("radiogroup")).toHaveClass(CONTROL_SEGMENT_TRACK_CLASSES.sm);
      expect(screen.getByRole("radiogroup")).not.toHaveClass(CONTROL_SEGMENT_TRACK_CLASSES.md);
    });

    it("md keeps the original track padding", () => {
      render(<Group />);
      expect(screen.getByRole("radiogroup")).toHaveClass("p-0.5");
    });

    it("does not mix scales — sm segments carry no md padding or type", () => {
      render(<Group size="sm" />);
      const segment = screen.getByRole("radio", { name: "Grid" });
      expect(segment).not.toHaveClass("py-1.5");
      expect(segment).not.toHaveClass("text-body-sm");
    });

    it("the active fill is the segment's own background, so it scales with size automatically", () => {
      render(<Group size="sm" value="list" />);
      const active = screen.getByRole("radio", { name: "List" });
      expect(active).toHaveClass("bg-accent-500");
      for (const cls of CONTROL_SEGMENT_CLASSES.sm.split(" ")) {
        expect(active).toHaveClass(cls);
      }
    });
  });

  describe("interaction", () => {
    it("clicking an option reports it", () => {
      const onChange = vi.fn();
      render(<Group onChange={onChange} />);
      fireEvent.click(screen.getByRole("radio", { name: "List" }));
      expect(onChange).toHaveBeenCalledWith("list");
    });

    it("ArrowRight/ArrowLeft move through the options, wrapping at the ends", () => {
      const onChange = vi.fn();
      render(<Group value="table" onChange={onChange} />);
      fireEvent.keyDown(screen.getByRole("radio", { name: "Table" }), { key: "ArrowRight" });
      expect(onChange).toHaveBeenCalledWith("grid");
    });

    it("Home/End jump to the first/last enabled option", () => {
      const onChange = vi.fn();
      render(<Group value="list" onChange={onChange} />);
      fireEvent.keyDown(screen.getByRole("radio", { name: "List" }), { key: "End" });
      expect(onChange).toHaveBeenCalledWith("table");
    });

    it("arrow navigation skips disabled options", () => {
      const onChange = vi.fn();
      render(
        <Group
          value="grid"
          onChange={onChange}
          options={[
            { value: "grid", label: "Grid" },
            { value: "list", label: "List", disabled: true },
            { value: "table", label: "Table" },
          ]}
        />,
      );
      fireEvent.keyDown(screen.getByRole("radio", { name: "Grid" }), { key: "ArrowRight" });
      expect(onChange).toHaveBeenCalledWith("table");
    });

    it("size does not change disabled behaviour", () => {
      const onChange = vi.fn();
      render(<Group size="sm" disabled onChange={onChange} />);
      for (const name of ["Grid", "List", "Table"]) {
        expect(screen.getByRole("radio", { name })).toBeDisabled();
      }
      fireEvent.click(screen.getByRole("radio", { name: "List" }));
      expect(onChange).not.toHaveBeenCalled();
    });
  });

  describe("accessibility", () => {
    it("uses roving tabindex — only the active segment is tab-stoppable", () => {
      render(<Group value="list" />);
      expect(screen.getByRole("radio", { name: "List" })).toHaveAttribute("tabindex", "0");
      expect(screen.getByRole("radio", { name: "Grid" })).toHaveAttribute("tabindex", "-1");
    });

    it.each(["md", "sm"] as const)("has no axe violations at size=%s", async (size) => {
      const { container } = render(<Group size={size} />);
      expect(await runA11yCheck(container)).toHaveNoA11yViolations();
    });
  });
});
