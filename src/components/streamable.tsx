import { Text, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

interface StreamableProps {
  data: string[];
}

const Streamable = ({ data }: StreamableProps) => {
  return (
    <View className="bg-neutral-900 rounded-xl w-full border-neutral-800 border p-3">
      <View className="flex-wrap flex-row">
        {data.map((text, idx) => (
          <Animated.View
            key={text + idx}
            entering={FadeIn}
            className="flex-row items-start"
          >
            <Text
              className={`text-neutral-100 font-popRegular text-base ${
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
