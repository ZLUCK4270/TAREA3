import { useState, type ReactNode } from 'react';
import { login as authLogin, type User } from '../lib/auth';
import { AuthContext } from './auth-context';

export function AuthProvider({ children }: { children: ReactNode }) {
  // Initialize from localStorage if available
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('teamclick_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = async (email: string) => {
    const userData = await authLogin(email);
    setUser(userData);
    localStorage.setItem('teamclick_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('teamclick_user');
  };

  const addPoints = (amount: number) => {
    if (user) {
      const updatedUser = { ...user, points: user.points + amount };
      setUser(updatedUser);
      localStorage.setItem('teamclick_user', JSON.stringify(updatedUser));
    }
  };

  const addBadge = (badge: string) => {
    if (user && !user.badges.includes(badge)) {
      const updatedUser = { ...user, badges: [...user.badges, badge] };
      setUser(updatedUser);
      localStorage.setItem('teamclick_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, addPoints, addBadge }}>
      {children}
    </AuthContext.Provider>
  );
}
