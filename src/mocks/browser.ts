import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

// Export the worker instance with explicit service worker URL
export const worker = setupWorker(...handlers);

// Enable request logging in development
if (process.env.NODE_ENV === 'development') {
  worker.events.on('request:start', ({ request }) => {
    console.log('MSW intercepting:', request.method, request.url);
  });
}
