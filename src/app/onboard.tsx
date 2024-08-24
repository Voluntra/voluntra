import Gradient from '@components/gradient';
import Feature from '@components/onboard/feature';
import Button from '@components/ui/pressable';
import { keyName, onboardingFeatures } from '@config/onboarding';
import { useHaptics } from '@hooks/useHaptics';
import { setKey } from '@lib/onboarding';
import { palette } from '@lib/tailwind';
import { router } from 'expo-router';
import { useMemo, useRef, useState } from 'react';
import { Animated, Dimensions, SafeAreaView, Text, View } from 'react-native';
import { ExpandingDot } from 'react-native-animated-pagination-dots';
import PagerView, {
  PagerViewOnPageScrollEventData,
} from 'react-native-pager-view';

const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);

const Onboard = () => {
  const [, setCurrentPage] = useState(0);
  const viewPagerRef = useRef<PagerView>(null);

  const width = Dimensions.get('window').width;
  const scrollOffsetAnimatedValue = useRef(new Animated.Value(0)).current;
  const positionAnimatedValue = useRef(new Animated.Value(0)).current;
  const inputRange = [0, onboardingFeatures.length];
  const scrollX = Animated.add(
    scrollOffsetAnimatedValue,
    positionAnimatedValue
  ).interpolate({
    inputRange,
    outputRange: [0, onboardingFeatures.length * width],
  });

  const successHaptic = useHaptics('success');

  const onPageScroll = useMemo(
    () =>
      Animated.event<PagerViewOnPageScrollEventData>(
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

  const onPress = () => {
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
          scrollX={scrollX as Animated.Value}
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
      <Button
        className="w-full absolute bottom-14 overflow-hidden"
        onPress={onPress}
      >
        <Gradient />
        <Text className="font-popRegular text-lg text-foreground active:opacity-80">
          Get Started
        </Text>
      </Button>
    </SafeAreaView>
  );
};

export default Onboard;
