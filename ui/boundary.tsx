import clsx from 'clsx';
import React from 'react';

type Color = 'gray' | 'pink' | 'blue' | 'violet' | 'cyan' | 'orange' | 'red';
type Border = 'dashed' | 'solid';
type Size = 'small' | 'medium';

export const Boundary = ({
  children,
  label,
  size = 'medium',
  color = 'gray',
  kind = 'dashed',
  animateRerendering = true,
  corners,
  className,
  pulse = false,
}: {
  children: React.ReactNode;
  label?: string | string[];
  size?: Size;
  color?: Color;
  kind?: Border;
  animateRerendering?: boolean;
  corners?: boolean;
  className?: string;
  pulse?: boolean;
}) => {
  return (
    <div
      className={clsx(
        'relative rounded-lg border-2 transition-colors duration-200',
        {
          'border-dashed': kind === 'dashed',
          'border-gray-300 dark:border-gray-700': color === 'gray',
          'border-pink-400 dark:border-pink-700': color === 'pink',
          'border-blue-400 dark:border-blue-700': color === 'blue',
          'border-cyan-400 dark:border-cyan-700': color === 'cyan',
          'border-violet-400 dark:border-violet-700': color === 'violet',
          'border-orange-400 dark:border-orange-800': color === 'orange',
          'border-red-400 dark:border-red-800': color === 'red',
          'animate-[rerender_1s_ease-in-out_1] text-blue-600':
            animateRerendering,
          'animate-pulse': pulse,
        },
      )}
      role="region"
      aria-label={typeof label === 'string' ? label : label?.join(', ')}
    >
      {corners && (
        <>
          <svg
            viewBox="0 0 24 24"
            className="absolute top-0 left-0 z-10 size-6 -translate-x-[calc(50%+0.5px)] -translate-y-[calc(50%+0.5px)]"
          >
            <path stroke="currentColor" d="M12 6L12 18M6 12L18 12" />
          </svg>
          <svg
            viewBox="0 0 24 24"
            className="absolute right-0 bottom-0 z-10 size-6 translate-x-[calc(50%+0.5px)] translate-y-[calc(50%+0.5px)]"
          >
            <path stroke="currentColor" d="M12 6L12 18M6 12L18 12" />
          </svg>
        </>
      )}

      {label ? (
        <div
          className={clsx('absolute flex -translate-y-1/2 gap-x-1 text-[9px]', {
            'left-3 lg:left-5': size === 'small',
            'left-4 lg:left-9': size === 'medium',
          })}
        >
          {[...(typeof label === 'string' ? [label] : label)].map((label) => (
            <Label
              key={label}
              color={color}
              animateRerendering={animateRerendering}
            >
              {label}
            </Label>
          ))}
        </div>
      ) : null}

      <div
        className={clsx(className, {
          'p-3 lg:p-5': size === 'small',
          'p-4 lg:p-9': size === 'medium',
        })}
      >
        {children}
      </div>
    </div>
  );
};

const Label = ({
  children,
  animateRerendering,
  color,
}: {
  children: React.ReactNode;
  animateRerendering?: boolean;
  color?: Color;
}) => {
  return (
    <div
      className={clsx(
        'rounded-md px-2 py-0.5 font-mono text-[10px] leading-4 font-bold tracking-wider uppercase shadow-md ring-4 ring-gray-50 dark:ring-gray-950',
        {
          'bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-300':
            color === 'gray',
          'bg-pink-100 text-pink-800 dark:bg-pink-900/60 dark:text-pink-200':
            color === 'pink',
          'bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-200':
            color === 'blue',
          'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/60 dark:text-cyan-200':
            color === 'cyan',
          'bg-violet-100 text-violet-800 dark:bg-violet-900/60 dark:text-violet-200':
            color === 'violet',
          'bg-orange-100 text-orange-800 dark:bg-orange-900/60 dark:text-orange-200':
            color === 'orange',
          'bg-red-100 text-red-800 dark:bg-red-900/60 dark:text-red-200':
            color === 'red',
          'animate-[highlight_1s_ease-in-out_1]': animateRerendering,
        },
      )}
    >
      {children}
    </div>
  );
};
