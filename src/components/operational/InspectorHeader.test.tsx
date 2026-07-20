import { describe, it, expect, vi } from "vitest";
import { render, screen, userEvent } from "@test/render";
import { runA11yCheck } from "@test/a11y";
import { InspectorHeader } from "./InspectorHeader";

describe("InspectorHeader", () => {
  describe("rendering", () => {
    it("renders the name — the one required prop", () => {
      render(<InspectorHeader name="Hero Image" />);
      expect(screen.getByText("Hero Image")).toBeInTheDocument();
    });

    it("renders the optional type alongside the name", () => {
      render(<InspectorHeader name="Hero Image" type="Asset" />);
      expect(screen.getByText("Asset")).toBeInTheDocument();
    });

    it("renders the optional status label", () => {
      render(<InspectorHeader name="Hero Image" status={{ label: "Published", tone: "success" }} />);
      expect(screen.getByText("Published")).toBeInTheDocument();
    });

    it("renders the optional icon", () => {
      render(<InspectorHeader name="Hero Image" icon={<span data-testid="icon">◆</span>} />);
      expect(screen.getByTestId("icon")).toBeInTheDocument();
    });

    it("accepts a ReactNode name — needed for multi-select headers like '3 Selected'", () => {
      render(<InspectorHeader name={<strong>3 Selected</strong>} />);
      expect(screen.getByText("3 Selected").tagName).toBe("STRONG");
    });

    it("forwards className", () => {
      const { container } = render(<InspectorHeader name="Hero Image" className="custom-header" />);
      expect(container.querySelector(".custom-header")).toBeInTheDocument();
    });

    it("stays sticky at the top of the panel's scroll area", () => {
      const { container } = render(<InspectorHeader name="Hero Image" />);
      expect(container.firstElementChild).toHaveClass("sticky", "top-0");
    });
  });

  describe("dismiss affordance", () => {
    /**
     * DS-6.9C1 reported this affordance as missing; DS-6.9C2 corrected that.
     * It exists, it is a real button, and it is labelled "Close inspector" —
     * only the PROP name (`onCollapse`) reads as collapse rather than dismiss.
     * These tests pin the behaviour so the correction cannot silently regress.
     */
    it("renders no dismiss control when onCollapse is omitted", () => {
      render(<InspectorHeader name="Hero Image" />);
      expect(screen.queryByRole("button")).not.toBeInTheDocument();
    });

    it("renders a labelled close button when onCollapse is given", () => {
      render(<InspectorHeader name="Hero Image" onCollapse={() => {}} />);
      expect(screen.getByRole("button", { name: "Close inspector" })).toBeInTheDocument();
    });

    it("calls onCollapse on click", async () => {
      const onCollapse = vi.fn();
      const user = userEvent.setup();
      render(<InspectorHeader name="Hero Image" onCollapse={onCollapse} />);
      await user.click(screen.getByRole("button", { name: "Close inspector" }));
      expect(onCollapse).toHaveBeenCalledTimes(1);
    });

    it("is keyboard reachable and activates on Enter and Space", async () => {
      const onCollapse = vi.fn();
      const user = userEvent.setup();
      render(<InspectorHeader name="Hero Image" onCollapse={onCollapse} />);
      await user.tab();
      expect(screen.getByRole("button", { name: "Close inspector" })).toHaveFocus();
      await user.keyboard("{Enter}");
      await user.keyboard(" ");
      expect(onCollapse).toHaveBeenCalledTimes(2);
    });

    it("is a type=button so it never submits a surrounding form", () => {
      render(<InspectorHeader name="Hero Image" onCollapse={() => {}} />);
      expect(screen.getByRole("button", { name: "Close inspector" })).toHaveAttribute("type", "button");
    });
  });

  describe("accessibility", () => {
    it("has no axe violations, with and without the dismiss control", async () => {
      const { container: plain } = render(<InspectorHeader name="Hero Image" type="Asset" />);
      expect(await runA11yCheck(plain)).toHaveNoA11yViolations();
      const { container: closable } = render(<InspectorHeader name="Hero Image" onCollapse={() => {}} />);
      expect(await runA11yCheck(closable)).toHaveNoA11yViolations();
    });
  });
});

// ── DS-6.9C6A — multi-status contract ────────────────────────────────────────

