import { Link } from "react-router-dom";
import { Avatar } from "../primitives/Avatar";
import { Badge } from "../primitives/Badge";
import { formatDate } from "../../utils/formatDate";

/**
 * PostHeader — shows author, community, timestamp.
 *
 * @param {object} props
 * @param {object} props.author
 * @param {string} props.community
 * @param {string} props.createdAt
 */
export function PostHeader({ author, community, createdAt }) {
  return (
    <header className="flex items-center gap-3">
      <Link
        to={`/u/${author.username}`}
        className="flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-full"
      >
        <Avatar
          size="md"
          username={author.username}
          alt={author.displayName}
          src={author.avatarUrl || undefined}
        />
      </Link>

      <div className="flex flex-col min-w-0">
        <div className="flex items-center flex-wrap gap-x-2 gap-y-0.5">
          <Link
            to={`/u/${author.username}`}
            className="text-sm font-medium text-text hover:text-accent transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent rounded"
          >
            {author.displayName}
          </Link>
          <span className="text-muted text-xs">·</span>
          <Link
            to={`/c/${community}`}
            className="text-xs text-muted hover:text-accent transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent rounded"
          >
            c/{community}
          </Link>
          <span className="text-muted text-xs">·</span>
          <time dateTime={createdAt} className="text-xs text-muted">
            {formatDate(createdAt)}
          </time>
        </div>
      </div>
    </header>
  );
}
