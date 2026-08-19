import type { AriaAttributes, CSSProperties, ElementType, ReactNode } from "react";

/**
 * Framework capabilities Design needs but does not own.
 *
 * The package targets React. It does not target Next.js, or any router, image
 * pipeline or data layer — [ADR 0007](../../../../docs/decisions/0007-framework-neutrality.md).
 * Until DH-3 that was aspiration: five components imported `next/link`, one
 * imported `next/image`, one imported `next/navigation`, and `next` was a
 * required peer dependency for every consumer including the ones that do not
 * use it.
 *
 * Those capabilities are now **injected as props**, with a plain HTML default.
 *
 * ## Why props rather than a provider
 *
 * ADR 0007 proposed a link adapter on the theme provider, with polymorphic
 * rendering as a secondary mechanism. Implementation inverted that, and the
 * reason is the other half of DH-3's mission.
 *
 * A provider is React context. A component that reads context must be a client
 * component, and so must everything below it. Routing a link through a provider
 * would therefore make `Button`, `NavigationItem`, `Breadcrumbs`, `QueueWidget`
 * and `RelationshipList` client components permanently — the exact
 * contamination DH-3 exists to remove, reintroduced by the mechanism meant to
 * fix a different problem.
 *
 * A prop has no such cost. `<Button href="/x" linkComponent={Link}>` renders
 * inside a Server Component: the consumer's client `Link` is passed as a prop
 * from server to client, which is the supported direction. `Button` itself
 * stays server-safe.
 *
 * The default matters as much as the mechanism. Every one of these defaults to
 * a plain HTML element, so **existing call sites keep working unchanged** —
 * `<Button href="/x">` still renders a working link. Consumers who want
 * client-side routing add one prop; consumers who do not, do nothing.
 *
 * ## Applying one component app-wide
 *
 * There is deliberately no global registry. If an application wants every link
 * to route through its framework, it wraps once:
 *
 * ```tsx
 * // app/design.tsx — the application's own thin binding
 * import Link from "next/link";
 * import { Button as DesignButton, type ButtonProps } from "@jheavner95/design";
 *
 * export const Button = (props: ButtonProps) => <DesignButton linkComponent={Link} {...props} />;
 * ```
 *
 * That is explicit, greppable, owned by the application, and costs Design
 * nothing. A module-level `setLinkComponent()` would be hidden global state
 * with no clear behaviour across the server/client boundary.
 */

/** The props Design passes to whatever renders a navigational link. */
export interface LinkComponentProps extends AriaAttributes {
  href: string;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  target?: string;
  rel?: string;
  tabIndex?: number;
}

/**
 * Anything that can render a link: the string `"a"` (the default), `next/link`,
 * a router's `Link`, or a consumer's own wrapper.
 */
export type LinkComponent = ElementType<LinkComponentProps>;

/** The props Design passes to whatever renders a fill-mode image. */
export interface ImageComponentProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  onError?: () => void;
}

/**
 * Anything that can render an image: the string `"img"` (the default),
 * `next/image`, or a consumer's own wrapper.
 *
 * Design only ever renders images in fill mode — the element is expected to
 * cover its positioned parent. The default `"img"` gets that from Design's own
 * classes; `next/image` gets it from its `fill` prop, which is why a consumer
 * passing `next/image` should pass it pre-bound:
 *
 * ```tsx
 * const FillImage = (props: ImageComponentProps) => <Image {...props} fill />;
 * ```
 */
export type ImageComponent = ElementType<ImageComponentProps>;
