import { cn } from "../../utils/cn";
import { useVote } from "../../hooks/useVote";
import { formatCount } from "../../utils/formatCount";
import { Tooltip } from "../primitives/Tooltip";

/**
 * VoteSystem — upvote/downvote with animated count.
 *
 * @param {object} props
 * @param {number} [props.initialCount=0]
 * @param {'up' | 'down' | null} [props.initialVote=null]
 * @param {'vertical' | 'horizontal'} [props.layout='vertical']
 */
export function VoteSystem({
  initialCount = 0,
  initialVote = null,
  layout = "vertical",
}) {
  const { count, vote, upvote, downvote } = useVote({
    initialCount,
    initialVote,
  });

  return (
    <div
      className={cn(
        "flex items-center gap-1",
        layout === "vertical" ? "flex-col" : "flex-row",
      )}
    >
      <Tooltip label="Upvote">
        <button
          onClick={upvote}
          aria-label="Upvote"
          aria-pressed={vote === "up"}
          className={cn(
            "flex items-center justify-center h-8 w-8 rounded-md transition-colors duration-200 ease-out active:scale-110",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
            vote === "up"
              ? "text-accent bg-accent-dim"
              : "text-muted hover:text-accent hover:bg-accent-dim",
          )}
        >
          <UpArrow />
        </button>
      </Tooltip>

      <span
        className={cn(
          "font-mono text-sm font-medium tabular-nums min-w-8 text-center",
          vote === "up" && "text-accent",
          vote === "down" && "text-danger",
          !vote && "text-muted",
        )}
        aria-live="polite"
        aria-atomic="true"
      >
        {formatCount(count)}
      </span>

      <Tooltip label="Downvote">
        <button
          onClick={downvote}
          aria-label="Downvote"
          aria-pressed={vote === "down"}
          className={cn(
            "flex items-center justify-center h-8 w-8 rounded-md transition-colors duration-200 ease-out active:scale-110",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
            vote === "down"
              ? "text-danger bg-danger/10"
              : "text-muted hover:text-danger hover:bg-danger/10",
          )}
        >
          <DownArrow />
        </button>
      </Tooltip>
    </div>
  );
}

function UpArrow() {
  return (
    <svg
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 19V5m-7 7 7-7 7 7"
      />
    </svg>
  );
}

function DownArrow() {
  return (
    <svg
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 5v14m7-7-7 7-7-7"
      />
    </svg>
  );
}
