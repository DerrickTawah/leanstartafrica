import React from 'react';
import ReactDOM from 'react-dom/client';
import { resolveRoute } from './routes';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Could not find root element to mount to');
}

const tree = <React.StrictMode>{resolveRoute(window.location.pathname)}</React.StrictMode>;

// `npm run build` prerenders real markup into #root, so attach to it rather
// than throwing it away and re-rendering. Falls back to a fresh render when the
// element is empty, which is what the dev server serves.
if (rootElement.firstElementChild) {
  ReactDOM.hydrateRoot(rootElement, tree);
} else {
  ReactDOM.createRoot(rootElement).render(tree);
}
