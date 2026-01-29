import { Suspense } from 'react';
import { Boundary } from '#/ui/boundary';
import { connection } from 'next/server';

async function delay(ms: number) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

async function OuterContent() {
  await connection(); // Opt into dynamic rendering
  await delay(200);

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-lg bg-violet-950/30 p-4">
        <h4 className="font-medium text-violet-300">Outer Content Loaded</h4>
        <p className="mt-1 text-sm text-gray-400">
          This content loaded after ~200ms
        </p>
      </div>

      <Suspense fallback={<InnerSkeleton level={1} />}>
        <InnerContent level={1} />
      </Suspense>
    </div>
  );
}

async function InnerContent({ level }: { level: number }) {
  await connection(); // Opt into dynamic rendering
  await delay(500 * level);

  const hasMore = level < 3;

  return (
    <Boundary
      label={`<InnerContent level={${level}}>`}
      size="small"
      color={level === 1 ? 'blue' : level === 2 ? 'cyan' : 'violet'}
      animateRerendering={true}
    >
      <div className="flex flex-col gap-3">
        <div>
          <h4 className="font-medium text-gray-200">Level {level} Content</h4>
          <p className="text-sm text-gray-500">Loaded after ~{500 * level}ms</p>
        </div>

        <div className="rounded bg-gray-800/50 p-3">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-cyan-500" />
            <span className="text-sm text-gray-300">
              Nested data for level {level}
            </span>
          </div>
        </div>

        {hasMore && (
          <Suspense fallback={<InnerSkeleton level={level + 1} />}>
            <InnerContent level={level + 1} />
          </Suspense>
        )}
      </div>
    </Boundary>
  );
}

function InnerSkeleton({ level }: { level: number }) {
  return (
    <Boundary
      label={`<InnerContent level={${level}}> Loading...`}
      size="small"
      color="gray"
      animateRerendering={false}
      pulse
    >
      <div className="flex flex-col gap-3">
        <div>
          <div className="h-5 w-32 animate-pulse rounded bg-gray-700" />
          <div className="mt-2 h-4 w-24 animate-pulse rounded bg-gray-800" />
        </div>
        <div className="rounded bg-gray-800/50 p-3">
          <div className="flex items-center gap-2">
            <div className="size-2 animate-pulse rounded-full bg-gray-600" />
            <div className="h-3 w-40 animate-pulse rounded bg-gray-700" />
          </div>
        </div>
        {level < 3 && (
          <div className="h-24 animate-pulse rounded-lg border border-dashed border-gray-800 bg-gray-900/30" />
        )}
      </div>
    </Boundary>
  );
}

function OuterSkeleton() {
  return (
    <Boundary
      label="<OuterContent> Loading..."
      size="small"
      color="violet"
      animateRerendering={false}
      pulse
    >
      <div className="flex flex-col gap-4">
        <div className="rounded-lg bg-gray-900/50 p-4">
          <div className="h-5 w-40 animate-pulse rounded bg-gray-700" />
          <div className="mt-2 h-4 w-56 animate-pulse rounded bg-gray-800" />
        </div>
        <div className="h-32 animate-pulse rounded-lg border border-dashed border-gray-800 bg-gray-900/30" />
      </div>
    </Boundary>
  );
}

export function NestedStreaming() {
  return (
    <Boundary
      label="Nested Suspense Demo"
      size="small"
      color="violet"
      animateRerendering={false}
    >
      <Suspense fallback={<OuterSkeleton />}>
        <OuterContent />
      </Suspense>
    </Boundary>
  );
}
