import { Boundary } from '#/ui/boundary';

// Simulated static data
const staticPosts = [
  {
    slug: 'getting-started',
    title: 'Getting Started with Next.js',
    views: 15234,
  },
  { slug: 'app-router', title: 'Understanding the App Router', views: 12456 },
  { slug: 'server-components', title: 'React Server Components', views: 9876 },
];

// This would be your generateStaticParams in a real [slug] route
export function generateStaticParams() {
  return staticPosts.map((post) => ({ slug: post.slug }));
}

function RenderingComparison() {
  return (
    <Boundary label="Rendering Strategies Comparison">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="py-3 pr-4 text-left font-medium text-gray-900 dark:text-gray-100">
                Strategy
              </th>
              <th className="py-3 pr-4 text-left font-medium text-gray-900 dark:text-gray-100">
                When Built
              </th>
              <th className="py-3 pr-4 text-left font-medium text-gray-900 dark:text-gray-100">
                Updates
              </th>
              <th className="py-3 text-left font-medium text-gray-900 dark:text-gray-100">
                Best For
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            <tr>
              <td className="py-3 pr-4">
                <span className="inline-flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-green-500" />
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    Static (SSG)
                  </span>
                </span>
              </td>
              <td className="py-3 pr-4 text-gray-600 dark:text-gray-400">
                Build time only
              </td>
              <td className="py-3 pr-4 text-gray-600 dark:text-gray-400">
                Requires new deploy
              </td>
              <td className="py-3 text-gray-600 dark:text-gray-400">
                Marketing pages, docs
              </td>
            </tr>
            <tr>
              <td className="py-3 pr-4">
                <span className="inline-flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-blue-500" />
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    ISR
                  </span>
                </span>
              </td>
              <td className="py-3 pr-4 text-gray-600 dark:text-gray-400">
                Build + background
              </td>
              <td className="py-3 pr-4 text-gray-600 dark:text-gray-400">
                Time or on-demand
              </td>
              <td className="py-3 text-gray-600 dark:text-gray-400">
                Blog, e-commerce
              </td>
            </tr>
            <tr>
              <td className="py-3 pr-4">
                <span className="inline-flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-purple-500" />
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    Dynamic (SSR)
                  </span>
                </span>
              </td>
              <td className="py-3 pr-4 text-gray-600 dark:text-gray-400">
                Every request
              </td>
              <td className="py-3 pr-4 text-gray-600 dark:text-gray-400">
                Always fresh
              </td>
              <td className="py-3 text-gray-600 dark:text-gray-400">
                Dashboards, user data
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Boundary>
  );
}

function StaticPagesDemo() {
  return (
    <Boundary label="Static Pages (SSG)" color="cyan">
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100">
            Pre-rendered at Build Time
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            These pages are generated once and served from CDN
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {staticPosts.map((post) => (
            <div
              key={post.slug}
              className="rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-900/20"
            >
              <h4 className="font-medium text-green-800 dark:text-green-200">
                {post.title}
              </h4>
              <p className="mt-1 text-sm text-green-600 dark:text-green-400">
                {post.views.toLocaleString()} views
              </p>
              <p className="mt-2 font-mono text-xs text-green-500">
                /{post.slug}
              </p>
            </div>
          ))}
        </div>

        <div className="rounded-lg bg-gray-900 p-4 font-mono text-sm">
          <pre className="overflow-x-auto text-gray-300">
            {`// app/blog/[slug]/page.tsx
export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

// All slugs pre-rendered at build time
export default async function BlogPost({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  return <Article post={post} />;
}`}
          </pre>
        </div>
      </div>
    </Boundary>
  );
}

