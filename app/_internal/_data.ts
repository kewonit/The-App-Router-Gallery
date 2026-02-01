// This is a mock database used to simplify parts of the app not
// relevant to the demo. In a real app, this data would live in
// a relational database like PostgreSQL or MySQL, accessed through
// a database client or ORM.

export type Product = {
  id: string;
  name: string;
  image: string;
  category: string;
  price: number;
};

export type Section = {
  id: string;
  name: string;
  slug: string;
  categories: string[];
};

export type Category = {
  id: string;
  name: string;
  section: string;
  slug: string;
  products: string[];
};

export type DemoDifficulty = 'beginner' | 'intermediate' | 'advanced';

export type Demo = {
  slug: string;
  name: string;
  nav_title?: string;
  description: string;
  difficulty: DemoDifficulty;
  estimatedMinutes: number;
  prerequisites: string[];
  order: number;
};

export type DemoCategory = { name: string; items: Demo[] };

const sections: Section[] = [
  { id: '1', name: 'Clothing', slug: 'clothing', categories: ['1', '2', '3'] },
  {
    id: '2',
    name: 'Electronics',
    slug: 'electronics',
    categories: ['4', '5', '6'],
  },
  { id: '3', name: 'Sports', slug: 'sports', categories: ['7', '8', '9'] },
];

const categories: Category[] = [
  { id: '1', name: 'Tops', slug: 'tops', section: '1', products: ['1'] },
  { id: '2', name: 'Shorts', slug: 'shorts', section: '1', products: ['2'] },
  { id: '3', name: 'Shoes', slug: 'shoes', section: '1', products: ['3'] },
  { id: '4', name: 'Phones', slug: 'phones', section: '2', products: ['4'] },
  { id: '5', name: 'Laptops', slug: 'laptops', section: '2', products: ['5'] },
  { id: '6', name: 'Tablets', slug: 'tablets', section: '2', products: ['6'] },
  { id: '7', name: 'Balls', slug: 'balls', section: '3', products: ['7'] },
  {
    id: '8',
    name: 'Equipment',
    slug: 'equipment',
    section: '3',
    products: ['8'],
  },
  {
    id: '9',
    name: 'Accessories',
    slug: 'accessories',
    section: '3',
    products: ['9'],
  },
];

const products: Product[] = [
  { id: '1', name: 'Top', image: 'top.png', category: '1', price: 29.99 },
  { id: '2', name: 'Shorts', image: 'shorts.png', category: '2', price: 39.99 },
  { id: '3', name: 'Shoes', image: 'shoes.png', category: '3', price: 89.99 },

  { id: '4', name: 'Phone', image: 'phone.png', category: '4', price: 699.99 },
  {
    id: '5',
    name: 'Laptop',
    image: 'laptop.png',
    category: '5',
    price: 1299.99,
  },
  {
    id: '6',
    name: 'Tablet',
    image: 'tablet.png',
    category: '6',
    price: 499.99,
  },
  {
    id: '7',
    name: 'Basketball',
    image: 'balls.png',
    category: '7',
    price: 24.99,
  },
  {
    id: '8',
    name: 'Weights',
    image: 'weights.png',
    category: '8',
    price: 149.99,
  },
  { id: '9', name: 'Gloves', image: 'gloves.png', category: '9', price: 19.99 },
];

