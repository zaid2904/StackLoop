import { useState } from "react";
import { CommentCard } from "./CommentCard";
import { CommentInput } from "./CommentInput";
import { Divider } from "../primitives/Divider";
import { formatCount } from "../../utils/formatCount";

/**
 * CommentSection — renders a full comment thread with add-comment input.
 *
 * @param {object} props
 * @param {string} props.postId
 * @param {import('./CommentCard').Comment[]} props.initialComments
 */
export function CommentSection({ postId, initialComments = [] }) {
  const [comments, setComments] = useState(initialComments);

  const handleAddComment = (content) => {
    const newComment = {
      id: `c-${Date.now()}`,
      postId,
      author: { id: "u1", username: "you", displayName: "You", avatarUrl: "" },
      content,
      votes: 1,
      createdAt: new Date().toISOString(),
      parentId: null,
      replies: [],
    };
    setComments((prev) => [newComment, ...prev]);
  };

  return (
    <section aria-labelledby="comments-heading" className="space-y-5">
      <header className="flex items-center gap-3">
        <h2
          id="comments-heading"
          className="font-mono text-sm font-semibold text-text"
        >
          {formatCount(comments.length)} Comments
        </h2>
        <Divider className="flex-1" />
      </header>

      <CommentInput onSubmit={handleAddComment} />

      <Divider />

      {comments.length === 0 ? (
        <p className="text-sm text-muted text-center py-8 font-sans">
          No comments yet. Be the first to respond.
        </p>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <CommentCard key={comment.id} comment={comment} depth={0} />
          ))}
        </div>
      )}
    </section>
  );
}
