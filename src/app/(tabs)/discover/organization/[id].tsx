import Button from '@components/ui/pressable';
import Feather from '@expo/vector-icons/Feather';
import { palette } from '@lib/tailwind';
import { useState } from 'react';
import { Text, View } from 'react-native';
import Animated, { FadeOut, LinearTransition } from 'react-native-reanimated';
import { useFetch } from '..';

const Page = () => {
  const { data } = useFetch(true);
  const [shiftActive, setShiftActive] = useState(true);

  const handleButtonPress = () => {
    setShiftActive(false);
  };

  return (
    <Animated.ScrollView
      className="m-page flex min-h-screen"
      contentInsetAdjustmentBehavior="automatic"
      layout={LinearTransition.duration(250)}
    >
      {shiftActive && (
        <Animated.View
          className="flex w-full h-auto bg-neutral-900 rounded-xl mt-5 p-5"
          exiting={FadeOut.duration(250)}
        >
          <View className="flex flex-row justify-between pb-2">
            <Text className="text-foreground font-popRegular text-lg">
              {data[0].name}
            </Text>
            <View className="flex flex-row space-x-1 items-center justify-center">
              <Feather
                name="clock"
                size={18}
                color={palette.foreground as string}
              />
              <Text className="text-foreground font-popRegular text-lg">
                {data[0].time}
              </Text>
            </View>
          </View>
          <Text className="font-popLight text-neutral-400 text-sm">
            {data[0].description}
          </Text>
          <View className="flex flex-row space-x-6 w-full mt-5">
            <Button className="w-1/2 bg-green-600" onPress={handleButtonPress}>
              <Text className="text-green-100 font-popRegular">Attend</Text>
            </Button>
          </View>
        </Animated.View>
      )}
    </Animated.ScrollView>
  );
};

export default Page;
