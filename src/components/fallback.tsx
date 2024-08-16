import { Feather } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import { palette } from '../lib/palette';

const Fallback = () => {
  return (
    <View className="flex flex-col justify-center items-center align-middle min-h-screen m-page space-y-1">
      <Feather
        name="alert-triangle"
        size={128}
        color={palette['neutral']['500']}
      />
      <Text className="text-neutral-500 font-popMedium text-2xl">
        Something went wrong
      </Text>
    </View>
  );
};

export default Fallback;
