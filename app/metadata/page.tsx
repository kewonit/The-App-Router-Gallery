'use client';

import { useState } from 'react';
import { Boundary } from '#/ui/boundary';

type MetadataExample = {
  title: string;
  description: string;
  path: string;
  metadata: {
    title: string;
    description: string;
    openGraph?: { title: string; description: string; images?: string[] };
    robots?: string;
  };
};

const examples: MetadataExample[] = [
  {
    title: 'Static Metadata',
    description: 'Simple static export at build time',
    path: '/about',
    metadata: {
      title: 'About Us',
      description: 'Learn more about our company and mission.',
      openGraph: {
        title: 'About Us | My App',
        description: 'Learn more about our company and mission.',
        images: ['/og/about.png'],
      },
    },
  },
  {
    title: 'Dynamic Metadata',
    description: 'Generated from route params or fetched data',
    path: '/blog/hello-world',
    metadata: {
      title: 'Hello World - Blog',
      description: 'My first blog post introducing the new features...',
      openGraph: {
        title: 'Hello World - Blog',
        description: 'My first blog post introducing the new features...',
        images: ['/api/og?title=Hello+World'],
      },
    },
  },
  {
    title: 'Merged Metadata',
    description: 'Child metadata extends parent metadata',
    path: '/dashboard/settings',
    metadata: {
      title: 'Settings | Dashboard | My App',
      description: 'Manage your account settings and preferences.',
      robots: 'noindex, nofollow',
    },
  },
];

export default function Page() {
  const [activeExample, setActiveExample] = useState(0);
  const current = examples[activeExample];

  return (
    <div className="space-y-6">
      {/* Example Selector */}
      <Boundary label="Select Metadata Example">
        <div className="flex flex-wrap gap-2">
          {examples.map((example, index) => (
            <button
              key={example.title}
              onClick={() => setActiveExample(index)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                activeExample === index
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              {example.title}
            </button>
          ))}
        </div>
      </Boundary>

      {/* Current Example Display */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Code Example */}
        <Boundary label="Code Pattern" color="cyan">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                {current.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {current.description}
              </p>
            </div>

            <div className="rounded-lg bg-gray-900 p-4 font-mono text-sm">
              <pre className="overflow-x-auto text-gray-300">
                {activeExample === 0
                  ? `// Static metadata export
export const metadata = {
  title: '${current.metadata.title}',
  description: '${current.metadata.description}',
  openGraph: {
    title: '${current.metadata.openGraph?.title}',
    images: ['${current.metadata.openGraph?.images?.[0]}'],
  },
};`
                  : activeExample === 1
                    ? `// Dynamic metadata function
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      images: [\`/api/og?title=\${post.title}\`],
    },
  };
}`
                    : `// Parent layout.tsx
export const metadata = {
  title: {
    template: '%s | Dashboard | My App',
    default: 'Dashboard',
  },
};

// Child page.tsx
export const metadata = {
  title: 'Settings', // Becomes: Settings | Dashboard | My App
  robots: 'noindex, nofollow',
};`}
              </pre>
            </div>
          </div>
        </Boundary>

        {/* Generated Output */}
        <Boundary label="Generated HTML Head" color="pink">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                Output
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Path: <code className="text-blue-600">{current.path}</code>
              </p>
            </div>

            <div className="space-y-3 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
              <div>
                <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
                  Title Tag
                </span>
                <p className="mt-1 text-gray-900 dark:text-gray-100">
                  &lt;title&gt;{current.metadata.title}&lt;/title&gt;
                </p>
              </div>

              <div>
                <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
                  Meta Description
                </span>
                <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                  &lt;meta name=&quot;description&quot; content=&quot;
                  {current.metadata.description}&quot; /&gt;
                </p>
              </div>

              {current.metadata.openGraph && (
                <div>
                  <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
                    Open Graph
                  </span>
                  <div className="mt-1 space-y-1 text-sm text-gray-700 dark:text-gray-300">
                    <p>
                      &lt;meta property=&quot;og:title&quot; content=&quot;
                      {current.metadata.openGraph.title}&quot; /&gt;
                    </p>
                    {current.metadata.openGraph.images?.[0] && (
                      <p>
                        &lt;meta property=&quot;og:image&quot; content=&quot;
                        {current.metadata.openGraph.images[0]}&quot; /&gt;
                      </p>
                    )}
                  </div>
                </div>
              )}

              {current.metadata.robots && (
                <div>
                  <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
                    Robots
                  </span>
                  <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                    &lt;meta name=&quot;robots&quot; content=&quot;
                    {current.metadata.robots}&quot; /&gt;
                  </p>
                </div>
              )}
            </div>
          </div>
        </Boundary>
      </div>

      {/* Dynamic OG Image Preview */}
      <Boundary label="Dynamic OG Image Generation">
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">
              Open Graph Image API
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Generate social images dynamically using{' '}
              <code className="text-blue-600">@vercel/og</code>
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
              <p className="mb-2 text-xs font-medium text-gray-500 uppercase">
                API Endpoint
              </p>
              <code className="text-sm text-blue-600">
                /api/og?title=Your+Page+Title
              </code>
            </div>

            <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="aspect-[1.91/1] bg-gradient-to-br from-gray-900 to-gray-800 p-6">
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <p className="text-lg font-bold text-white">
                    {current.metadata.title}
                  </p>
                  <p className="mt-2 text-sm text-gray-400">
                    The App Router Gallery
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Boundary>

      {/* Metadata Fields Reference */}
      <Boundary label="Common Metadata Fields">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="py-2 pr-4 text-left font-medium text-gray-900 dark:text-gray-100">
                  Field
                </th>
                <th className="py-2 pr-4 text-left font-medium text-gray-900 dark:text-gray-100">
                  HTML Output
                </th>
                <th className="py-2 text-left font-medium text-gray-900 dark:text-gray-100">
                  Purpose
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              <tr>
                <td className="py-2 pr-4 font-mono text-blue-600">title</td>
                <td className="py-2 pr-4 text-gray-600 dark:text-gray-400">
                  &lt;title&gt;
                </td>
                <td className="py-2 text-gray-600 dark:text-gray-400">
                  Browser tab title
                </td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-mono text-blue-600">
                  description
                </td>
                <td className="py-2 pr-4 text-gray-600 dark:text-gray-400">
                  &lt;meta name=&quot;description&quot;&gt;
                </td>
                <td className="py-2 text-gray-600 dark:text-gray-400">
                  Search engine snippet
                </td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-mono text-blue-600">openGraph</td>
                <td className="py-2 pr-4 text-gray-600 dark:text-gray-400">
                  &lt;meta property=&quot;og:*&quot;&gt;
                </td>
                <td className="py-2 text-gray-600 dark:text-gray-400">
                  Social sharing cards
                </td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-mono text-blue-600">robots</td>
                <td className="py-2 pr-4 text-gray-600 dark:text-gray-400">
                  &lt;meta name=&quot;robots&quot;&gt;
                </td>
                <td className="py-2 text-gray-600 dark:text-gray-400">
                  Crawler instructions
                </td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-mono text-blue-600">icons</td>
                <td className="py-2 pr-4 text-gray-600 dark:text-gray-400">
                  &lt;link rel=&quot;icon&quot;&gt;
                </td>
                <td className="py-2 text-gray-600 dark:text-gray-400">
                  Favicon and app icons
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Boundary>
    </div>
  );
}
