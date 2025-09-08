export interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
  }

  export interface ThemeProviderProps {
    children: React.ReactNode;
  }
  
  export type Theme = 'light' | 'dark';
