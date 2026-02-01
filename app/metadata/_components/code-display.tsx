'use client';

import { Boundary } from '#/ui/boundary';

type CodeDisplayProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

export function CodeDisplay({
  title,
  description,
  children,
}: CodeDisplayProps) {
  return (
    <Boundary label="Code Pattern" color="cyan">
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100">
            {title}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {description}
          </p>
        </div>
        {children}
      </div>
    </Boundary>
  );
}
