import AppleAuthButton from '@components/auth/apple-auth-button';
import { useAuth } from '@hooks/useAuth';
import { useHaptics } from '@hooks/useHaptics';
import { startOnboarding } from '@lib/onboarding';
import * as AppleAuthentication from 'expo-apple-authentication';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { View } from 'react-native';

const SignIn = () => {
  const [isAvailable, setIsAvailable] = useState(false);
  const { signIn } = useAuth();

  const selectionHaptic = useHaptics();
  const successHaptic = useHaptics('success');

  useEffect(() => {
    const checkAvailability = async () => {
      const availability = await AppleAuthentication.isAvailableAsync();
      setIsAvailable(availability);
    };
    checkAvailability();
  }, []);

  const onPress = async () => {
    const onKeyNotFound = () => router.replace('/onboard');
    const onKeyFound = () => router.replace('/');

    selectionHaptic();

    // If the user has seen the app before, navigate to the home screen
    // otherwise, navigate to the onboarding page.
    signIn(() => {
      successHaptic();
      startOnboarding(onKeyNotFound, onKeyFound);
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
