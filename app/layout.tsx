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
  title: {
    default: 'The App Router Gallery',
    template: '%s | The App Router Gallery',
  },
  metadataBase: new URL('https://the-app-router-gallery.vercel.app'),
  description:
    'An interactive showcase to explore Next.js App Router features such as nested layouts, instant loading states, streaming, and component level data fetching.',
  openGraph: {
    title: 'The App Router Gallery',
    description:
      'An interactive showcase to explore Next.js App Router features such as nested layouts, instant loading states, streaming, and component level data fetching.',
    images: [`/api/og?title=The App Router Gallery`],
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
        className={`overflow-y-scroll bg-white font-sans dark:bg-gray-950 ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <div className="fixed top-0 z-10 flex w-full flex-col border-b border-gray-200 bg-white lg:bottom-0 lg:z-auto lg:w-72 lg:border-r lg:border-b-0 dark:border-gray-800 dark:bg-black">
            <GlobalNav items={demos} />
          </div>

          <div className="lg:pl-72">
            <div className="mx-auto mt-14 mb-16 max-w-4xl -space-y-px px-3 sm:mb-20 sm:px-6 lg:mt-0 lg:mb-24 lg:px-8 lg:py-8">
              {children}

              <Byline />
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