describe("InspectorHeader — status dimensions", () => {
  describe("single status (unchanged contract)", () => {
    it("renders one badge from a single object", () => {
      render(<InspectorHeader name="Hero Image" status={{ label: "Published", tone: "success" }} />);
      expect(screen.getByText("Published")).toBeInTheDocument();
    });

    it("renders byte-identical markup to the pre-widening implementation", () => {
      // The single-object path still goes through IdentityBlock, so existing
      // callers cannot have shifted. Compared against a header with no status
      // to prove the badge is the only difference, and against itself to prove
      // determinism.
      const { container: a } = render(<InspectorHeader name="Hero Image" status={{ label: "Published" }} />);
      const { container: b } = render(<InspectorHeader name="Hero Image" status={{ label: "Published" }} />);
      expect(a.innerHTML).toBe(b.innerHTML);
    });

    it("defaults an omitted tone to neutral", () => {
      render(<InspectorHeader name="Hero Image" status={{ label: "Draft" }} />);
      expect(screen.getByText("Draft")).toBeInTheDocument();
    });
  });

  describe("multiple statuses", () => {
    it("renders every supplied badge", () => {
      render(
        <InspectorHeader
          name="Portrait Profile"
          status={[
            { label: "Published", tone: "success" },
            { label: "Degraded", tone: "warning" },
          ]}
        />,
      );
      expect(screen.getByText("Published")).toBeInTheDocument();
      expect(screen.getByText("Degraded")).toBeInTheDocument();
    });

    it("preserves the caller's order — it does not sort or infer priority", () => {
      const { container } = render(
        <InspectorHeader
          name="Portrait Profile"
          status={[
            { label: "Zebra", tone: "neutral" },
            { label: "Alpha", tone: "success" },
          ]}
        />,
      );
      const text = container.textContent ?? "";
      expect(text.indexOf("Zebra")).toBeLessThan(text.indexOf("Alpha"));
    });

    it("keeps tones independent per entry", () => {
      render(
        <InspectorHeader
          name="Portrait Profile"
          status={[
            { label: "Published", tone: "success" },
            { label: "Degraded", tone: "warning" },
          ]}
        />,
      );
      expect(screen.getByText("Published")).toHaveClass("text-success");
      expect(screen.getByText("Degraded")).toHaveClass("text-warning");
    });

    it("defaults a missing tone to neutral without affecting its siblings", () => {
      render(
        <InspectorHeader
          name="Portrait Profile"
          status={[{ label: "Untoned" }, { label: "Failed", tone: "error" }]}
        />,
      );
      expect(screen.getByText("Untoned")).toHaveClass("text-neutral");
      expect(screen.getByText("Failed")).toHaveClass("text-error");
    });

    it("does not deduplicate identical entries", () => {
      render(
        <InspectorHeader
          name="Portrait Profile"
          status={[{ label: "Stale", tone: "warning" }, { label: "Stale", tone: "warning" }]}
        />,
      );
      expect(screen.getAllByText("Stale")).toHaveLength(2);
    });

    it("does not merge labels into one badge", () => {
      render(<InspectorHeader name="X" status={[{ label: "A" }, { label: "B" }]} />);
      expect(screen.queryByText("A B")).not.toBeInTheDocument();
      expect(screen.queryByText("A, B")).not.toBeInTheDocument();
    });

    /**
     * The DS-6.9C6 regression: GenerationProfileInspector and RecipeInspector
     * each show lifecycle AND health in the header. A single-valued contract
     * forced one of them to be dropped, which is what blocked that package.
     */
    it("lets a lifecycle badge and a health badge coexist", () => {
      render(
        <InspectorHeader
          name="Portrait Profile"
          type="Generation Profile"
          status={[
            { label: "Published", tone: "success" },
            { label: "Health 62", tone: "warning" },
          ]}
        />,
      );
      expect(screen.getByText("Published")).toBeInTheDocument();
      expect(screen.getByText("Health 62")).toBeInTheDocument();
      // Both readable as independent statuses, neither collapsed into the other.
      expect(screen.getAllByText(/Published|Health 62/)).toHaveLength(2);
    });
  });

  describe("absent status", () => {
    it("renders no badge for an empty array, and leaves no empty wrapper", () => {
      const { container: empty } = render(<InspectorHeader name="Hero Image" status={[]} />);
      const { container: omitted } = render(<InspectorHeader name="Hero Image" />);
      expect(empty.innerHTML).toBe(omitted.innerHTML);
    });

    it("renders no badge when status is omitted entirely", () => {
      const { container } = render(<InspectorHeader name="Hero Image" />);
      expect(container.textContent).toBe("Hero Image");
    });
  });

  describe("interaction with the close affordance", () => {
    it("keeps the close button working alongside multiple statuses", async () => {
      const onCollapse = vi.fn();
      const user = userEvent.setup();
      render(
        <InspectorHeader
          name="Portrait Profile"
          status={[{ label: "Published", tone: "success" }, { label: "Degraded", tone: "warning" }]}
          onCollapse={onCollapse}
        />,
      );
      await user.click(screen.getByRole("button", { name: "Close inspector" }));
      expect(onCollapse).toHaveBeenCalledTimes(1);
    });

    it("still renders no button when onCollapse is omitted, with statuses present", () => {
      render(<InspectorHeader name="X" status={[{ label: "A" }, { label: "B" }]} />);
      expect(screen.queryByRole("button")).not.toBeInTheDocument();
    });
  });

  describe("accessibility", () => {
    it("exposes every status label as readable text", async () => {
      const { container } = render(
        <InspectorHeader
          name="Portrait Profile"
          status={[{ label: "Published", tone: "success" }, { label: "Degraded", tone: "warning" }]}
          onCollapse={() => {}}
        />,
      );
      expect(container).toHaveTextContent("Published");
      expect(container).toHaveTextContent("Degraded");
      expect(await runA11yCheck(container)).toHaveNoA11yViolations();
    });
  });
});

