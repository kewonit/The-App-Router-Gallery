'use cache';

import { notFound } from 'next/navigation';
import db from '#/lib/db';
import { Boundary } from '#/ui/boundary';
import { DemoHeading, EmptyState } from '#/ui/demo-states';
import { ProductCard } from '#/ui/product-card';
import BuggyButton from '#/app/error/_ui/buggy-button';

export async function generateStaticParams() {
  const sections = db.section.findMany();
  return sections.map(({ slug }) => ({ section: slug }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section: sectionSlug } = await params;
  const section = db.section.find({ where: { slug: sectionSlug } });
  if (!section) {
    notFound();
  }

  const products = db.product.findMany({ where: { section: section.id } });

  return (
    <Boundary label="[section]/page.tsx (Cached)" color="pink">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <DemoHeading count={products.length}>All</DemoHeading>

          <div className="flex">
            <BuggyButton />
          </div>
        </div>

        {products.length === 0 ? (
          <EmptyState
            title="No products in this section"
            description="There are no products to display in this section."
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
