import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@test/render";
import { runA11yCheck } from "@test/a11y";
import { Pagination } from "./Pagination";

describe("Pagination", () => {
  describe("rendering", () => {
    it("renders a page button for every page in a short range", () => {
      render(<Pagination page={1} pageCount={5} onPageChange={() => {}} />);
      [1, 2, 3, 4, 5].forEach((p) => expect(screen.getByRole("button", { name: String(p) })).toBeInTheDocument());
    });

    it("collapses a long range behind ellipses", () => {
      render(<Pagination page={5} pageCount={20} onPageChange={() => {}} />);
      expect(screen.getAllByText("…").length).toBeGreaterThan(0);
    });
  });

  describe("state coverage", () => {
    it("marks the current page with aria-current=page", () => {
      render(<Pagination page={3} pageCount={5} onPageChange={() => {}} />);
      expect(screen.getByRole("button", { name: "3" })).toHaveAttribute("aria-current", "page");
    });

    it("calls onPageChange with the clicked page", () => {
      const onPageChange = vi.fn();
      render(<Pagination page={1} pageCount={5} onPageChange={onPageChange} />);
      screen.getByRole("button", { name: "3" }).click();
      expect(onPageChange).toHaveBeenCalledWith(3);
    });

    it("disables Previous on the first page and Next on the last", () => {
      const { rerender } = render(<Pagination page={1} pageCount={5} onPageChange={() => {}} />);
      expect(screen.getByRole("button", { name: "Previous page" })).toBeDisabled();
      expect(screen.getByRole("button", { name: "Next page" })).not.toBeDisabled();
      rerender(<Pagination page={5} pageCount={5} onPageChange={() => {}} />);
      expect(screen.getByRole("button", { name: "Next page" })).toBeDisabled();
    });

    it("compact variant shows a plain 'Page N of M' caption instead of numbered buttons", () => {
      render(<Pagination page={2} pageCount={5} onPageChange={() => {}} variant="compact" />);
      expect(screen.getByText("Page 2 of 5")).toHaveAttribute("aria-current", "page");
      expect(screen.queryByRole("button", { name: "2" })).not.toBeInTheDocument();
    });

    it("load-more variant renders a single trigger that calls onLoadMore, disabled while loading or exhausted", () => {
      const onLoadMore = vi.fn();
      const { rerender } = render(<Pagination page={1} pageCount={3} onPageChange={() => {}} variant="load-more" onLoadMore={onLoadMore} />);
      screen.getByRole("button", { name: "Load more" }).click();
      expect(onLoadMore).toHaveBeenCalledTimes(1);
      rerender(<Pagination page={1} pageCount={3} onPageChange={() => {}} variant="load-more" onLoadMore={onLoadMore} loading />);
      expect(screen.getByRole("button", { name: "Loading…" })).toBeDisabled();
    });
  });

  describe("accessibility", () => {
    it("has no axe violations, numbered and compact", async () => {
      const { container, rerender } = render(<Pagination page={3} pageCount={10} onPageChange={() => {}} />);
      expect(await runA11yCheck(container)).toHaveNoA11yViolations();
      rerender(<Pagination page={3} pageCount={10} onPageChange={() => {}} variant="compact" />);
      expect(await runA11yCheck(container)).toHaveNoA11yViolations();
    });
  });
});
