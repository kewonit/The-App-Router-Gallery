import { notFound } from 'next/navigation';
import db from '#/lib/db';
import { Boundary } from '#/ui/boundary';
import { DemoHeading, EmptyState } from '#/ui/demo-states';
import { ProductCard } from '#/ui/product-card';

export async function generateStaticParams() {
  const sections = db.section.findMany();
  return sections.map(({ slug }) => ({ section: slug }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  'use cache';

  const { section: sectionSlug } = await params;
  const section = db.section.find({ where: { slug: sectionSlug } });
  if (!section) {
    notFound();
  }

  const products = db.product.findMany({ where: { section: section.id } });

  return (
    <Boundary label="(main)/(shop)/[section]/page.tsx (Cached)" color="pink">
      <div className="flex flex-col gap-4">
        <DemoHeading count={products.length}>All</DemoHeading>

        {products.length === 0 ? (
          <EmptyState
            title="No products found"
            description="There are no products in this section."
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
