import { Feather } from '@expo/vector-icons';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Pressable, PressableProps, Text } from 'react-native';
import { iconName } from '../../config/tabs';
import { palette } from '../../lib/palette';

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
      hitSlop={10}
      {...props}
    >
      <Feather
        name={iconName[routeName]}
        size={26}
        color={isFocused ? palette['purple']['100'] : palette['neutral']['500']}
      />
      <Text
        className={`${
          isFocused ? 'text-purple-100' : 'text-neutral-500'
        } font-popRegular text-xs capitalize`}
      >
        {routeName}
      </Text>
    </Pressable>
  );
};

export default TabBarButton;
