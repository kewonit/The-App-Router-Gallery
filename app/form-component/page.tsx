import { Suspense } from 'react';
import { Boundary } from '#/ui/boundary';
import { ContactForm } from './_components/contact-form';
import { SearchForm } from './_components/search-form';
import { NewsletterForm } from './_components/newsletter-form';

export default function Page({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>;
}) {
  return (
    <Boundary label="page.tsx">
      <div className="flex flex-col gap-6">
        <h1 className="text-xl font-medium text-gray-700 dark:text-gray-300">
          Forms{' '}
          <span className="font-mono tracking-tighter text-gray-500 dark:text-gray-600">
            (3)
          </span>
        </h1>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Boundary label="ContactForm" size="small" color="blue">
            <ContactForm />
          </Boundary>

          <div className="flex flex-col gap-6">
            <Boundary label="SearchForm" size="small" color="cyan">
              <Suspense fallback={<SearchFormSkeleton />}>
                <SearchFormContent searchParams={searchParams} />
              </Suspense>
            </Boundary>

            <Boundary label="NewsletterForm" size="small" color="violet">
              <NewsletterForm />
            </Boundary>
          </div>
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
    <div className="flex flex-col gap-3">
      <div className="h-10 animate-pulse rounded-lg bg-gray-800" />
    </div>
  );
}
