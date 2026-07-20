/**
 * The Inspector family's content-level components: the ones that arrange or
 * display what's inside the panel body rather than owning the shell.
 * InspectorPanel/Header/Section/Tabs each have their own file.
 */
import { describe, it, expect, vi } from "vitest";
import { render, screen, userEvent } from "@test/render";
import { runA11yCheck } from "@test/a11y";
import { InspectorProperty } from "./InspectorProperty";
import { InspectorGroup } from "./InspectorGroup";
import { InspectorActions } from "./InspectorActions";
import { InspectorFooter } from "./InspectorFooter";
import { InspectorStatus } from "./InspectorStatus";
import { InspectorHistory, type InspectorHistoryEntry } from "./InspectorHistory";
import { InspectorValidation } from "./InspectorValidation";
import { PropertyGroup } from "./PropertyGroup";
import { PropertyGroup as MetadataPropertyGroup } from "@/components/metadata";

describe("InspectorProperty", () => {
  it("renders a label/value pair in read mode", () => {
    render(<InspectorProperty label="Format" value="PNG" />);
    expect(screen.getByText("Format")).toBeInTheDocument();
    expect(screen.getByText("PNG")).toBeInTheDocument();
  });

  it("renders the caller's control in edit mode and does not add a second label", () => {
    render(
      <InspectorProperty label="Format" value="PNG">
        <label>
          Format
          <input defaultValue="PNG" />
        </label>
      </InspectorProperty>,
    );
    // children win outright — label/value must not also render.
    expect(screen.getAllByText("Format")).toHaveLength(1);
    expect(screen.getByRole("textbox")).toHaveValue("PNG");
  });

  it("forwards className in both modes", () => {
    const { container: read } = render(<InspectorProperty label="Format" value="PNG" className="read-mode" />);
    expect(read.querySelector(".read-mode")).toBeInTheDocument();
    const { container: edit } = render(
      <InspectorProperty className="edit-mode">
        <input aria-label="Format" />
      </InspectorProperty>,
    );
    expect(edit.querySelector(".edit-mode")).toBeInTheDocument();
  });

  it("tolerates an omitted value — not every property has one", () => {
    render(<InspectorProperty label="Format" />);
    expect(screen.getByText("Format")).toBeInTheDocument();
  });
});

describe("InspectorGroup", () => {
  it("renders its title and children", () => {
    render(
      <InspectorGroup title="Dimensions">
        <InspectorProperty label="Width" value="1920" />
      </InspectorGroup>,
    );
    expect(screen.getByText("Dimensions")).toBeInTheDocument();
    expect(screen.getByText("1920")).toBeInTheDocument();
  });

  it("is Metadata's PropertyGroup, not a rebuild", () => {
    expect(InspectorGroup).toBe(MetadataPropertyGroup);
  });

  it("PropertyGroup aliases back to the same component", () => {
    expect(PropertyGroup).toBe(InspectorGroup);
  });
});

describe("InspectorActions", () => {
  it("renders the actions it is given", () => {
    render(
      <InspectorActions>
        <button type="button">Duplicate</button>
        <button type="button">Archive</button>
      </InspectorActions>,
    );
    expect(screen.getAllByRole("button")).toHaveLength(2);
  });

  it("forwards className", () => {
    const { container } = render(
      <InspectorActions className="custom-actions">
        <button type="button">Go</button>
      </InspectorActions>,
    );
    expect(container.querySelector(".custom-actions")).toBeInTheDocument();
  });

  it("keeps actions keyboard reachable in DOM order", async () => {
    const user = userEvent.setup();
    render(
      <InspectorActions>
        <button type="button">First</button>
        <button type="button">Second</button>
      </InspectorActions>,
    );
    await user.tab();
    expect(screen.getByRole("button", { name: "First" })).toHaveFocus();
    await user.tab();
    expect(screen.getByRole("button", { name: "Second" })).toHaveFocus();
  });
});

describe("InspectorFooter", () => {
  it("renders its children", () => {
    render(
      <InspectorFooter>
        <button type="button">Save</button>
      </InspectorFooter>,
    );
    expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
  });

  it("is sticky to the bottom so actions survive scrolling", () => {
    const { container } = render(<InspectorFooter>x</InspectorFooter>);
    expect(container.firstElementChild).toHaveClass("sticky", "bottom-0");
  });

  it("forwards className", () => {
    const { container } = render(<InspectorFooter className="custom-footer">x</InspectorFooter>);
    expect(container.querySelector(".custom-footer")).toBeInTheDocument();
  });
});

describe("InspectorStatus", () => {
  it("renders one row per item, label and status together", () => {
    render(
      <InspectorStatus
        items={[
          { label: "Sync", status: "success" },
          { label: "Publishing", status: "warning" },
        ]}
      />,
    );
    expect(screen.getByText("Sync")).toBeInTheDocument();
    expect(screen.getByText("Publishing")).toBeInTheDocument();
  });

  it("renders nothing but an empty container for an empty list", () => {
    const { container } = render(<InspectorStatus items={[]} />);
    expect(container.firstElementChild?.children).toHaveLength(0);
  });

  it("forwards className", () => {
    const { container } = render(<InspectorStatus items={[]} className="custom-status" />);
    expect(container.querySelector(".custom-status")).toBeInTheDocument();
  });

  it("has no axe violations", async () => {
    const { container } = render(<InspectorStatus items={[{ label: "Sync", status: "success" }]} />);
    expect(await runA11yCheck(container)).toHaveNoA11yViolations();
  });
});

