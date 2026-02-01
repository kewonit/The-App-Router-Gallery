import { Suspense } from 'react';
import { Boundary } from '#/ui/boundary';

// Simulate a dynamic data fetch
async function getDynamicUserData() {
  // Artificial delay to demonstrate streaming
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return {
    name: 'Jane Doe',
    notifications: 3,
    lastLogin: new Date().toLocaleTimeString(),
  };
}

async function getDynamicRecommendations() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return [
    { id: 1, title: 'React Server Components', type: 'article' },
    { id: 2, title: 'Caching Strategies', type: 'video' },
    { id: 3, title: 'Data Fetching Patterns', type: 'tutorial' },
  ];
}

// Static shell components (prerendered at build time)
function StaticHeader() {
  return (
    <Boundary label="Static Header (Prerendered)" color="cyan">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 font-bold text-white">
            P
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Dashboard
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Partial Prerendering Demo
            </p>
          </div>
        </div>
        <nav className="flex gap-2">
          <span className="rounded-lg bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300">
            Home
          </span>
          <span className="rounded-lg px-3 py-1.5 text-sm text-gray-500 dark:text-gray-400">
            Settings
          </span>
        </nav>
      </header>
    </Boundary>
  );
}

function StaticSidebar() {
  return (
    <Boundary label="Static Sidebar (Prerendered)" color="cyan">
      <aside className="space-y-4">
        <h2 className="text-sm font-semibold text-gray-700 uppercase dark:text-gray-300">
          Navigation
        </h2>
        <ul className="space-y-2">
          {['Overview', 'Analytics', 'Reports', 'Settings'].map((item) => (
            <li
              key={item}
              className="rounded-lg bg-gray-50 px-3 py-2 text-sm text-gray-600 dark:bg-gray-800/50 dark:text-gray-400"
            >
              {item}
            </li>
          ))}
        </ul>
      </aside>
    </Boundary>
  );
}

// Dynamic hole components (rendered at request time)
async function DynamicUserWidget() {
  const user = await getDynamicUserData();

  return (
    <Boundary label="Dynamic User Widget (Request Time)" color="pink">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium text-gray-900 dark:text-gray-100">
            Welcome back, {user.name}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Last login: {user.lastLogin}
          </p>
        </div>
        <div className="relative">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50">
            <svg
              className="h-5 w-5 text-blue-600 dark:text-blue-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </div>
          {user.notifications > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
              {user.notifications}
            </span>
          )}
        </div>
      </div>
    </Boundary>
  );
}

async function DynamicRecommendations() {
  const recommendations = await getDynamicRecommendations();

  return (
    <Boundary label="Dynamic Recommendations (Request Time)" color="pink">
      <div className="space-y-3">
        <h3 className="font-medium text-gray-900 dark:text-gray-100">
          Recommended for You
        </h3>
        <div className="space-y-2">
          {recommendations.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-3 dark:border-gray-700 dark:bg-gray-800"
            >
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {item.title}
              </span>
              <span className="rounded-full bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-700 dark:bg-purple-900/50 dark:text-purple-300">
                {item.type}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Boundary>
  );
}

// Loading skeletons for dynamic holes
function UserWidgetSkeleton() {
  return (
    <Boundary label="Loading User..." color="gray" pulse>
      <div className="flex animate-pulse items-center justify-between">
        <div className="space-y-2">
          <div className="h-4 w-40 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-3 w-24 rounded bg-gray-200 dark:bg-gray-700" />
        </div>
        <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700" />
      </div>
    </Boundary>
  );
}

function RecommendationsSkeleton() {
  return (
    <Boundary label="Loading Recommendations..." color="gray" pulse>
      <div className="animate-pulse space-y-3">
        <div className="h-4 w-36 rounded bg-gray-200 dark:bg-gray-700" />
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-12 rounded-lg bg-gray-200 dark:bg-gray-700"
            />
          ))}
        </div>
      </div>
    </Boundary>
  );
}

export default function Page() {
  return (
    <div className="space-y-6">
      {/* Static shell - rendered at build time */}
      <StaticHeader />

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Static sidebar */}
        <div className="lg:col-span-1">
          <StaticSidebar />
        </div>

        {/* Main content with dynamic holes */}
        <div className="space-y-6 lg:col-span-3">
          {/* Dynamic hole 1: User widget */}
          <Suspense fallback={<UserWidgetSkeleton />}>
            <DynamicUserWidget />
          </Suspense>

          {/* Static content section */}
          <Boundary label="Static Stats (Prerendered)" color="cyan">
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'Total Views', value: '12,345' },
                { label: 'Active Users', value: '1,234' },
                { label: 'Conversion', value: '3.2%' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-lg bg-gray-50 p-4 text-center dark:bg-gray-800/50"
                >
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </Boundary>

          {/* Dynamic hole 2: Recommendations */}
          <Suspense fallback={<RecommendationsSkeleton />}>
            <DynamicRecommendations />
          </Suspense>
        </div>
      </div>

      {/* Legend */}
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/50">
        <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
          Understanding the Demo
        </h3>
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full border-2 border-cyan-400 bg-cyan-50 dark:bg-cyan-950" />
            <span className="text-gray-600 dark:text-gray-400">
              Static Shell (instant, prerendered)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full border-2 border-pink-400 bg-pink-50 dark:bg-pink-950" />
            <span className="text-gray-600 dark:text-gray-400">
              Dynamic Holes (streamed at request time)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full border-2 border-gray-300 bg-gray-100 dark:border-gray-600 dark:bg-gray-800" />
            <span className="text-gray-600 dark:text-gray-400">
              Loading Skeleton (shown while streaming)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
