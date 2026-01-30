'use client';

import React from 'react';

export function ClickCounter() {
  const [count, setCount] = React.useState(0);

  return (
    <button
      onClick={() => setCount(count + 1)}
      className="rounded-md bg-gray-200 px-3 py-1 text-sm font-semibold whitespace-nowrap text-gray-700 tabular-nums hover:bg-gray-300 hover:text-gray-900 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-500 dark:hover:text-white"
    >
      {count} Clicks
    </button>
  );
}
