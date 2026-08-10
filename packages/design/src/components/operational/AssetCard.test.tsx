import { describe, it, expect, vi } from "vitest";
import { render, screen, userEvent } from "@test/render";
import { runA11yCheck } from "@test/a11y";
import type { LinkComponent } from "@/framework";
import { AssetCard } from "./AssetCard";
import { AssetGrid } from "./AssetGrid";

describe("AssetCard", () => {
  describe("rendering", () => {
    it("renders its name and secondary lines", () => {
      render(<AssetCard name="Summit Trail Tee" secondary={["Released", "Updated 2 hours ago"]} />);
      expect(screen.getByText("Summit Trail Tee")).toBeInTheDocument();
      expect(screen.getByText("Released")).toBeInTheDocument();
    });

    it("is inert when given neither href nor onClick", () => {
      render(<AssetCard name="Summit Trail Tee" />);
      expect(screen.queryByRole("button")).not.toBeInTheDocument();
      expect(screen.queryByRole("link")).not.toBeInTheDocument();
    });
  });

  /*
   * The card a collection opens is addressable, so it has to be a real link:
   * a div with role="button" cannot be middle-clicked, ⌘-clicked, copied as a
   * URL or shown in the browser's status bar, and it is announced as a button
   * when it navigates. Cloud reported exactly this against UX-2.1 (finding D1).
   */
  describe("link form", () => {
    it("renders an anchor when given href", () => {
      render(<AssetCard name="Summit Trail Tee" href="/products/prd_summit_tee" />);
      const link = screen.getByRole("link", { name: /Summit Trail Tee/ });
      expect(link).toHaveAttribute("href", "/products/prd_summit_tee");
    });

    it("renders through a supplied link component", () => {
      const Link: LinkComponent = ({ href, children, ...rest }) => (
        <a href={href} data-framework-link="yes" {...rest}>
          {children}
        </a>
      );
      render(<AssetCard name="Tee" href="/x" linkComponent={Link} />);
      expect(screen.getByRole("link", { name: /Tee/ })).toHaveAttribute("data-framework-link", "yes");
    });

    it("prefers href over onClick, so a card never claims to be both", () => {
      const onClick = vi.fn();
      render(<AssetCard name="Tee" href="/x" onClick={onClick} />);
      expect(screen.getByRole("link", { name: /Tee/ })).toBeInTheDocument();
      expect(screen.queryByRole("button", { name: /Tee/ })).not.toBeInTheDocument();
    });

    it("keeps the selection checkbox usable inside a link", async () => {
      const onSelectChange = vi.fn();
      render(<AssetCard name="Tee" href="/x" selectable onSelectChange={onSelectChange} selectLabel="Select Tee" />);
      await userEvent.click(screen.getByRole("checkbox", { name: "Select Tee" }));
      expect(onSelectChange).toHaveBeenCalledWith(true);
    });

    it("takes a shorter accessible name than its visible content", () => {
      render(<AssetCard name="Tee" secondary={["Released", "Updated 2 hours ago"]} href="/x" aria-label="Tee — Released" />);
      expect(screen.getByRole("link", { name: "Tee — Released" })).toBeInTheDocument();
    });
  });

  describe("button form", () => {
    it("still activates on Enter and Space when given onClick", async () => {
      const onClick = vi.fn();
      render(<AssetCard name="Tee" onClick={onClick} />);
      const card = screen.getByRole("button", { name: /Tee/ });
      card.focus();
      await userEvent.keyboard("{Enter}");
      await userEvent.keyboard(" ");
      expect(onClick).toHaveBeenCalledTimes(2);
    });
  });

  describe("accessibility", () => {
    it("has no violations as a link", async () => {
      const { container } = render(<AssetCard name="Tee" href="/x" />);
      expect(await runA11yCheck(container)).toHaveNoA11yViolations();
    });
  });
});

describe("AssetGrid", () => {
  const rows = [
    { id: "a", name: "Alpha" },
    { id: "b", name: "Beta" },
  ];

  it("makes every card a link when the renderer supplies hrefs", () => {
    render(
      <AssetGrid
        rows={rows}
        render={{
          getId: (row) => row.id,
          getName: (row) => row.name,
          getHref: (row) => `/products/${row.id}`,
        }}
      />,
    );
    expect(screen.getByRole("link", { name: /Alpha/ })).toHaveAttribute("href", "/products/a");
    expect(screen.getByRole("link", { name: /Beta/ })).toHaveAttribute("href", "/products/b");
  });

  it("falls back to onItemClick when no href is supplied", async () => {
    const onItemClick = vi.fn();
    render(
      <AssetGrid rows={rows} render={{ getId: (row) => row.id, getName: (row) => row.name }} onItemClick={onItemClick} />,
    );
    await userEvent.click(screen.getByRole("button", { name: /Alpha/ }));
    expect(onItemClick).toHaveBeenCalledWith(rows[0]);
  });
});
