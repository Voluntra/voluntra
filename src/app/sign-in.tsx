import { router } from 'expo-router';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useHaptics } from '../hooks/useHaptics';

const SignIn = () => {
  const selectHaptic = useHaptics();
  return (
    <View className="pt-offset">
      <View className="min-h-screen m-page flex items-center">
        <Pressable
          onPress={() => {
            selectHaptic();
            router.replace('/');
          }}
          className="bg-neutral-900 w-full h-14 rounded-xl flex items-center justify-center active:opacity-80 border border-neutral-800"
        >
          <Text className="text-foreground text-lg font-popRegular active:opacity-80">
            Authenticate
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default SignIn;
