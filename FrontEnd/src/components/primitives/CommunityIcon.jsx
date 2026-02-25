import {
  Atom,
  FileCode2,
  Triangle,
  Braces,
  Palette,
  Package,
  Cpu,
  Hash,
} from "lucide-react";

/**
 * Maps a community name to a matching Lucide icon.
 * Falls back to a generic Hash icon for unknown communities.
 *
 * @param {object} props
 * @param {string} props.name  Community name key (e.g. "reactjs", "typescript")
 * @param {number} [props.size=16]  Icon size in px
 * @param {string} [props.className]  Extra Tailwind classes
 */
export function CommunityIcon({ name, size = 16, className }) {
  const props = { size, "aria-hidden": true, className };

  switch (name?.toLowerCase()) {
    case "reactjs":
      return <Atom {...props} />;
    case "typescript":
      return <FileCode2 {...props} />;
    case "nextjs":
      return <Triangle {...props} />;
    case "javascript":
      return <Braces {...props} />;
    case "css":
    case "scss":
      return <Palette {...props} />;
    case "golang":
    case "go":
      return <Package {...props} />;
    case "rust":
      return <Cpu {...props} />;
    default:
      return <Hash {...props} />;
  }
}
