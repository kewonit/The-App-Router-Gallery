'use client';

import { type Demo, type DemoCategory } from '#/lib/db';
import { LinkStatus } from '#/ui/link-status';
import { ScrollArea } from '#/ui/scroll-area';
import { ThemeToggle } from '#/ui/theme-toggle';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import { Suspense, useState, useCallback, useEffect } from 'react';

export function GlobalNav({ items }: { items: DemoCategory[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const close = useCallback(() => setIsOpen(false), []);

  // Close menu on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        close();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, close]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-14 shrink-0 items-center justify-between px-4 py-4 lg:h-auto">
        <Link
          href="/"
          className="group flex items-center gap-x-2.5"
          onClick={close}
          aria-label="Go to homepage"
        >
          <h3 className="font-semibold tracking-tight text-gray-700 dark:text-gray-300">
            The App Router Gallery
          </h3>
        </Link>
      </div>
      <button
        type="button"
        className="group absolute top-0 right-0 flex h-14 items-center gap-x-2 px-4 lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls="mobile-nav-menu"
        aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
      >
        <span className="font-medium text-gray-600 dark:text-gray-400">
          {isOpen ? 'Close' : 'Menu'}
        </span>
        {isOpen ? (
          <XMarkIcon className="block w-6 text-gray-600 dark:text-gray-400" />
        ) : (
          <Bars3Icon className="block w-6 text-gray-600 dark:text-gray-400" />
        )}
      </button>

      <div
        id="mobile-nav-menu"
        className={clsx('flex flex-1 flex-col overflow-hidden lg:flex', {
          'fixed inset-x-0 top-14 bottom-0 mt-px bg-white dark:bg-black':
            isOpen,
          hidden: !isOpen,
        })}
      >
        <ScrollArea className="flex-1">
          <nav className="space-y-6 px-2 pt-5 pb-6">
            {items.map((section) => {
              return (
                <div key={section.name}>
                  <div className="mb-2 px-3 font-mono text-xs font-semibold tracking-wide text-gray-500 uppercase dark:text-gray-600">
                    <div>{section.name}</div>
                  </div>

                  <div className="flex flex-col gap-1">
                    {section.items.map((item) => (
                      <Suspense
                        key={item.slug}
                        fallback={<NavItem item={item} close={close} />}
                      >
                        <DynamicNavItem item={item} close={close} />
                      </Suspense>
                    ))}
                  </div>
                </div>
              );
            })}
          </nav>
        </ScrollArea>

        <div className="shrink-0 border-t border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900">
          <div className="flex items-center justify-between gap-3">
            <ThemeToggle />
            <a
              href="https://github.com/kewonit/The-App-Router-Gallery"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
              aria-label="View source code on GitHub"
            >
              <svg
                className="size-4"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function DynamicNavItem({
  item,
  close,
}: {
  item: Demo;
  close: () => false | void;
}) {
  const segment = useSelectedLayoutSegment();
  const isActive = item.slug === segment;

  return <NavItem item={item} close={close} isActive={isActive} />;
}

function NavItem({
  item,
  close,
  isActive,
}: {
  item: Demo;
  close: () => false | void;
  isActive?: boolean;
}) {
  return (
    <Link
      onClick={close}
      href={`/${item.slug}`}
      aria-current={isActive ? 'page' : undefined}
      className={clsx(
        'flex items-center justify-between rounded-md px-2 py-1 text-sm transition-colors',
        {
          'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300':
            !isActive,
          'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white':
            isActive,
        },
      )}
    >
      <div className="flex items-center gap-x-1.5">
        <span className="truncate">{item.nav_title || item.name}</span>
        <LinkStatus />
      </div>
    </Link>
  );
}
