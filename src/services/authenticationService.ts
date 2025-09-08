import { getApiUrl, API_CONFIG } from '../config/api';

const authenticationService = {
    // login
   async login(email: string, password: string) {
    const url = getApiUrl(API_CONFIG.ENDPOINTS.LOGIN);
    console.log('Making login request to:', url);
    
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });
    
    if (!response.ok) {
      throw new Error(`Login failed: ${response.status} ${response.statusText}`);
    }
    
    return response.json();
   },
   
   // logout
   async logout() {
    const token = localStorage.getItem("token");
    const url = getApiUrl(API_CONFIG.ENDPOINTS.LOGOUT);
    
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token ? `Bearer ${token}` : "",
        },
    });
    
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return response.json();
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