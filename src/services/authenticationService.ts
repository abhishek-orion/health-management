import { getApiUrl, API_CONFIG } from '../config/api';
import { withErrorHandler } from './apiErrorHandler';

const authenticationService = {
    // login
   async login(email: string, password: string) {
    const url = getApiUrl(API_CONFIG.ENDPOINTS.LOGIN);
    console.log('Making login request to:', url);
    
    return withErrorHandler<any>(
      () => fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }),
      "user login"
    );
   },
   
   // logout
   async logout() {
    const url = getApiUrl(API_CONFIG.ENDPOINTS.LOGOUT);
    
    try {
      const result = await withErrorHandler<any>(
        () => fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }),
        "user logout"
      );
      
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return result;
    } catch (error) {
      // Clear local auth even if logout request fails
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      throw error;
    }
   },

  getStoredToken() {
   return localStorage.getItem("token");
  },
  
  getStoredUser() {
   return localStorage.getItem("user");
  },
  
  storeAuth(token: string, user: any) {
   localStorage.setItem("token", token);
   localStorage.setItem("user", JSON.stringify(user));
  },

  // clear user
  clearAuth() {
   localStorage.removeItem("token");
   localStorage.removeItem("user");
  },
   
};

export default authenticationService;