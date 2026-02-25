/**
 * TextBlock — markdown-safe rich text content block.
 *
 * @param {object} props
 * @param {string} props.content
 */
export function TextBlock({ content }) {
  // Split on double newlines for paragraph support (no markdown lib needed)
  const paragraphs = content.split(/\n\n+/).filter(Boolean);

  return (
    <div className="text-text text-sm font-sans leading-relaxed space-y-3">
      {paragraphs.map((para, i) => (
        <p key={i}>{para}</p>
      ))}
    </div>
  );
}
