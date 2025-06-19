import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import * as SecureStore from 'expo-secure-store';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  email: string;
  [key: string]: any;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: { email: string } | null;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ email: string } | null>(null);

  useEffect(() => {
    const checkToken = async () => {
      const token = await SecureStore.getItemAsync('token');
      if (token) {
        try {
          const decoded: DecodedToken = jwtDecode(token);
          setUser({ email: decoded.email });
          setIsAuthenticated(true);
        } catch {
          await SecureStore.deleteItemAsync('token');
        }
      }
    };
    checkToken();
  }, []);

  const login = async (token: string) => {
    await SecureStore.setItemAsync('token', token);
    try {
      const decoded: DecodedToken = jwtDecode(token);
      setUser({ email: decoded.email });
    } catch {
      setUser(null);
    }
    setIsAuthenticated(true);
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync('token');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
