interface ConnectionArrowProps {
  /** Must be unique within the document — used as the SVG marker id and referenced via `url(#id)`. */
  id: string;
  color: string;
}

/** An SVG arrowhead <marker> definition. Render inside a <defs>, then reference via `markerEnd={\`url(#${id})\`}`. */
export function ConnectionArrow({ id, color }: ConnectionArrowProps) {
  return (
    <marker id={id} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill={color} />
    </marker>
  );
}
