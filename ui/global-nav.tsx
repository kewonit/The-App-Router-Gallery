'use client';

import { type Demo, type DemoCategory } from '#/lib/db';
import { LinkStatus } from '#/ui/link-status';
import { NextLogoDark, NextLogoLight } from '#/ui/logo-next';
import { ScrollArea } from '#/ui/scroll-area';
import { ThemeToggle } from '#/ui/theme-toggle';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import { Suspense, useState } from 'react';

export function GlobalNav({ items }: { items: DemoCategory[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);

  return (
    <>
      <div className="flex h-14 items-center justify-between px-4 py-4 lg:h-auto">
        <Link
          href="/"
          className="group flex items-center gap-x-2.5"
          onClick={close}
        >
          <div className="size-9 rounded-full border-2 border-gray-300 group-hover:border-gray-400 dark:border-gray-800 dark:group-hover:border-gray-700">
            <span className="hidden dark:block">
              <NextLogoDark />
            </span>
            <span className="block dark:hidden">
              <NextLogoLight />
            </span>
          </div>

          <h3 className="text-lg font-medium text-gray-900 group-hover:text-gray-700 dark:text-gray-200 dark:group-hover:text-white">
            Playground
          </h3>
        </Link>
        <div className="hidden lg:block">
          <ThemeToggle />
        </div>
      </div>
      <button
        type="button"
        className="group absolute top-0 right-0 flex h-14 items-center gap-x-2 px-4 lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="font-medium text-gray-900 group-hover:text-gray-600 dark:text-gray-100 dark:group-hover:text-gray-400">
          Menu
        </div>
        {isOpen ? (
          <XMarkIcon className="block w-6 text-gray-600 dark:text-gray-400" />
        ) : (
          <Bars3Icon className="block w-6 text-gray-600 dark:text-gray-400" />
        )}
      </button>

      <div
        className={clsx('lg:static lg:block', {
          'fixed inset-x-0 top-14 bottom-0 mt-px bg-white dark:bg-black':
            isOpen,
          hidden: !isOpen,
        })}
      >
        <ScrollArea className="h-[calc(100vh-3.5rem)] lg:h-[calc(100vh-4.5rem)]">
          <nav className="space-y-5 px-3 pt-5 pb-24">
            <div className="px-2 lg:hidden">
              <ThemeToggle />
            </div>
            {items.map((section) => {
              return (
                <div key={section.name}>
                  <div className="mb-2 px-2 font-mono text-[10px] font-bold tracking-widest text-gray-400 uppercase dark:text-gray-500">
                    {section.name}
                  </div>

                  <div className="flex flex-col gap-0.5">
                    {section.items.map((item) => (
                      // `useSelectedLayoutSegment` suspends, so we place
                      // a Suspense boundary as deep as possible to allow
                      // the route's fallback shell to include these elements
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
      </div>
    </>
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
      className={clsx(
        'flex items-center justify-between rounded-lg px-2.5 py-2 text-[13px] font-medium transition-colors',
        {
          'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800/70 dark:hover:text-gray-200':
            !isActive,
          'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white':
            isActive,
        },
      )}
    >
      <span className="truncate">{item.nav_title || item.name}</span>
      <LinkStatus />
    </Link>
  );
}
