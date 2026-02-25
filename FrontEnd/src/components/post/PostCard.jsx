import { memo } from "react";
import { Link } from "react-router-dom";
import { PostHeader } from "./PostHeader";
import { PostActions } from "./PostActions";
import { VoteSystem } from "../vote/VoteSystem";
import { TextBlock } from "./blocks/TextBlock";
import { CodeBlock } from "./blocks/CodeBlock";
import { ImageBlock } from "./blocks/ImageBlock";
import { PollBlock } from "./blocks/PollBlock";
import { Badge } from "../primitives/Badge";
import { cn } from "../../utils/cn";

/**
 * Maps block type to the correct block component.
 * @param {object} block
 */
function BlockRenderer({ block }) {
  switch (block.type) {
    case "text":
      return <TextBlock content={block.content} />;
    case "code":
      return (
        <CodeBlock
          content={block.content}
          language={block.language}
          filename={block.filename}
        />
      );
    case "image":
      return <ImageBlock url={block.url} alt={block.alt} />;
    case "poll":
      return (
        <PollBlock
          question={block.question}
          options={block.options}
          votes={block.votes}
          totalVotes={block.totalVotes}
          userVote={block.userVote}
        />
      );
    default:
      return null;
  }
}

/**
 * PostCard — full post renderer. Memoized for list performance.
 *
 * @param {object} props
 * @param {import('../../data/mockPosts').Post} props.post
 * @param {boolean} [props.compact=false] - Suppress blocks except first text
 */
export const PostCard = memo(function PostCard({ post, compact = false }) {
  const displayBlocks = compact
    ? post.blocks.filter((b) => b.type === "text").slice(0, 1)
    : post.blocks;

  return (
    <article
      className={cn(
        "bg-surface border border-border rounded-xl p-4 gap-4 flex transition-colors duration-200 ease-out",
        "hover:border-accent",
      )}
    >
      {/* Vote column */}
      <div className="flex-shrink-0 pt-1">
        <VoteSystem initialCount={post.votes} layout="vertical" />
      </div>

      {/* Main content */}
      <div className="flex-1 min-w-0 space-y-3">
        <PostHeader
          author={post.author}
          community={post.community}
          createdAt={post.createdAt}
        />

        {/* Post title */}
        <Link
          to={`/post/${post.id}`}
          className="block font-mono text-base font-semibold text-text hover:text-accent transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded"
        >
          {post.title}
        </Link>

        {/* Tags */}
        {post.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                to={`/tag/${tag}`}
                className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-md"
              >
                <Badge variant="default">#{tag}</Badge>
              </Link>
            ))}
          </div>
        )}

        {/* Block content */}
        <div className="space-y-3">
          {displayBlocks.map((block, i) => (
            <BlockRenderer key={i} block={block} />
          ))}
        </div>

        {/* Actions row */}
        <PostActions postId={post.id} commentCount={post.commentCount} />
      </div>
    </article>
  );
});
