'use cache';

import { Boundary } from '#/ui/boundary';
import { DemoHeading, EmptyState } from '#/ui/demo-states';
import { products } from './_data/products';
import Image from 'next/image';
import Link from 'next/link';

export default async function Page() {
  return (
    <Boundary label="page.tsx (Cached)" color="pink">
      <div className="flex flex-col gap-4">
        <DemoHeading count={products.length}>Photo Gallery</DemoHeading>

        {products.length === 0 ? (
          <EmptyState
            title="No photos found"
            description="There are no photos to display at this time."
          />
        ) : (
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
        )}
      </div>
    </Boundary>
  );
}
