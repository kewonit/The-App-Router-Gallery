import { Suspense } from 'react';
import { Boundary } from '#/ui/boundary';
import { ContactForm } from './_components/contact-form';
import { SearchForm } from './_components/search-form';
import { NewsletterForm } from './_components/newsletter-form';
import { NativeFormDemo } from './_components/native-form-demo';

export default function Page({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>;
}) {
  return (
    <Boundary label="page.tsx" animateRerendering={false}>
      <div className="flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold text-gray-100">
            Form Component
          </h1>
          <p className="text-sm text-gray-400">
            Next.js enhanced{' '}
            <code className="rounded bg-gray-800 px-1.5 py-0.5 font-mono text-xs text-gray-300">
              {'<Form>'}
            </code>{' '}
            component with progressive enhancement, prefetching, and seamless
            Server Action integration.
          </p>
        </div>

        {/* Grid layout for forms */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Contact Form - Full featured example */}
          <Boundary
            label="<ContactForm> (Full Validation)"
            size="small"
            color="blue"
            animateRerendering={false}
            className="lg:col-span-2"
          >
            <ContactForm />
          </Boundary>

          {/* Search Form - With prefetching */}
          <Boundary
            label="<SearchForm> (Prefetch + Redirect)"
            size="small"
            color="cyan"
            animateRerendering={false}
          >
            <Suspense fallback={<SearchFormSkeleton />}>
              <SearchFormContent searchParams={searchParams} />
            </Suspense>
          </Boundary>

          {/* Newsletter Form - Simple inline */}
          <Boundary
            label="<NewsletterForm> (Inline Feedback)"
            size="small"
            color="violet"
            animateRerendering={false}
          >
            <NewsletterForm />
          </Boundary>

          {/* Native HTML Form Comparison */}
          <Boundary
            label="<NativeFormDemo> (Comparison)"
            size="small"
            color="orange"
            animateRerendering={false}
            className="lg:col-span-2"
          >
            <NativeFormDemo />
          </Boundary>
        </div>
      </div>
    </Boundary>
  );
}

async function SearchFormContent({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>;
}) {
  const { search } = await searchParams;
  return <SearchForm currentSearch={search} />;
}

function SearchFormSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="h-5 w-32 animate-pulse rounded bg-gray-700" />
      <div className="flex gap-2">
        <div className="h-10 flex-1 animate-pulse rounded-lg bg-gray-800" />
        <div className="h-10 w-20 animate-pulse rounded-lg bg-gray-800" />
      </div>
    </div>
  );
}
