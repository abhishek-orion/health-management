import { createContext, useState, useContext, useEffect } from "react";
import {
  AuthState,
  LoginCredentials,
  AuthContextType,
  AuthProviderProps,
} from "./AuthContext.d";
import authenticationService from "@/services/authenticationService";

const initialState: AuthState = {
  user: null,
  token: null,
  isLoading: true,
  isAuthenticated: false,
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authState, setAuthState] = useState<AuthState>(initialState);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  // Check for stored authentication on app startup
  useEffect(() => {
    const checkStoredAuth = () => {
      const storedToken = authenticationService.getStoredToken();
      const storedUser = authenticationService.getStoredUser();

      if (storedToken && storedUser) {
        try {
          const user = JSON.parse(storedUser);
          setAuthState({
            user,
            token: storedToken,
            isLoading: false,
            isAuthenticated: true,
          });
          setIsAdmin(user.role === "admin");
        } catch (error) {
          // Invalid stored data, clear it
          authenticationService.clearAuth();
          setAuthState((prev) => ({ ...prev, isLoading: false }));
        }
      } else {
        // No stored auth
        setAuthState((prev) => ({ ...prev, isLoading: false }));
      }
    };
    checkStoredAuth();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    setAuthState({ ...authState, isLoading: true });
    try {
      const data = await authenticationService.login(
        credentials.email,
        credentials.password
      );

      // Only set authenticated if we have user and token
      if (data.user && data.token) {
        setAuthState({
          ...authState,
          user: data.user,
          token: data.token,
          isLoading: false,
          isAuthenticated: true,
        });
        setIsAdmin(data.user.role === "admin");
        // Always store token for current session, rememberMe affects persistence
        authenticationService.storeAuth(data.token, data.user);
      } else if (data.status === 401 || data.message) {
        setAuthState({
          ...authState,
          isLoading: false,
          isAuthenticated: false,
        });
      }
    } catch (error) {
      setAuthState({ ...authState, isLoading: false, isAuthenticated: false });
      throw error;
    }
  };

  const logout = () => {
    authenticationService.clearAuth();
    setAuthState({
      user: null,
      token: null,
      isLoading: false,
      isAuthenticated: false,
    });
    setIsAdmin(false);
  };

  const value: AuthContextType = {
    ...authState,
    login,
    logout,
    isAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
