import { useState } from "react";
import { Textarea } from "../primitives/Input";
import { Button } from "../primitives/Button";
import { Avatar } from "../primitives/Avatar";
import { useAuthStore } from "../../store/authStore";
import { useUiStore } from "../../store/uiStore";

/**
 * CommentInput — expandable textarea with submit.
 *
 * @param {object} props
 * @param {(content: string) => void} props.onSubmit
 * @param {string} [props.placeholder]
 * @param {boolean} [props.autoFocus]
 */
export function CommentInput({
  onSubmit,
  placeholder = "Write a comment…",
  autoFocus = false,
}) {
  const [value, setValue] = useState("");
  const [expanded, setExpanded] = useState(autoFocus);
  const { user } = useAuthStore();
  const { openAuthModal } = useUiStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      openAuthModal("login");
      return;
    }
    if (!value.trim()) return;
    onSubmit?.(value.trim());
    setValue("");
    setExpanded(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <Avatar
        size="sm"
        username={user?.username ?? "?"}
        alt={user?.displayName ?? "Guest"}
        className="mt-1 flex-shrink-0"
      />
      <div className="flex-1 space-y-2">
        <Textarea
          placeholder={placeholder}
          value={value}
          autoFocus={autoFocus}
          rows={expanded ? 4 : 2}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setExpanded(true)}
          aria-label="Comment text"
        />
        {expanded && (
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                setExpanded(false);
                setValue("");
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="sm"
              disabled={!value.trim()}
            >
              Comment
            </Button>
          </div>
        )}
      </div>
    </form>
  );
}
