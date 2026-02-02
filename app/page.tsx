import db from '#/lib/db';
import type { Demo } from '#/app/_internal/_data';
import Link from 'next/link';

function DemoCard({ item }: { item: Demo }) {
  return (
    <Link
      href={`/${item.slug}`}
      className="group relative block space-y-2 overflow-hidden rounded-lg border border-gray-200 bg-white px-5 py-4 shadow-sm transition-colors hover:border-gray-300 hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-gray-700 dark:hover:bg-gray-800/80"
    >
      <div className="font-medium text-gray-900 dark:text-gray-200">
        {item.name}
      </div>

      {item.description ? (
        <div className="line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
          {item.description}
        </div>
      ) : null}
    </Link>
  );
}

export default function Page() {
  const demos = db.demo.findMany();

  // Calculate stats
  const allItems = demos.flatMap((d) => [...d.items]);
  const totalMinutes = allItems.reduce((sum, i) => sum + i.estimatedMinutes, 0);

  return (
    <div className="space-y-10 pb-20">
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
          The App Router Gallery
        </h1>
        <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
          Explore {allItems.length} interactive demos covering Next.js 16
          features. Total learning time: ~{Math.round(totalMinutes / 60)} hours.
        </p>
      </div>

      {demos.map((section) => {
        return (
          <div key={section.name} className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-linear-to-r from-gray-200 to-transparent dark:from-gray-800" />
              <span className="font-mono text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-500">
                {section.name}
              </span>
              <div className="h-px flex-1 bg-linear-to-l from-gray-200 to-transparent dark:from-gray-800" />
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {section.items.map((item) => (
                <DemoCard key={item.slug} item={item} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
