import db from '#/lib/db';
import { Boundary } from '#/ui/boundary';
import { DemoHeading, EmptyState } from '#/ui/demo-states';
import { ProductCard } from '#/ui/product-card';

export default async function Page() {
  return (
    <Boundary label="page.tsx (Static)" color="cyan">
      <ProductList />
    </Boundary>
  );
}

async function ProductList() {
  'use cache';

  // DEMO: Add a delay to simulate a slow data request
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const products = db.product.findMany({ limit: 9 });

  return (
    <Boundary label="<ProductList> (Cached)" size="small" color="pink">
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
              <ProductCard
                key={product.id}
                product={product}
                animateEnter={true}
              />
            ))}
          </div>
        )}
      </div>
    </Boundary>
  );
}
