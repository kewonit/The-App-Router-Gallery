'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

export function NavLinks({
  links,
}: {
  links: { href: string; name: string }[];
}) {
  // Alternatively, you could use `useParams` or `useSelectedLayoutSegment(s)`
  const pathname = usePathname();

  return (
    <nav className="flex gap-2">
      {links.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={clsx('rounded-lg px-3 py-1 text-sm font-medium', {
              'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:text-gray-900 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-500 dark:hover:text-white':
                !isActive,
              'bg-blue-600 text-white': isActive,
            })}
          >
            {link.name}
          </Link>
        );
      })}
    </nav>
  );
}
