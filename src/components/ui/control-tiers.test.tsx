import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@test/render";
import { runA11yCheck } from "@test/a11y";
import { TextInput } from "./TextInput";
import { Textarea } from "./Textarea";
import { Select } from "./Select";
import { Checkbox } from "./Checkbox";
import { ToggleSwitch } from "./ToggleSwitch";
import { SearchInput } from "./SearchInput";
import { Combobox } from "./Combobox";
import { IconButton } from "./IconButton";
import {
  CONTROL_FRAME_CLASSES,
  CONTROL_SELECT_CLASSES,
  CONTROL_BOX_CLASSES,
  CONTROL_SWITCH_CLASSES,
} from "@/lib/control-size";

/**
 * DS-5M — the control/field two-tier split (DS-5L).
 *
 * The invariant every control shares: with no `label`/`helperText` it renders
 * ONLY the control (bare, intrinsically sized, no stacked wrapper); with either,
 * it renders the stacked field exactly as it did before DS-5M.
 */

const OPTIONS = [
  { value: "a", label: "Alpha" },
  { value: "b", label: "Beta" },
];

/** The stacked field wrapper every control used to render unconditionally. */
function stackedWrapper(container: HTMLElement) {
  return container.querySelector(":scope > div.flex.flex-col");
}

describe("DS-5M — shared size scale", () => {
  it("sm pins h-8, matching Button's own sm height", () => {
    expect(CONTROL_FRAME_CLASSES.sm).toContain("h-8");
    expect(CONTROL_SELECT_CLASSES.sm).toContain("h-8");
  });

  it("md preserves the original padding-driven sizing (no forced height)", () => {
    expect(CONTROL_FRAME_CLASSES.md).not.toContain("h-");
    expect(CONTROL_SELECT_CLASSES.md).toContain("py-2");
  });

  it("every size map covers exactly sm and md", () => {
    for (const map of [CONTROL_FRAME_CLASSES, CONTROL_SELECT_CLASSES, CONTROL_BOX_CLASSES, CONTROL_SWITCH_CLASSES]) {
      expect(Object.keys(map).sort()).toEqual(["md", "sm"]);
    }
  });
});

describe("DS-5M — bare control tier", () => {
  it("TextInput renders no stacked wrapper and is intrinsically sized", () => {
    const { container } = render(<TextInput aria-label="Filter" />);
    expect(stackedWrapper(container)).toBeNull();
    expect(container.firstElementChild).toHaveClass("inline-flex");
    expect(container.firstElementChild).not.toHaveClass("flex-col");
  });

  it("Select renders no stacked wrapper and drops w-full", () => {
    const { container } = render(<Select aria-label="Status" options={OPTIONS} />);
    expect(stackedWrapper(container)).toBeNull();
    expect(screen.getByRole("combobox")).not.toHaveClass("w-full");
  });

  it("Textarea renders only the textarea", () => {
    const { container } = render(<Textarea aria-label="Notes" />);
    expect(container.firstElementChild?.tagName).toBe("TEXTAREA");
  });

  it("Checkbox renders only the box", () => {
    const { container } = render(<Checkbox aria-label="Select row" />);
    expect(stackedWrapper(container)).toBeNull();
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
  });

  it("ToggleSwitch renders only the switch", () => {
    const { container } = render(<ToggleSwitch aria-label="Live" checked={false} onChange={() => {}} />);
    expect(stackedWrapper(container)).toBeNull();
    expect(container.firstElementChild?.tagName).toBe("BUTTON");
  });

  it("SearchInput renders no stacked wrapper", () => {
    const { container } = render(<SearchInput aria-label="Search" value="" onChange={() => {}} />);
    expect(stackedWrapper(container)).toBeNull();
    expect(container.firstElementChild).toHaveClass("inline-flex");
  });
});

