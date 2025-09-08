export interface User {
    email: string;
    role: 'admin' | 'user';
  }
  
  export interface AuthState {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    isAuthenticated: boolean;
  }
  
  export interface LoginCredentials {
    email: string;
    password: string;
    rememberMe: boolean;
  }
  
  export interface AuthResponse {
    token: string;
    user: User;
  }

  export interface AuthContextType extends AuthState {
    login: (credentials: LoginCredentials) => Promise<void>;
    logout: () => void;
    isAdmin: boolean;
  }
  
  export interface AuthProviderProps {
    children: React.ReactNode;
  }