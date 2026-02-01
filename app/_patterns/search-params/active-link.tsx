'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function ActiveLink({
  isActive,
  searchParams,
  children,
}: {
  isActive: boolean;
  searchParams: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <Link
      className={clsx('rounded-lg px-3 py-1 text-sm font-medium no-underline', {
        'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:text-gray-900 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-500 dark:hover:text-white':
          !isActive,
        'bg-blue-600 text-white': isActive,
      })}
      href={pathname + '?' + searchParams}
    >
      {children}
    </Link>
  );
}
