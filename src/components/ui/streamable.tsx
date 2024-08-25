import Gradient from '@components/gradient';
import { TextInput } from 'react-native';
import Animated, { LinearTransition } from 'react-native-reanimated';

interface StreamableProps {
  data: string[];
}

const Streamable = ({ data }: StreamableProps) => {
  return (
    <Animated.View
      className="w-full rounded-xl border border-neutral-800 overflow-hidden p-3"
      layout={LinearTransition.duration(250)}
    >
      <Gradient />
      <TextInput multiline className="p-0">
        {data.map((text, idx) => (
          <Animated.Text
            key={text + idx}
            className="font-popRegular text-base text-foreground"
          >
            {text}
          </Animated.Text>
        ))}
      </TextInput>
    </Animated.View>
  );
};

export default Streamable;
