import AppleAuthButton from '@components/auth/apple-auth-button';
import { useAuth } from '@hooks/useAuth';
import { useHaptics } from '@hooks/useHaptics';
import * as AppleAuthentication from 'expo-apple-authentication';
import { Redirect, router } from 'expo-router';
import { useEffect, useState } from 'react';
import { View } from 'react-native';

const SignIn = () => {
  const [isAvailable, setIsAvailable] = useState(false);
  const { session, signIn } = useAuth();

  const selectionHaptic = useHaptics();
  const successHaptic = useHaptics('success');

  useEffect(() => {
    const checkAvailability = async () => {
      const availability = await AppleAuthentication.isAvailableAsync();
      setIsAvailable(availability);
    };
    checkAvailability();
  }, []);

  // Handle edge case where the user navigations to the sign-in page
  // while already being signed.
  if (session) {
    return <Redirect href="/(home)" />;
  }

  const onPress = async () => {
    selectionHaptic();
    signIn(() => {
      successHaptic();
      router.replace('/');
    }, 'apple');
  };

  return (
    <View className="pt-offset">
      <View className="m-page flex min-h-screen items-center">
        {isAvailable && <AppleAuthButton onPress={onPress} />}
      </View>
    </View>
  );
};

export default SignIn;
