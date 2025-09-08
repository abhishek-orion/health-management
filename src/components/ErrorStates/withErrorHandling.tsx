import React, { ComponentType } from 'react';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import { ErrorDisplay } from './ErrorDisplay';

interface WithErrorHandlingProps {
  errorHandler: ReturnType<typeof useErrorHandler>;
  fallbackComponent?: ComponentType<any>;
  showErrorBoundary?: boolean;
}

/**
 * Higher-Order Component (HOC) that adds error handling to any component
 */
export function withErrorHandling<P extends object>(
  WrappedComponent: ComponentType<P>,
  options: {
    showErrorInline?: boolean;
    errorSize?: 'sm' | 'md' | 'lg';
    context?: string;
  } = {}
) {
  const WithErrorHandlingComponent = (props: P & Partial<WithErrorHandlingProps>) => {
    const errorHandler = useErrorHandler();
    
    const {
      fallbackComponent: FallbackComponent,
      showErrorBoundary = true,
      ...wrappedProps
    } = props;

    // If there's an error, show the error display
    if (errorHandler.isError && options.showErrorInline) {
      return (
        <ErrorDisplay
          error={errorHandler.error!}
          onRetry={errorHandler.retryLastAction}
          onClear={errorHandler.clearError}
          size={options.errorSize}
          context={options.context}
        />
      );
    }

    // Render the wrapped component with error handler passed as prop
    return (
      <WrappedComponent
        {...(wrappedProps as P)}
        errorHandler={errorHandler}
      />
    );
  };

  WithErrorHandlingComponent.displayName = `withErrorHandling(${WrappedComponent.displayName || WrappedComponent.name})`;

  return WithErrorHandlingComponent;
}

/**
 * Hook to provide error handling context to components
 */
export const useErrorBoundary = () => {
  const errorHandler = useErrorHandler();

  const showError = (error: any, context?: string) => {
    errorHandler.handleError(error, context);
  };

  const showHttpError = async (response: Response, context?: string) => {
    await errorHandler.handleHttpError(response, context);
  };

  return {
    showError,
    showHttpError,
    clearError: errorHandler.clearError,
    hasError: errorHandler.isError,
    error: errorHandler.error,
    retryLastAction: errorHandler.retryLastAction,
  };
};

/**
 * Component wrapper for conditional error display
 */
interface ErrorBoundaryWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  context?: string;
  className?: string;
}

export const ErrorBoundaryWrapper: React.FC<ErrorBoundaryWrapperProps> = ({
  children,
  fallback,
  size = 'md',
  context,
  className
}) => {
  const errorHandler = useErrorHandler();

  if (errorHandler.isError) {
    if (fallback) {
      return <>{fallback}</>;
    }

    return (
      <ErrorDisplay
        error={errorHandler.error!}
        onRetry={errorHandler.retryLastAction}
        onClear={errorHandler.clearError}
        size={size}
        context={context}
        className={className}
      />
    );
  }

  return <>{children}</>;
};