import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../primitives/Button";
import { Input } from "../primitives/Input";
import { Avatar } from "../primitives/Avatar";
import { useAuthStore } from "../../store/authStore";
import { useUiStore } from "../../store/uiStore";
import { cn } from "../../utils/cn";

/**
 * Global sticky navbar.
 */
export function Navbar() {
  const { user } = useAuthStore();
  const { openAuthModal, toggleSidebar } = useUiStore();
  const [searchVal, setSearchVal] = useState("");

  return (
    <header className="sticky top-0 z-50 h-14 bg-bg border-b border-border flex items-center">
      <div className="w-full max-w-7xl mx-auto px-4 flex items-center gap-4">
        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-muted hover:text-text transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-md p-1"
          onClick={toggleSidebar}
          aria-label="Toggle menu"
        >
          <MenuIcon />
        </button>

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-md"
        >
          <span className="font-mono font-bold text-lg text-text">
            Stack<span className="text-accent">Loop</span>
          </span>
        </Link>

        {/* Search */}
        <div className="hidden md:flex flex-1 max-w-2xl relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none">
            <SearchIcon />
          </span>
          <Input
            variant="search"
            placeholder="Search posts, tags, communities…"
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            aria-label="Search"
          />
        </div>

        <div className="flex items-center gap-2 ml-auto">
          {user ? (
            <>
              <Link to="/submit">
                <Button variant="primary" size="sm">
                  + New Post
                </Button>
              </Link>
              <Link
                to="/profile"
                className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-full"
              >
                <Avatar
                  size="sm"
                  username={user.username}
                  alt={user.displayName}
                />
              </Link>
            </>
          ) : (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => openAuthModal("login")}
              >
                Sign in
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => openAuthModal("signup")}
              >
                Sign up
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

function MenuIcon() {
  return (
    <svg
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path strokeLinecap="round" d="M3 6h18M3 12h18M3 18h18" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="8" />
      <path strokeLinecap="round" d="m21 21-4.35-4.35" />
    </svg>
  );
}
