import { ClientHighlightedCode } from './client-highlighted-code';

const codeExamples = [
  {
    id: 0,
    code: `// Static metadata export
export const metadata = {
  title: 'About Us',
  description: 'Learn more about our company and mission.',
  openGraph: {
    title: 'About Us | My App',
    images: ['/og/about.png'],
  },
};`,
  },
  {
    id: 1,
    code: `// Dynamic metadata function
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      images: [\`/api/og?title=\${post.title}\`],
    },
  };
}`,
  },
  {
    id: 2,
    code: `// Parent layout.tsx
export const metadata = {
  title: {
    template: '%s | Dashboard | My App',
    default: 'Dashboard',
  },
};

// Child page.tsx
export const metadata = {
  title: 'Settings', // Becomes: Settings | Dashboard | My App
  robots: 'noindex, nofollow',
};`,
  },
];

type CodeExampleProps = { exampleId: number };

export function CodeExample({ exampleId }: CodeExampleProps) {
  const example = codeExamples.find((ex) => ex.id === exampleId);

  if (!example) {
    return null;
  }

  return <ClientHighlightedCode code={example.code} language="tsx" />;
}
