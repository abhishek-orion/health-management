import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext/AuthContext';

export type HttpErrorType = 
  | '400' // Bad Request
  | '401' // Unauthorized
  | '403' // Forbidden
  | '404' // Not Found
  | '500' // Internal Server Error
  | '503' // Service Unavailable
  | 'network' // Network Error
  | 'timeout' // Timeout Error
  | null;

export interface HttpError {
  status: number;
  message: string;
  type: HttpErrorType;
  timestamp: Date;
  retryable: boolean;
}

export interface UseErrorHandlerReturn {
  error: HttpError | null;
  isError: boolean;
  clearError: () => void;
  handleError: (error: any, context?: string) => void;
  handleHttpError: (response: Response, context?: string) => Promise<void>;
  retryLastAction: () => void;
  setRetryAction: (action: () => void) => void;
}

export const useErrorHandler = (): UseErrorHandlerReturn => {
  const [error, setError] = useState<HttpError | null>(null);
  const [lastAction, setLastAction] = useState<(() => void) | null>(null);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const clearError = useCallback(() => {
    setError(null);
    setLastAction(null);
  }, []);

  const getErrorType = (status: number): HttpErrorType => {
    switch (status) {
      case 400: return '400';
      case 401: return '401';
      case 403: return '403';
      case 404: return '404';
      case 500: return '500';
      case 503: return '503';
      default: return status >= 500 ? '500' : '400';
    }
  };

  const isRetryable = (status: number): boolean => {
    return status === 500 || status === 503 || status === 0;
  };

  const getErrorMessage = (status: number, defaultMessage?: string): string => {
    const messages: Record<number, string> = {
      400: 'Invalid request. Please check your input and try again.',
      401: 'You are not authenticated. Please sign in to continue.',
      403: 'You do not have permission to perform this action.',
      404: 'The requested resource was not found.',
      500: 'A server error occurred. Please try again later.',
      503: 'The service is temporarily unavailable. Please try again later.',
    };

    return defaultMessage || messages[status] || `An error occurred (${status})`;
  };

  const handleHttpError = useCallback(async (response: Response, context?: string) => {
    let message = '';
    
    try {
      const errorData = await response.json();
      message = errorData.message || errorData.error || getErrorMessage(response.status);
    } catch {
      message = getErrorMessage(response.status);
    }

    const httpError: HttpError = {
      status: response.status,
      message: context ? `${context}: ${message}` : message,
      type: getErrorType(response.status),
      timestamp: new Date(),
      retryable: isRetryable(response.status)
    };

    setError(httpError);

    // Handle specific error codes
    switch (response.status) {
      case 401:
        // Clear auth state and redirect to login after a delay
        setTimeout(() => {
          logout();
          navigate('/login');
        }, 2000);
        break;
      case 403:
        // Log the forbidden access attempt
        console.warn(`Access forbidden: ${context || 'Unknown resource'}`);
        break;
      case 404:
        // Could redirect to not found page for certain contexts
        if (context?.includes('page') || context?.includes('route')) {
          navigate('/dashboard');
        }
        break;
    }
  }, [navigate, logout]);

  const handleError = useCallback((error: any, context?: string) => {
    console.error('Error occurred:', error, { context });

    let httpError: HttpError;

    if (error.response) {
      // HTTP error response
      const status = error.response.status;
      const message = error.response.data?.message || error.message || getErrorMessage(status);
      
      httpError = {
        status,
        message: context ? `${context}: ${message}` : message,
        type: getErrorType(status),
        timestamp: new Date(),
        retryable: isRetryable(status)
      };
    } else if (error.request) {
      // Network error
      httpError = {
        status: 0,
        message: context ? `${context}: Network error - please check your connection` : 'Network error - please check your connection',
        type: 'network',
        timestamp: new Date(),
        retryable: true
      };
    } else if (error.name === 'TimeoutError' || error.code === 'ECONNABORTED') {
      // Timeout error
      httpError = {
        status: 0,
        message: context ? `${context}: Request timed out - please try again` : 'Request timed out - please try again',
        type: 'timeout',
        timestamp: new Date(),
        retryable: true
      };
    } else {
      // Generic error
      httpError = {
        status: 0,
        message: context ? `${context}: ${error.message || 'An unexpected error occurred'}` : error.message || 'An unexpected error occurred',
        type: null,
        timestamp: new Date(),
        retryable: false
      };
    }

    setError(httpError);

    // Handle 401 errors globally
    if (httpError.status === 401) {
      setTimeout(() => {
        logout();
        navigate('/login');
      }, 2000);
    }
  }, [navigate, logout]);

  const retryLastAction = useCallback(() => {
    if (lastAction) {
      clearError();
      lastAction();
    }
  }, [lastAction, clearError]);

  const setRetryAction = useCallback((action: () => void) => {
    setLastAction(() => action);
  }, []);

  return {
    error,
    isError: !!error,
    clearError,
    handleError,
    handleHttpError,
    retryLastAction,
    setRetryAction: setRetryAction
  };
};