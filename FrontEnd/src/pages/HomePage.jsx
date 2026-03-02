import { FeedFilter } from "../components/post/FeedFilter";
import { PostCard } from "../components/post/PostCard";
import {
  Skeleton,
  SkeletonText,
  SkeletonAvatar,
} from "../components/primitives/Skeleton";
import { Button } from "../components/primitives/Button";
import { Input, Textarea } from "../components/primitives/Input";
import { mockPosts } from "../data/mockPosts";

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
  const posts = mockPosts;
  const isLoading = false;

  return (
    <div className="space-y-4">
      {/* Composer toggle */}
      <button
        type="button"
        className="w-full text-left px-4 py-3 bg-surface border border-border rounded-xl text-muted text-sm font-sans hover:border-accent transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
      >
        What's on your mind, developer?
      </button>

      <section className="bg-surface border border-border rounded-xl p-4 space-y-4">
        <Input value="" readOnly placeholder="Post title" aria-label="Post title" />
        <Input value="" readOnly placeholder="Community" aria-label="Community" />
        <Textarea
          value=""
          readOnly
          rows={4}
          placeholder="Write something..."
          aria-label="Post content"
        />
        <div className="flex justify-end gap-2">
          <Button type="button" variant="ghost" disabled>
            Cancel
          </Button>
          <Button type="button" variant="primary" disabled>
            Post
          </Button>
        </div>
      </section>

      <FeedFilter />

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <PostSkeleton key={i} />
          ))}
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
