import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

// Export the worker instance with explicit service worker URL
export const worker = setupWorker(...handlers);

// Log when MSW is activated
worker.events.on('request:start', ({ request }) => {
  console.log(`[MSW] Intercepted ${request.method} ${request.url}`);
});

// Enable request logging in development
if (process.env.NODE_ENV === 'development') {
  worker.events.on('request:start', ({ request }) => {
    console.log('MSW intercepting:', request.method, request.url);
  });
}
