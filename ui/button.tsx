import clsx from 'clsx';

export default function Button({
  kind = 'default',
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  kind?: 'default' | 'error';
}) {
  return (
    <button
      className={clsx(
        'rounded-md px-3 py-1 text-sm font-semibold hover:cursor-pointer',
        {
          'bg-gray-200 text-gray-900 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-500 dark:hover:text-white':
            kind === 'default',
          'bg-red-600 text-red-50 hover:bg-red-500 dark:bg-red-700 dark:hover:bg-red-600':
            kind === 'error',
        },
      )}
      {...props}
    />
  );
}
