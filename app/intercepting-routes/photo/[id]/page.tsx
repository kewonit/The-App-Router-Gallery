import { Boundary } from '#/ui/boundary';
import { PhotoDetails } from '../../_components/photo-details';
import { products } from '../../_data/products';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export async function generateStaticParams() {
  return products.map((product) => ({ id: product.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);

  if (!product) {
    return { title: 'Photo Not Found' };
  }

  return {
    title: `${product.name} | Intercepting Routes`,
    description: product.description,
  };
}

export default async function PhotoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  return (
    <Boundary label="photo/[id]/page.tsx" animateRerendering={false}>
      <div className="flex flex-col gap-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-500">
          <Link
            href="/intercepting-routes"
            className="transition-colors hover:text-gray-900 dark:hover:text-gray-300"
          >
            Gallery
          </Link>
          <span>/</span>
          <span className="text-gray-900 dark:text-gray-300">
            {product.name}
          </span>
        </nav>

        {/* Banner indicating full page */}
        <div className="rounded-lg border border-violet-300/50 bg-violet-100/50 p-4 dark:border-violet-900/50 dark:bg-violet-950/30">
          <div className="flex items-center gap-2">
            <span className="text-2xl">📄</span>
            <div>
              <h2 className="font-medium text-violet-700 dark:text-violet-300">
                Full Page View
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                This is the full page version. When accessed via client
                navigation from the gallery, this route is intercepted and shown
                in a modal instead.
              </p>
            </div>
          </div>
        </div>

        {/* Photo Details */}
        <PhotoDetails product={product} isModal={false} />

        {/* Navigation */}
        <div className="flex justify-center">
          <Link
            href="/intercepting-routes"
            className="rounded-lg bg-gray-800 px-4 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-gray-700"
          >
            ← Back to Gallery
          </Link>
        </div>
      </div>
    </Boundary>
  );
}
