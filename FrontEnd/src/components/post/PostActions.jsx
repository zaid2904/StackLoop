import { useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "../../utils/cn";
import { Tooltip } from "../primitives/Tooltip";
import { formatCount } from "../../utils/formatCount";

/**
 * PostActions — comment, share, bookmark buttons.
 *
 * @param {object} props
 * @param {string} props.postId
 * @param {number} props.commentCount
 */
export function PostActions({ postId, commentCount }) {
  const [bookmarked, setBookmarked] = useState(false);
  const [shared, setShared] = useState(false);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(
        `${window.location.origin}/post/${postId}`,
      );
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    } catch {
      // Silent fail
    }
  };

  return (
    <footer className="flex items-center gap-1 flex-wrap">
      <Tooltip label="View comments">
        <Link
          to={`/post/${postId}`}
          className="flex items-center gap-2 px-3 py-1.5 rounded-md text-muted text-xs font-sans hover:text-text hover:bg-surface transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
        >
          <CommentIcon />
          <span>{formatCount(commentCount)}</span>
        </Link>
      </Tooltip>

      <Tooltip label={shared ? "Link copied!" : "Share"}>
        <button
          onClick={handleShare}
          aria-label="Share post"
          className={cn(
            "flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-sans transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
            shared
              ? "text-success"
              : "text-muted hover:text-text hover:bg-surface",
          )}
        >
          {shared ? <CheckIcon /> : <ShareIcon />}
          <span>{shared ? "Copied" : "Share"}</span>
        </button>
      </Tooltip>

      <Tooltip label={bookmarked ? "Bookmarked" : "Bookmark"}>
        <button
          onClick={() => setBookmarked((b) => !b)}
          aria-label={bookmarked ? "Remove bookmark" : "Bookmark post"}
          aria-pressed={bookmarked}
          className={cn(
            "flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-sans transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
            bookmarked
              ? "text-accent"
              : "text-muted hover:text-text hover:bg-surface",
          )}
        >
          <BookmarkIcon filled={bookmarked} />
        </button>
      </Tooltip>
    </footer>
  );
}

function CommentIcon() {
  return (
    <svg
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
      />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <path d="m8.59 13.51 6.83 3.98M15.41 6.51l-6.82 3.98" />
    </svg>
  );
}

function BookmarkIcon({ filled }) {
  return (
    <svg
      width="14"
      height="14"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M20 6 9 17l-5-5" />
    </svg>
  );
}
