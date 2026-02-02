'use cache';

import { notFound } from 'next/navigation';
import db from '#/lib/db';
import { Boundary } from '#/ui/boundary';
import { ProductCard } from '#/ui/product-card';
import { DemoHeading, EmptyState } from '#/ui/demo-states';

export async function generateStaticParams() {
  const categories = db.category.findMany();
  return categories.map(({ section, slug }) => ({ section, category: slug }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ section: string; category: string }>;
}) {
  const { category: categorySlug } = await params;
  const category = db.category.find({ where: { slug: categorySlug } });
  if (!category) {
    notFound();
  }

  const products = db.product.findMany({ where: { category: category.id } });

  return (
    <Boundary label="[section]/[category]/page.tsx (Cached)" color="pink">
      <div className="flex flex-col gap-4">
        <DemoHeading>All</DemoHeading>

        {products.length === 0 ? (
          <EmptyState
            title="No products"
            description="No products found in this category."
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
