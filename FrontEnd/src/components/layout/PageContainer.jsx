import { cn } from "../../utils/cn";

/**
 * PageContainer — constrains max-width and centers content.
 *
 * @param {object} props
 * @param {React.ReactNode} props.children
 * @param {string} [props.className]
 */
export function PageContainer({ children, className }) {
  return (
    <div className={cn("w-full max-w-7xl mx-auto px-4", className)}>
      {children}
    </div>
  );
}
