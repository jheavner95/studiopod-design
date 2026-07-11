import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { MotionProvider } from "@/providers";
import { GlobalNav } from "@/components/layout";
import { LiveRegionProvider } from "@/components/feedback";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "StudioPOD Design System",
  description: "The shared design system powering the StudioPOD marketing site and the StudioPOD application.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full dark`}
    >
      <body className="min-h-full flex flex-col bg-canvas text-ink-primary antialiased">
        <MotionProvider>
          <LiveRegionProvider>
            <div id="app-root">
              <GlobalNav />
              {children}
            </div>
          </LiveRegionProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
