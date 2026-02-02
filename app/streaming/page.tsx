import { Suspense } from 'react';
import { Boundary } from '#/ui/boundary';
import { DemoHeading } from '#/ui/demo-states';
import {
  FastComponent,
  MediumComponent,
  SlowComponent,
  VerySlowComponent,
} from './_components/async-components';
import { Skeleton } from './_components/skeletons';

export default function Page() {
  return (
    <Boundary label="page.tsx (Server)">
      <div className="flex flex-col gap-4">
        <DemoHeading count={4}>Streaming</DemoHeading>

        <div className="grid gap-4 rounded-lg border border-gray-200/70 bg-white/60 p-4 text-sm text-gray-600 shadow-sm dark:border-gray-800/80 dark:bg-gray-950/40 dark:text-gray-300">
          <div className="grid gap-2">
            <p className="text-base font-medium text-gray-700 dark:text-gray-200">
              What you’re seeing
            </p>
            <p>
              Each card below is a Server Component wrapped in a separate
              <span className="font-mono"> &lt;Suspense&gt;</span> boundary.
              They resolve at different speeds and stream into the page as soon
              as they’re ready.
            </p>
          </div>

          <div className="grid gap-3 lg:grid-cols-2">
            <div className="rounded-md border border-gray-200/70 bg-white/70 p-3 dark:border-gray-800/80 dark:bg-gray-900/40">
              <p className="mb-2 text-xs font-semibold tracking-wide text-gray-500 uppercase">
                How to read this
              </p>
              <ul className="list-disc space-y-1 pl-4 text-gray-600 dark:text-gray-300">
                <li>Skeletons show pending boundaries.</li>
                <li>Cards appear the moment data resolves.</li>
                <li>Refresh to replay the streaming sequence.</li>
              </ul>
            </div>

            <div className="rounded-md border border-gray-200/70 bg-white/70 p-3 dark:border-gray-800/80 dark:bg-gray-900/40">
              <p className="mb-2 text-xs font-semibold tracking-wide text-gray-500 uppercase">
                Expected order
              </p>
              <div className="flex flex-wrap gap-2">
                {['100ms', '500ms', '1500ms', '3000ms'].map((label) => (
                  <span
                    key={label}
                    className="rounded-full border border-gray-200 bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 text-xs text-gray-500">
            <span className="rounded-full bg-cyan-100 px-2 py-1 text-cyan-800 dark:bg-cyan-900/40 dark:text-cyan-200">
              Fast
            </span>
            <span className="rounded-full bg-blue-100 px-2 py-1 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200">
              Medium
            </span>
            <span className="rounded-full bg-orange-100 px-2 py-1 text-orange-800 dark:bg-orange-900/40 dark:text-orange-200">
              Slow
            </span>
            <span className="rounded-full bg-pink-100 px-2 py-1 text-pink-800 dark:bg-pink-900/40 dark:text-pink-200">
              Very slow
            </span>
          </div>

          <div className="rounded-md border border-gray-200/70 bg-white/70 p-3 dark:border-gray-800/80 dark:bg-gray-900/40">
            <p className="mb-3 text-xs font-semibold tracking-wide text-gray-500 uppercase">
              Streaming timeline (relative)
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="w-16 text-[11px] text-gray-500">100ms</span>
                <div className="h-2 flex-1 rounded-full bg-gray-100 dark:bg-gray-800">
                  <div className="h-2 w-2/5 rounded-full bg-cyan-400" />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-16 text-[11px] text-gray-500">500ms</span>
                <div className="h-2 flex-1 rounded-full bg-gray-100 dark:bg-gray-800">
                  <div className="h-2 w-1/2 rounded-full bg-blue-400" />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-16 text-[11px] text-gray-500">1500ms</span>
                <div className="h-2 flex-1 rounded-full bg-gray-100 dark:bg-gray-800">
                  <div className="h-2 w-3/4 rounded-full bg-orange-400" />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-16 text-[11px] text-gray-500">3000ms</span>
                <div className="h-2 flex-1 rounded-full bg-gray-100 dark:bg-gray-800">
                  <div className="h-2 w-full rounded-full bg-pink-400" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Suspense fallback={<Skeleton label="100ms" />}>
            <FastComponent />
          </Suspense>

          <Suspense fallback={<Skeleton label="500ms" />}>
            <MediumComponent />
          </Suspense>

          <Suspense fallback={<Skeleton label="1500ms" />}>
            <SlowComponent />
          </Suspense>

          <Suspense fallback={<Skeleton label="3000ms" />}>
            <VerySlowComponent />
          </Suspense>
        </div>
      </div>
    </Boundary>
  );
}
