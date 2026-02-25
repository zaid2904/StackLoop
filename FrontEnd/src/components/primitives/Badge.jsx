import { cn } from "../../utils/cn";

/**
 * Badge primitive with variants.
 *
 * @param {object} props
 * @param {'default' | 'accent' | 'success' | 'danger'} [props.variant='default']
 * @param {string} [props.className]
 * @param {React.ReactNode} props.children
 */
export function Badge({ variant = "default", className, children, ...props }) {
  const base =
    "inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-mono font-medium";

  const variants = {
    default: "bg-surface text-muted border border-border",
    accent: "bg-accent-dim text-accent border border-accent",
    success: "bg-success/10 text-success border border-success/30",
    danger: "bg-danger/10 text-danger border border-danger/30",
  };

  return (
    <span className={cn(base, variants[variant], className)} {...props}>
      {children}
    </span>
  );
}
