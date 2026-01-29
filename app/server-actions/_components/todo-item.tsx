'use client';

import { useOptimistic, useTransition, useState } from 'react';
import clsx from 'clsx';
import { toggleTodo, deleteTodo, type Todo } from '../actions';

export function TodoItem({ todo }: { todo: Todo }) {
  const [isPending, startTransition] = useTransition();
  const [isDeleting, setIsDeleting] = useState(false);

  const [optimisticTodo, setOptimisticTodo] = useOptimistic(
    todo,
    (state, newCompleted: boolean) => ({ ...state, completed: newCompleted }),
  );

  const handleToggle = () => {
    startTransition(async () => {
      setOptimisticTodo(!optimisticTodo.completed);
      await toggleTodo(todo.id);
    });
  };

  const handleDelete = () => {
    setIsDeleting(true);
    startTransition(async () => {
      await deleteTodo(todo.id);
    });
  };

  return (
    <div
      className={clsx(
        'group flex items-center gap-3 rounded-lg bg-gray-100 p-4 dark:bg-gray-900/50',
        { 'opacity-50': isPending || isDeleting },
      )}
    >
      <button
        onClick={handleToggle}
        disabled={isPending || isDeleting}
        className={clsx(
          'flex size-5 shrink-0 items-center justify-center rounded border-2',
          {
            'border-gray-400 hover:border-gray-500 dark:border-gray-600 dark:hover:border-gray-400':
              !optimisticTodo.completed,
            'border-green-600 bg-green-600': optimisticTodo.completed,
          },
        )}
      >
        {optimisticTodo.completed && (
          <svg
            className="size-3 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </button>

      <span
        className={clsx('flex-1 text-sm', {
          'text-gray-800 dark:text-gray-200': !optimisticTodo.completed,
          'text-gray-400 line-through dark:text-gray-500':
            optimisticTodo.completed,
        })}
      >
        {optimisticTodo.text}
      </span>

      {isPending && (
        <div className="size-4 animate-spin rounded-full border-2 border-gray-400 border-t-blue-500 dark:border-gray-600" />
      )}

      <button
        onClick={handleDelete}
        disabled={isPending || isDeleting}
        className="rounded px-2 py-1 text-xs text-gray-500 opacity-0 group-hover:opacity-100 hover:bg-gray-200 hover:text-gray-700 dark:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300"
      >
        ×
      </button>
    </div>
  );
}
