import { describe, it, expect } from "vitest";
import { render, screen, getAnnouncement, renderHook, fireEvent } from "@test/render";
import { runA11yCheck } from "@test/a11y";
import { LiveRegionProvider, useAnnounce } from "./LiveRegion";

function AnnounceButton({ message, priority }: { message: string; priority?: "polite" | "assertive" }) {
  const announce = useAnnounce();
  return (
    <button type="button" onClick={() => announce(message, priority)}>
      Announce
    </button>
  );
}

describe("LiveRegion", () => {
  describe("rendering", () => {
    it("renders its children transparently", () => {
      render(<LiveRegionProvider>Body</LiveRegionProvider>);
      expect(screen.getByText("Body")).toBeInTheDocument();
    });

    it("throws when useAnnounce is called outside a LiveRegionProvider", () => {
      expect(() => renderHook(() => useAnnounce())).toThrow("useAnnounce must be used within a LiveRegionProvider");
    });
  });

  describe("state coverage", () => {
    it("announces to the polite region by default", () => {
      render(<AnnounceButton message="Saved" />);
      fireEvent.click(screen.getByRole("button"));
      expect(getAnnouncement("polite")).toBe("Saved");
    });

    it("announces to the assertive region when priority is assertive", () => {
      render(<AnnounceButton message="Failed to save" priority="assertive" />);
      fireEvent.click(screen.getByRole("button"));
      expect(getAnnouncement("assertive")).toBe("Failed to save");
    });

    it("still registers a DOM change on back-to-back identical announcements, via its trailing-space parity toggle", () => {
      render(<AnnounceButton message="Saved" />);
      const button = screen.getByRole("button");
      fireEvent.click(button);
      const firstRegionText = document.querySelector('[aria-live="polite"]')?.textContent;
      fireEvent.click(button);
      const secondRegionText = document.querySelector('[aria-live="polite"]')?.textContent;
      expect(firstRegionText).not.toBe(secondRegionText);
      expect(getAnnouncement("polite")).toBe("Saved");
    });
  });

  describe("accessibility", () => {
    it("has no axe violations with an announcement present", async () => {
      const { container } = render(<AnnounceButton message="Saved" />);
      fireEvent.click(screen.getByRole("button"));
      expect(await runA11yCheck(container)).toHaveNoA11yViolations();
    });
  });
});
