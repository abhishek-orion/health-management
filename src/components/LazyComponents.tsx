import { lazy, Suspense } from 'react';
import { cn } from '@/lib/utils';
import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary';

// Simplified loading fallback for components
const LoadingFallback = ({ 
  className, 
  height = "h-32",
  text = "Loading..."
}: { 
  className?: string;
  height?: string;
  text?: string;
}) => (
  <div className={cn("flex items-center justify-center", height, className)}>
    <div className="text-center">
      <div 
        className="animate-spin rounded-full h-8 w-8 border-2 border-border border-t-primary mx-auto mb-2"
        role="status"
        aria-label={text}
      />
      <p className="text-sm text-muted-foreground">{text}</p>
    </div>
  </div>
);

// Simple error fallback for lazy components
const ErrorFallback = ({ componentName }: { componentName: string }) => (
  <div className="flex flex-col items-center justify-center p-4 text-center border border-border rounded-lg">
    <div className="text-error mb-2">Failed to load component</div>
    <div className="text-xs text-muted-foreground">
      Could not load {componentName}. Please try refreshing the page.
    </div>
    <button 
      onClick={() => window.location.reload()} 
      className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
    >
      Refresh Page
    </button>
  </div>
);

// Simple lazy loaded components
const LazyPatientsTable = lazy(() => import('@/components/PatientsTable/PatientsTable'));
const LazyAddEditPatientModal = lazy(() => import('@/components/AddEditPatientModal/AddEditPatientModal'));
const LazyPatientAccordion = lazy(() => import('@/components/PatientAccordion/PatientAccordion'));

// Exported components with simple Suspense and ErrorBoundary
export const PatientsTable = (props: any) => (
  <ErrorBoundary fallback={<ErrorFallback componentName="PatientsTable" />}>
    <Suspense fallback={<LoadingFallback height="h-64" text="Loading patient table..." />}>
      <LazyPatientsTable {...props} />
    </Suspense>
  </ErrorBoundary>
);

export const AddEditPatientModal = (props: any) => (
  <ErrorBoundary fallback={<ErrorFallback componentName="AddEditPatientModal" />}>
    <Suspense fallback={<LoadingFallback height="h-48" text="Loading patient form..." />}>
      <LazyAddEditPatientModal {...props} />
    </Suspense>
  </ErrorBoundary>
);

export const PatientAccordion = (props: any) => (
  <ErrorBoundary fallback={<ErrorFallback componentName="PatientAccordion" />}>
    <Suspense fallback={<LoadingFallback height="h-40" text="Loading patient details..." />}>
      <LazyPatientAccordion {...props} />
    </Suspense>
  </ErrorBoundary>
);

// Simplified modal loading fallback
export const ModalLoadingFallback = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center">
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
    <div className="relative mx-4 w-full max-w-lg rounded-lg bg-background border border-border p-6">
      <LoadingFallback height="h-32" text="Loading modal..." />
    </div>
  </div>
);