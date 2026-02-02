import db from '#/lib/db';
import { Boundary } from '#/ui/boundary';
import { DemoHeading, EmptyState } from '#/ui/demo-states';
import { ProductCard } from '#/ui/product-card';
import { connection } from 'next/server';

export default async function Page() {
  // DEMO:
  // This page would normally be prerendered at build time because it doesn't use dynamic APIs.
  // That means the loading state wouldn't show. To force one:
  // We indicate that we require a user Request before continuing:
  await connection();

  const products = db.product.findMany({ limit: 9 });

  return (
    <Boundary label="page.tsx (Dynamic)" color="violet">
      <div className="flex flex-col gap-4">
        <DemoHeading count={products.length}>All</DemoHeading>

        {products.length === 0 ? (
          <EmptyState
            title="No products found"
            description="There are no products to display at this time."
          />
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </Boundary>
  );
}
