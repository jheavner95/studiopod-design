import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SectionBadge, Display, Body } from "@/components/ui";

interface PageIntroProps {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
}

/** Shared hero for every DS-0.3 sub-page: back link to Application Components, badge, title, description, optional extra content (e.g. a stats row). */
export function PageIntro({ eyebrow, title, description, children }: PageIntroProps) {
  return (
    <div className="flex flex-col gap-6">
      <Link
        href="/application-components"
        className="focus-ring flex w-fit items-center gap-2 rounded-md text-caption text-ink-tertiary transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:text-ink-secondary"
      >
        <ArrowLeft className="size-3.5" aria-hidden />
        Application Components
      </Link>
      <SectionBadge>{eyebrow}</SectionBadge>
      <Display>{title}</Display>
      <Body size="lg" muted className="max-w-[var(--container-narrow)]">
        {description}
      </Body>
      {children}
    </div>
  );
}
