import ContextClickCounter from '#/app/context/context-click-counter';
import db from '#/lib/db';
import { Boundary } from '#/ui/boundary';
import { DemoHeading, EmptyState } from '#/ui/demo-states';
import { ProductCard } from '#/ui/product-card';

export default function Page() {
  const products = db.product.findMany({ limit: 9 });

  return (
    <Boundary label="page.tsx (Server)">
      <div className="flex flex-col gap-4">
        <DemoHeading count={products.length}>All</DemoHeading>

        <ContextClickCounter />

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
