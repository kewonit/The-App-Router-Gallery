import { Boundary } from '#/ui/boundary';
import clsx from 'clsx';

function SkeletonLine({ width = 'w-full' }: { width?: string }) {
  return (
    <div className={clsx('h-4 animate-pulse rounded bg-gray-700', width)} />
  );
}

function SkeletonItem() {
  return (
    <div className="flex items-center gap-2 rounded bg-gray-800/50 px-3 py-2">
      <div className="size-2 animate-pulse rounded-full bg-gray-600" />
      <div className="h-3 flex-1 animate-pulse rounded bg-gray-700" />
    </div>
  );
}

export function FastSkeleton() {
  return (
    <Boundary
      label={['<FastComponent>', 'Loading...']}
      size="small"
      color="cyan"
      animateRerendering={false}
      pulse
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="h-5 w-24 animate-pulse rounded bg-gray-700" />
          <div className="h-5 w-12 animate-pulse rounded bg-gray-700" />
        </div>
        <div className="flex flex-col gap-1.5">
          <SkeletonItem />
          <SkeletonItem />
          <SkeletonItem />
        </div>
      </div>
    </Boundary>
  );
}

export function MediumSkeleton() {
  return (
    <Boundary
      label={['<MediumComponent>', 'Loading...']}
      size="small"
      color="blue"
      animateRerendering={false}
      pulse
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="h-5 w-28 animate-pulse rounded bg-gray-700" />
          <div className="h-5 w-12 animate-pulse rounded bg-gray-700" />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <SkeletonItem />
          <SkeletonItem />
          <SkeletonItem />
          <SkeletonItem />
        </div>
      </div>
    </Boundary>
  );
}

export function SlowSkeleton() {
  return (
    <Boundary
      label={['<SlowComponent>', 'Loading...']}
      size="small"
      color="orange"
      animateRerendering={false}
      pulse
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="h-5 w-24 animate-pulse rounded bg-gray-700" />
          <div className="h-5 w-12 animate-pulse rounded bg-gray-700" />
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between rounded bg-gray-800/50 px-3 py-2">
            <div className="flex items-center gap-2">
              <div className="size-2 animate-pulse rounded-full bg-gray-600" />
              <div className="h-3 w-20 animate-pulse rounded bg-gray-700" />
            </div>
            <div className="h-3 w-8 animate-pulse rounded bg-gray-700" />
          </div>
          <div className="flex items-center justify-between rounded bg-gray-800/50 px-3 py-2">
            <div className="flex items-center gap-2">
              <div className="size-2 animate-pulse rounded-full bg-gray-600" />
              <div className="h-3 w-16 animate-pulse rounded bg-gray-700" />
            </div>
            <div className="h-3 w-8 animate-pulse rounded bg-gray-700" />
          </div>
          <div className="flex items-center justify-between rounded bg-gray-800/50 px-3 py-2">
            <div className="flex items-center gap-2">
              <div className="size-2 animate-pulse rounded-full bg-gray-600" />
              <div className="h-3 w-24 animate-pulse rounded bg-gray-700" />
            </div>
            <div className="h-3 w-8 animate-pulse rounded bg-gray-700" />
          </div>
          <div className="flex items-center justify-between rounded bg-gray-800/50 px-3 py-2">
            <div className="flex items-center gap-2">
              <div className="size-2 animate-pulse rounded-full bg-gray-600" />
              <div className="h-3 w-20 animate-pulse rounded bg-gray-700" />
            </div>
            <div className="h-3 w-8 animate-pulse rounded bg-gray-700" />
          </div>
          <div className="flex items-center justify-between rounded bg-gray-800/50 px-3 py-2">
            <div className="flex items-center gap-2">
              <div className="size-2 animate-pulse rounded-full bg-gray-600" />
              <div className="h-3 w-18 animate-pulse rounded bg-gray-700" />
            </div>
            <div className="h-3 w-8 animate-pulse rounded bg-gray-700" />
          </div>
        </div>
      </div>
    </Boundary>
  );
}

export function VerySlowSkeleton() {
  return (
    <Boundary
      label={['<VerySlowComponent>', 'Loading...']}
      size="small"
      color="pink"
      animateRerendering={false}
      pulse
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="h-5 w-32 animate-pulse rounded bg-gray-700" />
          <div className="h-5 w-14 animate-pulse rounded bg-gray-700" />
        </div>
        <div className="flex flex-col gap-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded border border-gray-800 bg-gray-900/50 p-3"
            >
              <div className="flex items-center gap-2">
                <div className="size-3 animate-pulse rounded-full bg-gray-600" />
                <div className="h-4 w-24 animate-pulse rounded bg-gray-700" />
              </div>
              <div className="mt-2 h-3 w-48 animate-pulse rounded bg-gray-800" />
            </div>
          ))}
        </div>
      </div>
    </Boundary>
  );
}

export function GenericSkeleton({
  label,
  color = 'gray',
  rows = 3,
}: {
  label: string;
  color?: 'gray' | 'blue' | 'green' | 'violet';
  rows?: number;
}) {
  const colorClasses = {
    gray: 'border-gray-800',
    blue: 'border-blue-800',
    green: 'border-green-800',
    violet: 'border-violet-800',
  };

  return (
    <div
      className={clsx(
        'animate-pulse rounded-lg border p-4',
        colorClasses[color],
      )}
    >
      <div className="mb-3 flex items-center gap-2">
        <div className="size-4 rounded bg-gray-700" />
        <div className="h-4 w-32 rounded bg-gray-700" />
      </div>
      <div className="flex flex-col gap-2">
        {Array.from({ length: rows }).map((_, i) => (
          <SkeletonLine key={i} width={i === rows - 1 ? 'w-2/3' : 'w-full'} />
        ))}
      </div>
    </div>
  );
}
