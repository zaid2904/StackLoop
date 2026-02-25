import { NavLink } from "react-router-dom";
import { Home, Compass, PlusSquare } from "lucide-react";
import { cn } from "../../utils/cn";
import { Divider } from "../primitives/Divider";
import { Badge } from "../primitives/Badge";
import { CommunityIcon } from "../primitives/CommunityIcon";
import { communities } from "../../data/mockPosts";
import { formatCount } from "../../utils/formatCount";
import { useUiStore } from "../../store/uiStore";

const NAV_LINKS = [
  { to: "/", label: "Home", icon: Home, exact: true },
  { to: "/explore", label: "Explore", icon: Compass },
  { to: "/submit", label: "New Post", icon: PlusSquare },
];

/**
 * Left sidebar navigation.
 */
export function LeftSidebar() {
  const { sidebarOpen, setSidebarOpen } = useUiStore();

  return (
    <>
      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-bg/80 md:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          "fixed top-14 left-0 h-[calc(100vh-3.5rem)] w-60 bg-bg border-r border-border z-40",
          "overflow-y-auto transition-transform duration-200 ease-out",
          "md:sticky md:translate-x-0 md:block",
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        )}
        aria-label="Primary navigation"
      >
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
      </aside>
    </>
  );
}

// Navigation icons are now imported from lucide-react above.
