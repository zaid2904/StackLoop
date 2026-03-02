import { Link } from "react-router-dom";
import { Search, ChevronRight } from "lucide-react";
import { Input } from "../components/primitives/Input";
import { Badge } from "../components/primitives/Badge";
import { PostCard } from "../components/post/PostCard";
import { Divider } from "../components/primitives/Divider";
import { CommunityIcon } from "../components/primitives/CommunityIcon";
import { mockPosts, communities, trendingTags } from "../data/mockPosts";
import { formatCount } from "../utils/formatCount";

/**
 * ExplorePage — search, trending tags, community directory.
 */
export default function ExplorePage() {
  const query = "";
  const filtered = mockPosts;

  return (
    <div className="space-y-6">
      <section aria-labelledby="explore-heading">
        <h1
          id="explore-heading"
          className="font-mono text-xl font-bold text-text mb-4"
        >
          Explore
        </h1>

        {/* Search bar */}
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none">
            <Search size={16} aria-hidden="true" />
          </span>
          <Input
            variant="search"
            placeholder="Search posts, tags, communities…"
            readOnly
            defaultValue=""
            aria-label="Explore search"
          />
        </div>
      </section>

      {!query && (
        <>
          {/* Trending tags */}
          <section aria-labelledby="tags-heading">
            <h2
              id="tags-heading"
              className="font-mono text-sm font-semibold text-text mb-3"
            >
              # Trending Tags
            </h2>
            <div className="flex flex-wrap gap-2">
              {trendingTags.map((tag) => (
                <Link
                  key={tag.name}
                  to={`/tag/${tag.name}`}
                  className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-md"
                >
                  <Badge variant="accent">
                    #{tag.name} · {formatCount(tag.count)}
                  </Badge>
                </Link>
              ))}
            </div>
          </section>

          <Divider />

          {/* Communities */}
          <section aria-labelledby="communities-heading">
            <h2
              id="communities-heading"
              className="font-mono text-sm font-semibold text-text mb-3"
            >
              Communities
            </h2>
            <ul className="grid gap-2">
              {communities.map((c) => (
                <li key={c.id}>
                  <Link
                    to={`/c/${c.name}`}
                    className="flex items-center gap-3 px-4 py-3 bg-surface border border-border rounded-xl hover:border-accent transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                  >
                    <CommunityIcon
                      name={c.name}
                      size={20}
                      className="flex-shrink-0 text-accent"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-text">
                        c/{c.name}
                      </p>
                      <p className="text-xs text-muted">
                        {formatCount(c.members)} members
                      </p>
                    </div>
                    <span className="text-muted">
                      <ChevronRight size={16} aria-hidden="true" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <Divider />
        </>
      )}

      {/* Posts or search results */}
      <section aria-labelledby="posts-heading">
        <h2
          id="posts-heading"
          className="font-mono text-sm font-semibold text-text mb-3"
        >
          {query ? `Results for "${query}"` : "Recent Posts"}
        </h2>
        {filtered.length === 0 ? (
          <p className="text-sm text-muted text-center py-12 font-sans">
            No posts match your search.
          </p>
        ) : (
          <div className="space-y-4">
            {filtered.map((post) => (
              <PostCard key={post.id} post={post} compact={!!query} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

// Icons imported from lucide-react above.
