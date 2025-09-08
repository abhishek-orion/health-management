import { HttpError } from '@/hooks/useErrorHandler';
import { UnauthorizedError } from './UnauthorizedError';
import { ForbiddenError } from './ForbiddenError';
import { NetworkError } from './NetworkError';
import { ServerError } from './ServerError';
import { NotFoundError } from './NotFoundError';
import { GenericError } from './GenericError';

interface ErrorDisplayProps {
  error: HttpError;
  onRetry?: () => void;
  onClear?: () => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showRetryButton?: boolean;
  context?: string;
}

export const ErrorDisplay = ({
  error,
  onRetry,
  onClear,
  className,
  size = 'md',
  showRetryButton = true,
  context
}: ErrorDisplayProps) => {
  const handleRetry = () => {
    if (onClear) onClear();
    if (onRetry) onRetry();
  };

  // Route to appropriate error component based on error type/status
  switch (error.type) {
    case '401':
      return (
        <UnauthorizedError
          message={error.message}
          showRetryButton={showRetryButton && error.retryable}
          onRetry={handleRetry}
          className={className}
          size={size}
        />
      );

    case '403':
      return (
        <ForbiddenError
          message={error.message}
          showRetryButton={showRetryButton && error.retryable}
          onRetry={handleRetry}
          className={className}
          size={size}
          showContactButton={true}
        />
      );

    case '404':
      return (
        <NotFoundError
          message={error.message}
          showRetryButton={showRetryButton && error.retryable}
          onRetry={handleRetry}
          className={className}
          size={size}
          context={context}
        />
      );

    case '500':
      return (
        <ServerError
          message={error.message}
          showRetryButton={showRetryButton && error.retryable}
          onRetry={handleRetry}
          className={className}
          size={size}
        />
      );

    case 'network':
    case 'timeout':
      return (
        <NetworkError
          message={error.message}
          type={error.type}
          showRetryButton={showRetryButton}
          onRetry={handleRetry}
          className={className}
          size={size}
        />
      );

    default:
      return (
        <GenericError
          message={error.message}
          statusCode={error.status}
          showRetryButton={showRetryButton && error.retryable}
          onRetry={handleRetry}
          className={className}
          size={size}
        />
      );
  }
};