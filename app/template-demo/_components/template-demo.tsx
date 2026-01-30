import { Boundary } from '#/ui/boundary';

export function TemplateDemo() {
  return (
    <div className="flex flex-col gap-6">
      <Boundary label="Comparison" size="small" animateRerendering={false}>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
            <h3 className="font-semibold text-blue-700 dark:text-blue-300">
              layout.tsx
            </h3>
            <ul className="mt-2 space-y-1 text-sm text-blue-800 dark:text-blue-200">
              <li>✓ Persists state across navigations</li>
              <li>✓ Does not re-render</li>
              <li>✓ Effects run once</li>
            </ul>
          </div>

          <div className="rounded-lg border border-purple-200 bg-purple-50 p-4 dark:border-purple-800 dark:bg-purple-900/20">
            <h3 className="font-semibold text-purple-700 dark:text-purple-300">
              template.tsx
            </h3>
            <ul className="mt-2 space-y-1 text-sm text-purple-800 dark:text-purple-200">
              <li>↻ Resets state on every navigation</li>
              <li>↻ Creates new instance each time</li>
              <li>↻ Effects run on each navigation</li>
            </ul>
          </div>
        </div>
      </Boundary>

      <Boundary label="Example" size="small" animateRerendering={false}>
        <pre className="overflow-x-auto text-xs text-gray-700 dark:text-gray-300">
          {`// template.tsx - re-mounts on navigation
'use client'

import { useEffect } from 'react'

export default function Template({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    // Runs on every navigation
    analytics.trackPageView()
  }, [])

  return (
    <div className="animate-in fade-in">
      {children}
    </div>
  )
}`}
        </pre>
      </Boundary>

      <Boundary
        label="When to use"
        size="small"
        color="cyan"
        animateRerendering={false}
      >
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-lg bg-gray-100 p-3 text-center dark:bg-gray-900">
            <span className="text-xl">🎬</span>
            <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
              Page transitions
            </p>
          </div>
          <div className="rounded-lg bg-gray-100 p-3 text-center dark:bg-gray-900">
            <span className="text-xl">📊</span>
            <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
              Analytics
            </p>
          </div>
          <div className="rounded-lg bg-gray-100 p-3 text-center dark:bg-gray-900">
            <span className="text-xl">🔄</span>
            <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
              Form reset
            </p>
          </div>
          <div className="rounded-lg bg-gray-100 p-3 text-center dark:bg-gray-900">
            <span className="text-xl">⏱️</span>
            <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
              Time tracking
            </p>
          </div>
        </div>
      </Boundary>
    </div>
  );
}
