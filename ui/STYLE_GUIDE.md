# Demo UI Components - Style Guide

This document describes the standardized UI patterns for demo pages in the Next.js 16 showcase.

## Component Overview

### ui/demo-states.tsx

Reusable state components for consistent demo experiences:

| Component         | Purpose                               | Use Case                    |
| ----------------- | ------------------------------------- | --------------------------- |
| `EmptyState`      | Empty list/collection placeholder     | When `items.length === 0`   |
| `ErrorState`      | Error display with retry/reset        | In `error.tsx` files        |
| `DemoPreview`     | Boundary wrapper with semantic labels | Page content wrappers       |
| `DemoHeading`     | Standardized heading with count/badge | Page titles                 |
| `DemoInfo`        | Info panel for explanations           | "What you're seeing" blocks |
| `LoadingFallback` | Suspense fallback skeleton            | Quick loading states        |

### ui/skeletons.tsx

Skeleton components for loading states:

| Component          | Purpose                   | Props                             |
| ------------------ | ------------------------- | --------------------------------- |
| `CardSkeleton`     | Card placeholder          | `isLoading`, `lines`, `showImage` |
| `ListSkeleton`     | List placeholder          | `count`, `variant`                |
| `FormSkeleton`     | Form placeholder          | `fields`, `showSubmit`            |
| `GridSkeleton`     | Grid of cards             | `count`, `columns`                |
| `BoundarySkeleton` | Boundary-wrapped skeleton | `label`, `lines`, `color`         |
| `TableSkeleton`    | Table placeholder         | `rows`, `columns`, `showHeader`   |
| `PageSkeleton`     | Full page skeleton        | `showHeading`, `showGrid`         |

## Boundary Color Convention

Colors indicate component rendering behavior:

| Color  | Suffix                       | Use For                             |
| ------ | ---------------------------- | ----------------------------------- |
| Gray   | (Server)                     | Standard server components          |
| Blue   | (Client), (Async), (Loading) | Client components, async operations |
| Pink   | (Cached)                     | Components using `'use cache'`      |
| Cyan   | (Static)                     | Statically rendered content         |
| Violet | (Dynamic)                    | Dynamic segments, runtime content   |
| Orange | (Slow)                       | Intentionally slow components       |
| Red    | (Error)                      | Error boundaries                    |

## Semantic Label Convention

Labels follow a consistent pattern: `filename (Rendering Mode)`

Examples:

- `page.tsx (Server)` - Standard server-rendered page
- `page.tsx (Cached)` - Page using `'use cache'`
- `<ProductList> (Async)` - Async component
- `loading.tsx (Suspense)` - Loading state for Suspense
- `error.tsx (Client)` - Client-side error boundary
- `layout.tsx (Static)` - Statically rendered layout

## Usage Examples

### DemoHeading with count

```tsx
import { DemoHeading } from '#/ui/demo-states';

<DemoHeading count={products.length}>Products</DemoHeading>;
// Renders: "Products (9)"
```

### Empty state handling

```tsx
import { EmptyState } from '#/ui/demo-states';

{
  items.length === 0 ? (
    <EmptyState
      title="No items found"
      description="Try adjusting your search or filters."
      action={<Button>Add Item</Button>}
    />
  ) : (
    <ItemList items={items} />
  );
}
```

### Error boundary with ErrorState

```tsx
// error.tsx
'use client';

import { Boundary } from '#/ui/boundary';
import { ErrorState } from '#/ui/demo-states';

export default function Error({ error, reset }) {
  return (
    <Boundary label="error.tsx (Client)" color="red">
      <ErrorState
        title="Something went wrong"
        error={error}
        reset={reset}
        showDetails={process.env.NODE_ENV === 'development'}
      />
    </Boundary>
  );
}
```

### Loading state with skeletons

```tsx
// loading.tsx
import { Boundary } from '#/ui/boundary';
import { GridSkeleton } from '#/ui/skeletons';

export default function Loading() {
  return (
    <Boundary label="loading.tsx (Suspense)" color="blue" pulse>
      <GridSkeleton count={9} columns={3} />
    </Boundary>
  );
}
```

### DemoPreview with automatic labeling

```tsx
import { DemoPreview } from '#/ui/demo-states';

<DemoPreview label="page.tsx" mode="cached">
  <ProductList />
</DemoPreview>;
// Renders boundary with label "page.tsx (Cached)" and pink color
```

## Two-Boundary Layout Pattern

All demo layouts should follow the two-boundary pattern:

```tsx
export default async function Layout({ children }) {
  return (
    <>
      <Boundary label="Demo" kind="solid" animateRerendering={false}>
        <Mdx source={readme} collapsed={true} />
      </Boundary>

      <Boundary label="layout.tsx" kind="solid" animateRerendering={false}>
        {children}
      </Boundary>
    </>
  );
}
```

This pattern:

1. First boundary contains the documentation (Demo)
2. Second boundary wraps the live demo content (layout.tsx)
