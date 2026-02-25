import { useState } from "react";
import { cn } from "../../../utils/cn";
import { formatCount } from "../../../utils/formatCount";

/**
 * PollBlock — vote options with percentage bars.
 *
 * @param {object} props
 * @param {string} [props.question]
 * @param {{ id: string, text: string }[]} props.options
 * @param {number[]} props.votes - Vote count per option (same order as options)
 * @param {number} props.totalVotes
 * @param {string | null} props.userVote - Option id the user voted for
 */
export function PollBlock({
  question,
  options,
  votes,
  totalVotes,
  userVote: initialUserVote,
}) {
  const [userVote, setUserVote] = useState(initialUserVote);
  const [localVotes, setLocalVotes] = useState(votes);
  const [localTotal, setLocalTotal] = useState(totalVotes);

  const hasVoted = userVote !== null;

  const handleVote = (optionId) => {
    if (hasVoted) return;
    const idx = options.findIndex((o) => o.id === optionId);
    const updated = [...localVotes];
    updated[idx] += 1;
    setLocalVotes(updated);
    setLocalTotal((t) => t + 1);
    setUserVote(optionId);
  };

  return (
    <section
      className="rounded-lg border border-border bg-surface p-4 space-y-3"
      aria-label="Poll"
    >
      {question && (
        <p className="text-sm font-medium text-text font-sans">{question}</p>
      )}

      <ul className="space-y-2">
        {options.map((option, idx) => {
          const pct =
            localTotal > 0
              ? Math.round((localVotes[idx] / localTotal) * 100)
              : 0;
          const isSelected = userVote === option.id;

          return (
            <li key={option.id}>
              <button
                onClick={() => handleVote(option.id)}
                disabled={hasVoted}
                aria-label={`Vote for: ${option.text} (${pct}%)`}
                className={cn(
                  "w-full text-left rounded-md overflow-hidden border transition-colors duration-200 ease-out relative",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
                  hasVoted
                    ? "cursor-default"
                    : "cursor-pointer hover:border-accent",
                  isSelected ? "border-accent" : "border-border",
                )}
              >
                {/* Progress bar fill */}
                {hasVoted && (
                  <div
                    className={cn(
                      "absolute inset-y-0 left-0 transition-all duration-200 ease-out",
                      isSelected ? "bg-accent-dim" : "bg-surface",
                    )}
                    style={{ width: `${pct}%` }}
                    aria-hidden="true"
                  />
                )}

                <div className="relative flex items-center justify-between px-3 py-2.5">
                  <span
                    className={cn(
                      "text-sm font-sans",
                      isSelected ? "text-accent font-medium" : "text-text",
                    )}
                  >
                    {option.text}
                  </span>
                  {hasVoted && (
                    <span className="text-xs font-mono text-muted ml-2 flex-shrink-0">
                      {pct}%
                    </span>
                  )}
                </div>
              </button>
            </li>
          );
        })}
      </ul>

      <p className="text-xs text-muted font-sans">
        {formatCount(localTotal)} votes{!hasVoted && " · click to vote"}
      </p>
    </section>
  );
}
