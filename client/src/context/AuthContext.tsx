import { createContext, useState, ReactNode, useEffect, useContext } from 'react';
import { jwtDecode } from "jwt-decode";

interface AuthContextType {
  user: any | null;
  login: (user: any) => void;
  isAuthenticated: boolean;
  logout: () => void;
  token: string | null;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
  
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        const currentTime = Date.now() / 1000; // in seconds
  
        if (decoded.exp < currentTime) {
          // Token has already expired
          logout();
        } else {
          setUser(decoded);
  
          // Set timeout to auto-logout when token expires
          const timeout = setTimeout(() => {
            logout();
          }, (decoded.exp - currentTime) * 1000); // Convert to ms
  
          // Cleanup on unmount or token change
          return () => clearTimeout(timeout);
        }
      } catch (error) {
        console.error("Invalid token");
        logout();
      }
    }
  }, []);
  

  const login = (token: string) => {
    localStorage.setItem("token", token);
    const decodedUser = jwtDecode(token);
    setUser(decodedUser);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const token = localStorage.getItem("token");
  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, token }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Correctly export `useAuth`
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};