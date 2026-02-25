import { useState, useRef } from 'react';
import { cn } from '../../utils/cn';

/**
 * Tooltip with 150ms hover delay.
 *
 * @param {object} props
 * @param {string} props.label - Tooltip text
 * @param {React.ReactNode} props.children
 * @param {'top' | 'bottom' | 'left' | 'right'} [props.placement='top']
 * @param {string} [props.className]
 */
export function Tooltip({ label, children, placement = 'top', className }) {
  const [visible, setVisible] = useState(false);
  const timer = useRef(null);

  const show = () => {
    timer.current = setTimeout(() => setVisible(true), 150);
  };

  const hide = () => {
    clearTimeout(timer.current);
    setVisible(false);
  };

  const placements = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  return (
    <div
      className={cn('relative inline-flex', className)}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {children}
      {visible && (
        <div
          role="tooltip"
          className={cn(
            'absolute z-50 pointer-events-none whitespace-nowrap',
            'bg-surface border border-border text-text text-xs font-sans px-2 py-1 rounded-md',
            placements[placement]
          )}
        >
          {label}
        </div>
      )}
    </div>
  );
}
