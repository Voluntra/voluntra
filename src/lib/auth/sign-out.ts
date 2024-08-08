import { SessionChangeProps } from '../../types/auth';
import { supabase } from '../db/supabase';

export const signOut = async ({ callbackFn }: SessionChangeProps) => {
  const { error } = await supabase.auth.signOut();
  if (!error) {
    callbackFn();
  }
};
