const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = process.env.NODE_ENV === 'development';

// For now, let's use MSW in both environments until you have a backend
export const USE_MSW = true; // Set to false when you have a real backend

// API configuration based on environment
export const API_CONFIG = {
  // When using MSW, always use relative URLs (empty base)
  // When you have a real backend, set USE_MSW to false and update BASE_URL
  BASE_URL: USE_MSW ? '' : 'https://your-backend-api.com',
  
  // Endpoints
  ENDPOINTS: {
    LOGIN: '/api/login',
    LOGOUT: '/api/logout',
    PATIENTS: '/api/patients',
  }
};

// Helper function to get full API URL
export const getApiUrl = (endpoint: string) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

console.log('API Config:', {
  isProduction,
  isDevelopment,
  baseUrl: API_CONFIG.BASE_URL,
  useMSW: USE_MSW
});