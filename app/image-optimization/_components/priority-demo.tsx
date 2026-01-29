import Image from 'next/image';

export function PriorityDemo() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-medium text-gray-200">
          Priority Loading (LCP Optimization)
        </h3>
        <p className="text-sm text-gray-500">
          Use{' '}
          <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs">
            priority
          </code>{' '}
          for above-the-fold images to improve Largest Contentful Paint (LCP).
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Priority Image */}
        <div className="flex flex-col gap-2">
          <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-pink-900/30 to-purple-900/30">
            <Image
              src="/shop/gloves.png"
              alt="Priority loaded image"
              width={400}
              height={300}
              priority
              className="mx-auto"
              quality={90}
            />
            <div className="absolute top-2 left-2 rounded bg-pink-600 px-2 py-1 text-xs font-medium text-white">
              priority
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-300">
              With <code className="text-pink-400">priority</code>
            </p>
            <ul className="mt-1 text-xs text-gray-500">
              <li>• Preloads image in head</li>
              <li>• Disables lazy loading</li>
              <li>• Fetches immediately</li>
            </ul>
          </div>
        </div>

        {/* Normal Image */}
        <div className="flex flex-col gap-2">
          <div className="relative overflow-hidden rounded-lg bg-gray-900/50">
            <Image
              src="/shop/balls.png"
              alt="Lazy loaded image"
              width={400}
              height={300}
              className="mx-auto"
              quality={90}
            />
            <div className="absolute top-2 left-2 rounded bg-gray-700 px-2 py-1 text-xs font-medium text-gray-300">
              lazy (default)
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-300">
              Without priority
            </p>
            <ul className="mt-1 text-xs text-gray-500">
              <li>• Lazy loads by default</li>
              <li>• Loads when near viewport</li>
              <li>• Better for below-the-fold</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 rounded-lg border border-pink-900/50 bg-pink-950/20 p-3">
        <h4 className="text-sm font-medium text-pink-400">
          When to use priority
        </h4>
        <div className="grid grid-cols-1 gap-2 text-xs text-gray-400 lg:grid-cols-2">
          <div>
            <strong className="text-gray-300">✓ Use priority for:</strong>
            <ul className="mt-1 list-inside list-disc">
              <li>Hero images</li>
              <li>Above-the-fold content</li>
              <li>LCP (Largest Contentful Paint) images</li>
            </ul>
          </div>
          <div>
            <strong className="text-gray-300">✗ Don't use priority for:</strong>
            <ul className="mt-1 list-inside list-disc">
              <li>Images below the fold</li>
              <li>Carousel/gallery images</li>
              <li>Thumbnail grids</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
