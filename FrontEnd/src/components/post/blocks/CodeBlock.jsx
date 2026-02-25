import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useClipboard } from "../../../hooks/useClipboard";
import { cn } from "../../../utils/cn";

// ---------------------------------------------------------------------------
// VS Code Dark+ theme — built on top of the library's vscDarkPlus base,
// with exact token colors matched to the real VS Code Dark+ theme.
// ---------------------------------------------------------------------------
const VSCODE_THEME = {
  ...vscDarkPlus,

  'pre[class*="language-"]': {
    ...vscDarkPlus['pre[class*="language-"]'],
    margin: 0,
    padding: "1rem 1.25rem",
    borderRadius: 0,
    background: "#1e1e1e",
    fontFamily:
      "'Fira Code', 'JetBrains Mono', 'Source Code Pro', 'Cascadia Code', ui-monospace, monospace",
    fontSize: "0.8125rem",
    lineHeight: "1.7",
    overflowX: "auto",
  },

  'code[class*="language-"]': {
    ...vscDarkPlus['code[class*="language-"]'],
    background: "transparent",
    fontFamily:
      "'Fira Code', 'JetBrains Mono', 'Source Code Pro', 'Cascadia Code', ui-monospace, monospace",
    fontFeatureSettings: '"liga" 1, "calt" 1',
    textShadow: "none",
  },

  // Token colors — exact VS Code Dark+ values
  comment: { color: "#6A9955", fontStyle: "italic" },
  prolog: { color: "#6A9955" },
  doctype: { color: "#6A9955" },
  cdata: { color: "#6A9955" },

  keyword: { color: "#569CD6" },
  "control-flow": { color: "#569CD6" },
  null: { color: "#569CD6" },
  boolean: { color: "#569CD6" },

  number: { color: "#B5CEA8" },
  "attr-value": { color: "#CE9178" },
  string: { color: "#CE9178" },
  char: { color: "#CE9178" },
  "template-string": { color: "#CE9178" },

  function: { color: "#DCDCAA" },
  "function-variable": { color: "#DCDCAA" },
  method: { color: "#DCDCAA" },

  "class-name": { color: "#4EC9B0" },
  "maybe-class-name": { color: "#4EC9B0" },
  builtin: { color: "#4EC9B0" },
  namespace: { color: "#4EC9B0" },

  "attr-name": { color: "#9CDCFE" },
  variable: { color: "#9CDCFE" },
  parameter: { color: "#9CDCFE" },
  property: { color: "#9CDCFE" },
  "property-access": { color: "#9CDCFE" },

  tag: { color: "#569CD6" },
  operator: { color: "#D4D4D4" },
  punctuation: { color: "#D4D4D4" },
  "template-punctuation": { color: "#569CD6" },

  inserted: { color: "#B5CEA8" },
  deleted: { color: "#F44747" },
  changed: { color: "#CE9178" },
};

// ---------------------------------------------------------------------------
// Language → { display label, Prism language id }
// ---------------------------------------------------------------------------
const LANGUAGE_META = {
  javascript: { label: "JS", prism: "javascript" },
  js: { label: "JS", prism: "javascript" },
  typescript: { label: "TS", prism: "typescript" },
  ts: { label: "TS", prism: "typescript" },
  tsx: { label: "TSX", prism: "tsx" },
  jsx: { label: "JSX", prism: "jsx" },
  python: { label: "Python", prism: "python" },
  py: { label: "Python", prism: "python" },
  csharp: { label: "C#", prism: "csharp" },
  "c#": { label: "C#", prism: "csharp" },
  cs: { label: "C#", prism: "csharp" },
  java: { label: "Java", prism: "java" },
  html: { label: "HTML", prism: "markup" },
  xml: { label: "XML", prism: "xml" },
  css: { label: "CSS", prism: "css" },
  scss: { label: "SCSS", prism: "scss" },
  json: { label: "JSON", prism: "json" },
  bash: { label: "Bash", prism: "bash" },
  shell: { label: "Shell", prism: "bash" },
  sh: { label: "Shell", prism: "bash" },
  sql: { label: "SQL", prism: "sql" },
  go: { label: "Go", prism: "go" },
  rust: { label: "Rust", prism: "rust" },
  cpp: { label: "C++", prism: "cpp" },
  c: { label: "C", prism: "c" },
  swift: { label: "Swift", prism: "swift" },
  kotlin: { label: "Kotlin", prism: "kotlin" },
  php: { label: "PHP", prism: "php" },
  ruby: { label: "Ruby", prism: "ruby" },
  text: { label: "Plain Text", prism: "text" },
};

function getMeta(language = "text") {
  const key = (language ?? "text").toLowerCase().trim();
  return LANGUAGE_META[key] ?? { label: key.toUpperCase(), prism: key };
}

