import { Suspense } from 'react';
import { Boundary } from '#/ui/boundary';
import {
  FastComponent,
  MediumComponent,
  SlowComponent,
  VerySlowComponent,
} from './_components/async-components';
import {
  FastSkeleton,
  MediumSkeleton,
  SlowSkeleton,
  VerySlowSkeleton,
} from './_components/skeletons';
import { StreamingVisualizer } from './_components/streaming-visualizer';
import { NestedStreaming } from './_components/nested-streaming';

export default function Page() {
  return (
    <Boundary label="page.tsx" animateRerendering={false}>
      <div className="flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold text-gray-100">
            Streaming & Suspense
          </h1>
          <p className="text-sm text-gray-400">
            React Suspense with streaming enables progressive page rendering.
            Components load independently as data becomes available.
          </p>
        </div>

        {/* Streaming Visualizer - shows timing */}
        <Boundary
          label="<StreamingVisualizer>"
          size="small"
          color="cyan"
          animateRerendering={false}
        >
          <StreamingVisualizer />
        </Boundary>

        {/* Parallel Streaming Demo */}
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-medium text-gray-200">
            Parallel Streaming
          </h2>
          <p className="text-sm text-gray-500">
            All components start loading simultaneously. Each resolves and
            streams to the client as soon as it's ready.
          </p>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {/* Fast (100ms) */}
            <Suspense fallback={<FastSkeleton />}>
              <FastComponent />
            </Suspense>

            {/* Medium (500ms) */}
            <Suspense fallback={<MediumSkeleton />}>
              <MediumComponent />
            </Suspense>

            {/* Slow (1500ms) */}
            <Suspense fallback={<SlowSkeleton />}>
              <SlowComponent />
            </Suspense>

            {/* Very Slow (3000ms) */}
            <Suspense fallback={<VerySlowSkeleton />}>
              <VerySlowComponent />
            </Suspense>
          </div>
        </div>

        {/* Nested Streaming Demo */}
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-medium text-gray-200">
            Nested Suspense Boundaries
          </h2>
          <p className="text-sm text-gray-500">
            Suspense boundaries can be nested. Outer boundaries show first, then
            inner content streams in progressively.
          </p>

          <NestedStreaming />
        </div>

        {/* Key Concepts */}
        <div className="flex flex-col gap-4 rounded-lg border border-gray-800 bg-gray-900/30 p-4">
          <h2 className="text-lg font-medium text-gray-200">Key Concepts</h2>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <div className="flex flex-col gap-2">
              <h3 className="font-medium text-blue-400">Progressive Loading</h3>
              <p className="text-sm text-gray-400">
                The shell renders immediately while async content loads. No
                waiting for the slowest component.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="font-medium text-green-400">Skeleton Matching</h3>
              <p className="text-sm text-gray-400">
                Skeletons should match the shape of loaded content to prevent
                layout shift and improve perceived performance.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="font-medium text-violet-400">Error Isolation</h3>
              <p className="text-sm text-gray-400">
                Each Suspense boundary isolates errors. One failing component
                doesn't break the entire page.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Boundary>
  );
}
