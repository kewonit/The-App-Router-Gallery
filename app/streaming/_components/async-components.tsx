import { Boundary } from '#/ui/boundary';
import { connection } from 'next/server';

// Simulated delay function
async function delay(ms: number): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

// Generate random data for demo
function generateData(count: number): { id: number; value: string }[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    value: `Item ${i + 1}`,
  }));
}

export async function FastComponent() {
  await connection(); // Opt into dynamic rendering
  await delay(100);
  const data = generateData(3);

  return (
    <Boundary
      label={['<FastComponent>', '100ms']}
      size="small"
      color="cyan"
      animateRerendering={true}
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-cyan-400">Fast Data</h3>
          <span className="rounded bg-cyan-900/50 px-2 py-0.5 text-xs text-cyan-400">
            ~100ms
          </span>
        </div>

        <div className="flex flex-col gap-1.5">
          {data.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-2 rounded bg-gray-800/50 px-3 py-2 text-sm"
            >
              <span className="size-2 rounded-full bg-cyan-500" />
              <span className="text-gray-300">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </Boundary>
  );
}

export async function MediumComponent() {
  await connection(); // Opt into dynamic rendering
  await delay(500);
  const data = generateData(4);

  return (
    <Boundary
      label={['<MediumComponent>', '500ms']}
      size="small"
      color="blue"
      animateRerendering={true}
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-blue-400">Medium Data</h3>
          <span className="rounded bg-blue-900/50 px-2 py-0.5 text-xs text-blue-400">
            ~500ms
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {data.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-2 rounded bg-gray-800/50 px-3 py-2 text-sm"
            >
              <span className="size-2 rounded-full bg-blue-500" />
              <span className="text-gray-300">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </Boundary>
  );
}

export async function SlowComponent() {
  await connection(); // Opt into dynamic rendering
  await delay(1500);
  const data = generateData(5);

  return (
    <Boundary
      label={['<SlowComponent>', '1500ms']}
      size="small"
      color="orange"
      animateRerendering={true}
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-orange-400">Slow Data</h3>
          <span className="rounded bg-orange-900/50 px-2 py-0.5 text-xs text-orange-400">
            ~1500ms
          </span>
        </div>

        <div className="flex flex-col gap-1.5">
          {data.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between rounded bg-gray-800/50 px-3 py-2 text-sm"
            >
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-orange-500" />
                <span className="text-gray-300">{item.value}</span>
              </div>
              <span className="text-xs text-gray-600">
                #{String(item.id).padStart(3, '0')}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Boundary>
  );
}

export async function VerySlowComponent() {
  await connection(); // Opt into dynamic rendering
  await delay(3000);
  const data = generateData(3);

  return (
    <Boundary
      label={['<VerySlowComponent>', '3000ms']}
      size="small"
      color="pink"
      animateRerendering={true}
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-pink-400">Very Slow Data</h3>
          <span className="rounded bg-pink-900/50 px-2 py-0.5 text-xs text-pink-400">
            ~3000ms
          </span>
        </div>

        <div className="flex flex-col gap-2">
          {data.map((item) => (
            <div
              key={item.id}
              className="rounded border border-pink-900/50 bg-pink-950/20 p-3"
            >
              <div className="flex items-center gap-2">
                <span className="size-3 rounded-full bg-pink-500" />
                <span className="font-medium text-gray-200">{item.value}</span>
              </div>
              <p className="mt-1 text-xs text-gray-500">
                This component took ~3s to load
              </p>
            </div>
          ))}
        </div>
      </div>
    </Boundary>
  );
}
