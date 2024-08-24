import Gradient from '@components/gradient';
import Feature from '@components/onboard/feature';
import Button from '@components/ui/pressable';
import { keyName, onboardingFeatures } from '@config/onboarding';
import { useHaptics } from '@hooks/useHaptics';
import { registerForPushNotificationsAsync } from '@lib/notifications';
import { setKey } from '@lib/onboarding';
import { palette } from '@lib/tailwind';
import * as Notifications from 'expo-notifications';
import { router } from 'expo-router';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Dimensions,
  Animated as ReactAnimated,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import { ExpandingDot } from 'react-native-animated-pagination-dots';
import PagerView, {
  PagerViewOnPageScrollEventData,
} from 'react-native-pager-view';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const AnimatedPagerView = ReactAnimated.createAnimatedComponent(PagerView);

const Onboard = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const viewPagerRef = useRef<PagerView>(null);
  const successHaptic = useHaptics('success');

  const width = Dimensions.get('window').width;
  const buttonOpacity = useSharedValue(0.6);

  const scrollOffsetAnimatedValue = useRef(new ReactAnimated.Value(0)).current;
  const positionAnimatedValue = useRef(new ReactAnimated.Value(0)).current;

  const inputRange = [0, onboardingFeatures.length];
  const scrollX = ReactAnimated.add(
    scrollOffsetAnimatedValue,
    positionAnimatedValue
  ).interpolate({
    inputRange,
    outputRange: [0, onboardingFeatures.length * width],
  });

  const onPageScroll = useMemo(
    () =>
      ReactAnimated.event<PagerViewOnPageScrollEventData>(
        [
          {
            nativeEvent: {
              offset: scrollOffsetAnimatedValue,
              position: positionAnimatedValue,
            },
          },
        ],
        {
          useNativeDriver: false,
        }
      ),
    [positionAnimatedValue, scrollOffsetAnimatedValue]
  );

  useEffect(() => {
    buttonOpacity.value = withTiming(
      currentPage === onboardingFeatures.length - 1 ? 1 : 0.6,
      {
        duration: 200,
        easing: Easing.ease,
      }
    );
  }, [currentPage]);

  const buttonAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: buttonOpacity.value,
    };
  });

  const onPress = () => {
    // Handle receiving push notifications while app is foregrounded
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });

    // Register user to receive push notifications
    registerForPushNotificationsAsync();

    // Redirect user to the home screen - onboarding is complete
    successHaptic();
    setKey(keyName, 'true');
    router.replace('/');
  };

  return (
    <SafeAreaView className="m-page min-h-screen flex-col justify-center items-center align-middle relative">
      {/* Feature carousel */}
      <View className="w-full h-2/3 relative">
        <AnimatedPagerView
          className="w-full h-full"
          initialPage={0}
          overdrag
          onPageSelected={(e) => {
            setCurrentPage(e.nativeEvent.position);
          }}
          ref={viewPagerRef}
          onPageScroll={onPageScroll}
        >
          {onboardingFeatures.map(({ title, description }, idx) => (
            <View className="justify-center items-center" key={idx}>
              <Feature title={title} description={description} />
            </View>
          ))}
        </AnimatedPagerView>

        {/* Feature carousel page indicator */}
        <ExpandingDot
          data={onboardingFeatures}
          expandingDotWidth={30}
          inActiveDotColor={palette['neutral']['500']}
          activeDotColor={palette['purple']['100']}
          scrollX={scrollX as ReactAnimated.Value}
          dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            marginHorizontal: 5,
          }}
          containerStyle={{
            bottom: 20,
          }}
        />
      </View>

      {/* Exit on-boarding button */}
      <Animated.View
        style={[
          buttonAnimatedStyle,
          { width: '100%', position: 'absolute', bottom: 14 },
        ]}
      >
        <Button
          className={`w-full absolute bottom-14 overflow-hidden ${currentPage !== onboardingFeatures.length - 1 ? 'opacity-50' : ''}`}
          disabled={currentPage !== onboardingFeatures.length - 1}
          onPress={onPress}
        >
          <Gradient />
          <Text className="font-popRegular text-lg text-foreground active:opacity-80">
            Get Started
          </Text>
        </Button>
      </Animated.View>
    </SafeAreaView>
  );
};

export default Onboard;
