import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { USE_MSW } from './src/config/api.ts';
import { worker } from './src/mocks/browser';
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

// Initialize MSW only when needed
const initializeMSW = async () => {
  if (!USE_MSW) {
    console.log('MSW disabled, using real API');
    return Promise.resolve();
  }

  console.log('Initializing MSW...');
  
  try {
    const isNetlify = window.location.hostname.includes('netlify.app');
    const swUrl = '/mockServiceWorker.js';

    console.log('MSW Service Worker URL:', swUrl);
    console.log('Is Netlify deployment:', isNetlify);

    await worker.start({
      serviceWorker: {
        url: swUrl,
      },
      onUnhandledRequest: 'bypass',
      quiet: false,
    });

    console.log('✅ MSW is ready and intercepting requests');
    console.log('MSW handlers loaded:', worker.listHandlers().length);
  } catch (error) {
    console.error('❌ Failed to start MSW:', error);
    throw error;
  }
};

// Start the app
initializeMSW()
  .then(() => {
    startApp();
  })
  .catch((error) => {
    console.error('MSW initialization failed, starting app anyway:', error);
    startApp();
  });
