'use client';

import { useTransition } from 'react';
import { revalidateByPath, revalidateByTag, simulateWebhook } from '../actions';
import { Boundary } from '#/ui/boundary';

type RevalidationControlsProps = { onRevalidate: () => void };

export function RevalidationControls({
  onRevalidate,
}: RevalidationControlsProps) {
  const [isPending, startTransition] = useTransition();

  const handleRevalidatePath = () => {
    startTransition(async () => {
      await revalidateByPath();
      onRevalidate();
    });
  };

  const handleRevalidateTag = () => {
    startTransition(async () => {
      await revalidateByTag();
      onRevalidate();
    });
  };

  const handleWebhook = () => {
    startTransition(async () => {
      await simulateWebhook();
      onRevalidate();
    });
  };

  return (
    <Boundary label="Revalidation Controls" color="blue">
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100">
            Trigger Revalidation
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Each button increments views and revalidates using a different
            method
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleRevalidatePath}
            disabled={isPending}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm shadow-blue-200 transition-all duration-150 hover:cursor-pointer hover:bg-blue-500 hover:shadow-md focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:outline-none active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 dark:shadow-blue-900/30 dark:hover:bg-blue-500 dark:focus-visible:ring-offset-gray-950"
          >
            {isPending ? 'Revalidating…' : 'revalidatePath()'}
          </button>

          <button
            onClick={handleRevalidateTag}
            disabled={isPending}
            className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white shadow-sm shadow-violet-200 transition-all duration-150 hover:cursor-pointer hover:bg-violet-500 hover:shadow-md focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:outline-none active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 dark:shadow-violet-900/30 dark:hover:bg-violet-500 dark:focus-visible:ring-offset-gray-950"
          >
            {isPending ? 'Revalidating…' : 'revalidateTag()'}
          </button>

          <button
            onClick={handleWebhook}
            disabled={isPending}
            className="rounded-lg bg-pink-600 px-4 py-2 text-sm font-medium text-white shadow-sm shadow-pink-200 transition-all duration-150 hover:cursor-pointer hover:bg-pink-500 hover:shadow-md focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2 focus-visible:outline-none active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 dark:shadow-pink-900/30 dark:hover:bg-pink-500 dark:focus-visible:ring-offset-gray-950"
          >
            {isPending ? 'Processing…' : 'Simulate Webhook (+10)'}
          </button>
        </div>

        {isPending && (
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Updating data and revalidating cache...
          </p>
        )}
      </div>
    </Boundary>
  );
}