function ISRDemo() {
  // Build time is captured at build time for static pages
  const buildTimeDisplay = 'Build time shown at runtime';

  return (
    <Boundary label="Incremental Static Regeneration (ISR)" color="blue">
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100">
            Static with Background Updates
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Pages revalidate in the background after a time interval
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
            <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
              Time-based ISR
            </p>
            <p className="mt-1 text-xs text-blue-600 dark:text-blue-400">
              Revalidates every 60 seconds
            </p>
            <div className="mt-3 rounded bg-gray-900 p-2 font-mono text-xs text-gray-300">
              {`export const revalidate = 60;`}
            </div>
          </div>

          <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
            <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
              On-demand ISR
            </p>
            <p className="mt-1 text-xs text-blue-600 dark:text-blue-400">
              Revalidates via API/webhook
            </p>
            <div className="mt-3 rounded bg-gray-900 p-2 font-mono text-xs text-gray-300">
              {`revalidatePath('/blog/post')`}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-lg border border-blue-200 bg-white p-3 dark:border-blue-800 dark:bg-gray-800">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50">
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
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
              ISR Behavior
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Serves cached HTML, revalidates in background after interval
            </p>
          </div>
        </div>
      </div>
    </Boundary>
  );
}

function DynamicSegmentsDemo() {
  return (
    <Boundary label="Dynamic Segments Fallback" color="violet">
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100">
            Handling Unknown Slugs
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Control behavior for paths not in generateStaticParams
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-violet-200 bg-violet-50 p-4 dark:border-violet-800 dark:bg-violet-900/20">
            <p className="font-medium text-violet-800 dark:text-violet-200">
              dynamicParams: true
            </p>
            <p className="mt-1 text-sm text-violet-600 dark:text-violet-400">
              Render on-demand (default)
            </p>
          </div>

          <div className="rounded-lg border border-violet-200 bg-violet-50 p-4 dark:border-violet-800 dark:bg-violet-900/20">
            <p className="font-medium text-violet-800 dark:text-violet-200">
              dynamicParams: false
            </p>
            <p className="mt-1 text-sm text-violet-600 dark:text-violet-400">
              Return 404 for unknown
            </p>
          </div>

          <div className="rounded-lg border border-violet-200 bg-violet-50 p-4 dark:border-violet-800 dark:bg-violet-900/20">
            <p className="font-medium text-violet-800 dark:text-violet-200">
              loading.tsx
            </p>
            <p className="mt-1 text-sm text-violet-600 dark:text-violet-400">
              Show skeleton while generating
            </p>
          </div>
        </div>

        <div className="rounded-lg bg-gray-900 p-4 font-mono text-sm">
          <pre className="overflow-x-auto text-gray-300">
            {`// Only allow paths from generateStaticParams
export const dynamicParams = false;

// Or allow on-demand generation with caching
export const dynamicParams = true; // default
export const revalidate = 3600; // Cache new pages for 1 hour`}
          </pre>
        </div>
      </div>
    </Boundary>
  );
}

export default function Page() {
  return (
    <div className="space-y-6">
      <RenderingComparison />

      <div className="grid gap-6 lg:grid-cols-2">
        <StaticPagesDemo />
        <ISRDemo />
      </div>

      <DynamicSegmentsDemo />

      {/* Build output example */}
      <Boundary label="Build Output Preview">
        <div className="space-y-3">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            During <code className="text-blue-600">next build</code>, you see
            which routes are static, dynamic, or ISR:
          </p>

          <div className="rounded-lg bg-gray-900 p-4 font-mono text-xs">
            <pre className="overflow-x-auto text-gray-300">
              {`Route                          Size     First Load JS
┌ ○ /                            1.2 kB      89.5 kB
├ ○ /about                       845 B       88.9 kB
├ ● /blog                        1.1 kB      89.3 kB
├   └ /blog/[slug]
├       ├ /blog/getting-started
├       ├ /blog/app-router  
├       └ /blog/server-components
├ λ /dashboard                   2.3 kB      91.1 kB
└ ○ /contact                     756 B       88.8 kB

○  (Static)   prerendered as static content
●  (SSG)      prerendered with getStaticProps or generateStaticParams
λ  (Dynamic)  server-rendered on demand`}
            </pre>
          </div>
        </div>
      </Boundary>
    </div>
  );
}
