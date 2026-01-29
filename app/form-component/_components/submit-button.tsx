'use client';

import { useFormStatus } from 'react-dom';
import clsx from 'clsx';

type SubmitButtonProps = {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md';
  className?: string;
};

export function SubmitButton({
  children,
  variant = 'primary',
  size = 'md',
  className,
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      aria-disabled={pending}
      className={clsx(
        'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all',
        'focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-950 focus:outline-none',
        'disabled:cursor-not-allowed',
        {
          // Sizes
          'px-3 py-1.5 text-sm': size === 'sm',
          'px-4 py-2.5 text-sm': size === 'md',
          // Primary variant
          'bg-blue-600 text-white hover:bg-blue-500 focus:ring-blue-600':
            variant === 'primary' && !pending,
          'bg-blue-600/50 text-blue-200': variant === 'primary' && pending,
          // Secondary variant
          'border border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white focus:ring-gray-600':
            variant === 'secondary' && !pending,
          'border-gray-700/50 text-gray-500':
            variant === 'secondary' && pending,
        },
        className,
      )}
    >
      {pending ? (
        <>
          <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          <span>Submitting...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}
