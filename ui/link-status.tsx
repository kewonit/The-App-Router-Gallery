'use client';

import { useLinkStatus } from 'next/link';

export function LinkStatus() {
  const { pending } = useLinkStatus();
  return pending ? (
    <span
      className="ml-auto size-4 shrink-0 animate-spin rounded-full border-2 border-blue-200 border-t-blue-600 dark:border-blue-800 dark:border-t-blue-400"
      role="status"
      aria-label="Loading"
    />
  ) : null;
}
