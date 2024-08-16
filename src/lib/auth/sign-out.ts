import { AuthContextType } from '../../context/auth-context';
import { supabase } from '../db/supabase';

export const signOut = async (callbackFn: Parameters[0]) => {
  const { error } = await supabase.auth.signOut();
  if (!error) {
    callbackFn();
  }
};
