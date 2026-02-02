import { Boundary } from '#/ui/boundary';
import { HighlightedCode, SimpleCode } from '#/ui/code-block';

export function MiddlewareDemo() {
  return (
    <div className="flex flex-col gap-6">
      <Boundary label="File Location" size="small" animateRerendering={false}>
        <SimpleCode
          code={`project/
├── middleware.ts   ← runs on matched routes
├── app/
│   └── ...`}
        />
      </Boundary>

      <Boundary label="Basic Example" size="small" animateRerendering={false}>
        <HighlightedCode
          code={`import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Check auth
  const token = request.cookies.get('token')

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/dashboard/:path*',
}`}
          language="tsx"
          filename="middleware.ts"
        />
      </Boundary>

      <Boundary
        label="Common Patterns"
        size="small"
        color="blue"
        animateRerendering={false}
      >
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="rounded-lg bg-gray-100 p-3 dark:bg-gray-900">
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              Auth Check
            </h4>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Redirect unauthenticated users to login
            </p>
          </div>
          <div className="rounded-lg bg-gray-100 p-3 dark:bg-gray-900">
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              Geo Redirect
            </h4>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Route users to country-specific pages
            </p>
          </div>
          <div className="rounded-lg bg-gray-100 p-3 dark:bg-gray-900">
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              A/B Testing
            </h4>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Rewrite to different page variants
            </p>
          </div>
          <div className="rounded-lg bg-gray-100 p-3 dark:bg-gray-900">
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              Headers
            </h4>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Add security or custom headers
            </p>
          </div>
        </div>
      </Boundary>

      <Boundary label="Matcher" size="small" animateRerendering={false}>
        <HighlightedCode
          code={`export const config = {
  matcher: [
    '/dashboard/:path*',      // all dashboard routes
    '/api/:function*',        // all API routes
    '/((?!_next|static).*)',  // all except _next and static
  ],
}`}
          language="tsx"
        />
      </Boundary>
    </div>
  );
}
