'use cache';

import { Boundary } from '#/ui/boundary';
import Image from 'next/image';

const images = [
  { src: '/shop/headphones.png', name: 'Headphones' },
  { src: '/shop/laptop.png', name: 'Laptop' },
  { src: '/shop/phone.png', name: 'Phone' },
  { src: '/shop/tablet.png', name: 'Tablet' },
  { src: '/shop/shoes.png', name: 'Shoes' },
  { src: '/shop/top.png', name: 'Top' },
];

export default async function Page() {
  return (
    <Boundary label="page.tsx">
      <div className="flex flex-col gap-4">
        <h1 className="text-xl font-medium text-gray-700 dark:text-gray-300">
          Images{' '}
          <span className="font-mono tracking-tighter text-gray-500 dark:text-gray-600">
            ({images.length})
          </span>
        </h1>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {images.map((img) => (
            <div key={img.src} className="group flex flex-col gap-2.5">
              <div className="overflow-hidden rounded-md bg-gray-100 p-8 group-hover:bg-gray-200 dark:bg-gray-900/50 dark:group-hover:bg-gray-900">
                <Image
                  src={img.src}
                  alt={img.name}
                  width={400}
                  height={400}
                  quality={90}
                />
              </div>
              <div className="flex flex-col gap-2">
                <div className="h-2 w-4/5 rounded-full bg-gray-200 dark:bg-gray-800" />
                <div className="h-2 w-1/3 rounded-full bg-gray-200 dark:bg-gray-800" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Boundary>
  );
}
