import { Boundary } from '#/ui/boundary';
import Link from 'next/link';

// Simulated docs tree
const docsTree: Record<string, { title: string; content: string }> = {
  'getting-started': {
    title: 'Getting Started',
    content:
      'Welcome to the documentation. This demonstrates catch-all routes with a single segment.',
  },
  'api/users/create': {
    title: 'Create User API',
    content:
      'Learn how to create users via the API. This demonstrates catch-all routes with multiple segments.',
  },
  'api/users/list': {
    title: 'List Users API',
    content: 'Learn how to list users via the API.',
  },
  'guides/authentication': {
    title: 'Authentication Guide',
    content: 'Complete guide to implementing authentication in your app.',
  },
  'guides/deployment/vercel': {
    title: 'Deploy to Vercel',
    content: 'Step-by-step guide to deploying your application to Vercel.',
  },
};

export async function generateStaticParams() {
  return Object.keys(docsTree).map((path) => ({ slug: path.split('/') }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const path = slug.join('/');
  const doc = docsTree[path];

  return { title: doc ? `${doc.title} | Docs` : 'Docs Not Found' };
}

export default async function DocsPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const path = slug.join('/');
  const doc = docsTree[path];

  return (
    <Boundary label="docs/[...slug]/page.tsx" animateRerendering={false}>
      <div className="flex flex-col gap-6">
        {/* Params display */}
        <div className="flex flex-col gap-2 rounded-lg border border-violet-300/50 bg-violet-100/50 p-4 dark:border-violet-900/50 dark:bg-violet-950/20">
          <h3 className="text-sm font-medium text-violet-700 dark:text-violet-400">
            Catch-all: [...slug]
          </h3>
          <pre className="text-xs text-gray-600 dark:text-gray-400">
            <code>params.slug = {JSON.stringify(slug)}</code>
          </pre>
          <p className="text-xs text-gray-600 dark:text-gray-500">
            Segments: {slug.length} • Path: /{path}
          </p>
        </div>

        {/* Breadcrumbs */}
        <nav className="flex flex-wrap items-center gap-2 text-sm">
          <Link
            href="/dynamic-routes"
            className="text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-500 dark:hover:text-gray-300"
          >
            Dynamic Routes
          </Link>
          <span className="text-gray-400 dark:text-gray-700">/</span>
          <Link
            href="/dynamic-routes/docs/getting-started"
            className="text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-500 dark:hover:text-gray-300"
          >
            Docs
          </Link>
          {slug.map((segment, index) => (
            <span key={index} className="flex items-center gap-2">
              <span className="text-gray-400 dark:text-gray-700">/</span>
              <span
                className={
                  index === slug.length - 1
                    ? 'text-gray-900 dark:text-gray-300'
                    : 'text-gray-600 dark:text-gray-500'
                }
              >
                {segment}
              </span>
            </span>
          ))}
        </nav>

        {/* Content */}
        {doc ? (
          <article className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {doc.title}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">{doc.content}</p>
          </article>
        ) : (
          <div className="rounded-lg border border-pink-300/50 bg-pink-100/50 p-6 text-center dark:border-pink-900/50 dark:bg-pink-950/20">
            <h2 className="text-lg font-medium text-pink-700 dark:text-pink-300">
              Documentation Not Found
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              No documentation exists for path: /{path}
            </p>
          </div>
        )}

        {/* Related docs */}
        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Other documentation pages:
          </h3>
          <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
            {Object.entries(docsTree)
              .filter(([p]) => p !== path)
              .slice(0, 4)
              .map(([docPath, docInfo]) => (
                <Link
                  key={docPath}
                  href={`/dynamic-routes/docs/${docPath}`}
                  className="rounded-lg border border-gray-200 bg-gray-100/50 p-3 transition-colors hover:border-gray-300 dark:border-gray-800 dark:bg-gray-900/30 dark:hover:border-gray-700"
                >
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {docInfo.title}
                  </span>
                  <code className="mt-1 block text-xs text-gray-500 dark:text-gray-600">
                    /docs/{docPath}
                  </code>
                </Link>
              ))}
          </div>
        </div>

        {/* Navigation */}
        <Link
          href="/dynamic-routes"
          className="inline-flex w-fit rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          ← Back to Overview
        </Link>
      </div>
    </Boundary>
  );
}
