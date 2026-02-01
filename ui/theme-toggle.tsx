'use client';

import { useTheme } from 'next-themes';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';

const themeOptions = [
  { value: 'light', icon: SunIcon, label: 'Light' },
  { value: 'dark', icon: MoonIcon, label: 'Dark' },
] as const;

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex gap-1 rounded-lg border border-gray-200 bg-gray-50 p-1 dark:border-gray-700 dark:bg-gray-900">
        {themeOptions.map(({ value, icon: Icon }) => (
          <div key={value} className="rounded-md p-1.5">
            <Icon className="size-4 text-gray-400" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className="flex gap-1 rounded-lg border border-gray-200 bg-gray-50 p-1 dark:border-gray-700 dark:bg-gray-900"
      role="group"
      aria-label="Theme selection"
    >
      {themeOptions.map(({ value, icon: Icon, label }) => (
        <button
          key={value}
          onClick={() => setTheme(value)}
          className={`rounded-md p-1.5 transition-all duration-150 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none ${
            theme === value
              ? 'bg-white text-gray-900 shadow-sm dark:bg-gray-700 dark:text-white'
              : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200'
          }`}
          title={`${label} theme`}
          aria-label={`Switch to ${label} theme`}
          aria-pressed={theme === value}
        >
          <Icon className="size-4" />
        </button>
      ))}
    </div>
  );
}
