import '#/styles/globals.css';

import db from '#/lib/db';
import Byline from '#/ui/byline';
import { GlobalNav } from '#/ui/global-nav';
import { ThemeProvider } from '#/ui/theme-provider';
import { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: { default: 'Next.js Playground', template: '%s | Next.js Playground' },
  metadataBase: new URL('https://app-router.vercel.app'),
  description:
    'A playground to explore Next.js features such as nested layouts, instant loading states, streaming, and component level data fetching.',
  openGraph: {
    title: 'Next.js Playground',
    description:
      'A playground to explore Next.js features such as nested layouts, instant loading states, streaming, and component level data fetching.',
    images: [`/api/og?title=Next.js Playground`],
  },
  twitter: { card: 'summary_large_image' },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const demos = db.demo.findMany();
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`overflow-y-scroll bg-gray-50 font-sans dark:bg-gray-950 ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <div className="fixed top-0 z-10 flex w-full flex-col border-b border-gray-300 bg-white lg:bottom-0 lg:z-auto lg:w-72 lg:border-r lg:border-b-0 dark:border-gray-800 dark:bg-black">
            <GlobalNav items={demos} />
          </div>

          <div className="lg:pl-72">
            <div className="mx-auto mt-12 mb-24 max-w-4xl -space-y-[1px] lg:px-8 lg:py-8">
              {children}

              <Byline />
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
