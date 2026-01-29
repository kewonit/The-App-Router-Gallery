export function ImageComparison() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-medium text-gray-200">
          Optimization Benefits
        </h3>
        <p className="text-sm text-gray-500">
          Compare Next.js Image component with native HTML img element.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Next.js Image */}
        <div className="flex flex-col gap-3 rounded-lg border border-green-900/50 bg-green-950/20 p-4">
          <div className="flex items-center gap-2">
            <div className="flex size-6 items-center justify-center rounded-full bg-green-600 text-xs font-bold text-white">
              ✓
            </div>
            <h4 className="font-medium text-green-400">Next.js Image</h4>
          </div>

          <ul className="flex flex-col gap-2 text-sm">
            <FeatureItem positive>
              Automatic WebP/AVIF conversion (~30-50% smaller)
            </FeatureItem>
            <FeatureItem positive>
              Lazy loading by default (only loads when in viewport)
            </FeatureItem>
            <FeatureItem positive>
              Automatic srcset generation for responsive images
            </FeatureItem>
            <FeatureItem positive>
              Prevents Cumulative Layout Shift (CLS)
            </FeatureItem>
            <FeatureItem positive>
              Built-in blur placeholder support
            </FeatureItem>
            <FeatureItem positive>
              Automatic image resizing on the fly
            </FeatureItem>
          </ul>

          <pre className="mt-2 overflow-auto rounded bg-gray-900 p-3 text-xs">
            <code className="text-green-300">{`import Image from 'next/image';

<Image
  src="/hero.jpg"
  alt="Hero"
  width={1200}
  height={600}
  priority
  placeholder="blur"
/>`}</code>
          </pre>
        </div>

        {/* Native img */}
        <div className="flex flex-col gap-3 rounded-lg border border-gray-800 bg-gray-900/30 p-4">
          <div className="flex items-center gap-2">
            <div className="flex size-6 items-center justify-center rounded-full bg-gray-600 text-xs font-bold text-white">
              ○
            </div>
            <h4 className="font-medium text-gray-400">Native HTML img</h4>
          </div>

          <ul className="flex flex-col gap-2 text-sm">
            <FeatureItem>
              No format conversion (serves original format)
            </FeatureItem>
            <FeatureItem>Requires manual lazy loading attribute</FeatureItem>
            <FeatureItem>Manual srcset configuration needed</FeatureItem>
            <FeatureItem>
              Causes layout shift without explicit dimensions
            </FeatureItem>
            <FeatureItem>No built-in placeholder support</FeatureItem>
            <FeatureItem>Requires manual image processing</FeatureItem>
          </ul>

          <pre className="mt-2 overflow-auto rounded bg-gray-950 p-3 text-xs">
            <code className="text-gray-400">{`<img
  src="/hero.jpg"
  alt="Hero"
  width="1200"
  height="600"
  loading="lazy"
  style={{ width: '100%' }}
/>`}</code>
          </pre>
        </div>
      </div>

      {/* Performance Stats */}
      <div className="rounded-lg border border-gray-800 bg-gray-900/30 p-4">
        <h4 className="mb-3 font-medium text-gray-300">
          Typical Performance Gains
        </h4>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard label="File Size" value="-40%" color="green" />
          <StatCard label="Load Time" value="-60%" color="blue" />
          <StatCard label="LCP Score" value="+30%" color="violet" />
          <StatCard label="CLS Score" value="0" color="cyan" />
        </div>
      </div>
    </div>
  );
}

function FeatureItem({
  children,
  positive,
}: {
  children: React.ReactNode;
  positive?: boolean;
}) {
  return (
    <li className="flex items-start gap-2">
      <span
        className={`mt-1 size-1.5 shrink-0 rounded-full ${
          positive ? 'bg-green-500' : 'bg-gray-600'
        }`}
      />
      <span className={positive ? 'text-gray-300' : 'text-gray-500'}>
        {children}
      </span>
    </li>
  );
}

function StatCard({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: 'green' | 'blue' | 'violet' | 'cyan';
}) {
  const colorClasses = {
    green: 'text-green-400 bg-green-900/30',
    blue: 'text-blue-400 bg-blue-900/30',
    violet: 'text-violet-400 bg-violet-900/30',
    cyan: 'text-cyan-400 bg-cyan-900/30',
  };

  return (
    <div className={`rounded-lg p-3 text-center ${colorClasses[color]}`}>
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-xs text-gray-500">{label}</div>
    </div>
  );
}
