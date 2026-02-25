import { Link } from "react-router-dom";
import { Badge } from "../primitives/Badge";
import { Avatar } from "../primitives/Avatar";
import { Divider } from "../primitives/Divider";
import { formatCount } from "../../utils/formatCount";
import { trendingTags, mockUsers } from "../../data/mockPosts";

/**
 * Right sidebar — trending tags, suggested users, stats.
 */
export function RightSidebar() {
  return (
    <aside
      className="hidden lg:block w-70 flex-shrink-0"
      aria-label="Trending and suggestions"
    >
      <div className="sticky top-20 space-y-4">
        <TrendingTags />
        <Divider />
        <SuggestedUsers />
        <Divider />
        <CommunityStats />
      </div>
    </aside>
  );
}

function TrendingTags() {
  return (
    <section aria-labelledby="trending-tags-heading">
      <h2
        id="trending-tags-heading"
        className="font-mono text-sm font-semibold text-text mb-3"
      >
        # Trending Tags
      </h2>
      <ul className="space-y-1">
        {trendingTags.map((tag) => (
          <li key={tag.name}>
            <Link
              to={`/tag/${tag.name}`}
              className="flex items-center justify-between px-3 py-2 rounded-md text-sm font-sans text-muted hover:text-text hover:bg-surface transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg group"
            >
              <span className="text-accent group-hover:text-accent">
                #{tag.name}
              </span>
              <Badge variant="default">{formatCount(tag.count)}</Badge>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

function SuggestedUsers() {
  return (
    <section aria-labelledby="suggested-users-heading">
      <h2
        id="suggested-users-heading"
        className="font-mono text-sm font-semibold text-text mb-3"
      >
        Suggested Devs
      </h2>
      <ul className="space-y-2">
        {mockUsers.map((user) => (
          <li key={user.id}>
            <Link
              to={`/u/${user.username}`}
              className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-surface transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            >
              <Avatar
                size="sm"
                username={user.username}
                alt={user.displayName}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text truncate">
                  {user.displayName}
                </p>
                <p className="text-xs text-muted truncate">
                  {formatCount(user.karma)} karma
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

function CommunityStats() {
  return (
    <section
      aria-labelledby="stats-heading"
      className="px-3 py-3 bg-surface rounded-lg border border-border"
    >
      <h2
        id="stats-heading"
        className="font-mono text-sm font-semibold text-text mb-3"
      >
        StackLoop Stats
      </h2>
      <dl className="space-y-2">
        {[
          { label: "Total Posts", value: "48.2k" },
          { label: "Active Devs", value: "12.1k" },
          { label: "Communities", value: "234" },
          { label: "Online Now", value: "891" },
        ].map(({ label, value }) => (
          <div key={label} className="flex justify-between text-sm">
            <dt className="text-muted">{label}</dt>
            <dd className="font-mono font-medium text-text">{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
