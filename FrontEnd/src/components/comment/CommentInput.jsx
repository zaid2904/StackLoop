import { Textarea } from "../primitives/Input";
import { Button } from "../primitives/Button";
import { Avatar } from "../primitives/Avatar";

/**
 * CommentInput — expandable textarea with submit.
 *
 * @param {object} props
 * @param {(content: string) => void} props.onSubmit
 * @param {string} [props.placeholder]
 * @param {boolean} [props.autoFocus]
 */
export function CommentInput({
  placeholder = "Write a comment…",
  autoFocus,
}) {
  return (
    <form className="flex gap-3">
      <Avatar
        size="sm"
        username="guest"
        alt="Guest"
        className="mt-1 flex-shrink-0"
      />
      <div className="flex-1 space-y-2">
        <Textarea
          placeholder={placeholder}
          autoFocus={autoFocus}
          rows={2}
          readOnly
          aria-label="Comment text"
        />
        <div className="flex justify-end gap-2">
          <Button type="button" variant="ghost" size="sm" disabled>
            Cancel
          </Button>
          <Button type="button" variant="primary" size="sm" disabled>
            Comment
          </Button>
        </div>
      </div>
    </form>
  );
}
