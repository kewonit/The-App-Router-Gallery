'use client';

import { Boundary } from '#/ui/boundary';
import { HighlightedCode } from '#/ui/code-block';
import { useState } from 'react';

export function RouteHandlerDemo() {
  const [response, setResponse] = useState<{
    type: string;
    data: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  const testEndpoint = async (type: 'get' | 'post' | 'stream') => {
    setLoading(true);
    setResponse(null);

    try {
      if (type === 'stream') {
        const res = await fetch('/route-handlers/api/stream');
        const reader = res.body?.getReader();
        const decoder = new TextDecoder();
        let result = '';

        if (reader) {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            result += decoder.decode(value);
            setResponse({ type: 'stream', data: result });
          }
        }
      } else if (type === 'post') {
        const res = await fetch('/route-handlers/api/hello', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: 'Hello from client' }),
        });
        const data = await res.json();
        setResponse({ type: 'post', data: JSON.stringify(data, null, 2) });
      } else {
        const res = await fetch('/route-handlers/api/hello');
        const data = await res.json();
        setResponse({ type: 'get', data: JSON.stringify(data, null, 2) });
      }
    } catch (e) {
      setResponse({ type, data: String(e) });
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-6">
      <Boundary label="Try it" size="small" animateRerendering={false}>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => testEndpoint('get')}
            disabled={loading}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm shadow-blue-200 transition-all duration-150 hover:cursor-pointer hover:bg-blue-500 hover:shadow-md focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:outline-none active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 dark:shadow-blue-900/30 dark:focus-visible:ring-offset-gray-950"
          >
            GET /api/hello
          </button>
          <button
            onClick={() => testEndpoint('post')}
            disabled={loading}
            className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm shadow-green-200 transition-all duration-150 hover:cursor-pointer hover:bg-green-500 hover:shadow-md focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 focus-visible:outline-none active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 dark:shadow-green-900/30 dark:focus-visible:ring-offset-gray-950"
          >
            POST /api/hello
          </button>
          <button
            onClick={() => testEndpoint('stream')}
            disabled={loading}
            className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white shadow-sm shadow-purple-200 transition-all duration-150 hover:cursor-pointer hover:bg-purple-500 hover:shadow-md focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:outline-none active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 dark:shadow-purple-900/30 dark:focus-visible:ring-offset-gray-950"
          >
            Stream
          </button>
        </div>

        {response && (
          <pre className="mt-4 overflow-x-auto rounded-lg bg-gray-100 p-3 text-xs text-gray-800 dark:bg-gray-900 dark:text-gray-200">
            {response.data}
            {loading && response.type === 'stream' && (
              <span className="animate-pulse">▌</span>
            )}
          </pre>
        )}
      </Boundary>

      <Boundary label="GET Handler" size="small" animateRerendering={false}>
        <HighlightedCode
          code={`// app/api/hello/route.ts
export async function GET() {
  return Response.json({
    message: 'Hello!',
    timestamp: new Date().toISOString(),
  })
}`}
          language="tsx"
          filename="app/api/hello/route.ts"
        />
      </Boundary>

      <Boundary label="POST Handler" size="small" animateRerendering={false}>
        <HighlightedCode
          code={`export async function POST(request: Request) {
  const body = await request.json()

  return Response.json({
    received: body,
    processed: true,
  })
}`}
          language="tsx"
        />
      </Boundary>

      <Boundary
        label="Streaming"
        size="small"
        color="cyan"
        animateRerendering={false}
      >
        <HighlightedCode
          code={`export async function GET() {
  const encoder = new TextEncoder()

  const stream = new ReadableStream({
    async start(controller) {
      for (const chunk of ['Hello', ' ', 'World!']) {
        controller.enqueue(encoder.encode(chunk))
        await new Promise(r => setTimeout(r, 500))
      }
      controller.close()
    },
  })

  return new Response(stream)
}`}
          language="tsx"
        />
      </Boundary>
    </div>
  );
}
