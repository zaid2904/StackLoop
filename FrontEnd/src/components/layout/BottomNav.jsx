import { NavLink } from "react-router-dom";
import { Home, Compass, PlusCircle, User } from "lucide-react";
import { cn } from "../../utils/cn";

const BOTTOM_NAV = [
  { to: "/", label: "Home", icon: Home, exact: true },
  { to: "/explore", label: "Explore", icon: Compass },
  { to: "/submit", label: "Post", icon: PlusCircle },
  { to: "/profile", label: "Profile", icon: User },
];

/**
 * Mobile-only bottom navigation bar.
 */
export function BottomNav() {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 h-16 bg-bg border-t border-border flex items-center md:hidden"
      aria-label="Mobile navigation"
    >
      <ul className="flex w-full">
        {BOTTOM_NAV.map(({ to, label, icon: Icon, exact }) => (
          <li key={to} className="flex-1">
            <NavLink
              to={to}
              end={exact}
              className={({ isActive }) =>
                cn(
                  "flex flex-col items-center justify-center gap-1 h-16 w-full text-xs font-sans transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
                  isActive ? "text-accent" : "text-muted",
                )
              }
            >
              <Icon size={20} aria-hidden="true" />
              <span>{label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

// Nav icons are now imported from lucide-react above.
