import Button from '@components/ui/pressable'; // Assuming you have a Button component
import { Feather } from '@expo/vector-icons';
import { palette } from '@lib/tailwind';
import { router } from 'expo-router';
import { Text } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const Dismissable = () => {
  const opacity = useSharedValue(1);

  const onPressDismiss = () => {
    opacity.value = withTiming(0, { duration: 300 });
  };

  const onPressSignUp = () => {
    router.push('/discover');
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  return (
    <Animated.View
      className="h-48 flex  align-middle relative border-neutral-900 bg-black rounded-xl border shadow-lg p-4"
      style={animatedStyle}
    >
      <Feather
        name="x"
        onPress={onPressDismiss}
        size={26}
        color={palette['neutral']['400']}
        style={{ position: 'absolute', right: 8, top: 8 }}
      />
      <Text className="font-popMedium text-2xl text-foreground">
        Make a difference!
      </Text>
      <Text className="font-popRegular text-base text-neutral-400 mb-4">
        Sign up for shifts and make a difference in your community. Your help is
        needed!
      </Text>
      <Button
        className="px-4 py-2 bg-blue-600 border-blue-500 border-2"
        onPress={onPressSignUp}
      >
        <Text className="text-white font-popRegular">Sign Up Now</Text>
      </Button>
    </Animated.View>
  );
};

export default Dismissable;
