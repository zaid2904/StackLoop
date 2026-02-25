import { cn } from "../../utils/cn";

/**
 * Input primitive with variants.
 *
 * @param {object} props
 * @param {'default' | 'search'} [props.variant='default']
 * @param {string} [props.className]
 */
export function Input({ variant = "default", className, ...props }) {
  const base =
    "w-full bg-surface text-text placeholder-muted border border-border rounded-md font-sans text-sm transition-colors duration-200 ease-out focus:outline-none focus:border-accent focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:opacity-40";

  const variants = {
    default: "h-10 px-3",
    search: "h-10 px-3 pl-9",
  };

  return (
    <input className={cn(base, variants[variant], className)} {...props} />
  );
}

/**
 * Textarea variant of Input.
 *
 * @param {object} props
 * @param {string} [props.className]
 */
export function Textarea({ className, ...props }) {
  return (
    <textarea
      className={cn(
        "w-full bg-surface text-text placeholder-muted border border-border rounded-md font-sans text-sm transition-colors duration-200 ease-out focus:outline-none focus:border-accent focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:opacity-40 resize-none px-3 py-2 min-h-24",
        className,
      )}
      {...props}
    />
  );
}
