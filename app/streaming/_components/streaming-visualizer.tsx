'use client';

import { useState, useEffect } from 'react';
import clsx from 'clsx';

type TimelineItem = {
  label: string;
  duration: number;
  color: string;
  completed: boolean;
};

export function StreamingVisualizer() {
  const [elapsed, setElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  const timeline: TimelineItem[] = [
    {
      label: 'Initial Shell',
      duration: 0,
      color: 'bg-gray-500',
      completed: elapsed >= 0,
    },
    {
      label: 'Fast (100ms)',
      duration: 100,
      color: 'bg-green-500',
      completed: elapsed >= 100,
    },
    {
      label: 'Medium (500ms)',
      duration: 500,
      color: 'bg-blue-500',
      completed: elapsed >= 500,
    },
    {
      label: 'Slow (1500ms)',
      duration: 1500,
      color: 'bg-orange-500',
      completed: elapsed >= 1500,
    },
    {
      label: 'Very Slow (3000ms)',
      duration: 3000,
      color: 'bg-pink-500',
      completed: elapsed >= 3000,
    },
  ];

  useEffect(() => {
    if (!isRunning || elapsed >= 3500) return;

    const timer = setInterval(() => {
      setElapsed((prev) => Math.min(prev + 50, 3500));
    }, 50);

    return () => clearInterval(timer);
  }, [isRunning, elapsed]);

  const handleReset = () => {
    setElapsed(0);
    setIsRunning(true);
  };

  const maxDuration = 3500;
  const progressWidth = (elapsed / maxDuration) * 100;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-gray-200">Streaming Timeline</h3>
        <div className="flex items-center gap-3">
          <span className="font-mono text-sm text-gray-400">
            {elapsed.toFixed(0)}ms
          </span>
          <button
            onClick={handleReset}
            className="rounded bg-gray-700 px-3 py-1 text-xs font-medium text-gray-300 hover:bg-gray-600"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div className="relative h-8 overflow-hidden rounded-lg bg-gray-800">
        {/* Markers */}
        {timeline.slice(1).map((item) => (
          <div
            key={item.label}
            className="absolute top-0 h-full w-px bg-gray-600"
            style={{ left: `${(item.duration / maxDuration) * 100}%` }}
          >
            <div
              className={clsx(
                'absolute -top-0.5 left-1/2 size-2 -translate-x-1/2 rounded-full transition-colors',
                item.completed ? item.color : 'bg-gray-600',
              )}
            />
          </div>
        ))}

        {/* Progress */}
        <div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-600 to-cyan-500 transition-all duration-100"
          style={{ width: `${progressWidth}%` }}
        >
          <div className="absolute inset-y-0 right-0 w-4 animate-pulse bg-white/20" />
        </div>
      </div>

      {/* Timeline labels */}
      <div className="flex flex-wrap gap-3">
        {timeline.map((item) => (
          <div
            key={item.label}
            className={clsx(
              'flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium transition-all',
              item.completed
                ? 'bg-gray-800 text-gray-300'
                : 'bg-gray-900 text-gray-600',
            )}
          >
            <span
              className={clsx(
                'size-2 rounded-full transition-colors',
                item.completed ? item.color : 'bg-gray-700',
              )}
            />
            {item.label}
            {item.completed && (
              <svg
                className="size-3 text-green-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
        ))}
      </div>

      {/* Explanation */}
      <p className="text-xs text-gray-500">
        Watch how components stream in progressively. The page shell renders
        immediately, then each component appears as its data becomes available.
        {elapsed >= 3000 && (
          <span className="ml-1 text-green-400">All components loaded!</span>
        )}
      </p>
    </div>
  );
}
