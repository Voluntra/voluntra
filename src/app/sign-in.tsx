import * as AppleAuthentication from 'expo-apple-authentication';
import { Redirect, router } from 'expo-router';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import AppleAuthButton from '../components/auth/apple-auth-button';
import { useAuth } from '../hooks/useAuth';
import { useHaptics } from '../hooks/useHaptics';

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

  if (session) {
    return <Redirect href="/" />;
  }

  const onPress = async () => {
    selectionHaptic();
    signIn({
      callbackFn: () => {
        successHaptic();
        router.replace('/');
      },
    });
  };

  return (
    <View className="pt-offset">
      <View className="min-h-screen m-page flex items-center">
        {isAvailable && <AppleAuthButton onPress={onPress} />}
      </View>
    </View>
  );
};

export default SignIn;
