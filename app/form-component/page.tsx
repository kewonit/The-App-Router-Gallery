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
    <div className="space-y-9">
      <Boundary label="Contact Form">
        <ContactForm />
      </Boundary>

      <Boundary label="Search Form">
        <Suspense fallback={<SearchFormSkeleton />}>
          <SearchFormContent searchParams={searchParams} />
        </Suspense>
      </Boundary>

      <Boundary label="Newsletter Form">
        <NewsletterForm />
      </Boundary>
    </div>
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
