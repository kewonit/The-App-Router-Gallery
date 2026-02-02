import Image from 'next/image';
import type { Product } from '../_data/products';

export function PhotoDetails({
  product,
  isModal,
}: {
  product: Product;
  isModal: boolean;
}) {
  return (
    <div
      className={`flex flex-col gap-3 sm:gap-4 ${isModal ? 'p-4 pt-10 sm:p-6 sm:pt-12' : ''}`}
    >
      {/* Image */}
      <div className="relative aspect-video overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-900">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain p-2 sm:p-4"
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* Details */}
      <div className="flex flex-col gap-3">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            {product.name}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-500">
            {product.category}
          </p>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400">
          {product.description}
        </p>

        <div className="flex items-center gap-4">
          <span className="text-lg font-bold text-green-600 dark:text-green-400">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through dark:text-gray-600">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {product.features.map((feature) => (
            <span
              key={feature}
              className="rounded bg-gray-200 px-2 py-1 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-400"
            >
              {feature}
            </span>
          ))}
        </div>

        {/* Mode indicator */}
        <div
          className={`mt-2 rounded-lg p-2.5 text-xs sm:p-3 ${
            isModal
              ? 'border border-cyan-300/50 bg-cyan-100/50 text-cyan-800 dark:border-cyan-900/50 dark:bg-cyan-950/30 dark:text-cyan-300'
              : 'border border-violet-300/50 bg-violet-100/50 text-violet-800 dark:border-violet-900/50 dark:bg-violet-950/30 dark:text-violet-300'
          }`}
        >
          <strong>Render mode:</strong>{' '}
          {isModal ? (
            <>
              This content is displayed in an <strong>intercepted modal</strong>
              . The URL changed but you can still see the gallery behind this
              modal.
            </>
          ) : (
            <>
              This is the <strong>full page</strong> render. You navigated
              directly to this URL (or the page was server-rendered).
            </>
          )}
        </div>
      </div>
    </div>
  );
}
