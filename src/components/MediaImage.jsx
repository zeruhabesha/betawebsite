import { useState } from "react";
import { FALLBACK_GRADIENT } from "../data/media.js";

/* <img> that swaps to a branded gradient if the source fails to load,
   so the layout never shows a broken-image icon. */
export default function MediaImage({ src, alt = "", className = "", ratio, ...rest }) {
  const [failed, setFailed] = useState(false);
  const style = ratio ? { aspectRatio: ratio } : undefined;

  if (failed) {
    return (
      <div
        className={`media-img media-img--fallback ${className}`.trim()}
        style={{ ...style, background: FALLBACK_GRADIENT }}
        role="img"
        aria-label={alt}
      />
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={`media-img ${className}`.trim()}
      style={style}
      onError={() => setFailed(true)}
      {...rest}
    />
  );
}
