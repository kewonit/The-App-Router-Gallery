import Link from 'next/link';

export default function PostNotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
      <div className="text-6xl">📝</div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
        Post Not Found
      </h1>
      <p className="max-w-md text-gray-600 dark:text-gray-400">
        The post you're looking for doesn't exist. This is the{' '}
        <code className="rounded bg-gray-200 px-1 py-0.5 text-xs dark:bg-gray-800">
          not-found.tsx
        </code>{' '}
        page triggered by calling{' '}
        <code className="rounded bg-gray-200 px-1 py-0.5 text-xs dark:bg-gray-800">
          notFound()
        </code>{' '}
        in the page component.
      </p>
      <Link
        href="/dynamic-routes"
        className="mt-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-500"
      >
        Back to Dynamic Routes
      </Link>
    </div>
  );
}
