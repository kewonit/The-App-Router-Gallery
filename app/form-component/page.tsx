import { Suspense } from 'react';
import { Boundary } from '#/ui/boundary';
import { BoundarySkeleton } from '#/ui/skeletons';
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
      <Boundary label="Contact Form (Client)" color="blue">
        <ContactForm />
      </Boundary>

      <Boundary label="Search Form (Async)" color="blue">
        <Suspense fallback={<BoundarySkeleton label="Loading..." lines={1} />}>
          <SearchFormContent searchParams={searchParams} />
        </Suspense>
      </Boundary>

      <Boundary label="Newsletter Form (Client)" color="blue">
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
