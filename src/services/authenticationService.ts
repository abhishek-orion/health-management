const authenticationService = {
    // login
   async login(email: string, password: string) {
    const response = await fetch("/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });
    return response.json();
   },
   
   // logout
   async logout() {
    const token = localStorage.getItem("token");
    const response = await fetch("/api/logout", {
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