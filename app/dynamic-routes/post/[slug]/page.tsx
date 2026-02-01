import { Boundary } from '#/ui/boundary';
import { notFound } from 'next/navigation';
import Link from 'next/link';

// Simulated posts data
const posts = [
  {
    slug: 'hello-world',
    title: 'Hello World',
    content:
      'This is the first post demonstrating single segment dynamic routes.',
    date: '2024-01-15',
  },
  {
    slug: 'my-first-post',
    title: 'My First Post',
    content:
      'Another example of a single segment dynamic route with a different slug.',
    date: '2024-01-16',
  },
  {
    slug: 'valid-post',
    title: 'Valid Post',
    content:
      'This post exists to demonstrate the difference between valid and invalid routes.',
    date: '2024-01-17',
  },
];

export async function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return { title: 'Post Not Found' };
  }

  return {
    title: `${post.title} | Dynamic Routes`,
    description: post.content.substring(0, 160),
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <Boundary label="post/[slug]/page.tsx" animateRerendering={false}>
      <div className="flex flex-col gap-6">
        {/* Params display */}
        <div className="flex flex-col gap-2 rounded-lg border border-blue-300/50 bg-blue-100/50 p-4 dark:border-blue-900/50 dark:bg-blue-950/20">
          <h3 className="text-sm font-medium text-blue-700 dark:text-blue-400">
            Single Segment: [slug]
          </h3>
          <pre className="text-xs text-gray-600 dark:text-gray-400">
            <code>params.slug = "{slug}"</code>
          </pre>
        </div>

        {/* Post content */}
        <article className="flex flex-col gap-4">
          <header>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {post.title}
            </h1>
            <time className="text-sm text-gray-600 dark:text-gray-500">
              {post.date}
            </time>
          </header>

          <p className="text-gray-600 dark:text-gray-400">{post.content}</p>

          <div className="flex flex-wrap gap-2">
            <span className="rounded bg-gray-200 px-2 py-1 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-400">
              Slug: {slug}
            </span>
            <span className="rounded bg-blue-100 px-2 py-1 text-xs text-blue-700 dark:bg-blue-900/50 dark:text-blue-300">
              Type: Single Segment [slug]
            </span>
          </div>
        </article>

        {/* Navigation */}
        <div className="flex flex-wrap gap-3">
          <Link
            href="/dynamic-routes"
            className="rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            ← Back to Overview
          </Link>
          {posts
            .filter((p) => p.slug !== slug)
            .slice(0, 2)
            .map((p) => (
              <Link
                key={p.slug}
                href={`/dynamic-routes/post/${p.slug}`}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-600 transition-colors hover:border-gray-400 hover:text-gray-900 dark:border-gray-800 dark:text-gray-400 dark:hover:border-gray-700 dark:hover:text-gray-300"
              >
                {p.title}
              </Link>
            ))}
        </div>
      </div>
    </Boundary>
  );
}
