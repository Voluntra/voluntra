import * as Burnt from 'burnt';
import * as AppleAuthentication from 'expo-apple-authentication';
import { AuthContextType } from '../../context/auth-context';
import { supabase } from '../db/supabase';

export const signIn = async (
  callbackFn: Parameters<AuthContextType['signIn']>[0],
  provider: Parameters<AuthContextType['signIn']>[1]
) => {
  try {
    const credential: AppleAuthentication.AppleAuthenticationCredential =
      await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
    if (credential.identityToken) {
      const { error } = await supabase.auth.signInWithIdToken({
        provider,
        token: credential.identityToken,
      });
      if (!error) {
        callbackFn();
      }
    } else {
      throw new Error('No identityToken.');
    }
  } catch (e) {
    if (e.code !== 'ERR_REQUEST_CANCELED') {
      console.error(e);

      Burnt.toast({
        title: 'Something went wrong',
        preset: 'error',
      });
    }
  }
};
