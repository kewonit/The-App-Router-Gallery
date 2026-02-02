import db from '#/lib/db';
import { SkeletonCard } from '#/ui/skeleton-card';
import { DemoHeading } from '#/ui/demo-states';
import { notFound } from 'next/navigation';

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

  return (
    <div className="space-y-4">
      <DemoHeading>All {section.name}</DemoHeading>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {Array.from({ length: 9 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
}
