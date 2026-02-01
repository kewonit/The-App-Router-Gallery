import { Suspense } from 'react';
import { getTodos } from './actions';
import { React19Demos } from './_components/demos';
import { Boundary } from '#/ui/boundary';

// Create a promise that resolves with the current time
async function getServerTime() {
  'use cache';
  await new Promise((resolve) => setTimeout(resolve, 300));
  return new Date().toLocaleTimeString();
}

// Cached todo fetcher
async function getCachedTodos() {
  'use cache';
  return getTodos();
}

function LoadingFallback() {
  return (
    <Boundary label="Loading..." color="gray" pulse>
      <div className="animate-pulse space-y-3">
        <div className="h-4 w-48 rounded bg-gray-200 dark:bg-gray-700" />
        <div className="h-10 rounded bg-gray-200 dark:bg-gray-700" />
      </div>
    </Boundary>
  );
}

async function React19DemosWrapper() {
  const todos = await getCachedTodos();
  const timePromise = getServerTime();

  return <React19Demos todos={todos} timePromise={timePromise} />;
}

export default async function Page() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <React19DemosWrapper />
    </Suspense>
  );
}
