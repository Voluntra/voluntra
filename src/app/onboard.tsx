import { keyName } from '@config/onboarding';
import { useHaptics } from '@hooks/useHaptics';
import { setKey } from '@lib/onboarding';
import { palette } from '@lib/tailwind';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Pressable, SafeAreaView, Text } from 'react-native';

const Onboard = () => {
  const selectionHaptic = useHaptics();

  const onPress = () => {
    selectionHaptic();
    setKey(keyName, 'true');
    router.replace('/');
  };

  return (
    <SafeAreaView className="m-page min-h-screen flex-col justify-center items-center align-middle relative">
      {/* Feature title */}
      <Text className="text-foreground font-popMedium text-3xl text-center">
        Powerful Dashboard
      </Text>

      {/* Feature description */}
      <Text className="text-neutral-400 font-popRegular text-base text-center pt-2">
        Set goals, track your progress, and get insights to help you improve
      </Text>

      {/* Exit on-boarding button */}
      <LinearGradient
        colors={[palette['neutral']['900'], palette['black']]}
        className="absolute bottom-14 w-full rounded-xl border border-neutral-900 active:opacity-80"
      >
        <Pressable
          className="flex h-14 w-full items-center justify-center"
          onPress={onPress}
        >
          <Text className="font-popRegular text-lg text-foreground active:opacity-80">
            Get Started
          </Text>
        </Pressable>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default Onboard;
