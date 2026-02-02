import clsx from 'clsx';
import { Boundary } from './boundary';

// =============================================================================
// Base Shimmer Animation Styles
// =============================================================================

const shimmerClasses =
  'relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-linear-to-r before:from-transparent before:via-gray-300/50 before:to-transparent dark:before:via-white/10';

// =============================================================================
// Card Skeleton
// =============================================================================

interface CardSkeletonProps {
  isLoading?: boolean;
  className?: string;
  lines?: number;
  showImage?: boolean;
}

/**
 * CardSkeleton - Skeleton placeholder for card-based content
 *
 * @example
 * <CardSkeleton isLoading />
 * <CardSkeleton lines={4} showImage />
 */
export function CardSkeleton({
  isLoading = true,
  className,
  lines = 3,
  showImage = false,
}: CardSkeletonProps) {
  return (
    <div
      className={clsx(
        'rounded-2xl bg-gray-100 p-4 dark:bg-gray-900/80',
        { [shimmerClasses]: isLoading },
        className,
      )}
      role="status"
      aria-label="Loading card"
    >
      <div className="space-y-3">
        {showImage && (
          <div className="h-32 w-full rounded-lg bg-gray-200 dark:bg-gray-700" />
        )}
        <div className="h-14 rounded-lg bg-gray-200 dark:bg-gray-700" />
        {Array.from({ length: lines - 1 }, (_, i) => (
          <div
            key={i}
            className={clsx(
              'h-3 rounded-lg bg-gray-200 dark:bg-gray-700',
              i === 0 && 'w-11/12',
              i === 1 && 'w-8/12',
              i > 1 && 'w-10/12',
            )}
          />
        ))}
      </div>
    </div>
  );
}

// =============================================================================
// List Skeleton
// =============================================================================

interface ListSkeletonProps {
  count?: number;
  isLoading?: boolean;
  className?: string;
  variant?: 'simple' | 'detailed';
}

/**
 * ListSkeleton - Skeleton placeholder for list-based content
 *
 * @example
 * <ListSkeleton count={5} />
 * <ListSkeleton variant="detailed" />
 */
