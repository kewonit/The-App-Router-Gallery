'use cache';

import { Boundary } from '#/ui/boundary';
import { products } from './_data/products';
import Image from 'next/image';
import Link from 'next/link';

export default async function Page() {
  return (
    <Boundary label="page.tsx">
      <div className="flex flex-col gap-4">
        <h1 className="text-xl font-medium text-gray-700 dark:text-gray-300">
          Photo Gallery{' '}
          <span className="font-mono tracking-tighter text-gray-500 dark:text-gray-600">
            ({products.length})
          </span>
        </h1>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/intercepting-routes/photo/${product.id}`}
              className="group flex flex-col gap-2.5"
            >
              <div className="overflow-hidden rounded-md bg-gray-100 p-6 group-hover:bg-gray-200 dark:bg-gray-900/50 dark:group-hover:bg-gray-900">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={200}
                  height={200}
                  className="mx-auto"
                />
              </div>
              <div className="flex flex-col gap-2">
                <div className="h-2 w-4/5 rounded-full bg-gray-200 dark:bg-gray-800" />
                <div className="h-2 w-1/3 rounded-full bg-gray-200 dark:bg-gray-800" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Boundary>
  );
}
