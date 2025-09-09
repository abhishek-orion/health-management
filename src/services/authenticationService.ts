import { API_CONFIG } from '../config/api';
import { withErrorHandler, createApiMethod } from './apiErrorHandler';

const authenticationService = {
    // login
   async login(email: string, password: string) {
    console.log('Making login request to:', API_CONFIG.ENDPOINTS.LOGIN);
    
    return withErrorHandler<any>(
      () => fetch(API_CONFIG.ENDPOINTS.LOGIN, {
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
    try {
      const apiCall = createApiMethod<undefined, any>(API_CONFIG.ENDPOINTS.LOGOUT, 'POST', '');
      const result = await apiCall(undefined, { context: "user logout" });
      
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