export function ListSkeleton({
  count = 3,
  isLoading = true,
  className,
  variant = 'simple',
}: ListSkeletonProps) {
  return (
    <div
      className={clsx('space-y-3', { [shimmerClasses]: isLoading }, className)}
      role="status"
      aria-label="Loading list"
    >
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          className={clsx(
            'rounded-lg bg-gray-100 p-3 dark:bg-gray-900/80',
            variant === 'detailed' && 'p-4',
          )}
        >
          {variant === 'simple' ? (
            <div className="h-4 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
          ) : (
            <div className="flex items-center gap-3">
              <div className="size-10 shrink-0 rounded-full bg-gray-200 dark:bg-gray-700" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-1/2 rounded bg-gray-200 dark:bg-gray-700" />
                <div className="h-3 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// =============================================================================
// Text Skeleton (Re-exported from skeleton.tsx for convenience)
// =============================================================================

export { SkeletonText } from './skeleton';

// =============================================================================
// Form Skeleton
// =============================================================================

interface FormSkeletonProps {
  fields?: number;
  isLoading?: boolean;
  className?: string;
  showSubmit?: boolean;
}

/**
 * FormSkeleton - Skeleton placeholder for form-based content
 *
 * @example
 * <FormSkeleton fields={4} showSubmit />
 */
export function FormSkeleton({
  fields = 3,
  isLoading = true,
  className,
  showSubmit = true,
}: FormSkeletonProps) {
  return (
    <div
      className={clsx('space-y-4', { [shimmerClasses]: isLoading }, className)}
      role="status"
      aria-label="Loading form"
    >
      {Array.from({ length: fields }, (_, i) => (
        <div key={i} className="space-y-2">
          <div className="h-4 w-24 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-10 w-full rounded-lg bg-gray-100 dark:bg-gray-900/80" />
        </div>
      ))}
      {showSubmit && (
        <div className="h-10 w-32 rounded-lg bg-gray-200 dark:bg-gray-700" />
      )}
    </div>
  );
}

// =============================================================================
// Grid Skeleton
// =============================================================================

interface GridSkeletonProps {
  count?: number;
  columns?: 1 | 2 | 3 | 4;
  isLoading?: boolean;
  className?: string;
}

/**
 * GridSkeleton - Skeleton placeholder for grid-based card layouts
 *
 * @example
 * <GridSkeleton count={9} columns={3} />
 */
export function GridSkeleton({
  count = 6,
  columns = 3,
  isLoading = true,
  className,
}: GridSkeletonProps) {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 lg:grid-cols-2',
    3: 'grid-cols-1 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div
      className={clsx('grid gap-6', gridCols[columns], className)}
      role="status"
      aria-label="Loading grid"
    >
      {Array.from({ length: count }, (_, i) => (
        <CardSkeleton key={i} isLoading={isLoading} />
      ))}
    </div>
  );
}

// =============================================================================
// Boundary Skeleton
// =============================================================================

interface BoundarySkeletonProps {
  label: string;
  lines?: number;
  color?: 'gray' | 'blue' | 'pink' | 'cyan' | 'violet' | 'orange';
  size?: 'small' | 'medium';
  className?: string;
}

/**
 * BoundarySkeleton - Skeleton wrapped in a Boundary component for consistent demo loading states
 *
 * @example
 * <Suspense fallback={<BoundarySkeleton label="Loading Products" color="blue" />}>
 *   <ProductList />
 * </Suspense>
 */
export function BoundarySkeleton({
  label,
  lines = 3,
  color = 'blue',
  size = 'small',
  className,
}: BoundarySkeletonProps) {
  return (
    <Boundary
      label={label}
      size={size}
      color={color}
      pulse
      className={className}
    >
      <div className="flex flex-col gap-3">
        {Array.from({ length: lines }, (_, i) => (
          <div
            key={i}
            className={clsx(
              'h-4 animate-pulse rounded bg-gray-200 dark:bg-gray-800',
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

// =============================================================================
// Table Skeleton
// =============================================================================

interface TableSkeletonProps {
  rows?: number;
  columns?: number;
  isLoading?: boolean;
  className?: string;
  showHeader?: boolean;
}

/**
 * TableSkeleton - Skeleton placeholder for table-based content
 *
 * @example
 * <TableSkeleton rows={5} columns={4} showHeader />
 */
export function TableSkeleton({
  rows = 3,
  columns = 4,
  isLoading = true,
  className,
  showHeader = true,
}: TableSkeletonProps) {
  return (
    <div
      className={clsx(
        'w-full overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800',
        { [shimmerClasses]: isLoading },
        className,
      )}
      role="status"
      aria-label="Loading table"
    >
      {showHeader && (
        <div className="flex gap-4 border-b border-gray-200 bg-gray-50 p-3 dark:border-gray-800 dark:bg-gray-900/60">
          {Array.from({ length: columns }, (_, i) => (
            <div
              key={i}
              className="h-4 flex-1 rounded bg-gray-200 dark:bg-gray-700"
            />
          ))}
        </div>
      )}
      {Array.from({ length: rows }, (_, rowIndex) => (
        <div
          key={rowIndex}
          className="flex gap-4 border-b border-gray-200 p-3 last:border-b-0 dark:border-gray-800"
        >
          {Array.from({ length: columns }, (_, colIndex) => (
            <div
              key={colIndex}
              className={clsx(
                'h-4 flex-1 rounded bg-gray-100 dark:bg-gray-800',
                colIndex === 0 && 'max-w-30',
              )}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

// =============================================================================
// Page Skeleton
// =============================================================================

interface PageSkeletonProps {
  showHeading?: boolean;
  showGrid?: boolean;
  gridCount?: number;
  className?: string;
}

/**
 * PageSkeleton - Full page skeleton for loading.tsx files
 *
 * @example
 * // In loading.tsx
 * export default function Loading() {
 *   return <PageSkeleton showGrid gridCount={9} />;
 * }
 */
export function PageSkeleton({
  showHeading = true,
  showGrid = true,
  gridCount = 9,
  className,
}: PageSkeletonProps) {
  return (
    <div className={clsx('flex flex-col gap-4', className)}>
      {showHeading && (
        <div className="flex items-center gap-2">
          <div className="h-7 w-32 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-6 w-12 animate-pulse rounded bg-gray-100 dark:bg-gray-800" />
        </div>
      )}
      {showGrid && <GridSkeleton count={gridCount} columns={3} />}
    </div>
  );
}
