import db from '#/lib/db';
import { SkeletonCard } from '#/ui/skeleton-card';
import { DemoHeading } from '#/ui/demo-states';
import { notFound } from 'next/navigation';

export default async function Page({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: categorySlug } = await params;
  const category = db.category.find({ where: { slug: categorySlug } });
  if (!category) {
    notFound();
  }

  return (
    <div className="space-y-4">
      <DemoHeading>{category.name}</DemoHeading>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 10 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
}
