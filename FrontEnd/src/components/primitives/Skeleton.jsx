import { cn } from "../../utils/cn";

/**
 * Skeleton loading placeholder.
 *
 * @param {object} props
 * @param {string} [props.className] - Pass h-*, w-*, rounded-* to match target shape
 */
export function Skeleton({ className }) {
  return (
    <div
      className={cn("animate-pulse bg-surface rounded-md", className)}
      aria-hidden="true"
    />
  );
}

/**
 * Skeleton variant that matches a text line.
 * @param {object} props
 * @param {'sm' | 'base' | 'lg'} [props.size='base']
 * @param {string} [props.className]
 */
export function SkeletonText({ size = "base", className }) {
  const heights = {
    sm: "h-3",
    base: "h-4",
    lg: "h-5",
  };
  return (
    <div
      className={cn(
        "animate-pulse bg-surface rounded-md",
        heights[size],
        className,
      )}
      aria-hidden="true"
    />
  );
}

/**
 * Skeleton for avatar circles.
 * @param {'sm' | 'md' | 'lg' | 'xl'} [size='md']
 */
export function SkeletonAvatar({ size = "md" }) {
  const sizes = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-10 w-10",
    xl: "h-16 w-16",
  };
  return (
    <div
      className={cn("animate-pulse bg-surface rounded-full", sizes[size])}
      aria-hidden="true"
    />
  );
}
