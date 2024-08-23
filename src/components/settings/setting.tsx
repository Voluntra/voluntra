import { Feather } from '@expo/vector-icons';
import { palette } from '@lib/tailwind';
import { GestureResponderEvent, Pressable, Text, View } from 'react-native';

export interface SettingProps {
  title: string;
  iconName: keyof typeof Feather.glyphMap;
  onPress?: (event: GestureResponderEvent) => void;
  iconColor?: string;
  destructive?: boolean;
  arrowShown?: boolean;
}

const Setting = ({
  title,
  iconName,
  iconColor = palette['foreground'] as string,
  destructive = false,
  arrowShown = true,
}: SettingProps) => {
  return (
    <Pressable className="flex-row w-full justify-between items-center align-middle">
      {/* Setting name and icon */}
      <View className="flex space-x-2 items-center align-middle flex-row">
        <View className="bg-neutral-900 rounded-xl flex p-2">
          <Feather
            name={iconName}
            size={22}
            color={destructive ? palette['red']['300'] : iconColor}
          />
        </View>
        <Text
          className={`font-medium text-xl ${destructive ? 'text-red-300' : 'text-foreground'}`}
        >
          {title}
        </Text>
      </View>

      {/* Setting arrow */}
      {arrowShown && (
        <Feather
          name="arrow-right"
          size={22}
          color={palette['neutral']['400'] as string}
        />
      )}
    </Pressable>
  );
};

export default Setting;
