/* Looping, muted background video with a poster still that stays visible
   until (and if) the video file actually loads. If the src is missing the
   poster image simply remains — no broken state. */
export default function MediaVideo({ src, poster, className = "", overlay = true, children }) {
  return (
    <div className={`media-video ${className}`.trim()}>
      <video
        className="media-video__el"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={poster}
      >
        {src && <source src={src} type="video/mp4" />}
      </video>
      {overlay && <span className="media-video__overlay" aria-hidden="true" />}
      {children && <div className="media-video__content">{children}</div>}
    </div>
  );
}
