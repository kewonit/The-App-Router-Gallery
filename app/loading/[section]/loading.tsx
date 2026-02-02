import { Boundary } from '#/ui/boundary';
import { DemoHeading } from '#/ui/demo-states';
import { ProductCardSkeleton } from '#/ui/product-card';

export default function Loading() {
  return (
    <Boundary label="loading.tsx (Suspense)" color="blue" pulse>
      <div className="flex flex-col gap-4">
        <DemoHeading>All</DemoHeading>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <ProductCardSkeleton />
          <ProductCardSkeleton />
          <ProductCardSkeleton />
        </div>
      </div>
    </Boundary>
  );
}
