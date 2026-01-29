'use client';

import { useFormStatus } from 'react-dom';
import clsx from 'clsx';

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      aria-disabled={pending}
      className={clsx(
        'flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-medium transition-all',
        'focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-950 focus:outline-none',
        'disabled:cursor-not-allowed',
        {
          'bg-blue-600 text-white hover:bg-blue-500': !pending,
          'bg-blue-600/50 text-blue-200': pending,
        },
      )}
    >
      {pending ? (
        <>
          <span className="size-4 animate-spin rounded-full border-2 border-blue-200 border-t-transparent" />
          <span>Adding...</span>
        </>
      ) : (
        <>
          <svg className="size-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          <span>Add Todo</span>
        </>
      )}
    </button>
  );
}
