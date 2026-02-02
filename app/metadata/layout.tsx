import React from 'react';
import db from '#/lib/db';
import { Boundary } from '#/ui/boundary';
import { Mdx } from '#/ui/codehike';
import type { Metadata } from 'next';
import readme from './readme.mdx';

export async function generateMetadata(): Promise<Metadata> {
  const demo = db.demo.find({ where: { slug: 'metadata' } });

  return {
    title: demo.name,
    description: demo.description,
    openGraph: {
      title: demo.name,
      description: demo.description,
      images: [`/api/og?title=${encodeURIComponent(demo.name)}`],
    },
  };
}

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Boundary label="Demo" kind="solid" animateRerendering={false}>
        <Mdx source={readme} collapsed={true} />
      </Boundary>

      <Boundary label="layout.tsx" kind="solid" animateRerendering={false}>
        {children}
      </Boundary>
    </>
  );
}
