'use cache';

import db from '#/lib/db';
import { Boundary } from '#/ui/boundary';
import { DemoHeading, EmptyState } from '#/ui/demo-states';
import { ProductCard } from '#/ui/product-card';
import BuggyButton from '#/app/error/_ui/buggy-button';

export default async function Page() {
  const products = db.product.findMany({ limit: 9 });

  return (
    <Boundary label="page.tsx (Cached)" color="pink">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <DemoHeading count={products.length}>All</DemoHeading>

          <div className="flex">
            <BuggyButton />
          </div>
        </div>

        {products.length === 0 ? (
          <EmptyState
            title="No products found"
            description="There are no products to display at this time."
          />
        ) : (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </Boundary>
  );
}
