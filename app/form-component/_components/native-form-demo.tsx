'use client';

export function NativeFormDemo() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">
          Next.js Form vs Native HTML Form
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-500">
          Understanding the differences and benefits
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Next.js Form */}
        <div className="flex flex-col gap-3 rounded-lg border border-blue-900/50 bg-blue-950/20 p-4">
          <div className="flex items-center gap-2">
            <div className="flex size-6 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
              ✓
            </div>
            <h4 className="font-medium text-blue-400">Next.js Form</h4>
          </div>

          <ul className="flex flex-col gap-2 text-sm">
            <FeatureItem positive>
              Prefetches loading UI and shared layouts
            </FeatureItem>
            <FeatureItem positive>
              Client-side navigation (no full page reload)
            </FeatureItem>
            <FeatureItem positive>
              Progressive enhancement (works without JS)
            </FeatureItem>
            <FeatureItem positive>
              Automatic scroll position handling
            </FeatureItem>
            <FeatureItem positive>
              Preserves client state during navigation
            </FeatureItem>
          </ul>

          <pre className="mt-2 overflow-auto rounded bg-gray-900 p-3 text-xs">
            <code className="text-blue-300">{`import Form from 'next/form';

<Form action={serverAction}>
  <input name="query" />
  <button type="submit">
    Search
  </button>
</Form>`}</code>
          </pre>
        </div>

        {/* Native HTML Form */}
        <div className="flex flex-col gap-3 rounded-lg border border-gray-200 bg-gray-100/50 p-4 dark:border-gray-800 dark:bg-gray-900/30">
          <div className="flex items-center gap-2">
            <div className="flex size-6 items-center justify-center rounded-full bg-gray-600 text-xs font-bold text-white">
              ○
            </div>
            <h4 className="font-medium text-gray-600 dark:text-gray-400">
              Native HTML Form
            </h4>
          </div>

          <ul className="flex flex-col gap-2 text-sm">
            <FeatureItem>No prefetching capability</FeatureItem>
            <FeatureItem>Full page reload on submit</FeatureItem>
            <FeatureItem>Works without JavaScript</FeatureItem>
            <FeatureItem>Scroll resets to top</FeatureItem>
            <FeatureItem>Client state is lost</FeatureItem>
          </ul>

          <pre className="mt-2 overflow-auto rounded bg-gray-100 p-3 text-xs dark:bg-gray-950">
            <code className="text-gray-600 dark:text-gray-400">{`<form action="/search" method="GET">
  <input name="query" />
  <button type="submit">
    Search
  </button>
</form>`}</code>
          </pre>
        </div>
      </div>

      {/* When to use each */}
      <div className="flex flex-col gap-2 rounded-lg border border-gray-200 bg-gray-100/50 p-4 dark:border-gray-800 dark:bg-gray-900/30">
        <h4 className="font-medium text-gray-700 dark:text-gray-300">
          When to use each:
        </h4>
        <div className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
          <div>
            <p className="font-medium text-blue-400">Use Next.js Form when:</p>
            <ul className="mt-1 list-inside list-disc text-gray-600 dark:text-gray-400">
              <li>Navigating to a new page (search, filters)</li>
              <li>You want prefetching benefits</li>
              <li>Preserving client state matters</li>
            </ul>
          </div>
          <div>
            <p className="font-medium text-gray-600 dark:text-gray-400">
              Use native form + useActionState when:
            </p>
            <ul className="mt-1 list-inside list-disc text-gray-600 dark:text-gray-400">
              <li>Mutating data on same page</li>
              <li>Showing validation errors inline</li>
              <li>Need optimistic updates</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureItem({
  children,
  positive,
}: {
  children: React.ReactNode;
  positive?: boolean;
}) {
  return (
    <li className="flex items-start gap-2">
      <span
        className={`mt-1 size-1.5 shrink-0 rounded-full ${
          positive ? 'bg-green-500' : 'bg-gray-600'
        }`}
      />
      <span
        className={
          positive
            ? 'text-gray-700 dark:text-gray-300'
            : 'text-gray-600 dark:text-gray-500'
        }
      >
        {children}
      </span>
    </li>
  );
}