describe("InspectorHistory", () => {
  const entries: InspectorHistoryEntry[] = Array.from({ length: 5 }, (_, i) => ({
    id: `e${i}`,
    actor: `User ${i}`,
    description: `Event ${i}`,
    timestamp: `${i}h ago`,
  }));

  it("renders entries in the order given — it does not re-sort", () => {
    render(<InspectorHistory entries={entries.slice(0, 3)} />);
    const items = screen.getAllByRole("listitem");
    expect(items[0]).toHaveTextContent("Event 0");
    expect(items[2]).toHaveTextContent("Event 2");
  });

  it("shows each entry's actor and timestamp", () => {
    render(<InspectorHistory entries={entries.slice(0, 1)} />);
    expect(screen.getByText(/User 0/)).toBeInTheDocument();
    expect(screen.getByText(/0h ago/)).toBeInTheDocument();
  });

  it("collapses past three entries by default", () => {
    render(<InspectorHistory entries={entries} />);
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
    expect(screen.getByRole("button", { name: /Show 2 more/ })).toBeInTheDocument();
  });

  it("honours a custom collapsedCount", () => {
    render(<InspectorHistory entries={entries} collapsedCount={4} />);
    expect(screen.getAllByRole("listitem")).toHaveLength(4);
    expect(screen.getByRole("button", { name: /Show 1 more/ })).toBeInTheDocument();
  });

  it("shows no expander when everything already fits", () => {
    render(<InspectorHistory entries={entries.slice(0, 2)} />);
    expect(screen.queryByRole("button", { name: /Show/ })).not.toBeInTheDocument();
  });

  it("reveals the remaining entries when expanded", async () => {
    const user = userEvent.setup();
    render(<InspectorHistory entries={entries} />);
    await user.click(screen.getByRole("button", { name: /Show 2 more/ }));
    expect(screen.getAllByRole("listitem")).toHaveLength(5);
    expect(screen.getByText("Event 4")).toBeInTheDocument();
  });

  it("renders an optional per-entry icon, hidden from assistive tech", () => {
    const { container } = render(
      <InspectorHistory entries={[{ ...entries[0], icon: <span>★</span> }]} />,
    );
    expect(container.querySelector('[aria-hidden="true"]')).toBeInTheDocument();
  });

  it("handles an empty entry list", () => {
    render(<InspectorHistory entries={[]} />);
    expect(screen.queryAllByRole("listitem")).toHaveLength(0);
  });

  it("forwards className", () => {
    const { container } = render(<InspectorHistory entries={[]} className="custom-history" />);
    expect(container.querySelector(".custom-history")).toBeInTheDocument();
  });

  it("has no axe violations, collapsed or expanded", async () => {
    const user = userEvent.setup();
    const { container } = render(<InspectorHistory entries={entries} />);
    expect(await runA11yCheck(container)).toHaveNoA11yViolations();
    await user.click(screen.getByRole("button", { name: /Show 2 more/ }));
    expect(await runA11yCheck(container)).toHaveNoA11yViolations();
  });
});

describe("InspectorValidation", () => {
  it("renders a validation summary when there are items", () => {
    render(<InspectorValidation items={[{ field: "altText", severity: "error", message: "Missing alt text" }]} />);
    expect(screen.getByText("Missing alt text")).toBeInTheDocument();
  });

  it("renders every item, across severities", () => {
    render(
      <InspectorValidation
        items={[
          { field: "altText", severity: "error", message: "Missing alt text" },
          { field: "resolution", severity: "warning", message: "Low resolution" },
        ]}
      />,
    );
    expect(screen.getByText("Missing alt text")).toBeInTheDocument();
    expect(screen.getByText("Low resolution")).toBeInTheDocument();
  });

  it("renders the success message when there are no items and one is supplied", () => {
    render(<InspectorValidation items={[]} emptyMessage="All checks passed" />);
    expect(screen.getByText("All checks passed")).toBeInTheDocument();
  });

  it("renders nothing at all when empty with no emptyMessage", () => {
    // The shared render() wrapper mounts a LiveRegionProvider node, so the
    // container is never literally empty — assert on visible content instead.
    render(<InspectorValidation items={[]} />);
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
    expect(screen.queryByText(/./)).not.toBeInTheDocument();
  });

  it("forwards className", () => {
    const { container } = render(<InspectorValidation items={[]} emptyMessage="OK" className="custom-validation" />);
    expect(container.querySelector(".custom-validation")).toBeInTheDocument();
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <InspectorValidation items={[{ field: "altText", severity: "error", message: "Missing alt text" }]} />,
    );
    expect(await runA11yCheck(container)).toHaveNoA11yViolations();
  });
});

describe("InspectorActions inside InspectorFooter", () => {
  it("composes without either component swallowing the other's content", () => {
    render(
      <InspectorFooter>
        <InspectorActions>
          <button type="button">Publish</button>
        </InspectorActions>
      </InspectorFooter>,
    );
    expect(screen.getByRole("button", { name: "Publish" })).toBeInTheDocument();
  });

  it("keeps the action clickable through both wrappers", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(
      <InspectorFooter>
        <InspectorActions>
          <button type="button" onClick={onClick}>
            Publish
          </button>
        </InspectorActions>
      </InspectorFooter>,
    );
    await user.click(screen.getByRole("button", { name: "Publish" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
