import { useState, useCallback } from "react";

/**
 * Hook for managing vote state on posts and comments.
 * @param {object} params
 * @param {number} params.initialCount - Starting vote count
 * @param {null | 'up' | 'down'} params.initialVote - User's initial vote
 * @returns {object}
 */
export function useVote({ initialCount = 0, initialVote = null } = {}) {
  const [count, setCount] = useState(initialCount);
  const [vote, setVote] = useState(initialVote);

  const upvote = useCallback(() => {
    setVote((prev) => {
      if (prev === "up") {
        setCount((c) => c - 1);
        return null;
      }
      setCount((c) => (prev === "down" ? c + 2 : c + 1));
      return "up";
    });
  }, []);

  const downvote = useCallback(() => {
    setVote((prev) => {
      if (prev === "down") {
        setCount((c) => c + 1);
        return null;
      }
      setCount((c) => (prev === "up" ? c - 2 : c - 1));
      return "down";
    });
  }, []);

  return { count, vote, upvote, downvote };
}
