import { useErrorHandler } from '@/hooks/useErrorHandler';

/**
 * Enhanced API service wrapper with integrated error handling
 */

// Define common API response structure
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

export interface ApiError {
  status: number;
  message: string;
  data?: any;
}

// Generic API call wrapper with error handling
export const withErrorHandler = async <T>(
  apiCall: () => Promise<Response>,
  context?: string,
  errorHandler?: ReturnType<typeof useErrorHandler>
): Promise<T> => {
  try {
    const response = await apiCall();
    
    if (!response.ok) {
      // Handle HTTP error responses
      if (errorHandler) {
        await errorHandler.handleHttpError(response, context);
      }
      
      // Still throw for upstream handling
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError({
        status: response.status,
        message: errorData.message || errorData.error || `HTTP ${response.status}`,
        data: errorData
      });
    }
    
    // Parse successful response
    const data = await response.json();
    return data;
    
  } catch (error) {
    // Handle network errors, timeouts, etc.
    if (errorHandler && !(error instanceof ApiError)) {
      errorHandler.handleError(error, context);
    }
    throw error;
  }
};

// Create a custom ApiError class
export class ApiError extends Error {
  status: number;
  data?: any;
  
  constructor({ status, message, data }: { status: number; message: string; data?: any }) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

// Higher-order function to create API methods with error handling
export const createApiMethod = <TParams, TResponse>(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' = 'GET',
  baseUrl = '/api'
) => {
  return async (
    params?: TParams,
    options?: {
      errorHandler?: ReturnType<typeof useErrorHandler>;
      context?: string;
      headers?: Record<string, string>;
    }
  ): Promise<TResponse> => {
    const { errorHandler, context, headers = {} } = options || {};
    
    const url = `${baseUrl}${endpoint}`;
    const isGet = method === 'GET';
    const hasBody = !isGet && params;
    
    const fetchOptions: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      ...(hasBody && { body: JSON.stringify(params) }),
    };
    
    // Add auth header if available
    const token = localStorage.getItem('token');
    if (token) {
      fetchOptions.headers = {
        ...fetchOptions.headers,
        'Authorization': `Bearer ${token}`,
      };
    }
    
    return withErrorHandler<TResponse>(
      () => fetch(url, fetchOptions),
      context || `${method} ${endpoint}`,
      errorHandler
    );
  };
};

// Specific error response handlers for common scenarios
export const handleAuthError = (status: number, context?: string) => {
  switch (status) {
    case 401:
      // Clear auth state
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // Redirect to login after a delay to show the error message
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
      break;
      
    case 403:
      console.warn(`Access denied: ${context || 'Unknown resource'}`);
      // Could show a toast notification here
      break;
  }
};

// Utility to check if error is recoverable
export const isRecoverableError = (error: any): boolean => {
  if (error instanceof ApiError) {
    // Network issues, server errors are recoverable
    return error.status >= 500 || error.status === 0;
  }
  
  if (error.name === 'NetworkError' || error.code === 'NETWORK_ERROR') {
    return true;
  }
  
  return false;
};

// Retry logic for recoverable errors
export const withRetry = async <T>(
  operation: () => Promise<T>,
  maxRetries = 3,
  delay = 1000
): Promise<T> => {
  let lastError;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      
      // Don't retry on client errors (4xx)
      if (!isRecoverableError(error)) {
        throw error;
      }
      
      // Don't wait after the last attempt
      if (attempt < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, delay * attempt));
      }
    }
  }
  
  throw lastError;
};