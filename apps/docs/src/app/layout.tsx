import type { Metadata } from "next";
import { MotionProvider } from "@studiopod/design";
import { GlobalNav, Footer } from "@/components/layout";
import { LiveRegionProvider } from "@studiopod/design";
import "./globals.css";

/**
 * There is no `next/font` here on purpose (DH-5.5).
 *
 * This app used to load Geist through `next/font/google` and hand the result
 * to `<html>` as `--font-geist-sans` / `--font-geist-mono`. Those are exactly
 * the variables Foundation's font stacks referenced, so the documentation site
 * was the one place in the ecosystem where StudioPOD typography actually
 * rendered — and it worked through a Next.js API that the library is forbidden
 * to use and that no Vite consumer has.
 *
 * That made this app a false witness. It looked correct while every real
 * consumer rendered in the browser's default serif, and it would have kept
 * looking correct through any regression in the package's own font loading.
 *
 * The fonts now arrive the same way they arrive for Cloud: from
 * `@studiopod/design/styles.css`, which `globals.css` imports. If typography
 * breaks in the package, it breaks here too — which is the entire point of a
 * documentation site that consumes its own product.
 */

export const metadata: Metadata = {
  title: "StudioPOD Design System",
  description:
    "The shared design system powering the StudioPOD marketing site and the StudioPOD application.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full dark">
      <body className="min-h-full flex flex-col bg-canvas text-ink-primary antialiased">
        <MotionProvider>
          <LiveRegionProvider>
            <div id="app-root" className="flex min-h-full flex-1 flex-col">
              <GlobalNav />
              <div className="flex-1">{children}</div>
              <Footer />
            </div>
          </LiveRegionProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
