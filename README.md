# Next.js App Router Showcase

A hands-on exploration of Next.js App Router patterns and APIs. Built with Next.js 16, React 19, and the latest caching primitives.

[Live Demo →](https://the-app-router-gallery.vercel.app)

## What's Inside

**30+ interactive demos** covering routing, caching, data fetching, and React 19 features.

| Category             | Topics                                                                               |
| -------------------- | ------------------------------------------------------------------------------------ |
| **Routing**          | Nested layouts, route groups, parallel routes, intercepting routes, dynamic segments |
| **File Conventions** | `loading.tsx`, `error.tsx`, `not-found.tsx`, templates, middleware                   |
| **Caching**          | `use cache`, remote cache, private cache, revalidation strategies                    |
| **Data**             | Server Actions, forms, ISR, SSG                                                      |
| **Components**       | `next/image`, `next/font`, `next/script`, view transitions                           |
| **React 19**         | `useActionState`, `useOptimistic`, `use()` hook                                      |

## Quick Start

```sh
git clone https://github.com/kewonit/The-App-Router-Gallery.git
cd nextjs16-showcase
pnpm install
pnpm dev
```

Requires Node.js 18.17+ and pnpm.

## Structure

```
app/
├── cached-routes/     # use cache directive demos
├── server-actions/    # mutations and form handling
├── streaming/         # Suspense and async UI
├── parallel-routes/   # simultaneous route rendering
└── [30+ more demos]

ui/                    # shared components
lib/db.ts              # mock data layer
```

## Links

- [Next.js Docs](https://nextjs.org/docs)
- [App Router Guide](https://nextjs.org/docs/app)
- [React 19](https://react.dev)

## Credits

Based on the [Vercel App Router Playground](https://github.com/vercel/next-app-router-playground).

## License

MIT
