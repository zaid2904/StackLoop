import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { PostCard } from "../components/post/PostCard";
import { Badge } from "../components/primitives/Badge";
import { Button } from "../components/primitives/Button";
import { Divider } from "../components/primitives/Divider";
import { FeedFilter } from "../components/post/FeedFilter";
import { CommunityIcon } from "../components/primitives/CommunityIcon";
import { mockPosts, communities } from "../data/mockPosts";
import { formatCount } from "../utils/formatCount";

/**
 * CommunityPage — community header + filtered post feed.
 * Lazy-loaded via React.lazy in App.jsx.
 */
export default function CommunityPage() {
  const { name } = useParams();
  const community = communities.find((c) => c.name === name);

  const posts = mockPosts.filter((p) => p.community === name);

  if (!community) {
    return (
      <div className="text-center py-20">
        <p className="font-mono text-3xl text-muted mb-2">c/{name}</p>
        <p className="text-sm text-muted mb-4">Community not found.</p>
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-accent hover:opacity-80 text-sm transition-colors duration-200 ease-out"
        >
          <ArrowLeft size={14} aria-hidden="true" />
          Back to feed
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Community header */}
      <header className="bg-surface border border-border rounded-xl p-5 space-y-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <CommunityIcon
              name={community.name}
              size={28}
              className="text-accent flex-shrink-0"
            />
            <div>
              <h1 className="font-mono text-xl font-bold text-text">
                c/{community.name}
              </h1>
              <p className="text-xs text-muted mt-0.5">
                {formatCount(community.members)} members
              </p>
            </div>
          </div>
          <Button variant="primary" size="sm">
            Join
          </Button>
        </div>

        <Divider />

        <div className="flex flex-wrap gap-2">
          <Badge variant="default">Active</Badge>
          <Badge variant="success">Open</Badge>
        </div>
      </header>

      <FeedFilter />

      {posts.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-sm text-muted font-sans">
            No posts in this community yet.
          </p>
          <Link
            to="/submit"
            className="mt-3 inline-flex items-center gap-1 text-accent text-sm hover:opacity-80 transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded"
          >
            Be the first to post
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
