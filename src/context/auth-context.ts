import { createContext } from 'react';
import type { User } from '../lib/auth';

export interface AuthContextType {
  user: User | null;
  login: (email: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  addPoints: (amount: number) => void;
  addBadge: (badge: string) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
