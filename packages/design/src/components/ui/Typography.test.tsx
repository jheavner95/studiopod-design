import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Body, Caption } from "./Typography";

/**
 * Finding D8 — text primitives that could not be composed with.
 *
 * `Body` and `Caption` rendered a paragraph and forwarded nothing, so a
 * consumer needing an attribute had to wrap the text in a `div`. Those wrappers
 * produced invalid `<p>` nesting and real hydration failures in three separate
 * StudioPOD packages.
 *
 * These are the two properties the correction rests on: the element is
 * choosable, and everything else reaches it.
 */
describe("Body", () => {
  it("is a paragraph by default, because that is what running text is", () => {
    render(<Body>Ordinary text</Body>);
    expect(screen.getByText("Ordinary text").tagName).toBe("P");
  });

  it("renders the element the consumer asks for", () => {
    render(<Body as="div">Contains structure</Body>);
    expect(screen.getByText("Contains structure").tagName).toBe("DIV");
  });

  it("forwards the attributes a consumer needs, rather than dropping them", () => {
    render(
      <Body as="div" id="judgment" data-finding="design" aria-live="polite">
        Something happened
      </Body>,
    );

    const node = screen.getByText("Something happened");
    expect(node.id).toBe("judgment");
    expect(node.getAttribute("data-finding")).toBe("design");
    expect(node.getAttribute("aria-live")).toBe("polite");
  });

  it("keeps its own styling props out of the DOM", () => {
    render(
      <Body size="sm" muted>
        Quiet
      </Body>,
    );

    const node = screen.getByText("Quiet");
    expect(node.getAttribute("size")).toBeNull();
    expect(node.getAttribute("muted")).toBeNull();
    expect(node.className).toContain("text-body-sm");
    expect(node.className).toContain("text-ink-secondary");
  });
});

describe("Caption", () => {
  it("is a paragraph by default", () => {
    render(<Caption>Supporting</Caption>);
    expect(screen.getByText("Supporting").tagName).toBe("P");
  });

  it("renders the element the consumer asks for, and forwards the rest", () => {
    render(
      <Caption as="span" data-scope="release">
        Beside something
      </Caption>,
    );

    const node = screen.getByText("Beside something");
    expect(node.tagName).toBe("SPAN");
    expect(node.getAttribute("data-scope")).toBe("release");
  });

  it("keeps the id prop it always had", () => {
    render(<Caption id="named">Labelled</Caption>);
    expect(screen.getByText("Labelled").id).toBe("named");
  });
});
