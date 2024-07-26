import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { Button } from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  WithTimingConfig,
  clamp,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const Settings = () => {
  const popoverHeight = 250;
  const translateY = useSharedValue(popoverHeight);
  const offset = useSharedValue(0);

  const config = {
    duration: 150,
  } as WithTimingConfig;

  const handlePress = () => {
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
    <GestureHandlerRootView
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
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
      <Button onPress={handlePress} title="Toggle Popover" />
      <Button
        title="Test Onboarding Screen"
        onPress={async () => {
          await AsyncStorage.setItem("onboarding", "false").then(() => {
            console.log("Success");
          });
        }}
      />
    </GestureHandlerRootView>
  );
};

export default Settings;
