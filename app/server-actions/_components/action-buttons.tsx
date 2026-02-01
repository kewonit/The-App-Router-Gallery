'use client';

import { useTransition } from 'react';
import { clearCompleted, resetTodos } from '../actions';

export function ActionButtons() {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="flex gap-2">
      <button
        onClick={() =>
          startTransition(async () => void (await clearCompleted()))
        }
        disabled={isPending}
        className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-600 transition-all duration-150 hover:cursor-pointer hover:border-gray-400 hover:bg-gray-50 hover:text-gray-900 focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 focus-visible:outline-none active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-200 dark:focus-visible:ring-offset-gray-950"
      >
        Clear done
      </button>
      <button
        onClick={() => startTransition(async () => void (await resetTodos()))}
        disabled={isPending}
        className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-600 transition-all duration-150 hover:cursor-pointer hover:border-gray-400 hover:bg-gray-50 hover:text-gray-900 focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 focus-visible:outline-none active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-200 dark:focus-visible:ring-offset-gray-950"
      >
        Reset
      </button>
    </div>
  );
}
