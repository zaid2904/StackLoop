/**
 * Formats a count number into a human-readable short string.
 * @param {number} count
 * @returns {string}
 * @example formatCount(1200) // "1.2k"
 */
export function formatCount(count) {
  if (count === null || count === undefined) return "0";
  if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}m`;
  if (count >= 1_000) return `${(count / 1_000).toFixed(1)}k`;
  return String(count);
}
