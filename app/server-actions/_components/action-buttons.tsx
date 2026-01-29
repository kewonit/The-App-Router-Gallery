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
        className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-600 hover:border-gray-400 hover:text-gray-900 disabled:opacity-50 dark:border-gray-700 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:text-gray-200"
      >
        Clear done
      </button>
      <button
        onClick={() => startTransition(async () => void (await resetTodos()))}
        disabled={isPending}
        className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-600 hover:border-gray-400 hover:text-gray-900 disabled:opacity-50 dark:border-gray-700 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:text-gray-200"
      >
        Reset
      </button>
    </div>
  );
}