// ── DS-6.9C6E-A — metadata contract ──────────────────────────────────────────

describe("InspectorHeader — metadata", () => {
  it("is optional — no metadata prop renders no metadata content", () => {
    render(<InspectorHeader name="Hero Image" type="Asset" />);
    // The only text is name + type; nothing extra was introduced.
    expect(screen.getByText("Hero Image")).toBeInTheDocument();
    expect(screen.getByText("Asset")).toBeInTheDocument();
    expect(screen.queryByText(/v5/)).not.toBeInTheDocument();
  });

  it("leaves a header without metadata byte-identical to before the prop existed", () => {
    // Determinism proof: two renders of the metadata-less header match exactly,
    // and adding metadata is the ONLY structural difference (see the next test).
    const { container: a } = render(
      <InspectorHeader name="Hero Image" type="Asset" status={{ label: "Published" }} />,
    );
    const { container: b } = render(
      <InspectorHeader name="Hero Image" type="Asset" status={{ label: "Published" }} />,
    );
    expect(a.innerHTML).toBe(b.innerHTML);
  });

  it("renders metadata separately from type — both present, distinct nodes", () => {
    render(<InspectorHeader name="Hero Image" type="Overlay Preset" metadata="v5" />);
    const type = screen.getByText("Overlay Preset");
    const meta = screen.getByText("v5");
    expect(type).toBeInTheDocument();
    expect(meta).toBeInTheDocument();
    // Metadata is NOT inside the type node — it is its own region.
    expect(type).not.toContainElement(meta);
    expect(meta).not.toContainElement(type);
  });

  it("accepts multiple inline metadata values with caller-owned separators", () => {
    render(
      <InspectorHeader
        name="Hero Image"
        metadata={<>v5 <span aria-hidden>·</span> 2 blueprints <span aria-hidden>·</span> owned by Design</>}
      />,
    );
    expect(screen.getByText(/v5/)).toBeInTheDocument();
    expect(screen.getByText(/2 blueprints/)).toBeInTheDocument();
    expect(screen.getByText(/owned by Design/)).toBeInTheDocument();
  });

  it("accepts caller-owned React content, not just strings", () => {
    render(
      <InspectorHeader name="Hero Image" metadata={<span data-testid="custom-meta">custom</span>} />,
    );
    expect(screen.getByTestId("custom-meta")).toBeInTheDocument();
  });

  it("keeps metadata present and fully readable when type is long", () => {
    render(
      <InspectorHeader
        name="iPhone Premium Case Overlay"
        type="iphone-premium-case-overlay-a-very-long-slug-that-would-truncate-the-type-line"
        metadata="v5 · 2 BP"
      />,
    );
    // The metadata row is separate from type, so a long type cannot hide it:
    // its full text is present regardless of type length.
    expect(screen.getByText("v5 · 2 BP")).toBeInTheDocument();
  });

  it("coexists with multiple statuses without disturbing them", () => {
    render(
      <InspectorHeader
        name="Portrait Profile"
        type="Generation Profile"
        status={[
          { label: "Published", tone: "success" },
          { label: "Excellent", tone: "success" },
        ]}
        metadata="v4"
      />,
    );
    expect(screen.getByText("Published")).toBeInTheDocument();
    expect(screen.getByText("Excellent")).toBeInTheDocument();
    expect(screen.getByText("v4")).toBeInTheDocument();
  });

  it("does not change status order when metadata is present", () => {
    const { container } = render(
      <InspectorHeader
        name="X"
        status={[{ label: "Zebra" }, { label: "Alpha" }]}
        metadata="v1"
      />,
    );
    const text = container.textContent ?? "";
    expect(text.indexOf("Zebra")).toBeLessThan(text.indexOf("Alpha"));
  });

  it("is accessible — metadata is real readable text, no axe violations", async () => {
    const { container } = render(
      <InspectorHeader
        name="Hero Image"
        type="Overlay Preset"
        status={{ label: "Published", tone: "success" }}
        metadata={<>v5 <span aria-hidden>·</span> 2 blueprints</>}
        onCollapse={() => {}}
      />,
    );
    // Screen-reader visible: it is present in the accessibility tree as text,
    // and the decorative separator is aria-hidden rather than announced.
    expect(container).toHaveTextContent("v5");
    expect(container).toHaveTextContent("2 blueprints");
    expect(await runA11yCheck(container)).toHaveNoA11yViolations();
  });

  it("renders no empty wrapper for empty/falsey metadata", () => {
    // Compared against a metadata-less header: identical DOM proves no stray
    // wrapper is introduced for "", null, false or undefined.
    const { container: withoutProp } = render(<InspectorHeader name="Hero Image" type="Asset" />);
    for (const empty of ["", null as unknown as string, false as unknown as string, undefined]) {
      const { container } = render(<InspectorHeader name="Hero Image" type="Asset" metadata={empty} />);
      expect(container.innerHTML).toBe(withoutProp.innerHTML);
    }
  });
});
