import { Session } from '@supabase/supabase-js';
import { createContext } from 'react';
import { SessionChangeProps } from '../types/auth';

export interface AuthContextType {
  session: Session | null;
  loading: boolean;
  signIn: ({ callbackFn }: SessionChangeProps) => Promise<void>;
  signOut: ({ callbackFn }: SessionChangeProps) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
