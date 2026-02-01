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
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isPending ? 'Revalidating...' : 'revalidatePath()'}
          </button>

          <button
            onClick={handleRevalidateTag}
            disabled={isPending}
            className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isPending ? 'Revalidating...' : 'revalidateTag()'}
          </button>

          <button
            onClick={handleWebhook}
            disabled={isPending}
            className="rounded-lg bg-pink-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-pink-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isPending ? 'Processing...' : 'Simulate Webhook (+10)'}
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
