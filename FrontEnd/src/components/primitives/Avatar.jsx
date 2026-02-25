import { cn } from "../../utils/cn";

/**
 * Avatar primitive.
 *
 * @param {object} props
 * @param {'sm' | 'md' | 'lg' | 'xl'} [props.size='md']
 * @param {string} [props.src]
 * @param {string} props.alt
 * @param {string} [props.username] - Used to generate fallback initials
 * @param {string} [props.className]
 */
export function Avatar({ size = "md", src, alt, username = "", className }) {
  const sizes = {
    sm: "h-6 w-6 text-xs",
    md: "h-8 w-8 text-xs",
    lg: "h-10 w-10 text-sm",
    xl: "h-16 w-16 text-xl",
  };

  const initials = username
    ? username.slice(0, 2).toUpperCase()
    : alt
      ? alt.slice(0, 2).toUpperCase()
      : "?";

  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className={cn(
          "rounded-full object-cover flex-shrink-0 border border-border",
          sizes[size],
          className,
        )}
      />
    );
  }

  return (
    <span
      className={cn(
        "rounded-full flex-shrink-0 flex items-center justify-center font-mono font-medium bg-accent-dim text-accent border border-accent/30",
        sizes[size],
        className,
      )}
      aria-label={alt}
    >
      {initials}
    </span>
  );
}
