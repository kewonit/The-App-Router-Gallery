import { Boundary } from '#/ui/boundary';
import { HighlightedCode } from '#/ui/code-block';
import {
  Geist,
  Geist_Mono,
  Inter,
  Roboto_Mono,
  Playfair_Display,
} from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
});

const geist = Geist({ subsets: ['latin'], variable: '--font-geist-showcase' });

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono-showcase',
});

export function FontShowcase() {
  return (
    <div className="flex flex-col gap-6">
      <Boundary
        label="Sans-Serif Fonts"
        size="small"
        animateRerendering={false}
      >
        <div className="flex flex-col gap-4">
          <div className={geist.variable}>
            <h3 className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">
              Geist Sans
            </h3>
            <p
              className="text-2xl text-gray-800 dark:text-gray-200"
              style={{ fontFamily: 'var(--font-geist-showcase)' }}
            >
              The quick brown fox jumps over the lazy dog
            </p>
          </div>

          <div
            className={`${inter.variable} border-t border-gray-200 pt-4 dark:border-gray-800`}
          >
            <h3 className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">
              Inter
            </h3>
            <p
              className="text-2xl text-gray-800 dark:text-gray-200"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              The quick brown fox jumps over the lazy dog
            </p>
          </div>
        </div>
      </Boundary>

      <Boundary label="Monospace Fonts" size="small" animateRerendering={false}>
        <div className="flex flex-col gap-4">
          <div className={geistMono.variable}>
            <h3 className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">
              Geist Mono
            </h3>
            <pre
              className="rounded-lg bg-gray-100 p-4 text-sm text-gray-800 dark:bg-gray-900 dark:text-gray-200"
              style={{ fontFamily: 'var(--font-geist-mono-showcase)' }}
            >
              {`const greeting = "Hello, World!";
console.log(greeting);`}
            </pre>
          </div>

          <div
            className={`${robotoMono.variable} border-t border-gray-200 pt-4 dark:border-gray-800`}
          >
            <h3 className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">
              Roboto Mono
            </h3>
            <pre
              className="rounded-lg bg-gray-100 p-4 text-sm text-gray-800 dark:bg-gray-900 dark:text-gray-200"
              style={{ fontFamily: 'var(--font-roboto-mono)' }}
            >
              {`function add(a: number, b: number) {
  return a + b;
}`}
            </pre>
          </div>
        </div>
      </Boundary>

      <Boundary label="Serif Fonts" size="small" animateRerendering={false}>
        <div className={playfair.variable}>
          <h3 className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">
            Playfair Display
          </h3>
          <p
            className="text-3xl text-gray-800 dark:text-gray-200"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            The quick brown fox jumps over the lazy dog
          </p>
          <p
            className="mt-2 text-lg text-gray-600 italic dark:text-gray-400"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            Elegant serif typography
          </p>
        </div>
      </Boundary>

      <Boundary
        label="How it works"
        size="small"
        color="blue"
        animateRerendering={false}
      >
        <HighlightedCode
          code={`import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export default function Layout({ children }) {
  return (
    <html className={inter.className}>
      <body>{children}</body>
    </html>
  )
}`}
          language="tsx"
          filename="app/layout.tsx"
        />
      </Boundary>
    </div>
  );
}
