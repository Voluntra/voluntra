import { iconName } from '@config/tabs';
import { Feather } from '@expo/vector-icons';
import { palette } from '@lib/tailwind';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { Pressable, PressableProps, Text } from 'react-native';

interface TabBarButtonProps extends PressableProps {
  routeName: string;
  isFocused: boolean;
  options: BottomTabNavigationOptions;
}

const TabBarButton = ({
  isFocused,
  options,
  routeName,
  ...props
}: TabBarButtonProps) => {
  return (
    <Pressable
      className="flex-1 items-center justify-center gap-px"
      accessibilityRole="button"
      accessibilityState={isFocused ? { selected: true } : {}}
      accessibilityLabel={options.tabBarAccessibilityLabel}
      hitSlop={15}
      {...props}
    >
      <Feather
        name={iconName[routeName]}
        size={26}
        color={isFocused ? palette['purple']['100'] : palette['foreground']}
      />
      <Text
        className={`${
          isFocused ? 'text-purple-100' : 'text-foreground'
        } font-popRegular text-xs capitalize`}
      >
        {routeName.replace(/[()]/g, '')}{' '}
      </Text>
    </Pressable>
  );
};

export default TabBarButton;
