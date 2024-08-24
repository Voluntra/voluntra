import { Text, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

interface StreamableProps {
  data: string[];
}

const Streamable = ({ data }: StreamableProps) => {
  return (
    <View className="w-full rounded-xl border border-neutral-900 bg-black p-3">
      <View className="flex-row flex-wrap">
        {data.map((text, idx) => (
          <Animated.View
            key={text + idx}
            entering={FadeIn}
            className="flex-row items-start"
          >
            <Text
              className={`font-popRegular text-base text-foreground ${
                idx === 0 ? 'ml-1' : ''
              }`}
            >
              {text}
            </Text>
          </Animated.View>
        ))}
      </View>
    </View>
  );
};

export default Streamable;
