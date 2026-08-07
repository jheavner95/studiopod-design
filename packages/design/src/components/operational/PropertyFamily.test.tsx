/**
 * The Property family — the editable counterpart to the read-oriented
 * Inspector components. PropertyPanel/PropertySection/PropertyGroup are pure
 * re-export aliases and are identity-tested alongside their targets in
 * InspectorPanel/InspectorSection/InspectorContent.
 */
import { describe, it, expect, vi } from "vitest";
import { render, screen, userEvent, fireEvent } from "@test/render";
import { runA11yCheck } from "@test/a11y";
import { PropertyRow } from "./PropertyRow";
import { PropertyReset } from "./PropertyReset";
import { PropertyToggle } from "./PropertyToggle";
import { PropertySelect } from "./PropertySelect";
import { PropertyNumber } from "./PropertyNumber";
import { PropertyColor } from "./PropertyColor";
import { PropertyEditor, type PropertyEditorField } from "./PropertyEditor";

describe("PropertyRow", () => {
  it("renders label and value in read mode", () => {
    render(<PropertyRow label="Width" value="1920" />);
    expect(screen.getByText("Width")).toBeInTheDocument();
    expect(screen.getByText("1920")).toBeInTheDocument();
  });

  it("renders the editor instead of label/value when one is given", () => {
    render(<PropertyRow label="Width" value="1920" editor={<input aria-label="Width" defaultValue="1920" />} />);
    expect(screen.getByRole("textbox", { name: "Width" })).toBeInTheDocument();
    // The read-mode value must not double up alongside the editor.
    expect(screen.queryByText("1920")).not.toBeInTheDocument();
  });

  it("hides the reset affordance unless both modified and onReset are given", () => {
    const { rerender } = render(<PropertyRow label="Width" value="1920" />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();

    rerender(<PropertyRow label="Width" value="1920" modified />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();

    rerender(<PropertyRow label="Width" value="1920" onReset={() => {}} />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();

    rerender(<PropertyRow label="Width" value="1920" modified onReset={() => {}} />);
    expect(screen.getByRole("button", { name: "Reset to default" })).toBeInTheDocument();
  });

  it("calls onReset when the reset affordance is used", async () => {
    const onReset = vi.fn();
    const user = userEvent.setup();
    render(<PropertyRow label="Width" value="1920" modified onReset={onReset} />);
    await user.click(screen.getByRole("button", { name: "Reset to default" }));
    expect(onReset).toHaveBeenCalledTimes(1);
  });

  it("forwards className", () => {
    const { container } = render(<PropertyRow label="Width" value="1920" className="custom-row" />);
    expect(container.querySelector(".custom-row")).toBeInTheDocument();
  });
});

describe("PropertyReset", () => {
  it("is a labelled button, defaulting to 'Reset to default'", () => {
    render(<PropertyReset onReset={() => {}} />);
    expect(screen.getByRole("button", { name: "Reset to default" })).toBeInTheDocument();
  });

  it("honours a custom label on both the accessible name and the tooltip", () => {
    render(<PropertyReset onReset={() => {}} label="Reset width" />);
    const button = screen.getByRole("button", { name: "Reset width" });
    expect(button).toHaveAttribute("title", "Reset width");
  });

  it("calls onReset on click and from the keyboard", async () => {
    const onReset = vi.fn();
    const user = userEvent.setup();
    render(<PropertyReset onReset={onReset} />);
    const button = screen.getByRole("button");

    await user.click(button);
    expect(onReset).toHaveBeenCalledTimes(1);

    // Clicking already leaves focus on the button, so tabbing here would move
    // AWAY from it and the keypress would land on nothing.
    button.focus();
    await user.keyboard("{Enter}");
    expect(onReset).toHaveBeenCalledTimes(2);
  });

  it("is a type=button so it never submits a form", () => {
    render(<PropertyReset onReset={() => {}} />);
    expect(screen.getByRole("button")).toHaveAttribute("type", "button");
  });

  it("forwards className", () => {
    render(<PropertyReset onReset={() => {}} className="custom-reset" />);
    expect(screen.getByRole("button")).toHaveClass("custom-reset");
  });
});

describe("PropertyToggle", () => {
  it("renders a labelled switch reflecting checked", () => {
    render(<PropertyToggle label="Published" checked onChange={() => {}} />);
    const control = screen.getByRole("switch", { name: /Published/ });
    expect(control).toBeChecked();
  });

  it("reports the next boolean on toggle", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<PropertyToggle label="Published" checked={false} onChange={onChange} />);
    await user.click(screen.getByRole("switch", { name: /Published/ }));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("renders helper text", () => {
    render(<PropertyToggle label="Published" checked onChange={() => {}} helperText="Visible to customers" />);
    expect(screen.getByText("Visible to customers")).toBeInTheDocument();
  });

  it("respects disabled", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<PropertyToggle label="Published" checked={false} onChange={onChange} disabled />);
    const control = screen.getByRole("switch", { name: /Published/ });
    expect(control).toBeDisabled();
    await user.click(control);
    expect(onChange).not.toHaveBeenCalled();
  });
});

describe("PropertySelect", () => {
  const options = [
    { value: "png", label: "PNG" },
    { value: "jpg", label: "JPG" },
  ];

  it("renders a labelled select showing the current value", () => {
    render(<PropertySelect label="Format" value="png" onChange={() => {}} options={options} />);
    expect(screen.getByRole("combobox", { name: /Format/ })).toHaveValue("png");
  });

  it("renders one option per entry", () => {
    render(<PropertySelect label="Format" value="png" onChange={() => {}} options={options} />);
    expect(screen.getAllByRole("option")).toHaveLength(2);
  });

  it("reports the raw value — not the event — on change", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<PropertySelect label="Format" value="png" onChange={onChange} options={options} />);
    await user.selectOptions(screen.getByRole("combobox", { name: /Format/ }), "jpg");
    expect(onChange).toHaveBeenCalledWith("jpg");
  });

  it("renders an error message", () => {
    render(<PropertySelect label="Format" value="png" onChange={() => {}} options={options} error="Unsupported" />);
    expect(screen.getByText("Unsupported")).toBeInTheDocument();
  });

  it("respects disabled", () => {
    render(<PropertySelect label="Format" value="png" onChange={() => {}} options={options} disabled />);
    expect(screen.getByRole("combobox", { name: /Format/ })).toBeDisabled();
  });
});

