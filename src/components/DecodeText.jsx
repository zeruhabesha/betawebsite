import useDecode from "../hooks/useDecode.js";

/* Renders a heading fragment that resolves from a cyber glyph-scramble
   on first reveal. aria-label always carries the resolved text so the
   heading is announced correctly even mid-scramble. Keep gradient
   (.grad) words as separate siblings so they still sweep. */
export default function DecodeText({ text, as: Tag = "span", className = "", ...rest }) {
  const [ref, display] = useDecode(text);
  return (
    <Tag ref={ref} className={className} aria-label={text} {...rest}>
      <span aria-hidden="true">{display}</span>
    </Tag>
  );
}