describe("DS-5M — stacked field tier is preserved", () => {
  it("TextInput with a label still renders label + stacked wrapper", () => {
    const { container } = render(<TextInput label="Name" />);
    expect(stackedWrapper(container)).not.toBeNull();
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
  });

  it("helperText alone is enough to stack, and stays wired via aria-describedby", () => {
    const { container } = render(<TextInput aria-label="Name" helperText="Your full name" />);
    expect(stackedWrapper(container)).not.toBeNull();
    const help = screen.getByText("Your full name");
    expect(screen.getByRole("textbox").getAttribute("aria-describedby")).toBe(help.id);
  });

  it("Select with a label keeps w-full", () => {
    render(<Select label="Status" options={OPTIONS} />);
    expect(screen.getByRole("combobox")).toHaveClass("w-full");
  });

  it("Checkbox with a label keeps the label association", () => {
    render(<Checkbox label="Accept" />);
    expect(screen.getByLabelText("Accept")).toBeInTheDocument();
  });

  it("ToggleSwitch with a label keeps the label association", () => {
    render(<ToggleSwitch label="Notifications" checked onChange={() => {}} />);
    expect(screen.getByRole("switch")).toBeInTheDocument();
    expect(screen.getByText("Notifications")).toBeInTheDocument();
  });
});

describe("DS-5M — size applies to each control", () => {
  it("TextInput sm/md", () => {
    const { container, rerender } = render(<TextInput aria-label="x" size="sm" />);
    expect(container.firstElementChild).toHaveClass("h-8");
    rerender(<TextInput aria-label="x" size="md" />);
    expect(container.firstElementChild).not.toHaveClass("h-8");
  });

  it("Select sm/md", () => {
    const { rerender } = render(<Select aria-label="x" options={OPTIONS} size="sm" />);
    expect(screen.getByRole("combobox")).toHaveClass("h-8");
    rerender(<Select aria-label="x" options={OPTIONS} size="md" />);
    expect(screen.getByRole("combobox")).not.toHaveClass("h-8");
  });

  it("Checkbox sm/md box size", () => {
    const { rerender } = render(<Checkbox aria-label="x" size="sm" />);
    expect(screen.getByRole("checkbox")).toHaveClass("size-4");
    rerender(<Checkbox aria-label="x" size="md" />);
    expect(screen.getByRole("checkbox")).toHaveClass("size-5");
  });

  it("ToggleSwitch sm/md track size", () => {
    const { rerender } = render(<ToggleSwitch aria-label="x" size="sm" checked={false} onChange={() => {}} />);
    expect(screen.getByRole("switch")).toHaveClass("h-5", "w-9");
    rerender(<ToggleSwitch aria-label="x" size="md" checked={false} onChange={() => {}} />);
    expect(screen.getByRole("switch")).toHaveClass("h-6", "w-10");
  });

  it("SearchInput sm/md", () => {
    const { container, rerender } = render(<SearchInput aria-label="x" size="sm" value="" onChange={() => {}} />);
    expect(container.firstElementChild).toHaveClass("h-8");
    rerender(<SearchInput aria-label="x" size="md" value="" onChange={() => {}} />);
    expect(container.firstElementChild).not.toHaveClass("h-8");
  });

  it("Textarea sizes padding only — no fixed height (rows governs)", () => {
    const { rerender } = render(<Textarea aria-label="x" size="sm" />);
    const ta = screen.getByRole("textbox");
    expect(ta).toHaveClass("py-1.5");
    expect(ta.className).not.toMatch(/\bh-8\b/);
    rerender(<Textarea aria-label="x" size="md" />);
    expect(screen.getByRole("textbox")).toHaveClass("py-2");
  });
});

describe("DS-5M — leading icons", () => {
  it("Select renders a leading icon and pads for it", () => {
    render(<Select aria-label="x" options={OPTIONS} leadingIcon={<svg data-testid="ico" />} />);
    expect(screen.getByTestId("ico")).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toHaveClass("pl-9");
  });

  it("Combobox renders a leading icon and pads for it", () => {
    render(
      <Combobox aria-label="x" options={OPTIONS} value="" onChange={() => {}} leadingIcon={<svg data-testid="cico" />} />,
    );
    expect(screen.getByTestId("cico")).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toHaveClass("pl-9");
  });
});

