import Image from 'next/image';
import Link from 'next/link';
import { products } from '../_data/products';

export function ProductGrid() {
  return (
    <div className="flex flex-col gap-3 sm:gap-4">
      <p className="text-sm text-gray-600 dark:text-gray-500">
        Click any product to open it in a modal (intercepted route):
      </p>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/intercepting-routes/photo/${product.id}`}
            className="group flex flex-col gap-2 rounded-lg border border-gray-200 bg-gray-100/50 p-2.5 transition-all hover:border-gray-300 hover:bg-gray-100 sm:p-3 dark:border-gray-800 dark:bg-gray-900/30 dark:hover:border-gray-700 dark:hover:bg-gray-900/50"
          >
            <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-900">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain p-1.5 transition-transform group-hover:scale-105 sm:p-2"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
            </div>
            <div className="flex flex-col gap-0.5">
              <h3 className="text-sm font-medium text-gray-700 group-hover:text-gray-900 dark:text-gray-300 dark:group-hover:text-white">
                {product.name}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-600">
                {product.category}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <p className="text-xs text-gray-500 dark:text-gray-600">
        Hint: Try right-clicking a product and opening in a new tab to see the
        full page version.
      </p>
    </div>
  );
}
