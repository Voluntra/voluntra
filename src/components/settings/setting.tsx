import { Feather } from '@expo/vector-icons';
import { palette } from '@lib/tailwind';
import { Text, View } from 'react-native';

interface Setting {
  title: string;
  iconName: keyof typeof Feather.glyphMap;
}

const Setting = ({ title, iconName }: Setting) => {
  return (
    <View className="flex-row w-full justify-between items-center align-middle">
      {/* Setting name and icon */}

      <View className="flex space-x-2 items-center align-middle flex-row">
        <Feather name={iconName} size={26} color={palette['neutral']['100']} />
        <Text className="font-medium text-foreground text-xl">{title}</Text>
      </View>

      {/* Setting arrow */}
      <Feather
        name="chevron-right"
        size={26}
        color={palette['neutral']['100']}
      />
    </View>
  );
};

export default Setting;
