import { Flame, Zap, Trophy, TrendingUp } from "lucide-react";
import { cn } from "../../utils/cn";

const FILTERS = [
  { id: "hot", label: "Hot", Icon: Flame },
  { id: "new", label: "New", Icon: Zap },
  { id: "top", label: "Top", Icon: Trophy },
  { id: "rising", label: "Rising", Icon: TrendingUp },
];

/**
 * FeedFilter — tab bar for feed sorting.
 */
export function FeedFilter() {
  const activeFilter = "hot";

  return (
    <nav
      aria-label="Feed filter"
      className="flex gap-1 border-b border-border pb-0 mb-4"
    >
      {FILTERS.map(({ id, label, Icon }) => (
        <button
          key={id}
          type="button"
          aria-pressed={activeFilter === id}
          className={cn(
            "flex items-center gap-1.5 px-4 py-2 text-sm font-sans font-medium border-b-2 -mb-px transition-colors duration-200 ease-out",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-t-md",
            activeFilter === id
              ? "border-accent text-accent"
              : "border-transparent text-muted hover:text-text",
          )}
        >
          <Icon size={13} aria-hidden="true" className="flex-shrink-0" />
          {label}
        </button>
      ))}
    </nav>
  );
}