describe("PropertyNumber", () => {
  it("renders a labelled number input showing the value", () => {
    render(<PropertyNumber label="Width" value={1920} onChange={() => {}} />);
    const input = screen.getByRole("spinbutton", { name: /Width/ });
    expect(input).toHaveValue(1920);
  });

  it("reports a number — not a string — on change", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<PropertyNumber label="Width" value={192} onChange={onChange} />);
    await user.type(screen.getByRole("spinbutton", { name: /Width/ }), "0");
    expect(onChange).toHaveBeenCalledWith(1920);
    expect(typeof onChange.mock.calls[0][0]).toBe("number");
  });

  it("forwards min, max and step to the control", () => {
    render(<PropertyNumber label="Width" value={10} onChange={() => {}} min={0} max={100} step={5} />);
    const input = screen.getByRole("spinbutton", { name: /Width/ });
    expect(input).toHaveAttribute("min", "0");
    expect(input).toHaveAttribute("max", "100");
    expect(input).toHaveAttribute("step", "5");
  });

  it("renders an empty control rather than 'NaN' for a NaN value", () => {
    render(<PropertyNumber label="Width" value={Number.NaN} onChange={() => {}} />);
    expect(screen.getByRole("spinbutton", { name: /Width/ })).toHaveValue(null);
  });

  it("renders an error message and respects disabled", () => {
    render(<PropertyNumber label="Width" value={10} onChange={() => {}} error="Too small" disabled />);
    expect(screen.getByText("Too small")).toBeInTheDocument();
    expect(screen.getByRole("spinbutton", { name: /Width/ })).toBeDisabled();
  });
});

