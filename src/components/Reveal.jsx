import useReveal from "../hooks/useReveal.js";

/* Wraps children and fades/slides them in on scroll. */
export default function Reveal({ as: Tag = "div", className = "", style, children, ...rest }) {
  const [ref, visible] = useReveal();
  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`.trim()}
      style={style}
      {...rest}
    >
      {children}
    </Tag>
  );
}
