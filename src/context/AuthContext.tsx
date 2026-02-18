import { createContext, useContext, useState, type ReactNode } from 'react';
import { login as authLogin, type User } from '../lib/auth';

interface AuthContextType {
  user: User | null;
  login: (email: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  addPoints: (amount: number) => void;
  addBadge: (badge: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string) => {
    const userData = await authLogin(email);
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const addPoints = (amount: number) => {
    if (user) {
      setUser({ ...user, points: user.points + amount });
    }
  };

  const addBadge = (badge: string) => {
    if (user && !user.badges.includes(badge)) {
      setUser({ ...user, badges: [...user.badges, badge] });
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, addPoints, addBadge }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
