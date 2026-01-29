import Image from 'next/image';
import clsx from 'clsx';

const objectFitOptions = [
  { value: 'cover', description: 'Fills container, may crop' },
  { value: 'contain', description: 'Shows full image, may have gaps' },
  { value: 'fill', description: 'Stretches to fill container' },
  { value: 'none', description: 'Original size, may overflow' },
] as const;

export function FillModeDemo() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-medium text-gray-200">
          Fill Mode with object-fit
        </h3>
        <p className="text-sm text-gray-500">
          Use{' '}
          <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs">
            fill
          </code>{' '}
          prop when the image should fill its parent container. Combine with
          object-fit for different behaviors.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {objectFitOptions.map((option) => (
          <div key={option.value} className="flex flex-col gap-2">
            <div className="relative h-40 overflow-hidden rounded-lg bg-gray-900/50">
              <Image
                src="/shop/weights.png"
                alt={`Image with object-fit: ${option.value}`}
                fill
                className={clsx({
                  'object-cover': option.value === 'cover',
                  'object-contain': option.value === 'contain',
                  'object-fill': option.value === 'fill',
                  'object-none': option.value === 'none',
                })}
                sizes="(max-width: 640px) 50vw, 25vw"
              />
            </div>
            <div className="text-center">
              <code className="text-sm font-medium text-gray-300">
                {option.value}
              </code>
              <p className="text-xs text-gray-600">{option.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-2 rounded-lg border border-gray-800 bg-gray-900/30 p-3">
        <h4 className="text-sm font-medium text-gray-300">
          When to use fill mode
        </h4>
        <ul className="flex flex-col gap-1 text-xs text-gray-500">
          <li className="flex items-center gap-2">
            <span className="size-1 rounded-full bg-orange-500" />
            Unknown image dimensions (user uploads, CMS content)
          </li>
          <li className="flex items-center gap-2">
            <span className="size-1 rounded-full bg-orange-500" />
            Hero images that span full viewport width
          </li>
          <li className="flex items-center gap-2">
            <span className="size-1 rounded-full bg-orange-500" />
            Card layouts with consistent aspect ratios
          </li>
        </ul>
        <p className="mt-1 text-xs text-gray-500">
          <strong className="text-orange-400">Important:</strong> Parent element
          must have{' '}
          <code className="rounded bg-gray-800 px-1">position: relative</code>{' '}
          for fill to work correctly.
        </p>
      </div>
    </div>
  );
}
