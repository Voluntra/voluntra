import { Feather } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import { palette } from '../lib/palette';

const Fallback = () => {
  return (
    <View className="m-page flex min-h-screen flex-col items-center justify-center space-y-1 align-middle">
      <Feather
        name="alert-triangle"
        size={128}
        color={palette['neutral']['500']}
      />
      <Text className="font-popMedium text-2xl text-neutral-500">
        Something went wrong
      </Text>
    </View>
  );
};

export default Fallback;
