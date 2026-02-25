/**
 * ImageBlock — lazy-loaded image with preserved aspect ratio.
 *
 * @param {object} props
 * @param {string} props.url
 * @param {string} props.alt
 */
export function ImageBlock({ url, alt }) {
  return (
    <figure className="rounded-lg overflow-hidden border border-border bg-surface">
      <img
        src={url}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="w-full object-cover max-h-96"
      />
    </figure>
  );
}
