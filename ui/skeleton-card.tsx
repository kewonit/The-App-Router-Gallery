import clsx from 'clsx';

export const SkeletonCard = ({ isLoading }: { isLoading?: boolean }) => (
  <div
    className={clsx('rounded-2xl bg-gray-100 p-4 dark:bg-gray-900/80', {
      'relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-linear-to-r before:from-transparent before:via-gray-300/50 before:to-transparent dark:before:via-white/10':
        isLoading,
    })}
  >
    <div className="space-y-3">
      <div className="h-14 rounded-lg bg-gray-200 dark:bg-gray-700" />
      <div className="h-3 w-11/12 rounded-lg bg-gray-200 dark:bg-gray-700" />
      <div className="h-3 w-8/12 rounded-lg bg-gray-200 dark:bg-gray-700" />
    </div>
  </div>
);
