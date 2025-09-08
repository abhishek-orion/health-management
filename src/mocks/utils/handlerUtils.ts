// Auth token utilities for MSW handlers

// Initialize and maintain auth tokens
const authTokens: Record<string, any> = {};

// Initialize authTokens from sessionStorage to persist across page refreshes
export const initializeAuthTokens = () => {
  try {
    const stored = sessionStorage.getItem("msw_auth_tokens");
    const tokens = stored ? JSON.parse(stored) : {};

    // Add tokens to our store
    Object.entries(tokens).forEach(([key, value]) => {
      authTokens[key] = value;
    });

    return authTokens;
  } catch (error) {
    return authTokens;
  }
};

// Helper function to persist tokens to sessionStorage
export const persistAuthTokens = () => {
  try {
    sessionStorage.setItem("msw_auth_tokens", JSON.stringify(authTokens));
  } catch (error) {
    console.warn(
      "MSW: Failed to persist auth tokens to sessionStorage:",
      error
    );
  }
};

// Clean up expired tokens
export const cleanupExpiredTokens = () => {
  const now = Date.now();

  let cleaned = 0;

  for (const [token, data] of Object.entries(authTokens)) {
    if (data && typeof data === "object" && "expiresAt" in data) {
      if (now > (data as any).expiresAt) {
        delete authTokens[token];
        cleaned++;
      }
    }
  }

  if (cleaned > 0) {
    console.log(`MSW: Cleaned up ${cleaned} expired tokens`);
    persistAuthTokens();
  }

  return cleaned;
};

// Store a new token
export const storeAuthToken = (token: string, data: any) => {
  authTokens[token] = data;
  persistAuthTokens();
};

// Remove a token
export const removeAuthToken = (token: string) => {
  if (authTokens[token]) {
    delete authTokens[token];
    persistAuthTokens();
    return true;
  }
  return false;
};

export const getAuthToken = (token: string) => {
  return authTokens[token];
};

export const getAllAuthTokens = () => {
  return { ...authTokens };
};

// Clean up on initialization
initializeAuthTokens();
cleanupExpiredTokens();
