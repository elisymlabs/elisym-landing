import './app.css';
import { StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { Router } from './Router';

hydrateRoot(
  document.getElementById('root')!,
  <StrictMode>
    <Router />
  </StrictMode>,
);