const LINE_NUMBER_STYLE = {
  minWidth: "2.5em",
  paddingRight: "1.25em",
  color: "#3e4451",
  borderRight: "1px solid #2a2a2e",
  marginRight: "1.25em",
  userSelect: "none",
  fontStyle: "normal",
};

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function TrafficLights() {
  return (
    <div className="flex items-center gap-[6px]" aria-hidden="true">
      <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-black/20 shadow-sm" />
      <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-black/20 shadow-sm" />
      <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-black/20 shadow-sm" />
    </div>
  );
}

function CopyButton({ copied, onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label={copied ? "Copied!" : "Copy code"}
      title={copied ? "Copied!" : "Copy code"}
      className={cn(
        "flex items-center gap-1.5 rounded-md px-2 py-1",
        "text-[11px] font-sans font-medium tracking-wide",
        "transition-all duration-200 ease-out select-none",
        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#569CD6]",
        copied
          ? "text-[#4EC9B0]"
          : "text-[#6e7681] hover:text-[#cccccc] hover:bg-white/[0.06]",
      )}
    >
      {copied ? <CheckIcon /> : <CopyIcon />}
      <span>{copied ? "Copied!" : "Copy"}</span>
    </button>
  );
}

function CopyIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

/**
 * CodeBlock — VS Code Dark+ IDE-style syntax-highlighted code block.
 *
 * @param {object}  props
 * @param {string}  props.code               Source code string (preferred prop name).
 * @param {string}  [props.content]          Alias for `code` — kept for backward compat.
 * @param {string}  [props.language="text"]  Language key (see LANGUAGE_META for all supported values).
 * @param {string}  [props.filename]         Optional filename shown in the title bar.
 * @param {boolean} [props.showLineNumbers]  Render a line-number gutter (default false).
 * @param {string}  [props.theme="dark"]     Reserved for future light-theme support.
 */
export function CodeBlock({
  code,
  content,
  language = "text",
  filename,
  showLineNumbers = false,
  // eslint-disable-next-line no-unused-vars
  theme = "dark",
}) {
  const codeStr = (code ?? content ?? "").trimEnd();
  const { copied, copy } = useClipboard();
  const meta = getMeta(language);

  return (
    <div
      className={cn(
        "group relative rounded-xl overflow-hidden",
        "border border-[#2a2a2e]",
        "shadow-[0_0_0_1px_rgba(0,0,0,0.45),0_8px_32px_rgba(0,0,0,0.55)]",
        "transition-shadow duration-300",
        "hover:shadow-[0_0_0_1px_rgba(86,156,214,0.2),0_12px_40px_rgba(0,0,0,0.6)]",
      )}
    >
      {/* ── Title bar ─────────────────────────────────────────────────── */}
      <div
        className="flex items-center justify-between h-9 px-3 border-b border-[#2a2a2e]"
        style={{ background: "#252526" }}
      >
        {/* Left: traffic lights + filename */}
        <div className="flex items-center gap-3 min-w-0">
          <TrafficLights />

          {filename && (
            <span
              className="text-[11px] text-[#858585] tracking-tight select-none truncate"
              style={{
                fontFamily: "'Fira Code', 'JetBrains Mono', monospace",
              }}
            >
              {filename}
            </span>
          )}
        </div>

        {/* Right: language chip + divider + copy button */}
        <div className="flex items-center gap-1 flex-shrink-0">
          <span
            className={cn(
              "px-2 py-0.5 rounded",
              "text-[10px] font-mono font-semibold uppercase tracking-widest",
              "select-none text-[#606060] bg-[#2d2d2d] border border-[#3a3a3a]",
            )}
          >
            {meta.label}
          </span>

          <span
            className="w-px h-4 bg-[#3a3a3a] mx-1 flex-shrink-0"
            aria-hidden="true"
          />

          <CopyButton copied={copied} onClick={() => copy(codeStr)} />
        </div>
      </div>

      {/* ── Code body ─────────────────────────────────────────────────── */}
      <div
        className="overflow-x-auto"
        style={{
          background: "#1e1e1e",
          // Webkit scrollbar — matches VS Code's dark scrollbar style
          scrollbarWidth: "thin",
          scrollbarColor: "#3e3e42 transparent",
        }}
      >
        <SyntaxHighlighter
          language={meta.prism}
          style={VSCODE_THEME}
          showLineNumbers={showLineNumbers}
          lineNumberStyle={LINE_NUMBER_STYLE}
          customStyle={{
            margin: 0,
            padding: "1rem 1.25rem",
            background: "transparent",
            minWidth: "100%",
            width: "max-content",
          }}
          codeTagProps={{
            style: {
              fontFamily:
                "'Fira Code', 'JetBrains Mono', 'Source Code Pro', monospace",
              fontFeatureSettings: '"liga" 1, "calt" 1',
            },
          }}
          wrapLines={false}
          wrapLongLines={false}
          PreTag="div"
        >
          {codeStr}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