describe("PropertyColor", () => {
  it("renders a colour swatch and a hex field for the same value", () => {
    const { container } = render(<PropertyColor label="Accent" value="#ff0000" onChange={() => {}} />);
    expect(container.querySelector('input[type="color"]')).toHaveValue("#ff0000");
    expect(screen.getByRole("textbox", { name: /Accent hex value/ })).toHaveValue("#ff0000");
  });

  it("reports changes from the swatch", () => {
    const onChange = vi.fn();
    const { container } = render(<PropertyColor label="Accent" value="#ff0000" onChange={onChange} />);
    const swatch = container.querySelector('input[type="color"]') as HTMLInputElement;
    // userEvent cannot drive a native colour picker, and a bare Event("input")
    // carries no new value so React's onChange never fires. fireEvent.change
    // sets the value and dispatches together, which is what React listens for.
    fireEvent.change(swatch, { target: { value: "#00ff00" } });
    expect(onChange).toHaveBeenCalledWith("#00ff00");
  });

  it("reports changes typed into the hex field", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<PropertyColor label="Accent" value="#ff000" onChange={onChange} />);
    await user.type(screen.getByRole("textbox", { name: /Accent hex value/ }), "0");
    expect(onChange).toHaveBeenCalledWith("#ff0000");
  });

  it("associates its error with the hex field via aria-describedby", () => {
    render(<PropertyColor label="Accent" value="#gggggg" onChange={() => {}} error="Invalid hex" />);
    const field = screen.getByRole("textbox", { name: /Accent hex value/ });
    const describedBy = field.getAttribute("aria-describedby");
    expect(describedBy).toBeTruthy();
    expect(document.getElementById(describedBy!)).toHaveTextContent("Invalid hex");
  });

  it("drops aria-describedby entirely when there is no error", () => {
    render(<PropertyColor label="Accent" value="#ff0000" onChange={() => {}} />);
    expect(screen.getByRole("textbox", { name: /Accent hex value/ })).not.toHaveAttribute("aria-describedby");
  });

  it("disables both controls together", () => {
    const { container } = render(<PropertyColor label="Accent" value="#ff0000" onChange={() => {}} disabled />);
    expect(container.querySelector('input[type="color"]')).toBeDisabled();
    expect(screen.getByRole("textbox", { name: /Accent hex value/ })).toBeDisabled();
  });

  it("has no axe violations, with and without an error", async () => {
    const { container: plain } = render(<PropertyColor label="Accent" value="#ff0000" onChange={() => {}} />);
    expect(await runA11yCheck(plain)).toHaveNoA11yViolations();
    const { container: errored } = render(
      <PropertyColor label="Accent" value="#zz" onChange={() => {}} error="Invalid hex" />,
    );
    expect(await runA11yCheck(errored)).toHaveNoA11yViolations();
  });
});

describe("PropertyEditor", () => {
  it("dispatches a text field", () => {
    const field: PropertyEditorField = { id: "name", type: "text", label: "Name", value: "Hero", onChange: () => {} };
    render(<PropertyEditor field={field} />);
    expect(screen.getByRole("textbox", { name: /Name/ })).toHaveValue("Hero");
  });

  it("dispatches a number field", () => {
    const field: PropertyEditorField = { id: "w", type: "number", label: "Width", value: 1920, onChange: () => {} };
    render(<PropertyEditor field={field} />);
    expect(screen.getByRole("spinbutton", { name: /Width/ })).toHaveValue(1920);
  });

  it("dispatches a select field", () => {
    const field: PropertyEditorField = {
      id: "fmt",
      type: "select",
      label: "Format",
      value: "png",
      onChange: () => {},
      options: [{ value: "png", label: "PNG" }],
    };
    render(<PropertyEditor field={field} />);
    expect(screen.getByRole("combobox", { name: /Format/ })).toHaveValue("png");
  });

  it("dispatches a switch field", () => {
    const field: PropertyEditorField = { id: "pub", type: "switch", label: "Published", value: true, onChange: () => {} };
    render(<PropertyEditor field={field} />);
    expect(screen.getByRole("switch", { name: /Published/ })).toBeChecked();
  });

  it("dispatches a colour field", () => {
    const field: PropertyEditorField = { id: "c", type: "color", label: "Accent", value: "#ff0000", onChange: () => {} };
    const { container } = render(<PropertyEditor field={field} />);
    expect(container.querySelector('input[type="color"]')).toHaveValue("#ff0000");
  });

  it("routes onChange through to the caller for the dispatched type", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    const field: PropertyEditorField = { id: "pub", type: "switch", label: "Published", value: false, onChange };
    render(<PropertyEditor field={field} />);
    await user.click(screen.getByRole("switch", { name: /Published/ }));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("surfaces a field-level error for the types that support one", () => {
    const field: PropertyEditorField = {
      id: "name",
      type: "text",
      label: "Name",
      value: "",
      onChange: () => {},
      error: "Required",
    };
    render(<PropertyEditor field={field} />);
    expect(screen.getByText("Required")).toBeInTheDocument();
  });
});