const demos = [
  {
    name: 'Fundamentals',
    items: [
      {
        slug: 'layouts',
        name: 'Nested Layouts',
        description: 'Create UI that is shared across routes',
        difficulty: 'beginner',
        estimatedMinutes: 5,
        prerequisites: [],
        order: 1,
      },
      {
        slug: 'loading',
        name: 'Loading',
        description:
          'Create meaningful Loading UI for specific parts of an app',
        difficulty: 'beginner',
        estimatedMinutes: 4,
        prerequisites: ['layouts'],
        order: 2,
      },
      {
        slug: 'error',
        name: 'Error',
        description: 'Create Error UI for specific parts of an app',
        difficulty: 'beginner',
        estimatedMinutes: 5,
        prerequisites: ['layouts'],
        order: 3,
      },
      {
        slug: 'not-found',
        name: 'Not Found',
        description: 'Create Not Found UI for specific parts of an app',
        difficulty: 'beginner',
        estimatedMinutes: 4,
        prerequisites: ['layouts'],
        order: 4,
      },
      {
        slug: 'metadata',
        name: 'Metadata API',
        nav_title: 'Metadata',
        description:
          'Define page metadata for SEO with static and dynamic patterns',
        difficulty: 'beginner',
        estimatedMinutes: 6,
        prerequisites: [],
        order: 5,
      },
    ],
  },
  {
    name: 'Routing',
    items: [
      {
        slug: 'route-groups',
        name: 'Route Groups',
        description: 'Organize routes without affecting URL paths',
        difficulty: 'beginner',
        estimatedMinutes: 4,
        prerequisites: ['layouts'],
        order: 6,
      },
      {
        slug: 'dynamic-routes',
        name: 'Dynamic Routes',
        description:
          'Create pages from dynamic data with [slug], [...slug], and [[...slug]]',
        difficulty: 'beginner',
        estimatedMinutes: 6,
        prerequisites: ['layouts'],
        order: 7,
      },
      {
        slug: 'parallel-routes',
        name: 'Parallel Routes',
        description: 'Render multiple pages in the same layout',
        difficulty: 'intermediate',
        estimatedMinutes: 8,
        prerequisites: ['layouts', 'route-groups'],
        order: 8,
      },
      {
        slug: 'intercepting-routes',
        name: 'Intercepting Routes',
        description:
          'Show routes in a different context like modals while preserving URLs',
        difficulty: 'advanced',
        estimatedMinutes: 10,
        prerequisites: ['dynamic-routes', 'parallel-routes'],
        order: 9,
      },
      {
        slug: 'template-demo',
        name: 'Template',
        description: 'Create UI that re-renders on navigation unlike layouts',
        difficulty: 'intermediate',
        estimatedMinutes: 5,
        prerequisites: ['layouts'],
        order: 10,
      },
      {
        slug: 'middleware-demo',
        name: 'Middleware',
        description:
          'Run code before a request is completed for auth, redirects, and more',
        difficulty: 'intermediate',
        estimatedMinutes: 7,
        prerequisites: ['route-handlers'],
        order: 11,
      },
    ],
  },
  {
    name: 'Components',
    items: [
      {
        slug: 'image-optimization',
        name: 'Image Optimization',
        nav_title: 'Image',
        description: 'Automatic image optimization with next/image component',
        difficulty: 'beginner',
        estimatedMinutes: 5,
        prerequisites: [],
        order: 12,
      },
      {
        slug: 'font-optimization',
        name: 'Font Optimization',
        nav_title: 'Font',
        description:
          'Self-host fonts with automatic optimization using next/font',
        difficulty: 'beginner',
        estimatedMinutes: 5,
        prerequisites: [],
        order: 13,
      },
      {
        slug: 'script-component',
        name: 'Script Component',
        nav_title: 'Script',
        description:
          'Load third-party scripts efficiently with different loading strategies',
        difficulty: 'beginner',
        estimatedMinutes: 4,
        prerequisites: [],
        order: 14,
      },
    ],
  },
  {
    name: 'Data & Forms',
    items: [
      {
        slug: 'route-handlers',
        name: 'Route Handlers',
        description: 'Create API endpoints with Web Request and Response APIs',
        difficulty: 'intermediate',
        estimatedMinutes: 6,
        prerequisites: [],
        order: 15,
      },
      {
        slug: 'server-actions',
        name: 'Server Actions',
        description: 'Mutate data with async functions that run on the server',
        difficulty: 'intermediate',
        estimatedMinutes: 8,
        prerequisites: [],
        order: 16,
      },
      {
        slug: 'form-component',
        name: 'Form Component',
        nav_title: 'Form',
        description:
          'Enhanced form handling with progressive enhancement and client-side navigation',
        difficulty: 'intermediate',
        estimatedMinutes: 7,
        prerequisites: ['server-actions'],
        order: 17,
      },
      {
        slug: 'revalidation',
        name: 'Data Revalidation',
        nav_title: 'Revalidation',
        description:
          'Refresh cached data with revalidatePath, revalidateTag, and time-based strategies',
        difficulty: 'intermediate',
        estimatedMinutes: 7,
        prerequisites: ['server-actions', 'cached-routes'],
        order: 18,
      },
      {
        slug: 'react-19',
        name: 'React 19 Hooks',
        nav_title: 'React 19',
        description:
          'Master new React 19 hooks: useActionState, useOptimistic, and use()',
        difficulty: 'intermediate',
        estimatedMinutes: 10,
        prerequisites: ['server-actions', 'form-component'],
        order: 19,
      },
    ],
  },
  {
    name: 'Rendering',
    items: [
      {
        slug: 'streaming',
        name: 'Streaming',
        description:
          'Progressive rendering with React Suspense for improved performance',
        difficulty: 'intermediate',
        estimatedMinutes: 7,
        prerequisites: ['loading'],
        order: 20,
      },
      {
        slug: 'static-rendering',
        name: 'Static Rendering & ISR',
        nav_title: 'Static & ISR',
        description:
          'Pre-render pages at build time with incremental regeneration',
        difficulty: 'intermediate',
        estimatedMinutes: 8,
        prerequisites: ['dynamic-routes'],
        order: 21,
      },
      {
        slug: 'partial-prerendering',
        name: 'Partial Prerendering',
        nav_title: 'PPR',
        description:
          'Combine static shell with dynamic holes for optimal performance',
        difficulty: 'advanced',
        estimatedMinutes: 10,
        prerequisites: ['streaming', 'cached-routes'],
        order: 22,
      },
    ],
  },
  {
    name: 'Caching',
    items: [
      {
        slug: 'cached-routes',
        name: 'Cached Route Segments',
        nav_title: 'Cached Routes',
        description: 'Cache the rendered output of a route segment',
        difficulty: 'intermediate',
        estimatedMinutes: 6,
        prerequisites: ['layouts', 'streaming'],
        order: 23,
      },
      {
        slug: 'cached-components',
        name: 'Cached React Server Components',
        nav_title: 'Cached Components',
        description:
          'Cache the rendered output of an individual React Server Component',
        difficulty: 'intermediate',
        estimatedMinutes: 6,
        prerequisites: ['cached-routes'],
        order: 24,
      },
      {
        slug: 'cached-functions',
        name: 'Cached Functions',
        description: 'Cache the computed result of a regular function',
        difficulty: 'intermediate',
        estimatedMinutes: 5,
        prerequisites: ['cached-components'],
        order: 25,
      },
      {
        slug: 'remote-cache',
        name: 'Remote Cache',
        description:
          'Cache data at runtime with use cache: remote in dynamic contexts',
        difficulty: 'advanced',
        estimatedMinutes: 8,
        prerequisites: ['cached-functions'],
        order: 26,
      },
      {
        slug: 'private-cache',
        name: 'Private Cache',
        description:
          'Cache user-specific data with use cache: private using cookies and headers',
        difficulty: 'advanced',
        estimatedMinutes: 8,
        prerequisites: ['cached-functions', 'remote-cache'],
        order: 27,
      },
    ],
  },
  {
    name: 'Advanced',
    items: [
      {
        slug: 'use-link-status',
        name: 'useLinkStatus',
        description: 'Create inline visual feedback for link interactions',
        difficulty: 'intermediate',
        estimatedMinutes: 5,
        prerequisites: ['layouts'],
        order: 28,
      },
      {
        slug: 'view-transitions',
        name: 'View Transitions',
        description:
          'Use animations to help users understand the relationship between the two views',
        difficulty: 'intermediate',
        estimatedMinutes: 6,
        prerequisites: ['layouts'],
        order: 29,
      },
      {
        slug: 'context',
        name: 'Client Context',
        description:
          'Pass context between Client Components that cross Server/Client Component boundary',
        difficulty: 'intermediate',
        estimatedMinutes: 6,
        prerequisites: [],
        order: 30,
      },
    ],
  },
] as const satisfies DemoCategory[];

export type DemoSlug = (typeof demos)[number]['items'][number]['slug'];

export const data = { sections, categories, products, demos };
