import { notFound } from 'next/navigation';
import db from '#/lib/db';
import { Boundary } from '#/ui/boundary';
import { ProductCard } from '#/ui/product-card';
import { DemoHeading, EmptyState } from '#/ui/demo-states';
import { connection } from 'next/server';

export default async function Page({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  // DEMO:
  // This page would normally be prerendered at build time because it doesn't use dynamic APIs.
  // That means the loading state wouldn't show. To force one:
  // We indicate that we require a user Request before continuing:
  await connection();

  const { section: sectionSlug } = await params;
  const section = db.section.find({ where: { slug: sectionSlug } });
  if (!section) {
    notFound();
  }

  const products = db.product.findMany({ where: { section: section.id } });

  return (
    <Boundary label="[section]/page.tsx (Dynamic)" color="violet">
      <div className="flex flex-col gap-4">
        <DemoHeading>All</DemoHeading>

        {products.length === 0 ? (
          <EmptyState
            title="No products"
            description="No products found in this section."
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
