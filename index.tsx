import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { worker } from '@/mocks/browser';
import App from "./App";
import { AuthProvider } from "./src/contexts/AuthContext/AuthContext";

const startApp = () => {
  const rootContainer = document.getElementById("root") as HTMLElement;
  createRoot(rootContainer).render(
    <StrictMode>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </StrictMode>
  );
};

// Initialize MSW in both development and production
// Get the base URL for the current deployment
// For Netlify deployments, we want to make sure the service worker is loaded from the root
const isNetlify = window.location.hostname.includes('netlify.app');
const swUrl = isNetlify ? '/mockServiceWorker.js' : `${window.location.pathname}mockServiceWorker.js`.replace(/\/+/g, '/');

// Debug info for deployment
console.log('MSW initializing with service worker URL:', swUrl);
console.log('Current location pathname:', window.location.pathname);
console.log('Current location href:', window.location.href);
console.log('Is Netlify deployment:', isNetlify);

worker.start({
  serviceWorker: {
    url: swUrl,
  },
  onUnhandledRequest: 'bypass',
  quiet: false, // Always log for debugging
}).then(() => {
  console.log('✅ MSW is ready and intercepting requests');
  console.log('MSW handlers loaded:', worker.listHandlers().length);
  startApp();
}).catch((error) => {
  console.error('❌ Failed to start MSW:', error);
  console.error('Error details:', error.message);
  console.error('Stack:', error.stack);
  startApp(); // Start app anyway if MSW fails
});
