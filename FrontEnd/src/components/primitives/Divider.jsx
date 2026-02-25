import { cn } from "../../utils/cn";

/**
 * Divider with optional label slot.
 *
 * @param {object} props
 * @param {React.ReactNode} [props.label]
 * @param {string} [props.className]
 */
export function Divider({ label, className }) {
  if (label) {
    return (
      <div className={cn("flex items-center gap-3", className)}>
        <hr className="flex-1 border-border" />
        <span className="text-xs text-muted font-sans">{label}</span>
        <hr className="flex-1 border-border" />
      </div>
    );
  }

  return <hr className={cn("border-border", className)} />;
}
