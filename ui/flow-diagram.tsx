type NodeType =
  | 'default'
  | 'cache'
  | 'request'
  | 'response'
  | 'component'
  | 'server'
  | 'client'
  | 'error';

type FlowStep = string | { label: string; type: NodeType };

type FlowDiagramProps = {
  title: string;
  steps: FlowStep[];
  note?: string;
  direction?: 'horizontal' | 'vertical';
};

const nodeStyles: Record<NodeType, string> = {
  default: 'border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-800',
  cache:
    'border-emerald-400 bg-emerald-50 dark:border-emerald-600 dark:bg-emerald-950/50',
  request:
    'border-blue-400 bg-blue-50 dark:border-blue-600 dark:bg-blue-950/50',
  response:
    'border-purple-400 bg-purple-50 dark:border-purple-600 dark:bg-purple-950/50',
  component:
    'border-amber-400 bg-amber-50 dark:border-amber-600 dark:bg-amber-950/50',
  server: 'border-cyan-400 bg-cyan-50 dark:border-cyan-600 dark:bg-cyan-950/50',
  client: 'border-pink-400 bg-pink-50 dark:border-pink-600 dark:bg-pink-950/50',
  error: 'border-red-400 bg-red-50 dark:border-red-600 dark:bg-red-950/50',
};

const nodeTextStyles: Record<NodeType, string> = {
  default: 'text-gray-800 dark:text-gray-200',
  cache: 'text-emerald-800 dark:text-emerald-200',
  request: 'text-blue-800 dark:text-blue-200',
  response: 'text-purple-800 dark:text-purple-200',
  component: 'text-amber-800 dark:text-amber-200',
  server: 'text-cyan-800 dark:text-cyan-200',
  client: 'text-pink-800 dark:text-pink-200',
  error: 'text-red-800 dark:text-red-200',
};

function parseStep(step: FlowStep): { label: string; type: NodeType } {
  if (typeof step === 'string') {
    return { label: step, type: 'default' };
  }
  return step;
}

export function FlowDiagram({
  title,
  steps,
  note,
  direction = 'horizontal',
}: FlowDiagramProps) {
  const isVertical = direction === 'vertical';

  return (
    <section className="my-4 rounded-xl border border-gray-200 bg-linear-to-br from-gray-50 to-white p-4 shadow-sm sm:my-6 sm:p-6 dark:border-gray-800/70 dark:from-gray-900/40 dark:to-gray-950/40 dark:shadow-none">
      <div className="mb-4 flex items-center justify-between">
        <h4 className="bg-linear-to-r from-gray-700 to-gray-900 bg-clip-text text-sm font-bold tracking-wide text-transparent uppercase dark:from-gray-300 dark:to-gray-100">
          {title}
        </h4>
      </div>
      <div
        className={`flex ${isVertical ? 'flex-col' : 'flex-wrap'} items-center gap-2 sm:gap-3`}
      >
        {steps.map((step, index) => {
          const { label, type } = parseStep(step);
          return (
            <div
              key={`${label}-${index}`}
              className={`flex ${isVertical ? 'flex-col' : ''} items-center gap-3`}
            >
              <span
                className={`inline-flex items-center rounded-lg border px-4 py-2 text-sm font-semibold shadow-sm transition-all duration-200 hover:shadow-md ${nodeStyles[type]} ${nodeTextStyles[type]}`}
              >
                {label}
              </span>
              {index < steps.length - 1 ? (
                <svg
                  className={`h-4 w-4 shrink-0 text-gray-400 dark:text-gray-500 ${isVertical ? 'rotate-90' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              ) : null}
            </div>
          );
        })}
      </div>
      {note ? (
        <div className="mt-4 rounded-lg bg-blue-50/80 p-3 dark:bg-blue-950/20">
          <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
            {note}
          </p>
        </div>
      ) : null}
    </section>
  );
}
