import { useState } from "react";
import { Button } from "../primitives/Button";
import { Input, Textarea } from "../primitives/Input";
import { Badge } from "../primitives/Badge";
import { Divider } from "../primitives/Divider";
import { CodeBlock } from "./blocks/CodeBlock";
import { usePostComposer } from "../../hooks/usePostComposer";
import { cn } from "../../utils/cn";

const TABS = [
  { id: "text", label: "Text" },
  { id: "code", label: "Code" },
  { id: "image", label: "Image" },
  { id: "poll", label: "Poll" },
];

const COMMUNITIES = ["reactjs", "typescript", "nextjs", "javascript", "css"];

/**
 * PostComposer — tabbed post creation form.
 *
 * @param {object} props
 * @param {() => void} [props.onSubmit]
 * @param {() => void} [props.onCancel]
 */
export function PostComposer({ onSubmit, onCancel }) {
  const composer = usePostComposer();
  const [codeInput, setCodeInput] = useState({
    language: "javascript",
    content: "",
  });
  const [imageInput, setImageInput] = useState({ url: "", alt: "" });
  const [pollInput, setPollInput] = useState({
    question: "",
    options: ["", "", "", ""],
  });

  const handleAddBlock = () => {
    if (composer.activeTab === "text") return; // Text added via title field
    if (composer.activeTab === "code" && codeInput.content.trim()) {
      composer.addBlock({ type: "code", ...codeInput });
      setCodeInput({ language: "javascript", content: "" });
    }
    if (composer.activeTab === "image" && imageInput.url.trim()) {
      composer.addBlock({ type: "image", ...imageInput });
      setImageInput({ url: "", alt: "" });
    }
    if (composer.activeTab === "poll" && pollInput.question) {
      const opts = pollInput.options
        .filter(Boolean)
        .map((text, i) => ({ id: `o${i}`, text }));
      if (opts.length >= 2) {
        composer.addBlock({
          type: "poll",
          question: pollInput.question,
          options: opts,
          votes: opts.map(() => 0),
          totalVotes: 0,
          userVote: null,
        });
        setPollInput({ question: "", options: ["", "", "", ""] });
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!composer.validate()) return;
    onSubmit?.({
      title: composer.title,
      community: composer.community,
      blocks: composer.blocks,
    });
    composer.reset();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-surface border border-border rounded-xl p-5 space-y-4"
      noValidate
    >
      <h2 className="font-mono text-base font-semibold text-text">
        Create Post
      </h2>
      <Divider />

      {/* Community select */}
      <div>
        <label
          className="block text-xs font-medium text-muted mb-1"
          htmlFor="community"
        >
          Community
        </label>
        <select
          id="community"
          value={composer.community}
          onChange={(e) => composer.setCommunity(e.target.value)}
          className="w-full bg-surface text-text border border-border rounded-md text-sm font-sans h-10 px-3 focus:outline-none focus:border-accent focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg transition-colors duration-200"
        >
          <option value="">Select community…</option>
          {COMMUNITIES.map((c) => (
            <option key={c} value={c}>
              c/{c}
            </option>
          ))}
        </select>
        {composer.errors.community && (
          <p className="text-danger text-xs mt-1">
            {composer.errors.community}
          </p>
        )}
      </div>

      {/* Title */}
      <div>
        <label
          className="block text-xs font-medium text-muted mb-1"
          htmlFor="post-title"
        >
          Title
        </label>
        <Input
          id="post-title"
          type="text"
          placeholder="Your post title…"
          value={composer.title}
          onChange={(e) => composer.setTitle(e.target.value)}
          maxLength={300}
        />
        {composer.errors.title && (
          <p className="text-danger text-xs mt-1">{composer.errors.title}</p>
        )}
      </div>

      {/* Content tabs */}
      <div>
        <div className="flex gap-1 border-b border-border mb-3">
          {TABS.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => composer.setActiveTab(id)}
              className={cn(
                "px-4 py-2 text-sm font-sans font-medium border-b-2 -mb-px transition-colors duration-200 ease-out",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-t-md",
                composer.activeTab === id
                  ? "border-accent text-accent"
                  : "border-transparent text-muted hover:text-text",
              )}
            >
              {label}
            </button>
          ))}
        </div>

        <ContentTabPanel
          tab={composer.activeTab}
          codeInput={codeInput}
          setCodeInput={setCodeInput}
          imageInput={imageInput}
          setImageInput={setImageInput}
          pollInput={pollInput}
          setPollInput={setPollInput}
          onAddBlock={handleAddBlock}
          composer={composer}
        />
      </div>

      {/* Block list preview */}
      {composer.blocks.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted">Added blocks:</p>
          {composer.blocks.map((b, i) => (
            <div
              key={i}
              className="flex items-center justify-between px-3 py-2 bg-bg border border-border rounded-md"
            >
              <span className="text-xs font-mono text-text">
                <Badge variant="accent">{b.type}</Badge>
                {b.language && (
                  <span className="ml-2 text-muted">{b.language}</span>
                )}
                {b.question && (
                  <span className="ml-2 text-muted truncate max-w-48">
                    {b.question}
                  </span>
                )}
              </span>
              <button
                type="button"
                onClick={() => composer.removeBlock(i)}
                aria-label={`Remove block ${i + 1}`}
                className="text-muted hover:text-danger transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-md p-1"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-end gap-2 pt-2">
        {onCancel && (
          <Button type="button" variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" variant="primary">
          Publish Post
        </Button>
      </div>
    </form>
  );
}

function ContentTabPanel({
  tab,
  codeInput,
  setCodeInput,
  imageInput,
  setImageInput,
  pollInput,
  setPollInput,
  onAddBlock,
  composer,
}) {
  if (tab === "text") {
    return (
      <div className="space-y-2">
        <Textarea
          placeholder="Write your post content here… (supports paragraphs)"
          value={composer.blocks.find((b) => b.type === "text")?.content ?? ""}
          onChange={(e) => {
            const idx = composer.blocks.findIndex((b) => b.type === "text");
            if (idx >= 0) {
              composer.updateBlock(idx, { content: e.target.value });
            } else {
              composer.addBlock({ type: "text", content: e.target.value });
            }
          }}
          rows={6}
          aria-label="Post text content"
        />
      </div>
    );
  }

  if (tab === "code") {
    return (
      <div className="space-y-2">
        <div className="flex gap-2">
          <select
            value={codeInput.language}
            onChange={(e) =>
              setCodeInput({ ...codeInput, language: e.target.value })
            }
            aria-label="Code language"
            className="bg-surface text-text border border-border rounded-md text-sm font-sans h-10 px-3 focus:outline-none focus:border-accent transition-colors duration-200"
          >
            {[
              "javascript",
              "typescript",
              "tsx",
              "python",
              "rust",
              "go",
              "css",
              "html",
              "bash",
              "sql",
            ].map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
          <Button type="button" variant="ghost" size="sm" onClick={onAddBlock}>
            + Add Block
          </Button>
        </div>
        <Textarea
          placeholder="// paste your code here…"
          value={codeInput.content}
          onChange={(e) =>
            setCodeInput({ ...codeInput, content: e.target.value })
          }
          rows={8}
          className="font-mono text-xs"
          aria-label="Code content"
        />
      </div>
    );
  }

  if (tab === "image") {
    return (
      <div className="space-y-2">
        <Input
          type="url"
          placeholder="https://example.com/image.png"
          value={imageInput.url}
          onChange={(e) =>
            setImageInput({ ...imageInput, url: e.target.value })
          }
          aria-label="Image URL"
        />
        <Input
          type="text"
          placeholder="Alt text (required for accessibility)"
          value={imageInput.alt}
          onChange={(e) =>
            setImageInput({ ...imageInput, alt: e.target.value })
          }
          aria-label="Image alt text"
        />
        <Button type="button" variant="ghost" size="sm" onClick={onAddBlock}>
          + Add Image Block
        </Button>
      </div>
    );
  }

  if (tab === "poll") {
    return (
      <div className="space-y-2">
        <Input
          type="text"
          placeholder="Poll question…"
          value={pollInput.question}
          onChange={(e) =>
            setPollInput({ ...pollInput, question: e.target.value })
          }
          aria-label="Poll question"
        />
        {pollInput.options.map((opt, i) => (
          <Input
            key={i}
            type="text"
            placeholder={`Option ${i + 1}`}
            value={opt}
            onChange={(e) => {
              const updated = [...pollInput.options];
              updated[i] = e.target.value;
              setPollInput({ ...pollInput, options: updated });
            }}
            aria-label={`Poll option ${i + 1}`}
          />
        ))}
        <Button type="button" variant="ghost" size="sm" onClick={onAddBlock}>
          + Add Poll Block
        </Button>
      </div>
    );
  }

  return null;
}
