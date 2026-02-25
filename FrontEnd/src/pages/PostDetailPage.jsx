import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { PostCard } from "../components/post/PostCard";
import { CommentSection } from "../components/comment/CommentSection";
import { VoteSystem } from "../components/vote/VoteSystem";
import { Badge } from "../components/primitives/Badge";
import { Divider } from "../components/primitives/Divider";
import { Skeleton, SkeletonText } from "../components/primitives/Skeleton";
import { mockPosts, mockComments } from "../data/mockPosts";

/**
 * PostDetailPage — full post view with comment thread.
 */
export default function PostDetailPage() {
  const { id } = useParams();
  const post = mockPosts.find((p) => p.id === id) ?? mockPosts[0];
  const comments = mockComments.filter((c) => c.postId === post.id);

  if (!post) {
    return (
      <div className="text-center py-20">
        <p className="font-mono text-3xl text-muted mb-2">404</p>
        <p className="text-sm text-muted mb-4">Post not found.</p>
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
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-xs text-muted font-sans">
          <li>
            <Link
              to="/"
              className="hover:text-accent transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent rounded"
            >
              Home
            </Link>
          </li>
          <li aria-hidden="true">·</li>
          <li>
            <Link
              to={`/c/${post.community}`}
              className="hover:text-accent transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent rounded"
            >
              c/{post.community}
            </Link>
          </li>
          <li aria-hidden="true">·</li>
          <li className="text-text truncate max-w-48">{post.title}</li>
        </ol>
      </nav>

      {/* Full post — non-compact */}
      <PostCard post={post} compact={false} />

      {/* Tags expanded */}
      {post.tags?.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {post.tags.map((tag) => (
            <Link
              key={tag}
              to={`/tag/${tag}`}
              className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-md"
            >
              <Badge variant="default">#{tag}</Badge>
            </Link>
          ))}
        </div>
      )}

      <Divider />

      {/* Comments */}
      <CommentSection postId={post.id} initialComments={comments} />
    </div>
  );
}
