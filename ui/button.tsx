import clsx from 'clsx';

export type ButtonKind = 'default' | 'primary' | 'error' | 'ghost';

export default function Button({
  kind = 'default',
  size = 'md',
  isLoading,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  kind?: ButtonKind;
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}) {
  return (
    <button
      className={clsx(
        'relative inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-150',
        'focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none dark:focus-visible:ring-offset-gray-950',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'hover:cursor-pointer active:scale-[0.98]',
        // Size variants
        {
          'px-2.5 py-1 text-xs': size === 'sm',
          'px-3.5 py-2 text-sm': size === 'md',
          'px-5 py-2.5 text-base': size === 'lg',
        },
        // Kind variants
        {
          'bg-gray-100 text-gray-900 hover:bg-gray-200 focus-visible:ring-gray-500 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700':
            kind === 'default',
          'bg-blue-600 text-white shadow-sm shadow-blue-200 hover:bg-blue-700 hover:shadow-md focus-visible:ring-blue-500 dark:shadow-blue-900/30 dark:hover:bg-blue-500':
            kind === 'primary',
          'bg-red-600 text-white shadow-sm shadow-red-200 hover:bg-red-700 hover:shadow-md focus-visible:ring-red-500 dark:shadow-red-900/30 dark:hover:bg-red-500':
            kind === 'error',
          'bg-transparent text-gray-800 hover:bg-gray-100 focus-visible:ring-gray-500 dark:text-gray-200 dark:hover:bg-gray-800':
            kind === 'ghost',
        },
      )}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && (
        <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent opacity-70" />
      )}
      {children}
    </button>
  );
}
