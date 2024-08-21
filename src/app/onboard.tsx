import Feature, { FeatureProps } from '@components/onboard/feature';
import { keyName } from '@config/onboarding';
import { useHaptics } from '@hooks/useHaptics';
import { setKey } from '@lib/onboarding';
import { palette } from '@lib/tailwind';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useRef, useState } from 'react';
import { Pressable, SafeAreaView, Text, View } from 'react-native';
import PagerView from 'react-native-pager-view';

const featureList: FeatureProps[] = [
  {
    title: 'Powerful Dashboard',
    description:
      'Set goals, track your progress, and get insights to help you improve',
  },
  {
    title: 'Powerful Dashboard',
    description:
      'Set goals, track your progress, and get insights to help you improve',
  },
  {
    title: 'Powerful Dashboard',
    description:
      'Set goals, track your progress, and get insights to help you improve',
  },
];

const Onboard = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const viewPagerRef = useRef<PagerView>(null);
  const selectionHaptic = useHaptics();

  const onPress = () => {
    selectionHaptic();
    setKey(keyName, 'true');
    router.replace('/');
  };

  return (
    <SafeAreaView className="m-page min-h-screen flex-col justify-center items-center align-middle relative">
      {/* Feature carousel */}
      <View className="w-full h-2/3 relative">
        <PagerView
          className="w-full h-full"
          initialPage={0}
          overdrag
          onPageSelected={(e) => {
            setCurrentPage(e.nativeEvent.position);
          }}
          ref={viewPagerRef}
        >
          {featureList.map(({ title, description }, idx) => (
            <View className="justify-center items-center" key={idx}>
              <Feature title={title} description={description} />
            </View>
          ))}
        </PagerView>

        {/* Feature carousel page indicator */}
        <View className="absolute bottom-4 w-full flex-row justify-center space-x-3 items-center align-middle mb-16">
          {featureList.map((_, idx) => (
            <Pressable
              className={`rounded-full h-2 w-2 ${currentPage === idx ? 'bg-purple-100' : 'bg-neutral-700'} `}
              hitSlop={15}
              onPress={() => {
                viewPagerRef.current.setPage(idx);
              }}
              key={idx}
            />
          ))}
        </View>
      </View>

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
