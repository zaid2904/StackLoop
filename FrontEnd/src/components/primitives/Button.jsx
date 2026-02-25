import { cn } from "../../utils/cn";

/**
 * Button primitive with variants.
 *
 * @param {object} props
 * @param {'primary' | 'ghost' | 'danger' | 'icon'} [props.variant='primary']
 * @param {'sm' | 'md'} [props.size='md']
 * @param {boolean} [props.disabled]
 * @param {string} [props.className]
 * @param {React.ReactNode} props.children
 */
export function Button({
  variant = "primary",
  size = "md",
  disabled = false,
  className,
  children,
  ...props
}) {
  const base =
    "inline-flex items-center justify-center gap-2 font-sans font-medium rounded-md transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:opacity-40 disabled:pointer-events-none";

  const variants = {
    primary: "bg-accent text-white hover:opacity-80 active:scale-95",
    ghost:
      "bg-transparent text-text border border-border hover:border-accent hover:text-accent",
    danger:
      "bg-transparent text-danger border border-danger hover:bg-danger hover:text-white",
    icon: "bg-transparent text-muted hover:text-text rounded-md p-0",
  };

  const sizes = {
    sm: variant === "icon" ? "h-8 w-8" : "h-8 px-3 text-xs",
    md: variant === "icon" ? "h-10 w-10" : "h-10 px-4 text-sm",
  };

  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
