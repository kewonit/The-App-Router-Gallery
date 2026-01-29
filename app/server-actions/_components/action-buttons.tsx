'use client';

import { useTransition } from 'react';
import clsx from 'clsx';
import { clearCompleted, resetTodos } from '../actions';

export function ActionButtons() {
  const [isPendingClear, startClearTransition] = useTransition();
  const [isPendingReset, startResetTransition] = useTransition();

  const handleClearCompleted = () => {
    startClearTransition(async () => {
      await clearCompleted();
    });
  };

  const handleReset = () => {
    startResetTransition(async () => {
      await resetTodos();
    });
  };

  const isAnyPending = isPendingClear || isPendingReset;

  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex gap-2">
        <button
          onClick={handleClearCompleted}
          disabled={isAnyPending}
          className={clsx(
            'flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all',
            'border border-gray-700 text-gray-300',
            'hover:border-gray-600 hover:bg-gray-800 hover:text-gray-100',
            'focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-950 focus:outline-none',
            'disabled:cursor-not-allowed disabled:opacity-50',
          )}
        >
          {isPendingClear ? (
            <>
              <span className="size-4 animate-spin rounded-full border-2 border-gray-400 border-t-transparent" />
              <span>Clearing...</span>
            </>
          ) : (
            <>
              <svg className="size-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Clear Completed</span>
            </>
          )}
        </button>

        <button
          onClick={handleReset}
          disabled={isAnyPending}
          className={clsx(
            'flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all',
            'border border-gray-700 text-gray-300',
            'hover:border-orange-700 hover:bg-orange-900/30 hover:text-orange-300',
            'focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-950 focus:outline-none',
            'disabled:cursor-not-allowed disabled:opacity-50',
          )}
        >
          {isPendingReset ? (
            <>
              <span className="size-4 animate-spin rounded-full border-2 border-gray-400 border-t-transparent" />
              <span>Resetting...</span>
            </>
          ) : (
            <>
              <svg className="size-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Reset Demo</span>
            </>
          )}
        </button>
      </div>

      <div className="text-xs text-gray-600">
        All changes are persisted in-memory on the server
      </div>
    </div>
  );
}
