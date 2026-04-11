import './app.css';
import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { Router } from './Router';

const container = document.getElementById('root');
if (!container) {
  throw new Error('Root container #root not found');
}

const tree = (
  <StrictMode>
    <Router />
  </StrictMode>
);

// In production, scripts/ssg.ts pre-renders every route into #root, so we
// hydrate. In dev there is no SSG step and #root is empty, so we mount
// fresh with createRoot — otherwise hydrateRoot would complain about the
// missing server HTML.
if (container.hasChildNodes()) {
  hydrateRoot(container, tree);
} else {
  createRoot(container).render(tree);
}
