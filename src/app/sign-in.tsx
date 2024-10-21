import AppleAuthButton from '@components/auth/apple-auth-button';
import { useAuth } from '@hooks/useAuth';
import { useHaptics } from '@hooks/useHaptics';
import { startOnboarding } from '@lib/onboarding';
import * as AppleAuthentication from 'expo-apple-authentication';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

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
    const onKeyNotFound = () => router.replace('/onboarding');
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
    <View className="pt-offset mt-0 m-page flex min-h-screen items-center">
      <Image
        className="h-[450px] w-[450px]"
        contentFit="fill"
        source={require('../../assets/login-graphic.png')}
      />

      <View className="">
        <View className="flex flex-row justify-center items-center align-middle">
          <Image
            className="h-12 w-12"
            contentFit="fill"
            source={require('../../assets/icon-nobg.png')}
          />
          <Text className="font-popMedium text-foreground text-3xl tracking-tight">
            Storm Shield
          </Text>
        </View>
      </View>

      <Text className="font-popRegular text-neutral-300 text-sm w-full text-center pb-5">
        Swift aid, strong hands
      </Text>

      {isAvailable && (
        <View className="w-10/12 mt-4">
          <AppleAuthButton onPress={onPress} />
        </View>
      )}
    </View>
  );
};

export default SignIn;
