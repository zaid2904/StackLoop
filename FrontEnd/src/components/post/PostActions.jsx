import { Link } from "react-router-dom";
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

      <Tooltip label="Share">
        <button
          type="button"
          aria-label="Share post"
          className="flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-sans transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg text-muted hover:text-text hover:bg-surface"
        >
          <ShareIcon />
          <span>Share</span>
        </button>
      </Tooltip>

      <Tooltip label="Bookmark">
        <button
          type="button"
          aria-label="Bookmark post"
          className="flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-sans transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg text-muted hover:text-text hover:bg-surface"
        >
          <BookmarkIcon filled={false} />
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

