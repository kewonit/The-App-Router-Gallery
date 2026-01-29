import { Suspense } from 'react';
import { Boundary } from '#/ui/boundary';
import {
  FastComponent,
  MediumComponent,
  SlowComponent,
  VerySlowComponent,
} from './_components/async-components';
import { Skeleton } from './_components/skeletons';

export default function Page() {
  return (
    <Boundary label="page.tsx">
      <div className="flex flex-col gap-4">
        <h1 className="text-xl font-medium text-gray-700 dark:text-gray-300">
          Streaming{' '}
          <span className="font-mono tracking-tighter text-gray-500 dark:text-gray-600">
            (4)
          </span>
        </h1>

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
