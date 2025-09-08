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

// Initialize MSW in development and wait for it to be ready
if (process.env.NODE_ENV === 'development') {
  worker.start({
    serviceWorker: {
      url: '/mockServiceWorker.js',
    },
    onUnhandledRequest: 'bypass',
    quiet: false,
  }).then(() => {
    console.log('MSW is ready, starting React app');
    startApp();
  }).catch((error) => {
    console.error('Failed to start MSW:', error);
    startApp(); // Start app anyway if MSW fails
  });
} else {
  startApp();
}
