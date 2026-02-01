# The App Router Gallery

An interactive showcase of **Next.js App Router** features. Each demo includes working code examples, live demonstrations, and links to official documentation.

## Features Demonstrated

### Layouts & Routing

- **Nested Layouts** — Shared UI that persists across routes
- **Route Groups** — Organize routes without affecting URLs
- **Parallel Routes** — Render multiple pages simultaneously
- **Dynamic Routes** — Create pages from dynamic data with `[slug]`
- **Intercepting Routes** — Show routes in modals while preserving URLs

### File Conventions

- **Loading UI** — Instant loading states with `loading.js`
- **Error Handling** — Graceful error boundaries with `error.js`
- **Not Found** — Custom 404 pages with `not-found.js`
- **Templates** — Re-render on navigation (unlike layouts)
- **Route Handlers** — Build API endpoints with Web APIs
- **Middleware** — Run code before requests complete

### Caching (Next.js 15+)

- **Cached Routes** — Cache entire route segments with `use cache`
- **Cached Components** — Cache individual Server Components
- **Cached Functions** — Cache function return values
- **Remote Cache** — Runtime caching in dynamic contexts
- **Private Cache** — User-specific caching with cookies/headers

### Data & Forms

- **Server Actions** — Mutate data with server-side functions
- **Form Component** — Progressive enhancement for forms

### Components & APIs

- **Image Optimization** — Automatic image optimization with `next/image`
- **Font Optimization** — Self-hosted fonts with `next/font`
- **Script Component** — Efficient third-party script loading
- **useLinkStatus** — Visual feedback for link interactions
- **View Transitions** — Smooth animated page transitions

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- pnpm (recommended) or npm

### Installation

```sh
# Clone the repository
git clone https://github.com/kewonit/nextjs16-showcase.git
cd nextjs16-showcase

# Install dependencies
pnpm install

# Start the development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to explore the demos.

## Project Structure

```
app/
├── layouts/          # Nested layouts demo
├── loading/          # Loading UI demo
├── error/            # Error handling demo
├── streaming/        # Streaming & Suspense demo
├── server-actions/   # Server Actions demo
├── cached-routes/    # Route caching demo
└── ...               # More demos

ui/
├── global-nav.tsx    # Main navigation component
├── boundary.tsx      # Visual boundary component
├── tabs.tsx          # Tab navigation component
└── ...               # Reusable UI components

lib/
└── db.ts             # Mock database/ORM
```

## How Each Demo Works

1. **Navigate** to any demo from the sidebar
2. **Read the explanation** at the top (click "Show more" for details)
3. **Interact with the demo** following the instructions
4. **Explore the code** via the links at the bottom

## Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [App Router Guide](https://nextjs.org/docs/app)
- [React Documentation](https://react.dev)

## Credits

This project was built upon the foundation of the [Vercel Next.js App Router Playground](https://github.com/vercel/next-app-router-playground), which served as the template and starting point for this showcase.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## License

MIT License - see [LICENSE.md](license.md) for details.
