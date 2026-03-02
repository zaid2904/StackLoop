import { NavLink } from "react-router-dom";
import { Home, Compass, PlusSquare } from "lucide-react";
import { cn } from "../../utils/cn";
import { Divider } from "../primitives/Divider";
import { Badge } from "../primitives/Badge";
import { CommunityIcon } from "../primitives/CommunityIcon";
import { communities } from "../../data/mockPosts";
import { formatCount } from "../../utils/formatCount";

const NAV_LINKS = [
  { to: "/", label: "Home", icon: Home, exact: true },
  { to: "/explore", label: "Explore", icon: Compass },
  { to: "/submit", label: "New Post", icon: PlusSquare },
];

/**
 * Left sidebar navigation.
 */
export function LeftSidebar() {
  return (
    <aside
      className={cn(
        "hidden md:block md:sticky md:top-20 md:h-[calc(100vh-5rem)] md:w-60 md:flex-shrink-0",
        "overflow-y-auto",
      )}
      aria-label="Primary navigation"
    >
      <div className="border-r border-border pr-4">
        <nav className="p-4 space-y-1">
          {NAV_LINKS.map(({ to, label, icon: Icon, exact }) => (
            <NavLink
              key={to}
              to={to}
              end={exact}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-sans transition-colors duration-200 ease-out",
                  "border-l-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
                  isActive
                    ? "border-accent text-accent bg-accent-dim"
                    : "border-transparent text-muted hover:text-text hover:bg-surface",
                )
              }
            >
              <Icon size={16} aria-hidden="true" />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="px-4 pb-4">
          <Divider label="Communities" className="my-3" />
          <ul className="space-y-1">
            {communities.map((c) => (
              <li key={c.id}>
                <NavLink
                  to={`/c/${c.name}`}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-sans transition-colors duration-200 ease-out",
                      "border-l-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
                      isActive
                        ? "border-accent text-accent bg-accent-dim"
                        : "border-transparent text-muted hover:text-text hover:bg-surface",
                    )
                  }
                >
                  <CommunityIcon name={c.name} size={15} />
                  <span className="flex-1 truncate">c/{c.name}</span>
                  <Badge variant="default">{formatCount(c.members)}</Badge>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
}

// Navigation icons are now imported from lucide-react above.
