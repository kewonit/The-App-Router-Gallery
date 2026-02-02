import { notFound } from 'next/navigation';
import { connection } from 'next/server';
import { Boundary } from '#/ui/boundary';
import { ProductCard } from '#/ui/product-card';
import { DemoHeading, EmptyState } from '#/ui/demo-states';
import db from '#/lib/db';

export default async function Page({
  params,
}: {
  params: Promise<{ section: string; category: string }>;
}) {
  // DEMO:
  // This page would normally be prerendered at build time because it doesn't use dynamic APIs.
  // That means the loading state wouldn't show. To force one:
  // 1. We indicate that we require a user Request before continuing:
  await connection();
  // 2. Add an artificial delay to make the loading state more noticeable:
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const { category: categorySlug } = await params;
  const category = db.category.find({ where: { slug: categorySlug } });

  if (!category) {
    notFound();
  }

  const products = db.product.findMany({ where: { category: category.id } });

  return (
    <Boundary label="[section]/[category]/page.tsx (Dynamic)" color="violet">
      <div className="flex flex-col gap-4">
        <DemoHeading>All</DemoHeading>

        {products.length === 0 ? (
          <EmptyState
            title="No products"
            description="No products found in this category."
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
