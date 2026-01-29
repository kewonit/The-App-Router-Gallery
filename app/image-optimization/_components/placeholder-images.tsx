'use client';

import Image from 'next/image';
import { useState } from 'react';
import clsx from 'clsx';

// Base64 blur placeholder (tiny blurred version of image)
const blurDataURL =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAP0lEQVR4nAE0AMv/AOjo6P///+zs7NbW1gDc3NzX19fLy8u4uLgAwMDA09PT0dHRra2tAJycnL29vcHBwZmZmQxGF/3x7nB9AAAAAElFTkSuQmCC';

export function PlaceholderImages() {
  const [blurLoaded, setBlurLoaded] = useState(false);
  const [emptyLoaded, setEmptyLoaded] = useState(false);
  const [colorLoaded, setColorLoaded] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-medium text-gray-200">
          Placeholder Strategies
        </h3>
        <p className="text-sm text-gray-500">
          Show a placeholder while the image loads to improve perceived
          performance and prevent layout shift.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {/* Blur placeholder */}
        <div className="flex flex-col gap-2">
          <div className="relative overflow-hidden rounded-lg bg-gray-900/50 p-4">
            <Image
              src="/shop/phone.png"
              alt="Phone with blur placeholder"
              width={200}
              height={200}
              placeholder="blur"
              blurDataURL={blurDataURL}
              className={clsx(
                'mx-auto transition-opacity duration-500',
                blurLoaded ? 'opacity-100' : 'opacity-0',
              )}
              onLoad={() => setBlurLoaded(true)}
            />
            {!blurLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs text-gray-500">
                  Loading with blur...
                </span>
              </div>
            )}
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-300">
              Blur Placeholder
            </p>
            <code className="text-xs text-gray-600">placeholder="blur"</code>
          </div>
        </div>

        {/* Empty placeholder (default) */}
        <div className="flex flex-col gap-2">
          <div className="relative overflow-hidden rounded-lg bg-gray-900/50 p-4">
            <Image
              src="/shop/tablet.png"
              alt="Tablet with empty placeholder"
              width={200}
              height={200}
              placeholder="empty"
              className={clsx(
                'mx-auto transition-opacity duration-500',
                emptyLoaded ? 'opacity-100' : 'opacity-0',
              )}
              onLoad={() => setEmptyLoaded(true)}
            />
            {!emptyLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="size-6 animate-spin rounded-full border-2 border-gray-600 border-t-blue-500" />
              </div>
            )}
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-300">Empty (Default)</p>
            <code className="text-xs text-gray-600">placeholder="empty"</code>
          </div>
        </div>

        {/* Color placeholder */}
        <div className="flex flex-col gap-2">
          <div
            className="relative overflow-hidden rounded-lg p-4"
            style={{
              backgroundColor: colorLoaded ? 'rgb(17 24 39 / 0.5)' : '#1e3a5f',
            }}
          >
            <Image
              src="/shop/laptop.png"
              alt="Laptop with color placeholder"
              width={200}
              height={200}
              className={clsx(
                'mx-auto transition-opacity duration-500',
                colorLoaded ? 'opacity-100' : 'opacity-0',
              )}
              onLoad={() => setColorLoaded(true)}
            />
            {!colorLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs text-blue-200">
                  Color placeholder...
                </span>
              </div>
            )}
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-300">
              Color Background
            </p>
            <code className="text-xs text-gray-600">CSS background-color</code>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 rounded-lg border border-gray-800 bg-gray-900/30 p-3">
        <h4 className="text-sm font-medium text-gray-300">
          Generating blur placeholders
        </h4>
        <p className="text-xs text-gray-500">
          For static imports, Next.js automatically generates blur placeholders.
          For remote images, you can use{' '}
          <code className="rounded bg-gray-800 px-1">plaiceholder</code> or
          similar tools to generate tiny base64 previews at build time.
        </p>
      </div>
    </div>
  );
}
