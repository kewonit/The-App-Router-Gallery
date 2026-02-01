import db from '#/lib/db';
import type { Demo, DemoDifficulty } from '#/app/_internal/_data';
import Link from 'next/link';

const difficultyColors: Record<DemoDifficulty, string> = {
  beginner:
    'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  intermediate:
    'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  advanced: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
};

const difficultyLabels: Record<DemoDifficulty, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
};

function DifficultyBadge({ difficulty }: { difficulty: DemoDifficulty }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${difficultyColors[difficulty]}`}
    >
      {difficultyLabels[difficulty]}
    </span>
  );
}

function EstimatedTime({ minutes }: { minutes: number }) {
  return (
    <span className="text-xs text-gray-400 dark:text-gray-500">
      ~{minutes} min
    </span>
  );
}

function DemoCard({ item }: { item: Demo }) {
  return (
    <Link
      href={`/${item.slug}`}
      key={item.name}
      className="group block space-y-2 rounded-lg border border-gray-200 bg-white px-5 py-4 shadow-sm transition-all hover:border-gray-300 hover:shadow-md dark:border-gray-800 dark:bg-gray-900 dark:hover:border-gray-700 dark:hover:bg-gray-800"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="font-medium text-gray-900 group-hover:text-gray-950 dark:text-gray-200 dark:group-hover:text-gray-50">
          {item.name}
        </div>
        <DifficultyBadge difficulty={item.difficulty} />
      </div>

      {item.description ? (
        <div className="line-clamp-2 text-sm text-gray-600 group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-300">
          {item.description}
        </div>
      ) : null}

      <div className="flex items-center gap-3 pt-1">
        <EstimatedTime minutes={item.estimatedMinutes} />
        {item.prerequisites.length > 0 && (
          <span className="text-xs text-gray-400 dark:text-gray-500">
            • {item.prerequisites.length} prereq
            {item.prerequisites.length > 1 ? 's' : ''}
          </span>
        )}
      </div>
    </Link>
  );
}

export default function Page() {
  const demos = db.demo.findMany();

  // Calculate stats
  const allItems = demos.flatMap((d) => [...d.items]);
  const beginnerCount = allItems.filter(
    (i) => i.difficulty === 'beginner',
  ).length;
  const intermediateCount = allItems.filter(
    (i) => i.difficulty === 'intermediate',
  ).length;
  const advancedCount = allItems.filter(
    (i) => i.difficulty === 'advanced',
  ).length;
  const totalMinutes = allItems.reduce((sum, i) => sum + i.estimatedMinutes, 0);

  return (
    <div className="space-y-10 pb-20">
      <div className="space-y-4">
        <h1 className="text-xl font-medium text-gray-800 dark:text-gray-300">
          The App Router Gallery
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Explore {allItems.length} interactive demos covering Next.js 16
          features. Total learning time: ~{Math.round(totalMinutes / 60)} hours.
        </p>

        <div className="flex flex-wrap gap-4 pt-2">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {beginnerCount} Beginner
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {intermediateCount} Intermediate
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {advancedCount} Advanced
            </span>
          </div>
        </div>
      </div>

      {demos.map((section) => {
        return (
          <div key={section.name} className="space-y-5">
            <div className="font-mono text-xs font-semibold tracking-wide text-gray-500 uppercase dark:text-gray-600">
              {section.name}
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
