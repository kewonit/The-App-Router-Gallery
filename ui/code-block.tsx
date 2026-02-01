'use client';

import { useState, useCallback } from 'react';

type CopyButtonProps = { text: string; className?: string };

export function CopyButton({ text, className = '' }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      console.error('Failed to copy to clipboard');
    }
  }, [text]);

  return (
    <button
      onClick={handleCopy}
      className={`inline-flex items-center justify-center rounded-md p-1.5 text-gray-400 transition-colors hover:bg-gray-700 hover:text-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${className}`}
      aria-label={copied ? 'Copied' : 'Copy code'}
      type="button"
    >
      {copied ? (
        <svg
          className="h-4 w-4 text-green-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      ) : (
        <svg
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
      )}
    </button>
  );
}

type CodeBlockProps = {
  children: React.ReactNode;
  code: string;
  filename?: string;
  language?: string;
};

export function CodeBlock({
  children,
  code,
  filename,
  language,
}: CodeBlockProps) {
  return (
    <div className="group relative overflow-hidden rounded-lg border border-gray-700 bg-gray-900">
      {filename && (
        <div className="flex items-center justify-between border-b border-gray-700 bg-gray-800/50 px-4 py-2">
          <span className="text-xs font-medium text-gray-400">{filename}</span>
          {language && (
            <span className="rounded bg-gray-700 px-2 py-0.5 text-xs text-gray-300">
              {language}
            </span>
          )}
        </div>
      )}
      <div className="relative">
        <div className="absolute top-2 right-2 opacity-0 transition-opacity group-hover:opacity-100">
          <CopyButton text={code} />
        </div>
        {children}
      </div>
    </div>
  );
}
