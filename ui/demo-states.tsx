import clsx from 'clsx';
import React from 'react';
import { Boundary } from './boundary';

/**
 * Semantic color conventions for Boundary components:
 * - gray: Standard/default components
 * - blue: Async/loading/client components
 * - pink: Cached components
 * - cyan: Fast/instant components
 * - violet: Dynamic segments
 * - orange: Slow/warning states
 * - red: Error states
 */

// =============================================================================
// Empty State Component
// =============================================================================

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

/**
 * EmptyState - Displays a consistent empty state for lists and collections
 *
 * @example
 * <EmptyState
 *   title="No items found"
 *   description="Try adjusting your search or filters"
 *   action={<Button>Add Item</Button>}
 * />
 */
export function EmptyState({
  title = 'No items found',
  description,
  icon,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={clsx(
        'flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed border-gray-200 bg-gray-50/50 px-4 py-8 text-center sm:px-6 sm:py-12 dark:border-gray-800 dark:bg-gray-900/30',
        className,
      )}
      role="status"
      aria-label={title}
    >
      {icon ?? (
        <svg
          className="size-10 text-gray-400 dark:text-gray-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-2.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
          />
        </svg>
      )}
      <div className="space-y-1">
        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
          {title}
        </h3>
        {description && (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {description}
          </p>
        )}
      </div>
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}

// =============================================================================
// Error State Component
// =============================================================================

interface ErrorStateProps {
  title?: string;
  message?: string;
  error?: Error | null;
  reset?: () => void;
  retry?: () => void;
  className?: string;
  showDetails?: boolean;
}

/**
 * ErrorState - Displays a consistent error state with optional retry/reset actions
 *
 * @example
 * <ErrorState
 *   title="Something went wrong"
 *   message="Failed to load products"
 *   reset={() => reset()}
 * />
 */
export function ErrorState({
  title = 'Something went wrong',
  message,
  error,
  reset,
  retry,
  className,
  showDetails = false,
}: ErrorStateProps) {
  const displayMessage =
    message ?? error?.message ?? 'An unexpected error occurred';

  return (
    <div
      className={clsx(
        'flex flex-col items-center justify-center gap-4 rounded-lg border-2 border-red-200 bg-red-50/50 px-6 py-12 text-center dark:border-red-900/50 dark:bg-red-950/20',
        className,
      )}
      role="alert"
      aria-labelledby="error-title"
      aria-describedby="error-message"
    >
      <svg
        className="size-10 text-red-500 dark:text-red-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
        />
      </svg>
      <div className="space-y-1">
        <h3
          id="error-title"
          className="text-sm font-medium text-red-900 dark:text-red-100"
        >
          {title}
        </h3>
        <p
          id="error-message"
          className="max-w-md text-sm text-red-700 dark:text-red-300"
        >
          {displayMessage}
        </p>
        {showDetails && error?.stack && (
          <details className="mt-4 w-full max-w-lg text-left">
            <summary className="cursor-pointer text-xs text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200">
              Technical details
            </summary>
            <pre className="mt-2 overflow-auto rounded bg-red-100/50 p-2 text-xs text-red-800 dark:bg-red-900/30 dark:text-red-200">
              {error.stack}
            </pre>
          </details>
        )}
      </div>
      <div className="flex flex-wrap gap-2 sm:gap-3">
        {retry && (
          <button
            onClick={retry}
            className="rounded-md bg-red-100 px-4 py-2 text-sm font-medium text-red-700 transition-colors hover:bg-red-200 dark:bg-red-900/40 dark:text-red-200 dark:hover:bg-red-900/60"
          >
            Try again
          </button>
        )}
        {reset && (
          <button
            onClick={reset}
            className="rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 ring-1 ring-gray-200 transition-colors hover:bg-gray-50 dark:bg-gray-900 dark:text-gray-200 dark:ring-gray-700 dark:hover:bg-gray-800"
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );
}

// =============================================================================
// Demo Preview Wrapper Component
// =============================================================================

type RenderMode =
  | 'server'
  | 'client'
  | 'cached'
  | 'dynamic'
  | 'async'
  | 'static';

interface DemoPreviewProps {
  children: React.ReactNode;
  label: string;
  mode?: RenderMode;
  size?: 'small' | 'medium';
  className?: string;
  animateRerendering?: boolean;
  hint?: string;
}

const modeConfig: Record<
  RenderMode,
  {
    suffix: string;
    color: 'gray' | 'blue' | 'pink' | 'violet' | 'cyan' | 'orange';
  }
> = {
  server: { suffix: '(Server)', color: 'gray' },
  client: { suffix: '(Client)', color: 'blue' },
  cached: { suffix: '(Cached)', color: 'pink' },
  dynamic: { suffix: '(Dynamic)', color: 'violet' },
  async: { suffix: '(Async)', color: 'blue' },
  static: { suffix: '(Static)', color: 'cyan' },
};

/**
 * DemoPreview - Standardized wrapper for demo content with consistent labeling
 *
 * Automatically adds semantic suffixes based on the rendering mode:
 * - server: (Server) - gray border
 * - client: (Client) - blue border
 * - cached: (Cached) - pink border
 * - dynamic: (Dynamic) - violet border
 * - async: (Async) - blue border
 * - static: (Static) - cyan border
 *
 * @example
 * <DemoPreview label="page.tsx" mode="server">
 *   <ProductList />
 * </DemoPreview>
 *
 * // Renders with label "page.tsx (Server)"
 */
export function DemoPreview({
  children,
  label,
  mode,
  size = 'medium',
  className,
  animateRerendering = true,
  hint,
}: DemoPreviewProps) {
  const config = mode ? modeConfig[mode] : null;
  const fullLabel = config ? `${label} ${config.suffix}` : label;
  const color = config?.color ?? 'gray';

  return (
    <Boundary
      label={fullLabel}
      size={size}
      color={color}
      animateRerendering={animateRerendering}
      className={className}
    >
      {hint && (
        <div className="mb-4 rounded-md border border-gray-200/70 bg-white/70 p-3 text-sm text-gray-600 dark:border-gray-800/80 dark:bg-gray-900/40 dark:text-gray-300">
          <p className="mb-1 text-xs font-semibold tracking-wide text-gray-500 uppercase dark:text-gray-400">
            What you're seeing
          </p>
          {hint}
        </div>
      )}
      {children}
    </Boundary>
  );
}

// =============================================================================
// Demo Heading Component
// =============================================================================

interface DemoHeadingProps {
  children: React.ReactNode;
  count?: number | string;
  badge?: string;
  className?: string;
}

/**
 * DemoHeading - Standardized heading for demo pages with optional count/badge
 *
 * Uses consistent styling: font-medium text-xl with gray colors
 * Count badge uses font-mono text-gray-500
 *
 * @example
 * <DemoHeading count={products.length}>Products</DemoHeading>
 * // Renders: "Products (9)"
 *
 * <DemoHeading badge="New">Products</DemoHeading>
 * // Renders: "Products New"
 */
export function DemoHeading({
  children,
  count,
  badge,
  className,
}: DemoHeadingProps) {
  return (
    <h1
      className={clsx(
        'text-xl font-medium text-gray-700 dark:text-gray-300',
        className,
      )}
    >
      {children}
      {count !== undefined && (
        <>
          {' '}
          <span className="font-mono tracking-tighter text-gray-500 dark:text-gray-600">
            ({count})
          </span>
        </>
      )}
      {badge && (
        <>
          {' '}
          <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900/40 dark:text-blue-200">
            {badge}
          </span>
        </>
      )}
    </h1>
  );
}

// =============================================================================
// Demo Info Panel Component
// =============================================================================

interface DemoInfoProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * DemoInfo - Consistent info panel for explaining what the demo shows
 *
 * @example
 * <DemoInfo title="What you're seeing">
 *   Each card below is a Server Component wrapped in Suspense.
 * </DemoInfo>
 */
export function DemoInfo({
  title = "What you're seeing",
  children,
  className,
}: DemoInfoProps) {
  return (
    <div
      className={clsx(
        'rounded-lg border border-gray-200/70 bg-white/60 p-4 text-sm text-gray-600 shadow-sm dark:border-gray-800/80 dark:bg-gray-950/40 dark:text-gray-300',
        className,
      )}
    >
      <p className="mb-2 text-base font-medium text-gray-700 dark:text-gray-200">
        {title}
      </p>
      {children}
    </div>
  );
}

// =============================================================================
// Loading Fallback Component
// =============================================================================

interface LoadingFallbackProps {
  label?: string;
  lines?: number;
  className?: string;
}

/**
 * LoadingFallback - Consistent loading fallback for Suspense boundaries
 *
 * @example
 * <Suspense fallback={<LoadingFallback label="Products" />}>
 *   <ProductList />
 * </Suspense>
 */
export function LoadingFallback({
  label = 'Loading...',
  lines = 3,
  className,
}: LoadingFallbackProps) {
  return (
    <Boundary label={label} color="blue" pulse className={className}>
      <div className="animate-pulse space-y-3">
        {Array.from({ length: lines }, (_, i) => (
          <div
            key={i}
            className={clsx(
              'h-4 rounded bg-gray-200 dark:bg-gray-700',
              i === 0 && 'w-3/4',
              i === 1 && 'w-1/2',
              i === 2 && 'w-2/3',
              i > 2 && 'w-full',
            )}
          />
        ))}
      </div>
    </Boundary>
  );
}
