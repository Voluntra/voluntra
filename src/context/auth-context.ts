import { Session } from '@supabase/supabase-js';
import { createContext } from 'react';

export interface AuthContextType {
  session: Session | null;
  loading: boolean;
  signIn: (callbackFn: () => void, provider: "apple" | "google") => Promise<void>;
  signOut: (callbackFn: () => void) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
