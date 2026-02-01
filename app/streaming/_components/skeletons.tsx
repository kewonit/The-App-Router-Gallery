import { Boundary } from '#/ui/boundary';

export function Skeleton({ label }: { label: string }) {
  return (
    <Boundary label={`Loading (${label})`} size="small" color="blue" pulse>
      <div className="flex flex-col gap-3">
        <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
        <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
        <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
      </div>
    </Boundary>
  );
}
