/**
 * Fixed, non-interactive background.
 * Layered radial halos, very subtle organic blobs, and a faint grain.
 * Rendered once at the Layout level. z-index: -1.
 */
export function BackgroundDecor() {
  return (
    <div className="kaisen-bg" aria-hidden="true">
      <span className="kaisen-bg__halo kaisen-bg__halo--caramel" />
      <span className="kaisen-bg__halo kaisen-bg__halo--espresso" />
      <span className="kaisen-bg__halo kaisen-bg__halo--cream" />

      <svg
        className="kaisen-bg__blob kaisen-bg__blob--tl"
        width="420"
        height="420"
        viewBox="0 0 400 400"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M200 20c90 0 180 50 180 150s-60 190-150 190S40 300 40 200 110 20 200 20Z" />
      </svg>

      <svg
        className="kaisen-bg__blob kaisen-bg__blob--br"
        width="520"
        height="520"
        viewBox="0 0 400 400"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M200 20c90 0 180 50 180 150s-60 190-150 190S40 300 40 200 110 20 200 20Z" />
      </svg>

      <div className="kaisen-bg__grain" />
    </div>
  );
}