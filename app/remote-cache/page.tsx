import { Suspense } from 'react';
import db from '#/lib/db';
import { Boundary } from '#/ui/boundary';
import { DemoHeading, EmptyState } from '#/ui/demo-states';
import { ProductCard } from '#/ui/product-card';
import { cacheTag } from 'next/cache';
import { connection } from 'next/server';

export default async function Page() {
  return (
    <Boundary label="page.tsx (Static)" color="cyan" animateRerendering={false}>
      <ProductList />
    </Boundary>
  );
}

async function ProductList() {
  // DEMO: Call the cached data function
  const products = await getData();

  return (
    <Boundary
      label="<ProductList> (Cached)"
      size="small"
      color="pink"
      animateRerendering={false}
    >
      <div className="flex flex-col gap-4">
        <DemoHeading count={products.length}>All</DemoHeading>

        {products.length === 0 ? (
          <EmptyState
            title="No products found"
            description="There are no products to display at this time."
          />
        ) : (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {products.map((product) => (
              <div key={product.id} className="flex flex-col gap-3">
                <ProductCard product={product} animateEnter={true} />
                <Suspense fallback={<ProductPriceSkeleton />}>
                  <ProductPrice productId={product.id} />
                </Suspense>
              </div>
            ))}
          </div>
        )}
      </div>
    </Boundary>
  );
}

async function getData() {
  'use cache';
  cacheTag('products');

  // DEMO: Add a delay to simulate a slow data request
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const products = await db.product.findMany({ limit: 9 });

  // We tag this cache entry with each of the returned products so that if any
  // of the products are updated, this will invalidate the cache entry for the
  // entire list of products.
  for (const product of products) {
    cacheTag(`product-${product.id}`);
  }

  return products;
}

async function ProductPrice({ productId }: { productId: string }) {
  // DEMO: Ensure this component is never cached in the static shell
  // by requiring a connection. This makes it dynamic.
  await connection();

  // DEMO: Since we're accessing this after connection() (dynamic context),
  // using "use cache" would NOT cache at all. We need "use cache: remote"
  // to cache at runtime with a remote cache.
  const price = await getProductPrice(productId);

  return (
    <Boundary label="<ProductPrice> (Cached)" size="small" color="pink">
      <div className="text-center text-sm">
        <span className="text-gray-400">Price: </span>
        <span className="font-semibold text-green-400">${price}</span>
      </div>
    </Boundary>
  );
}

function ProductPriceSkeleton() {
  return (
    <Boundary
      label="<ProductPrice> (Remote Cacheable)"
      size="small"
      color="blue"
      animateRerendering={false}
    >
      <div className="text-center text-sm">
        <div className="inline-block h-4 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
      </div>
    </Boundary>
  );
}

async function getProductPrice(productId: string) {
  'use cache: remote';

  // We tag this cache entry with the product ID so that if the product is
  // updated, this will invalidate the cache entry for this product. We also
  // add a specific tag for the product price so that if only the price is
  // updated, this will invalidate the cache entry for this product price, not
  // the entire product.
  cacheTag(`product-price-${productId}`, `product-${productId}`);

  // DEMO: Add a delay to simulate a database query
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // DEMO: Query the database for the product price
  const product = db.product.find({ where: { id: productId } });

  if (!product) {
    throw new Error(`Product not found: ${productId}`);
  }

  return product.price;
}
