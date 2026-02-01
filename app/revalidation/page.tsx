'use client';

import { useState, useCallback } from 'react';
import { RevalidationControls } from './_components/controls';
import { Boundary } from '#/ui/boundary';

// This simulates data that would come from the server
// In real usage, this would be fetched in a Server Component
function DataDisplay({
  initialData,
  refreshKey,
}: {
  initialData: { views: number; lastUpdated: string; fetchedAt: string };
  refreshKey: number;
}) {
  return (
    <Boundary label="Cached Data Display" color="cyan">
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100">
            Current Data
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            This data is cached and updates when revalidated
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg bg-cyan-50 p-4 dark:bg-cyan-900/20">
            <p className="text-3xl font-bold text-cyan-700 dark:text-cyan-300">
              {initialData.views + refreshKey}
            </p>
            <p className="text-sm text-cyan-600 dark:text-cyan-400">
              Total Views
            </p>
          </div>

          <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
            <p className="font-mono text-sm text-gray-700 dark:text-gray-300">
              {new Date(initialData.lastUpdated).toLocaleTimeString()}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Last Updated
            </p>
          </div>

          <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
            <p className="font-mono text-sm text-gray-700 dark:text-gray-300">
              {new Date(initialData.fetchedAt).toLocaleTimeString()}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Fetched At
            </p>
          </div>
        </div>
      </div>
    </Boundary>
  );
}

function RevalidationMethods() {
  return (
    <Boundary label="Revalidation Methods Comparison">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="py-2 pr-4 text-left font-medium text-gray-900 dark:text-gray-100">
                Method
              </th>
              <th className="py-2 pr-4 text-left font-medium text-gray-900 dark:text-gray-100">
                Scope
              </th>
              <th className="py-2 text-left font-medium text-gray-900 dark:text-gray-100">
                Use Case
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            <tr>
              <td className="py-2 pr-4 font-mono text-blue-600">
                revalidatePath(path)
              </td>
              <td className="py-2 pr-4 text-gray-600 dark:text-gray-400">
                Single route or layout subtree
              </td>
              <td className="py-2 text-gray-600 dark:text-gray-400">
                After form submission on specific page
              </td>
            </tr>
            <tr>
              <td className="py-2 pr-4 font-mono text-violet-600">
                revalidateTag(tag)
              </td>
              <td className="py-2 pr-4 text-gray-600 dark:text-gray-400">
                All fetches with matching tag
              </td>
              <td className="py-2 text-gray-600 dark:text-gray-400">
                CMS webhook, cross-page data updates
              </td>
            </tr>
            <tr>
              <td className="py-2 pr-4 font-mono text-pink-600">
                {`{ next: { revalidate: 60 } }`}
              </td>
              <td className="py-2 pr-4 text-gray-600 dark:text-gray-400">
                Individual fetch request
              </td>
              <td className="py-2 text-gray-600 dark:text-gray-400">
                Time-based freshness (ISR pattern)
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Boundary>
  );
}

function CodeExamples() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Boundary label="Server Action Pattern" color="blue">
        <div className="rounded-lg bg-gray-900 p-4 font-mono text-sm">
          <pre className="overflow-x-auto text-gray-300">
            {`'use server';
import { revalidatePath } from 'next/cache';

export async function updateProduct(
  id: string,
  data: ProductData
) {
  await db.product.update(id, data);
  
  // Revalidate the product page
  revalidatePath(\`/products/\${id}\`);
}`}
          </pre>
        </div>
      </Boundary>

      <Boundary label="Tagged Fetch Pattern" color="violet">
        <div className="rounded-lg bg-gray-900 p-4 font-mono text-sm">
          <pre className="overflow-x-auto text-gray-300">
            {`// In Server Component
const data = await fetch(url, {
  next: { 
    tags: ['products', 'featured'],
    revalidate: 3600 // 1 hour
  }
});

// In Server Action
revalidateTag('products'); // All tagged fetches refresh`}
          </pre>
        </div>
      </Boundary>
    </div>
  );
}

export default function RevalidationPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRevalidate = useCallback(() => {
    setRefreshKey((k) => k + 1);
  }, []);

  // Simulated initial data (in real app, this comes from server)
  const initialData = {
    views: 1234,
    lastUpdated: 'N/A (click to fetch)',
    fetchedAt: 'N/A (click to fetch)',
  };

  return (
    <div className="space-y-6">
      <DataDisplay initialData={initialData} refreshKey={refreshKey} />

      <RevalidationControls onRevalidate={handleRevalidate} />

      <RevalidationMethods />

      <CodeExamples />

      {/* Tip callout */}
      <Boundary label="Best Practice" color="cyan">
        <div className="flex gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-100 dark:bg-cyan-900/50">
            <svg
              className="h-4 w-4 text-cyan-600 dark:text-cyan-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Prefer <code className="text-blue-600">revalidateTag</code> over{' '}
              <code className="text-blue-600">revalidatePath</code> for data
              that appears on multiple pages. Tags give you fine-grained control
              over which cached data to invalidate without knowing all the
              routes that use it.
            </p>
          </div>
        </div>
      </Boundary>
    </div>
  );
}
