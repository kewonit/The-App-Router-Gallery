import Image from 'next/image';

export function ResponsiveImages() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-medium text-gray-200">
          Responsive with sizes Attribute
        </h3>
        <p className="text-sm text-gray-500">
          The{' '}
          <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs">
            sizes
          </code>{' '}
          prop tells the browser which image size to download based on viewport
          width.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Example 1: Full width on mobile, half on desktop */}
        <div className="flex flex-col gap-2">
          <div className="overflow-hidden rounded-lg bg-gray-900/50">
            <Image
              src="/shop/laptop.png"
              alt="Laptop"
              width={600}
              height={400}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="w-full"
              quality={80}
            />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-300">Dynamic Width</p>
            <code className="text-xs text-gray-600">
              sizes="(max-width: 1024px) 100vw, 50vw"
            </code>
          </div>
        </div>

        {/* Example 2: Third width on large screens */}
        <div className="flex flex-col gap-2">
          <div className="overflow-hidden rounded-lg bg-gray-900/50">
            <Image
              src="/shop/tablet.png"
              alt="Tablet"
              width={600}
              height={400}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="w-full"
              quality={80}
            />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-300">
              Three Breakpoints
            </p>
            <code className="text-xs text-gray-600">
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            </code>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 rounded-lg border border-gray-800 bg-gray-900/30 p-3">
        <h4 className="text-sm font-medium text-gray-300">Why use sizes?</h4>
        <ul className="flex flex-col gap-1 text-xs text-gray-500">
          <li className="flex items-center gap-2">
            <span className="size-1 rounded-full bg-cyan-500" />
            Browser downloads appropriately sized image for the viewport
          </li>
          <li className="flex items-center gap-2">
            <span className="size-1 rounded-full bg-cyan-500" />
            Prevents downloading oversized images on mobile devices
          </li>
          <li className="flex items-center gap-2">
            <span className="size-1 rounded-full bg-cyan-500" />
            Uses srcset under the hood for automatic resolution switching
          </li>
        </ul>
      </div>
    </div>
  );
}
