import { memo, useState } from "react";
import { Link } from "react-router-dom";
import { Avatar } from "../primitives/Avatar";
import { VoteSystem } from "../vote/VoteSystem";
import { CommentInput } from "./CommentInput";
import { formatDate } from "../../utils/formatDate";
import { cn } from "../../utils/cn";

/**
 * @typedef {object} Comment
 * @property {string} id
 * @property {object} author
 * @property {string} content
 * @property {number} votes
 * @property {string} createdAt
 * @property {Comment[]} replies
 */

/**
 * CommentCard — single comment with vote + reply. Memoized.
 *
 * @param {object} props
 * @param {Comment} props.comment
 * @param {number} [props.depth=0]
 */
export const CommentCard = memo(function CommentCard({ comment, depth = 0 }) {
  const [collapsed, setCollapsed] = useState(false);
  const [replying, setReplying] = useState(false);
  const [replies, setReplies] = useState(comment.replies ?? []);

  const handleReply = (content) => {
    const newReply = {
      id: `r-${Date.now()}`,
      author: { id: "u1", username: "you", displayName: "You", avatarUrl: "" },
      content,
      votes: 1,
      createdAt: new Date().toISOString(),
      replies: [],
    };
    setReplies((prev) => [...prev, newReply]);
    setReplying(false);
  };

  return (
    <article
      className={cn("flex gap-3", depth > 0 && "pl-4 border-l border-border")}
    >
      {/* Collapse thread line */}
      <div className="flex flex-col items-center gap-1 flex-shrink-0">
        <Link
          to={`/u/${comment.author.username}`}
          className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-full"
        >
          <Avatar
            size="sm"
            username={comment.author.username}
            alt={comment.author.displayName}
            src={comment.author.avatarUrl || undefined}
          />
        </Link>
        {replies.length > 0 && (
          <button
            onClick={() => setCollapsed((c) => !c)}
            aria-label={collapsed ? "Expand thread" : "Collapse thread"}
            className="w-px flex-1 bg-border hover:bg-accent transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-full min-h-4"
          />
        )}
      </div>

      <div className="flex-1 min-w-0 pb-4">
        {/* Meta */}
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <Link
            to={`/u/${comment.author.username}`}
            className="text-sm font-medium text-text hover:text-accent transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent rounded"
          >
            {comment.author.displayName}
          </Link>
          <span className="text-xs text-muted">·</span>
          <time dateTime={comment.createdAt} className="text-xs text-muted">
            {formatDate(comment.createdAt)}
          </time>
        </div>

        {/* Body */}
        <p className="text-sm font-sans text-text leading-relaxed">
          {comment.content}
        </p>

        {/* Actions */}
        <div className="flex items-center gap-3 mt-2">
          <VoteSystem initialCount={comment.votes} layout="horizontal" />
          <button
            onClick={() => setReplying((r) => !r)}
            className="text-xs text-muted hover:text-accent transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-md px-2 py-1"
          >
            Reply
          </button>
          {replies.length > 0 && collapsed && (
            <button
              onClick={() => setCollapsed(false)}
              className="text-xs text-accent hover:opacity-80 transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-md px-2 py-1"
            >
              {replies.length} {replies.length === 1 ? "reply" : "replies"}
            </button>
          )}
        </div>

        {/* Reply input */}
        {replying && (
          <div className="mt-3">
            <CommentInput
              onSubmit={handleReply}
              placeholder={`Reply to ${comment.author.displayName}…`}
              autoFocus
            />
          </div>
        )}

        {/* Nested replies */}
        {!collapsed && replies.length > 0 && (
          <div className="mt-3 space-y-3">
            {replies.map((reply) => (
              <CommentCard key={reply.id} comment={reply} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    </article>
  );
});
