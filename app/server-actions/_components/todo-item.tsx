'use client';

import { useOptimistic, useTransition, useState } from 'react';
import clsx from 'clsx';
import { toggleTodo, deleteTodo, type Todo } from '../actions';

type TodoItemProps = { todo: Todo };

export function TodoItem({ todo }: TodoItemProps) {
  const [isPending, startTransition] = useTransition();
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Optimistic state for the completed status
  const [optimisticTodo, setOptimisticTodo] = useOptimistic(
    todo,
    (state, newCompleted: boolean) => ({ ...state, completed: newCompleted }),
  );

  const handleToggle = () => {
    setError(null);

    startTransition(async () => {
      // Apply optimistic update immediately
      setOptimisticTodo(!optimisticTodo.completed);

      const result = await toggleTodo(todo.id);

      if (!result.success) {
        setError(result.message);
        // The optimistic update will be reverted automatically
        // when the server response arrives
      }
    });
  };

  const handleDelete = () => {
    setError(null);
    setIsDeleting(true);

    startTransition(async () => {
      const result = await deleteTodo(todo.id);

      if (!result.success) {
        setError(result.message);
        setIsDeleting(false);
      }
      // On success, the item will be removed from the list
      // via revalidatePath
    });
  };

  // Format relative time
  const formatTime = (timestamp: number) => {
    const diff = Date.now() - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  return (
    <div
      className={clsx(
        'group flex items-center gap-3 rounded-lg border p-4 transition-all',
        {
          'border-gray-800 bg-gray-900/50': !optimisticTodo.completed,
          'border-gray-800/50 bg-gray-900/30': optimisticTodo.completed,
          'opacity-50': isPending || isDeleting,
          'border-red-900/50 bg-red-950/20': error,
        },
      )}
    >
      {/* Checkbox */}
      <button
        onClick={handleToggle}
        disabled={isPending || isDeleting}
        aria-label={
          optimisticTodo.completed ? 'Mark as incomplete' : 'Mark as complete'
        }
        className={clsx(
          'flex size-5 shrink-0 items-center justify-center rounded border-2 transition-all',
          'focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 focus:outline-none',
          'disabled:cursor-not-allowed',
          {
            'border-gray-600 hover:border-gray-400': !optimisticTodo.completed,
            'border-green-600 bg-green-600 text-white':
              optimisticTodo.completed,
          },
        )}
      >
        {optimisticTodo.completed && (
          <svg className="size-3" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </button>

      {/* Todo text */}
      <div className="flex flex-1 flex-col gap-1">
        <span
          className={clsx('text-sm transition-all', {
            'text-gray-200': !optimisticTodo.completed,
            'text-gray-500 line-through': optimisticTodo.completed,
          })}
        >
          {optimisticTodo.text}
        </span>
        <span className="text-xs text-gray-600">
          {formatTime(todo.createdAt)}
        </span>
        {error && <span className="text-xs text-red-400">{error}</span>}
      </div>

      {/* Loading indicator */}
      {isPending && (
        <div className="size-4 animate-spin rounded-full border-2 border-gray-600 border-t-blue-500" />
      )}

      {/* Delete button */}
      <button
        onClick={handleDelete}
        disabled={isPending || isDeleting}
        aria-label="Delete todo"
        className={clsx(
          'rounded px-2 py-1 text-xs font-medium transition-all',
          'text-gray-500 hover:bg-red-900/50 hover:text-red-400',
          'focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900 focus:outline-none',
          'opacity-0 group-hover:opacity-100',
          'disabled:cursor-not-allowed disabled:opacity-50',
        )}
      >
        {isDeleting ? 'Deleting...' : 'Delete'}
      </button>
    </div>
  );
}
