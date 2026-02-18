import { useState, type ReactNode } from 'react';
import { login as authLogin, type User } from '../lib/auth';
import { AuthContext } from './auth-context';

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
