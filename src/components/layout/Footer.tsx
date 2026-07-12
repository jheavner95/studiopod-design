import Link from "next/link";
import { Boxes } from "lucide-react";
import { Container } from "./Container";
import { Separator } from "./Separator";
import { Caption, Body } from "@/components/ui";
import { NAV_SECTIONS, getEntry } from "@/lib/design-system-navigation";

const SECTIONS = NAV_SECTIONS.filter((section) => section.id !== "overview");
const aboutEntry = getEntry("documentation");

/**
 * The one piece of persistent chrome every page was missing: a quiet close
 * to the page that restates identity and repeats the same top-level wayfinding
 * as GlobalNav, so a visitor who scrolls to the bottom of any page lands
 * somewhere intentional rather than on blank canvas.
 */
export function Footer() {
  return (
    <footer className="mt-auto border-t border-border-subtle">
      <Container size="wide" className="flex flex-col gap-8 py-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-col gap-2">
            <Link href="/" className="focus-ring flex w-fit items-center gap-2 rounded-md">
              <Boxes className="size-4 text-accent-400" aria-hidden />
              <span className="text-body-sm font-semibold text-ink-primary">StudioPOD Design System</span>
            </Link>
            <Body size="sm" muted className="max-w-sm">
              The design language of StudioPOD, the Production Operating System — one system for the marketing
              site and the product.
            </Body>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Footer">
            {SECTIONS.map((section) => (
              <Link
                key={section.id}
                href={section.href}
                className="focus-ring rounded-md text-caption font-medium text-ink-tertiary transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:text-ink-secondary"
              >
                {section.title}
              </Link>
            ))}
            {aboutEntry ? (
              <Link
                href={aboutEntry.href}
                className="focus-ring rounded-md text-caption font-medium text-ink-tertiary transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:text-ink-secondary"
              >
                Overview
              </Link>
            ) : null}
          </nav>
        </div>

        <Separator />

        <Caption className="text-ink-tertiary">StudioPOD Design System — the production operating system&rsquo;s own design language.</Caption>
      </Container>
    </footer>
  );
}
