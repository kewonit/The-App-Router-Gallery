'use client';

import { useState } from 'react';
import Form from 'next/form';

export function SearchForm({ currentSearch }: { currentSearch?: string }) {
  const [query, setQuery] = useState(currentSearch || '');

  return (
    <Form action="/form-component" className="flex flex-col gap-3">
      <input
        name="search"
        type="search"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-cyan-500 focus:outline-none dark:border-gray-800 dark:bg-gray-900 dark:text-gray-100 dark:placeholder:text-gray-600 dark:focus:border-cyan-600"
      />
      {currentSearch && (
        <p className="text-xs text-gray-600 dark:text-gray-500">
          Results for:{' '}
          <span className="text-cyan-600 dark:text-cyan-400">
            {currentSearch}
          </span>
        </p>
      )}
    </Form>
  );
}
