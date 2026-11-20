import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ErrorBoundary } from './components/ErrorBoundary';
import './index.css';

const rootElement = document.getElementById('root');

/**
 * If the module fails before React mounts, the page would otherwise stay blank.
 * Render the failure into the document so it is never an unexplained white screen.
 */
function showFatal(message: string) {
  if (!rootElement || rootElement.childElementCount > 0) return;
  const box = document.createElement('div');
  box.style.cssText =
    'min-height:100vh;padding:24px;background:#fef2f2;color:#7f1d1d;' +
    'font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:13px;' +
    'line-height:1.6;white-space:pre-wrap';
  box.textContent =
    `Novela Global could not start.\n\n${message}\n\n` +
    'Open the browser console for details, then reload the page.';
  rootElement.appendChild(box);
}

window.addEventListener('error', event => {
  if (event instanceof ErrorEvent) showFatal(event.message || 'Unknown script error');
});

window.addEventListener('unhandledrejection', event => {
  const reason = event.reason;
  showFatal(reason instanceof Error ? reason.message : String(reason ?? 'Unknown error'));
});

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </React.StrictMode>
  );
}
