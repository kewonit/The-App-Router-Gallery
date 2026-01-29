'use client';

import { useState, useTransition } from 'react';
import Form from 'next/form';
import clsx from 'clsx';
import { handleSearch } from '../actions';

type SearchFormProps = { currentSearch?: string };

export function SearchForm({ currentSearch }: SearchFormProps) {
  const [query, setQuery] = useState(currentSearch || '');
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (formData: FormData) => {
    startTransition(() => {
      handleSearch(formData);
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-medium text-gray-200">Search</h3>
        <p className="text-sm text-gray-500">
          Uses Next.js Form component with prefetching
        </p>
      </div>

      <Form action={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <input
            name="query"
            type="search"
            placeholder="Search products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoComplete="off"
            className={clsx(
              'w-full rounded-lg border border-gray-800 bg-gray-900 px-4 py-2.5 pl-10 text-sm text-gray-100',
              'placeholder:text-gray-600',
              'focus:border-cyan-600 focus:ring-2 focus:ring-cyan-600 focus:ring-offset-2 focus:ring-offset-gray-950 focus:outline-none',
            )}
          />
          <svg
            className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <button
          type="submit"
          disabled={isPending || !query.trim()}
          className={clsx(
            'rounded-lg bg-cyan-600 px-4 py-2.5 text-sm font-medium text-white',
            'hover:bg-cyan-500',
            'focus:ring-2 focus:ring-cyan-600 focus:ring-offset-2 focus:ring-offset-gray-950 focus:outline-none',
            'disabled:cursor-not-allowed disabled:opacity-50',
          )}
        >
          {isPending ? (
            <span className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
          ) : (
            'Search'
          )}
        </button>
      </Form>

      {/* Search result indicator */}
      {currentSearch && (
        <div className="flex items-center gap-2 rounded-lg bg-cyan-900/30 px-3 py-2 text-sm">
          <span className="text-cyan-400">Showing results for:</span>
          <span className="font-medium text-white">"{currentSearch}"</span>
          <Form action="/form-component" className="ml-auto">
            <button type="submit" className="text-cyan-400 hover:text-cyan-300">
              Clear
            </button>
          </Form>
        </div>
      )}

      {/* Features list */}
      <ul className="flex flex-col gap-1 text-xs text-gray-600">
        <li className="flex items-center gap-1.5">
          <span className="size-1 rounded-full bg-cyan-500" />
          Prefetches search results on hover
        </li>
        <li className="flex items-center gap-1.5">
          <span className="size-1 rounded-full bg-cyan-500" />
          Uses redirect() for server-side navigation
        </li>
        <li className="flex items-center gap-1.5">
          <span className="size-1 rounded-full bg-cyan-500" />
          URL reflects search state (shareable)
        </li>
      </ul>
    </div>
  );
}
