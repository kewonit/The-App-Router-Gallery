import { Boundary } from '#/ui/boundary';
import { BasicImages } from './_components/basic-images';
import { ResponsiveImages } from './_components/responsive-images';
import { PlaceholderImages } from './_components/placeholder-images';
import { FillModeDemo } from './_components/fill-mode-demo';
import { ImageComparison } from './_components/image-comparison';
import { PriorityDemo } from './_components/priority-demo';

export default function Page() {
  return (
    <Boundary label="page.tsx" animateRerendering={false}>
      <div className="flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold text-gray-100">
            Image Optimization
          </h1>
          <p className="text-sm text-gray-400">
            Next.js{' '}
            <code className="rounded bg-gray-800 px-1.5 py-0.5 font-mono text-xs text-gray-300">
              {'<Image>'}
            </code>{' '}
            component automatically optimizes images for size, format
            (WebP/AVIF), and lazy loading.
          </p>
        </div>

        {/* Priority Loading Demo */}
        <Boundary
          label="Priority Loading"
          size="small"
          color="pink"
          animateRerendering={false}
        >
          <PriorityDemo />
        </Boundary>

        {/* Basic Images */}
        <Boundary
          label="Basic Images with Dimensions"
          size="small"
          color="blue"
          animateRerendering={false}
        >
          <BasicImages />
        </Boundary>

        {/* Placeholder & Blur */}
        <Boundary
          label="Placeholder & Blur Effects"
          size="small"
          color="violet"
          animateRerendering={false}
        >
          <PlaceholderImages />
        </Boundary>

        {/* Responsive Images */}
        <Boundary
          label="Responsive Images with sizes"
          size="small"
          color="cyan"
          animateRerendering={false}
        >
          <ResponsiveImages />
        </Boundary>

        {/* Fill Mode */}
        <Boundary
          label="Fill Mode with object-fit"
          size="small"
          color="orange"
          animateRerendering={false}
        >
          <FillModeDemo />
        </Boundary>

        {/* Comparison */}
        <Boundary
          label="Optimization Comparison"
          size="small"
          color="cyan"
          animateRerendering={false}
        >
          <ImageComparison />
        </Boundary>
      </div>
    </Boundary>
  );
}
