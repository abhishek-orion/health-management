/**
 * API Simulator Utilities for testing network conditions and error handling
 */

export interface ApiSimulatorConfig {
  minLatency?: number;
  maxLatency?: number;
  errorRate?: number; // Percentage (0-100)
  enableSimulation?: boolean;
}

const DEFAULT_CONFIG: Required<ApiSimulatorConfig> = {
  minLatency: 200,
  maxLatency: 2000,
  errorRate: 5, // 5% error rate
  enableSimulation: true
};

/**
 * Get configuration from environment or use defaults
 */
function getConfig(): Required<ApiSimulatorConfig> {
  return {
    minLatency: Number(process.env.REACT_APP_API_MIN_LATENCY) || DEFAULT_CONFIG.minLatency,
    maxLatency: Number(process.env.REACT_APP_API_MAX_LATENCY) || DEFAULT_CONFIG.maxLatency,
    errorRate: Number(process.env.REACT_APP_API_ERROR_RATE) || DEFAULT_CONFIG.errorRate,
    enableSimulation: process.env.REACT_APP_API_SIMULATION !== 'false' && 
                     process.env.NODE_ENV === 'development'
  };
}

/**
 * Generate random latency between min and max values
 */
function getRandomLatency(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Determine if an error should be thrown based on error rate
 */
function shouldThrowError(errorRate: number): boolean {
  return Math.random() * 100 < errorRate;
}

/**
 * Generate a random error for testing
 */
function generateRandomError(): Error {
  const errors = [
    { status: 500, message: 'Internal Server Error', type: 'server' },
    { status: 503, message: 'Service Unavailable', type: 'server' },
    { status: 408, message: 'Request Timeout', type: 'timeout' },
    { status: 0, message: 'Network Error', type: 'network' },
    { status: 429, message: 'Too Many Requests', type: 'rate-limit' },
  ];

  const randomError = errors[Math.floor(Math.random() * errors.length)];
  const error = new Error(randomError.message) as any;
  error.status = randomError.status;
  error.type = randomError.type;
  error.timestamp = new Date();
  error.retryable = true;

  return error;
}

/**
 * Simulate network latency and occasionally throw errors
 * @param config Optional configuration to override defaults
 * @returns Promise that resolves after simulated latency
 * @throws Error if random error is triggered
 */
export async function simulateApiCall(config: ApiSimulatorConfig = {}): Promise<void> {
  const finalConfig = { ...getConfig(), ...config };

  // Skip simulation if disabled
  if (!finalConfig.enableSimulation) {
    return;
  }

  // Generate random latency
  const latency = getRandomLatency(finalConfig.minLatency, finalConfig.maxLatency);

  // Wait for the simulated latency
  await new Promise(resolve => setTimeout(resolve, latency));

  // Randomly throw an error
  if (shouldThrowError(finalConfig.errorRate)) {
    throw generateRandomError();
  }
}

/**
 * Wrapper function to add simulation to any API call
 * @param apiCall The original API call function
 * @param config Optional simulation configuration
 * @returns Wrapped API call with simulation
 */
export function withApiSimulation<T extends any[], R>(
  apiCall: (...args: T) => Promise<R>,
  config: ApiSimulatorConfig = {}
) {
  return async (...args: T): Promise<R> => {
    // Apply simulation first
    await simulateApiCall(config);
    
    // Then execute the original API call
    return apiCall(...args);
  };
}

/**
 * Development helper to manually trigger specific error types
 */
export const simulateSpecificError = {
  unauthorized: () => {
    const error = new Error('Unauthorized') as any;
    error.status = 401;
    error.type = 'unauthorized';
    error.timestamp = new Date();
    error.retryable = false;
    throw error;
  },

  forbidden: () => {
    const error = new Error('Forbidden') as any;
    error.status = 403;
    error.type = 'forbidden';
    error.timestamp = new Date();
    error.retryable = false;
    throw error;
  },

  notFound: () => {
    const error = new Error('Not Found') as any;
    error.status = 404;
    error.type = 'not-found';
    error.timestamp = new Date();
    error.retryable = false;
    throw error;
  },

  serverError: () => {
    const error = new Error('Internal Server Error') as any;
    error.status = 500;
    error.type = 'server';
    error.timestamp = new Date();
    error.retryable = true;
    throw error;
  },

  networkError: () => {
    const error = new Error('Network Error') as any;
    error.status = 0;
    error.type = 'network';
    error.timestamp = new Date();
    error.retryable = true;
    throw error;
  }
};