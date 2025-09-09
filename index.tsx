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
worker.start({
  serviceWorker: {
    url: `${window.location.origin}/mockServiceWorker.js`,
  },
  onUnhandledRequest: 'bypass',
  quiet: process.env.NODE_ENV !== 'development',
}).then(() => {
  console.log('MSW is ready, starting React app');
  startApp();
}).catch((error) => {
  console.error('Failed to start MSW:', error);
  startApp(); // Start app anyway if MSW fails
});
