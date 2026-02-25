import { useState, useCallback } from "react";

/**
 * Hook for copying text to clipboard with a "copied" feedback state.
 * @returns {object}
 */
export function useClipboard({ timeout = 2000 } = {}) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(
    async (text) => {
      if (!navigator.clipboard) return;
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), timeout);
      } catch {
        // Silently fail — clipboard access may be denied
      }
    },
    [timeout],
  );

  return { copied, copy };
}
