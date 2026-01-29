import { Boundary } from '#/ui/boundary';
import { ProductGrid } from './_components/product-grid';
import Link from 'next/link';

export default function Page() {
  return (
    <Boundary label="page.tsx" animateRerendering={false}>
      <div className="flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold text-gray-100">
            Intercepting Routes
          </h1>
          <p className="text-sm text-gray-400">
            Intercepting routes allow you to show a route within a different
            context (like a modal) while preserving the URL. Click any product
            to see it in a modal, or access the URL directly to see the full
            page.
          </p>
        </div>

        {/* Instructions */}
        <Boundary
          label="How it works"
          size="small"
          color="cyan"
          animateRerendering={false}
        >
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <div className="flex flex-col gap-2 rounded-lg border border-gray-800 bg-gray-900/30 p-4">
                <h3 className="flex items-center gap-2 text-sm font-medium text-cyan-400">
                  <span className="flex size-6 items-center justify-center rounded-full bg-cyan-900/50 text-xs">
                    1
                  </span>
                  Click a Product
                </h3>
                <p className="text-xs text-gray-500">
                  The route is <strong>intercepted</strong> and shown in a
                  modal. Notice the URL changes but you stay on this page.
                </p>
              </div>

              <div className="flex flex-col gap-2 rounded-lg border border-gray-800 bg-gray-900/30 p-4">
                <h3 className="flex items-center gap-2 text-sm font-medium text-violet-400">
                  <span className="flex size-6 items-center justify-center rounded-full bg-violet-900/50 text-xs">
                    2
                  </span>
                  Direct URL Access
                </h3>
                <p className="text-xs text-gray-500">
                  Open{' '}
                  <Link
                    href="/intercepting-routes/photo/laptop"
                    className="text-blue-400 underline"
                  >
                    /intercepting-routes/photo/laptop
                  </Link>{' '}
                  in a new tab to see the full page render.
                </p>
              </div>
            </div>

            <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-3 text-xs text-gray-500">
              <strong className="text-gray-400">Convention:</strong>{' '}
              Intercepting routes use special folder prefixes like{' '}
              <code className="rounded bg-gray-800 px-1">(.)</code> for same
              level, <code className="rounded bg-gray-800 px-1">(..)</code> for
              one level up, or{' '}
              <code className="rounded bg-gray-800 px-1">(...)</code> for root.
            </div>
          </div>
        </Boundary>

        {/* Product Grid */}
        <Boundary
          label="Product Gallery"
          size="small"
          color="blue"
          animateRerendering={false}
        >
          <ProductGrid />
        </Boundary>

        {/* Use Cases */}
        <Boundary
          label="Common Use Cases"
          size="small"
          color="orange"
          animateRerendering={false}
        >
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <UseCaseCard
              title="Photo Galleries"
              description="Show enlarged photos in a modal while keeping gallery visible in background."
              icon="📷"
            />
            <UseCaseCard
              title="Login Modals"
              description="Display login form in a modal from any page without losing context."
              icon="🔐"
            />
            <UseCaseCard
              title="Product Quick View"
              description="Preview products in a modal before navigating to full details."
              icon="🛒"
            />
          </div>
        </Boundary>
      </div>
    </Boundary>
  );
}

function UseCaseCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: string;
}) {
  return (
    <div className="flex flex-col gap-2 rounded-lg border border-gray-800 bg-gray-900/30 p-4">
      <div className="flex items-center gap-2">
        <span className="text-2xl">{icon}</span>
        <h3 className="font-medium text-gray-300">{title}</h3>
      </div>
      <p className="text-xs text-gray-500">{description}</p>
    </div>
  );
}
