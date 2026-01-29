import Image from 'next/image';

export function BasicImages() {
  const products = [
    { name: 'Top', image: '/shop/top.png' },
    { name: 'Shorts', image: '/shop/shorts.png' },
    { name: 'Shoes', image: '/shop/shoes.png' },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">
          Fixed Width & Height
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-500">
          When dimensions are known, provide explicit width and height to
          prevent layout shift.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {products.map((product) => (
          <div key={product.name} className="flex flex-col gap-2">
            <div className="overflow-hidden rounded-lg bg-gray-100/50 p-4 dark:bg-gray-900/50">
              <Image
                src={product.image}
                alt={product.name}
                width={200}
                height={200}
                className="mx-auto"
                quality={85}
              />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {product.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-600">
                200×200 • quality: 85
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-lg border border-gray-200 bg-gray-100/50 p-3 text-xs text-gray-600 dark:border-gray-800 dark:bg-gray-900/30 dark:text-gray-500">
        <strong className="text-gray-700 dark:text-gray-400">Note:</strong>{' '}
        Images are automatically served in WebP or AVIF format when supported by
        the browser, reducing file size by ~30-50%.
      </div>
    </div>
  );
}
