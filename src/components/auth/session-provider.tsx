import { Session } from '@supabase/supabase-js';
import React, { PropsWithChildren, useEffect, useState } from 'react';
import { AuthContext } from '../../context/auth-context';
import { signIn } from '../../lib/auth/sign-in';
import { signOut } from '../../lib/auth/sign-out';
import { supabase } from '../../lib/db/supabase';

export const SessionProvider = ({ children }: PropsWithChildren) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
      setLoading(false);
    };

    getSession();

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ session, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
