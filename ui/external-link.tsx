import { ArrowRightIcon } from '@heroicons/react/24/outline';

export const ExternalLink = ({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) => {
  return (
    <a
      href={href}
      className="inline-flex gap-x-2 rounded-lg bg-gray-200 px-3 py-1 text-sm font-medium text-gray-700 no-underline hover:bg-gray-300 hover:text-gray-900 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-500 dark:hover:text-white"
    >
      <div>{children}</div>

      <ArrowRightIcon className="block w-4" />
    </a>
  );
};
