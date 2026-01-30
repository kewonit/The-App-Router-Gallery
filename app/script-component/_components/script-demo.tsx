'use client';

import { Boundary } from '#/ui/boundary';
import Script from 'next/script';
import { useState } from 'react';

export function ScriptDemo() {
  const [loaded, setLoaded] = useState<string[]>([]);

  return (
    <div className="flex flex-col gap-6">
      <Boundary label="Strategies" size="small" animateRerendering={false}>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="rounded-lg bg-gray-100 p-4 dark:bg-gray-900">
            <code className="text-sm font-semibold text-gray-800 dark:text-gray-200">
              beforeInteractive
            </code>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Before hydration. Critical scripts only.
            </p>
          </div>
          <div className="rounded-lg bg-gray-100 p-4 dark:bg-gray-900">
            <code className="text-sm font-semibold text-gray-800 dark:text-gray-200">
              afterInteractive
            </code>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              After hydration. Most scripts use this.
            </p>
          </div>
          <div className="rounded-lg bg-gray-100 p-4 dark:bg-gray-900">
            <code className="text-sm font-semibold text-gray-800 dark:text-gray-200">
              lazyOnload
            </code>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Browser idle time. Chat widgets, etc.
            </p>
          </div>
          <div className="rounded-lg bg-gray-100 p-4 dark:bg-gray-900">
            <code className="text-sm font-semibold text-gray-800 dark:text-gray-200">
              worker
            </code>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Web worker. Experimental.
            </p>
          </div>
        </div>
      </Boundary>

      <Boundary
        label="Live Demo"
        size="small"
        color="blue"
        animateRerendering={false}
      >
        <Script
          id="demo-1"
          strategy="afterInteractive"
          onLoad={() => setLoaded((p) => [...p, 'afterInteractive'])}
        >
          {`console.log('afterInteractive loaded')`}
        </Script>
        <Script
          id="demo-2"
          strategy="lazyOnload"
          onLoad={() => setLoaded((p) => [...p, 'lazyOnload'])}
        >
          {`console.log('lazyOnload loaded')`}
        </Script>

        <div className="flex flex-wrap gap-2">
          {['afterInteractive', 'lazyOnload'].map((s) => (
            <span
              key={s}
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                loaded.includes(s)
                  ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                  : 'bg-gray-200 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
              }`}
            >
              {s}: {loaded.includes(s) ? '✓' : '...'}
            </span>
          ))}
        </div>
      </Boundary>

      <Boundary label="Example" size="small" animateRerendering={false}>
        <pre className="overflow-x-auto text-xs text-gray-700 dark:text-gray-300">
          {`import Script from 'next/script'

export default function Page() {
  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js"
        strategy="afterInteractive"
      />
      <Script
        src="https://widget.intercom.io/widget/APP_ID"
        strategy="lazyOnload"
      />
    </>
  )
}`}
        </pre>
      </Boundary>
    </div>
  );
}
