'use client';

import clsx from 'clsx';
import React from 'react';

export function ClickCounter() {
  const [count, setCount] = React.useState(0);
  const [isAnimating, setIsAnimating] = React.useState(false);

  const handleClick = () => {
    setCount(count + 1);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 150);
  };

  return (
    <button
      onClick={handleClick}
      aria-label={`Click counter: ${count} clicks. Click to increment.`}
      className={clsx(
        'group relative inline-flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-1.5 text-sm font-semibold text-gray-700 tabular-nums transition-all duration-150',
        'hover:bg-gray-200 hover:text-gray-900 hover:shadow-sm',
        'focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:outline-none',
        'active:scale-95',
        'dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-white dark:focus-visible:ring-offset-gray-950',
      )}
    >
      <span
        className={clsx(
          'flex size-5 items-center justify-center rounded-md bg-blue-100 text-xs font-bold text-blue-700 transition-transform duration-150',
          'dark:bg-blue-900/50 dark:text-blue-300',
          isAnimating && 'scale-110',
        )}
      >
        {count}
      </span>
      <span>Clicks</span>
    </button>
  );
}
