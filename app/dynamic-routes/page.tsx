import { Boundary } from '#/ui/boundary';
import Link from 'next/link';

const routeTypes = [
  {
    name: 'Single Segment',
    folder: '[slug]',
    description: 'Matches a single path segment',
    examples: [
      {
        path: '/dynamic-routes/post/hello-world',
        params: { slug: 'hello-world' },
      },
      {
        path: '/dynamic-routes/post/my-first-post',
        params: { slug: 'my-first-post' },
      },
    ],
    color: 'blue' as const,
  },
  {
    name: 'Catch-all',
    folder: '[...slug]',
    description: 'Matches one or more segments (required)',
    examples: [
      {
        path: '/dynamic-routes/docs/getting-started',
        params: { slug: ['getting-started'] },
      },
      {
        path: '/dynamic-routes/docs/api/users/create',
        params: { slug: ['api', 'users', 'create'] },
      },
    ],
    color: 'violet' as const,
  },
  {
    name: 'Optional Catch-all',
    folder: '[[...slug]]',
    description: 'Matches zero or more segments (optional)',
    examples: [
      { path: '/dynamic-routes/shop', params: { slug: undefined } },
      {
        path: '/dynamic-routes/shop/electronics',
        params: { slug: ['electronics'] },
      },
      {
        path: '/dynamic-routes/shop/electronics/phones/iphone',
        params: { slug: ['electronics', 'phones', 'iphone'] },
      },
    ],
    color: 'orange' as const,
  },
];

export default function Page() {
  return (
    <Boundary label="page.tsx" animateRerendering={false}>
      <div className="flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold text-gray-100">
            Dynamic Routes
          </h1>
          <p className="text-sm text-gray-400">
            Dynamic routes allow you to create pages from dynamic data using
            special folder naming conventions with square brackets.
          </p>
        </div>

        {/* Route Types */}
        {routeTypes.map((type) => (
          <Boundary
            key={type.name}
            label={`${type.name}: ${type.folder}`}
            size="small"
            color={type.color}
            animateRerendering={false}
          >
            <div className="flex flex-col gap-4">
              <p className="text-sm text-gray-400">{type.description}</p>

              <div className="flex flex-col gap-2">
                <h4 className="text-sm font-medium text-gray-300">
                  Try these examples:
                </h4>
                <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
                  {type.examples.map((example) => (
                    <Link
                      key={example.path}
                      href={example.path}
                      className="group flex flex-col gap-1 rounded-lg border border-gray-800 bg-gray-900/30 p-3 transition-all hover:border-gray-700 hover:bg-gray-900/50"
                    >
                      <code className="text-xs text-blue-400 group-hover:text-blue-300">
                        {example.path}
                      </code>
                      <code className="text-xs text-gray-600">
                        params: {JSON.stringify(example.params)}
                      </code>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </Boundary>
        ))}

        {/* Static Params */}
        <Boundary
          label="generateStaticParams"
          size="small"
          color="cyan"
          animateRerendering={false}
        >
          <div className="flex flex-col gap-4">
            <p className="text-sm text-gray-400">
              Use{' '}
              <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-green-400">
                generateStaticParams
              </code>{' '}
              to pre-render dynamic routes at build time.
            </p>

            <pre className="overflow-auto rounded-lg bg-gray-900/50 p-4 text-xs">
              <code className="text-gray-300">{`export async function generateStaticParams() {
  const posts = await getPosts();
  
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// For catch-all routes:
export async function generateStaticParams() {
  const docs = await getDocs();
  
  return docs.map((doc) => ({
    slug: doc.path.split('/'),
  }));
}`}</code>
            </pre>

            <div className="rounded-lg border border-green-900/50 bg-green-950/20 p-3 text-xs text-gray-400">
              <strong className="text-green-400">Tip:</strong> When
              generateStaticParams is used with dynamic routes, pages are
              statically generated at build time, improving performance.
            </div>
          </div>
        </Boundary>

        {/* Not Found Handling */}
        <Boundary
          label="Not Found Handling"
          size="small"
          color="pink"
          animateRerendering={false}
        >
          <div className="flex flex-col gap-4">
            <p className="text-sm text-gray-400">
              Handle invalid routes gracefully using the{' '}
              <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs">
                notFound()
              </code>{' '}
              function.
            </p>

            <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
              <Link
                href="/dynamic-routes/post/valid-post"
                className="rounded-lg border border-gray-800 bg-gray-900/30 p-3 transition-colors hover:border-gray-700"
              >
                <span className="text-sm font-medium text-gray-300">
                  ✓ Valid Route
                </span>
                <code className="mt-1 block text-xs text-gray-600">
                  /post/valid-post
                </code>
              </Link>

              <Link
                href="/dynamic-routes/post/this-does-not-exist-abc123"
                className="rounded-lg border border-pink-900/50 bg-pink-950/20 p-3 transition-colors hover:border-pink-800"
              >
                <span className="text-sm font-medium text-pink-300">
                  ✗ Invalid Route (triggers notFound)
                </span>
                <code className="mt-1 block text-xs text-gray-600">
                  /post/this-does-not-exist-abc123
                </code>
              </Link>
            </div>
          </div>
        </Boundary>
      </div>
    </Boundary>
  );
}
