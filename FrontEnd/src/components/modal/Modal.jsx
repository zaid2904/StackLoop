import { useEffect, useRef } from "react";
import { cn } from "../../utils/cn";

/**
 * Base Modal with backdrop blur + escape-to-close.
 *
 * @param {object} props
 * @param {boolean} props.isOpen
 * @param {() => void} props.onClose
 * @param {string} [props.title]
 * @param {React.ReactNode} props.children
 * @param {'sm' | 'md' | 'lg'} [props.size='md']
 */
export function Modal({ isOpen, onClose, title, children, size = "md" }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) dialogRef.current?.focus();
  }, [isOpen]);

  if (!isOpen) return null;

  const sizes = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "modal-title" : undefined}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-bg/80 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        ref={dialogRef}
        tabIndex={-1}
        className={cn(
          "relative w-full bg-surface border border-border rounded-xl shadow-sm",
          "opacity-100 scale-100 transition-all duration-200 ease-out",
          "focus:outline-none",
          sizes[size],
        )}
      >
        {(title || onClose) && (
          <header className="flex items-center justify-between px-6 py-4 border-b border-border">
            {title && (
              <h2
                id="modal-title"
                className="font-mono text-base font-semibold text-text"
              >
                {title}
              </h2>
            )}
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="ml-auto text-muted hover:text-text transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-md p-1"
            >
              <CloseIcon />
            </button>
          </header>
        )}
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  );
}

function CloseIcon() {
  return (
    <svg
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path strokeLinecap="round" d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}
