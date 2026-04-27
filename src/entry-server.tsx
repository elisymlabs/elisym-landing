/**
 * Server entry point for SSG.
 * Renders page components directly without a router (no StaticRouter needed).
 */
import type React from 'react';
import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { App } from './App';
import { Blog } from './Blog';
import { BlogPost } from './BlogPost';
import { posts } from './posts';

// Map routes to page components. Add new pages here.
const pages: Record<string, () => React.ReactNode> = {
  '/': App,
  '/blog': Blog,
  ...Object.fromEntries(
    posts.map((post) => [`/blog/${post.slug}`, () => <BlogPost post={post} />]),
  ),
};

export function render(url: string): string {
  const Page = pages[url];
  if (!Page) {
    throw new Error(`No page component for route: ${url}`);
  }
  return renderToString(
    <StrictMode>
      <Page />
    </StrictMode>,
  );
}

export { pages };
