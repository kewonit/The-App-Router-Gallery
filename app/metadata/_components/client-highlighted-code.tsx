'use client';

import { useEffect, useState } from 'react';
import {
  Pre,
  InnerLine,
  highlight,
  type AnnotationHandler,
} from 'codehike/code';
import { ScrollArea } from '#/ui/scroll-area';
import clsx from 'clsx';

const lineNumbers: AnnotationHandler = {
  name: 'line-numbers',
  Line: (props) => {
    const width = props.totalLines.toString().length + 1;

    return (
      <div className="flex" key={props.lineNumber}>
        <span
          className="text-right opacity-20 select-none"
          style={{ minWidth: `${width}ch` }}
        >
          {props.lineNumber}
        </span>
        <InnerLine merge={props} className="..." />
      </div>
    );
  },
};

const mark: AnnotationHandler = {
  name: 'mark',
  Line: ({ annotation, ...props }) => {
    const colors = {
      red: 'border-l-red-600 bg-red-600/10',
      blue: 'border-l-blue-600 bg-blue-600/10',
      green: 'border-l-green-600 bg-green-600/10',
      yellow: 'border-l-yellow-600 bg-yellow-600/10',
    };

    const color = (annotation?.query || 'blue') as keyof typeof colors;

    return (
      <div
        className={clsx('border-l-2 border-transparent', {
          [colors[color]]: annotation,
        })}
      >
        <InnerLine merge={props} className="px-[2ch]" />
      </div>
    );
  },
};

type ClientHighlightedCodeProps = { code: string; language?: string };

export function ClientHighlightedCode({
  code,
  language = 'tsx',
}: ClientHighlightedCodeProps) {
  const [highlighted, setHighlighted] = useState<any>(null);

  useEffect(() => {
    highlight({ value: code, lang: language, meta: '' }, 'github-dark').then(
      setHighlighted,
    );
  }, [code, language]);

  if (!highlighted) {
    return (
      <div className="overflow-hidden rounded-lg border border-gray-700 bg-gray-900">
        <div className="h-40 animate-pulse rounded bg-gray-800 p-4" />
      </div>
    );
  }

  const { background, ...style } = highlighted.style;

  return (
    <div className="overflow-hidden rounded-lg border border-gray-700 bg-gray-900">
      <ScrollArea className="w-full">
        <Pre
          className="min-w-max px-0 py-3 font-mono text-sm leading-5"
          code={highlighted}
          handlers={[mark, lineNumbers]}
          style={{ ...style }}
        />
      </ScrollArea>
    </div>
  );
}
