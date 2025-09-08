import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoutes from "@/components/Auth/ProtectedRoutes";
import { PatientProvider } from "@/contexts/PatientContext/PatientContext";
import { ThemeProvider } from "@/contexts/ThemeContext/ThemeContext";
import ErrorBoundary from "@/components/ErrorBoundary/ErrorBoundary";

// Simple route-level loading fallback
const RouteLoadingFallback = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="text-center">
      <div 
        className="animate-spin rounded-full h-12 w-12 border-2 border-border border-t-primary mx-auto mb-4"
        role="status"
      />
      <p className="text-muted-foreground">Loading...</p>
    </div>
  </div>
);

// Lazy load screen components for code splitting
const LoginPage = lazy(() => import("./src/screens/Login"));
const Dashboard = lazy(() => import("./src/screens/Dashboard"));  
const PatientDetails = lazy(() => import("./src/screens/PatientDetails"));

const App = () => {
  return (
    <ThemeProvider>
      <ErrorBoundary>
        <Suspense fallback={<RouteLoadingFallback />}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoutes>
                  <PatientProvider>
                    <Dashboard />
                  </PatientProvider>
                </ProtectedRoutes>
              }
            />
            <Route
              path="/patient/:id"
              element={
                <ProtectedRoutes>
                  <PatientProvider>
                    <PatientDetails />
                  </PatientProvider>
                </ProtectedRoutes>
              }
            />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </ThemeProvider>
  );
};

export default App;