import { Boundary } from '#/ui/boundary';
import Link from 'next/link';

// Simulated category/product tree
const categories: Record<string, { name: string; items: string[] }> = {
  electronics: { name: 'Electronics', items: ['phones', 'laptops', 'tablets'] },
  sports: { name: 'Sports', items: ['running', 'fitness', 'outdoor'] },
  apparel: { name: 'Apparel', items: ['tops', 'bottoms', 'accessories'] },
};

// Generate static params for known paths
export function generateStaticParams() {
  const params: { slug?: string[] }[] = [
    { slug: undefined }, // /shop
  ];

  // Add category paths
  for (const key of Object.keys(categories)) {
    params.push({ slug: [key] });
    // Add subcategory paths
    for (const item of categories[key]!.items) {
      params.push({ slug: [key, item] });
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params;

  if (!slug || slug.length === 0) {
    return { title: 'Shop | Dynamic Routes' };
  }

  return { title: `Shop: ${slug.join(' > ')} | Dynamic Routes` };
}

export default async function ShopPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params;
  const segments = slug || [];

  return (
    <Boundary label="shop/[[...slug]]/page.tsx" animateRerendering={false}>
      <div className="flex flex-col gap-6">
        {/* Params display */}
        <div className="flex flex-col gap-2 rounded-lg border border-orange-900/50 bg-orange-950/20 p-4">
          <h3 className="text-sm font-medium text-orange-400">
            Optional Catch-all: [[...slug]]
          </h3>
          <pre className="text-xs text-gray-400">
            <code>
              params.slug ={' '}
              {segments.length === 0 ? 'undefined' : JSON.stringify(segments)}
            </code>
          </pre>
          <p className="text-xs text-gray-500">
            {segments.length === 0
              ? 'No segments - showing all categories'
              : `Segments: ${segments.length}`}
          </p>
        </div>

        {/* Breadcrumbs */}
        <nav className="flex flex-wrap items-center gap-2 text-sm">
          <Link
            href="/dynamic-routes"
            className="text-gray-500 transition-colors hover:text-gray-300"
          >
            Dynamic Routes
          </Link>
          <span className="text-gray-700">/</span>
          <Link
            href="/dynamic-routes/shop"
            className={
              segments.length === 0
                ? 'text-gray-300'
                : 'text-gray-500 transition-colors hover:text-gray-300'
            }
          >
            Shop
          </Link>
          {segments.map((segment, index) => (
            <span key={index} className="flex items-center gap-2">
              <span className="text-gray-700">/</span>
              <Link
                href={`/dynamic-routes/shop/${segments.slice(0, index + 1).join('/')}`}
                className={
                  index === segments.length - 1
                    ? 'text-gray-300'
                    : 'text-gray-500 transition-colors hover:text-gray-300'
                }
              >
                {segment}
              </Link>
            </span>
          ))}
        </nav>

        {/* Content based on depth */}
        {segments.length === 0 ? (
          <ShopHome />
        ) : segments.length === 1 ? (
          <CategoryView category={segments[0]!} />
        ) : (
          <ProductView segments={segments} />
        )}

        {/* Navigation */}
        <Link
          href="/dynamic-routes"
          className="inline-flex w-fit rounded-lg bg-gray-800 px-4 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-gray-700"
        >
          ← Back to Overview
        </Link>
      </div>
    </Boundary>
  );
}

function ShopHome() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold text-gray-100">Shop</h1>
      <p className="text-sm text-gray-400">
        This is the shop home page, matching{' '}
        <code className="rounded bg-gray-800 px-1 py-0.5 text-xs">
          /dynamic-routes/shop
        </code>{' '}
        with no additional segments.
      </p>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {Object.entries(categories).map(([key, category]) => (
          <Link
            key={key}
            href={`/dynamic-routes/shop/${key}`}
            className="group rounded-lg border border-gray-800 bg-gray-900/30 p-4 transition-colors hover:border-gray-700"
          >
            <h3 className="font-medium text-gray-300 group-hover:text-white">
              {category.name}
            </h3>
            <p className="mt-1 text-xs text-gray-600">
              {category.items.length} subcategories
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

function CategoryView({ category }: { category: string }) {
  const cat = categories[category];

  if (!cat) {
    return (
      <div className="rounded-lg border border-pink-900/50 bg-pink-950/20 p-6 text-center">
        <h2 className="text-lg font-medium text-pink-300">
          Category Not Found
        </h2>
        <p className="mt-2 text-sm text-gray-400">
          No category exists for: {category}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold text-gray-100">{cat.name}</h1>
      <p className="text-sm text-gray-400">
        Category page with one segment:{' '}
        <code className="rounded bg-gray-800 px-1 py-0.5 text-xs">
          /dynamic-routes/shop/{category}
        </code>
      </p>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {cat.items.map((item) => (
          <Link
            key={item}
            href={`/dynamic-routes/shop/${category}/${item}`}
            className="group rounded-lg border border-gray-800 bg-gray-900/30 p-3 transition-colors hover:border-gray-700"
          >
            <span className="text-sm font-medium text-gray-300 capitalize group-hover:text-white">
              {item}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

function ProductView({ segments }: { segments: string[] }) {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold text-gray-100 capitalize">
        {segments[segments.length - 1]}
      </h1>
      <p className="text-sm text-gray-400">
        Deep nested page with {segments.length} segments:{' '}
        <code className="rounded bg-gray-800 px-1 py-0.5 text-xs">
          /dynamic-routes/shop/{segments.join('/')}
        </code>
      </p>

      <div className="rounded-lg border border-green-900/50 bg-green-950/20 p-4">
        <h3 className="text-sm font-medium text-green-400">Path Breakdown</h3>
        <ul className="mt-2 flex flex-col gap-1">
          {segments.map((segment, index) => (
            <li key={index} className="flex items-center gap-2 text-xs">
              <span className="flex size-5 items-center justify-center rounded-full bg-gray-800 text-gray-400">
                {index + 1}
              </span>
              <span className="text-gray-300 capitalize">{segment}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
