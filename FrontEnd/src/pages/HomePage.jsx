import { FeedFilter } from "../components/post/FeedFilter";
import { PostCard } from "../components/post/PostCard";
import { PostComposer } from "../components/post/PostComposer";
import {
  Skeleton,
  SkeletonText,
  SkeletonAvatar,
} from "../components/primitives/Skeleton";
import { Divider } from "../components/primitives/Divider";
import { mockPosts } from "../data/mockPosts";
import { useFeedStore } from "../store/feedStore";
import { useAuthStore } from "../store/authStore";
import { useState } from "react";

function PostSkeleton() {
  return (
    <div className="bg-surface border border-border rounded-xl p-4 flex gap-4">
      <div className="flex flex-col items-center gap-2 pt-1">
        <Skeleton className="h-8 w-8 rounded-md" />
        <Skeleton className="h-4 w-6 rounded-md" />
        <Skeleton className="h-8 w-8 rounded-md" />
      </div>
      <div className="flex-1 space-y-3">
        <div className="flex items-center gap-2">
          <SkeletonAvatar size="md" />
          <SkeletonText size="sm" className="w-24" />
          <SkeletonText size="sm" className="w-16" />
        </div>
        <SkeletonText size="lg" className="w-3/4" />
        <SkeletonText size="base" className="w-full" />
        <SkeletonText size="base" className="w-5/6" />
      </div>
    </div>
  );
}

/**
 * HomePage — main feed with filter + posts.
 */
export default function HomePage() {
  const { filter } = useFeedStore();
  const { user } = useAuthStore();
  const [posts, setPosts] = useState(mockPosts);
  const [isLoading] = useState(false);
  const [showComposer, setShowComposer] = useState(false);

  // Sort posts based on filter (mock logic)
  const sortedPosts = [...posts].sort((a, b) => {
    if (filter === "new") return new Date(b.createdAt) - new Date(a.createdAt);
    if (filter === "top") return b.votes - a.votes;
    if (filter === "rising") return b.commentCount - a.commentCount;
    // hot: weighted score
    return b.votes + b.commentCount * 2 - (a.votes + a.commentCount * 2);
  });

  const handleNewPost = ({ title, community, blocks }) => {
    const post = {
      id: `p${Date.now()}`,
      author: {
        id: user?.id ?? "u1",
        username: user?.username ?? "anon",
        displayName: user?.displayName ?? "Anon",
        avatarUrl: "",
      },
      community,
      title,
      blocks,
      votes: 1,
      commentCount: 0,
      createdAt: new Date().toISOString(),
      tags: [],
    };
    setPosts((prev) => [post, ...prev]);
    setShowComposer(false);
  };

  return (
    <div className="space-y-4">
      {/* Composer toggle */}
      {!showComposer && (
        <button
          onClick={() => setShowComposer(true)}
          className="w-full text-left px-4 py-3 bg-surface border border-border rounded-xl text-muted text-sm font-sans hover:border-accent transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
        >
          What's on your mind, developer?
        </button>
      )}

      {showComposer && (
        <PostComposer
          onSubmit={handleNewPost}
          onCancel={() => setShowComposer(false)}
        />
      )}

      <FeedFilter />

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <PostSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {sortedPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
