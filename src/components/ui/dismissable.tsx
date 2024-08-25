import { Feather } from '@expo/vector-icons';
import { palette } from '@lib/tailwind';
import { Text } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const Dismissable = () => {
  const opacity = useSharedValue(1);

  const onPress = () => {
    opacity.value = withTiming(0, { duration: 300 });
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  return (
    <Animated.View
      className="h-48 flex justify-center items-center align-middle relative bg-black rounded-xl border border-neutral-900"
      style={animatedStyle}
    >
      <Text className="text-foreground font-popRegular">Dismissable</Text>
      <Feather
        name="x"
        onPress={onPress}
        size={26}
        color={palette['neutral']['400']}
        style={{ position: 'absolute', right: 8, top: 8 }}
      />
    </Animated.View>
  );
};

export default Dismissable;