describe("DS-5M — accessibility & keyboard", () => {
  it("bare controls accept an accessible name via aria-label", () => {
    render(
      <>
        <TextInput aria-label="Filter text" />
        <Select aria-label="Filter status" options={OPTIONS} />
        <Checkbox aria-label="Select row" />
        <ToggleSwitch aria-label="Live updates" checked={false} onChange={() => {}} />
      </>,
    );
    expect(screen.getByLabelText("Filter text")).toBeInTheDocument();
    expect(screen.getByLabelText("Filter status")).toBeInTheDocument();
    expect(screen.getByLabelText("Select row")).toBeInTheDocument();
    expect(screen.getByLabelText("Live updates")).toBeInTheDocument();
  });

  it("SearchInput supports aria-label (a placeholder is not an accessible name)", () => {
    render(<SearchInput aria-label="Search templates" value="" onChange={() => {}} />);
    expect(screen.getByLabelText("Search templates")).toBeInTheDocument();
  });

  it("ToggleSwitch keeps switch semantics and toggles", () => {
    const onChange = vi.fn();
    render(<ToggleSwitch aria-label="Live" checked={false} onChange={onChange} />);
    const sw = screen.getByRole("switch");
    expect(sw).toHaveAttribute("aria-checked", "false");
    fireEvent.click(sw);
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("Checkbox still supports indeterminate and disabled", () => {
    render(<Checkbox aria-label="All" indeterminate disabled />);
    const cb = screen.getByRole("checkbox") as HTMLInputElement;
    expect(cb.indeterminate).toBe(true);
    expect(cb).toBeDisabled();
  });

  it("bare controls have no axe violations", async () => {
    const { container } = render(
      <>
        <TextInput aria-label="Filter text" size="sm" />
        <Select aria-label="Filter status" size="sm" options={OPTIONS} />
        <Checkbox aria-label="Select row" size="sm" />
        <ToggleSwitch aria-label="Live" size="sm" checked onChange={() => {}} />
      </>,
    );
    expect(await runA11yCheck(container)).toHaveNoA11yViolations();
  });
});

describe("DS-5M — IconButton", () => {
  it("renders an icon-only button with a required accessible name", () => {
    render(<IconButton aria-label="Delete" icon={<svg data-testid="trash" />} />);
    const btn = screen.getByRole("button", { name: "Delete" });
    expect(btn).toBeInTheDocument();
    expect(screen.getByTestId("trash")).toBeInTheDocument();
  });

  it("is square at sm and md, aligned to Button's heights", () => {
    const { rerender } = render(<IconButton aria-label="a" size="sm" icon={<svg />} />);
    expect(screen.getByRole("button", { name: "a" })).toHaveClass("size-8");
    rerender(<IconButton aria-label="a" size="md" icon={<svg />} />);
    expect(screen.getByRole("button", { name: "a" })).toHaveClass("size-10");
  });

  it("stays square inside a flex toolbar row — shrink-0, not a collapsible flex item", () => {
    // Regression: without shrink-0 the button collapses to its icon's intrinsic
    // width in a tight flex row (measured 24px instead of 32px in the showcase),
    // which is the only context an IconButton ever ships in.
    render(
      <div className="flex items-center gap-2">
        <IconButton aria-label="Edit" size="sm" icon={<svg />} />
      </div>,
    );
    expect(screen.getByRole("button", { name: "Edit" })).toHaveClass("shrink-0");
  });

  it("defaults to the ghost variant and accepts Button's variants", () => {
    const { rerender } = render(<IconButton aria-label="a" icon={<svg />} />);
    expect(screen.getByRole("button", { name: "a" }).className).toMatch(/text-ink-secondary/);
    rerender(<IconButton aria-label="a" variant="destructive" icon={<svg />} />);
    expect(screen.getByRole("button", { name: "a" })).toHaveClass("bg-error");
  });

  it("loading swaps the icon for a spinner and blocks interaction", () => {
    const onClick = vi.fn();
    render(<IconButton aria-label="Save" loading icon={<svg data-testid="save-icon" />} onClick={onClick} />);
    const btn = screen.getByRole("button", { name: "Save" });
    expect(screen.queryByTestId("save-icon")).toBeNull();
    expect(btn).toBeDisabled();
    expect(btn).toHaveAttribute("aria-busy", "true");
  });

  it("supports disabled and onClick", () => {
    const onClick = vi.fn();
    const { rerender } = render(<IconButton aria-label="Go" icon={<svg />} onClick={onClick} />);
    fireEvent.click(screen.getByRole("button", { name: "Go" }));
    expect(onClick).toHaveBeenCalledTimes(1);
    rerender(<IconButton aria-label="Go" icon={<svg />} onClick={onClick} disabled />);
    expect(screen.getByRole("button", { name: "Go" })).toBeDisabled();
  });

  it("has no axe violations", async () => {
    const { container } = render(<IconButton aria-label="Delete item" icon={<svg />} />);
    expect(await runA11yCheck(container)).toHaveNoA11yViolations();
  });
});
