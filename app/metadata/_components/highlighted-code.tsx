'use cache';

import { Pre, InnerLine, highlight } from 'codehike/code';
import { lineNumbers } from '#/ui/codehike';
import clsx from 'clsx';

const mark = {
  name: 'mark',
  Line: ({ annotation, ...props }: any) => {
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

type HighlightedCodeProps = { code: string; language?: string };

export async function HighlightedCode({
  code,
  language = 'tsx',
}: HighlightedCodeProps) {
  const highlighted = await highlight(
    { value: code, lang: language, meta: '' },
    'github-dark',
  );

  const { background, ...style } = highlighted.style;

  return (
    <div className="overflow-hidden rounded-lg border border-gray-700 bg-gray-900">
      <div className="overflow-x-auto">
        <Pre
          className="min-w-max px-0 py-3 font-mono text-sm leading-5"
          code={highlighted}
          handlers={[mark, lineNumbers]}
          style={{ ...style }}
        />
      </div>
    </div>
  );
}
