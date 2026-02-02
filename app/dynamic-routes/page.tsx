'use cache';

import { Boundary } from '#/ui/boundary';
import { DemoHeading, EmptyState } from '#/ui/demo-states';
import Link from 'next/link';

const routes = [
  {
    type: '[slug]',
    examples: [
      { path: '/dynamic-routes/post/hello-world', label: 'hello-world' },
      { path: '/dynamic-routes/post/my-first-post', label: 'my-first-post' },
    ],
  },
  {
    type: '[...slug]',
    examples: [
      {
        path: '/dynamic-routes/docs/getting-started',
        label: 'getting-started',
      },
      { path: '/dynamic-routes/docs/api/users', label: 'api / users' },
    ],
  },
  {
    type: '[[...slug]]',
    examples: [
      { path: '/dynamic-routes/shop', label: '(root)' },
      { path: '/dynamic-routes/shop/electronics', label: 'electronics' },
    ],
  },
];

export default async function Page() {
  return (
    <Boundary label="page.tsx (Static)" color="cyan">
      <div className="flex flex-col gap-4">
        <DemoHeading count={routes.length}>Dynamic Routes</DemoHeading>

        {routes.length === 0 ? (
          <EmptyState
            title="No routes configured"
            description="Add some dynamic route examples to get started."
          />
        ) : (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {routes.map((route) => (
              <div key={route.type} className="flex flex-col gap-3">
                <code className="text-xs text-gray-600 dark:text-gray-500">
                  {route.type}
                </code>

                {route.examples.map((ex) => (
                  <Link
                    key={ex.path}
                    href={ex.path}
                    className="group flex flex-col gap-2.5"
                  >
                    <div className="overflow-hidden rounded-md bg-gray-100 p-8 group-hover:bg-gray-200 dark:bg-gray-900/50 dark:group-hover:bg-gray-900">
                      <div className="flex flex-col gap-2">
                        <div className="h-2 w-4/5 rounded-full bg-gray-200 dark:bg-gray-800" />
                        <div className="h-2 w-1/3 rounded-full bg-gray-200 dark:bg-gray-800" />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="h-2 w-4/5 rounded-full bg-gray-200 dark:bg-gray-800" />
                      <div className="h-2 w-1/3 rounded-full bg-gray-200 dark:bg-gray-800" />
                    </div>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </Boundary>
  );
}
