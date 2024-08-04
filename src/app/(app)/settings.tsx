import React from 'react';
import { Pressable, Text } from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  WithTimingConfig,
  clamp,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useHaptics } from '../../hooks/useHaptics';

const Settings = () => {
  const popoverHeight = 250;
  const translateY = useSharedValue(popoverHeight);
  const offset = useSharedValue(0);

  const selectionHaptic = useHaptics();

  const config = {
    duration: 150,
  } as WithTimingConfig;

  const onPress = () => {
    selectionHaptic();

    translateY.value =
      translateY.value === 0
        ? withTiming(popoverHeight, config)
        : withTiming(0);
  };

  const animatedStyle = useAnimatedStyle(() => {
    const marginBottom = interpolate(
      translateY.value,
      [0, popoverHeight],
      [20, 0]
    );

    return {
      transform: [{ translateY: translateY.value + offset.value }],
      marginBottom,
    };
  });

  const pan = Gesture.Pan()
    .onChange((event) => {
      offset.value += clamp(
        event.translationY / 50,
        -popoverHeight / 200,
        popoverHeight / 200
      );
    })
    .onFinalize((event) => {
      offset.value = withSpring(0, { stiffness: 400, damping: 20 });
    });

  return (
    <GestureHandlerRootView className="flex flex-1 pt-offset pb-offset mx-page mt-page">
      <GestureDetector gesture={pan}>
        <Animated.View
          className="bg-neutral-700 mx-3 z-50 rounded-3xl shadow-md absolute bottom-0 left-0 right-0"
          style={[
            {
              height: popoverHeight,
            },
            animatedStyle,
          ]}
        />
      </GestureDetector>
      <Pressable
        onPress={onPress}
        className="bg-neutral-900 w-full h-14 rounded-xl flex items-center justify-center active:opacity-80 border border-neutral-800"
      >
        <Text className="text-foreground text-lg font-popRegular active:opacity-80">
          Toggle Popover
        </Text>
      </Pressable>
    </GestureHandlerRootView>
  );
};

export default Settings;
