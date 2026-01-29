'use client';

import { useTheme } from 'next-themes';
import {
  MoonIcon,
  SunIcon,
  ComputerDesktopIcon,
} from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';

const themeOptions = [
  { value: 'light', icon: SunIcon, label: 'Light' },
  { value: 'dark', icon: MoonIcon, label: 'Dark' },
  { value: 'system', icon: ComputerDesktopIcon, label: 'System' },
] as const;

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex gap-1 rounded-lg border border-gray-300 p-1 dark:border-gray-700">
        {themeOptions.map(({ value, icon: Icon }) => (
          <div key={value} className="rounded-md p-1.5">
            <Icon className="size-4 text-gray-400" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex gap-1 rounded-lg border border-gray-300 p-1 dark:border-gray-700">
      {themeOptions.map(({ value, icon: Icon, label }) => (
        <button
          key={value}
          onClick={() => setTheme(value)}
          className={`rounded-md p-1.5 transition-colors ${
            theme === value
              ? 'bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white'
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
          }`}
          title={label}
          aria-label={`Switch to ${label} theme`}
        >
          <Icon className="size-4" />
        </button>
      ))}
    </div>
  );
}
