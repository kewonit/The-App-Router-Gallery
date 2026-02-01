'use client';

import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';
import React from 'react';

export function Prose({
  children,
  className,
  collapsed,
}: {
  children: React.ReactNode;
  className?: string;
  collapsed?: boolean;
}) {
  const isCollapsible = typeof collapsed === 'boolean';
  const [isCollapsed, setIsCollapsed] = React.useState(collapsed);
  const contentId = React.useId();

  return (
    <div className={clsx(className)}>
      <div
        id={contentId}
        role={isCollapsible ? 'region' : undefined}
        aria-hidden={isCollapsible && isCollapsed}
        aria-expanded={isCollapsible && !isCollapsed}
        className={clsx('transition-all duration-300 ease-out', {
          'max-h-[5lh] overflow-hidden': isCollapsible && isCollapsed,
          'mask-[linear-gradient(to_bottom,black_60%,transparent_100%)]':
            isCollapsed,
        })}
      >
        {children}
      </div>

      {isCollapsible && (
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-controls={contentId}
          aria-expanded={!isCollapsed}
          className="group mt-4 inline-flex items-center gap-1.5 rounded-md bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 transition-all duration-200 hover:bg-blue-100 hover:text-blue-800 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:outline-none dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50 dark:hover:text-blue-200 dark:focus-visible:ring-offset-gray-950"
        >
          {isCollapsed ? (
            <>
              <span>Show more</span>
              <ChevronDownIcon className="size-4 transition-transform group-hover:translate-y-0.5" />
            </>
          ) : (
            <>
              <span>Show less</span>
              <ChevronUpIcon className="size-4 transition-transform group-hover:-translate-y-0.5" />
            </>
          )}
        </button>
      )}
    </div>
  );
}
