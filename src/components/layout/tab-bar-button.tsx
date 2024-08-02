import { Feather } from '@expo/vector-icons';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Pressable, PressableProps, Text, View } from 'react-native';
import { iconName } from '../../config/tabs';
import palette from '../../lib/palette';

interface TabBarButtonProps extends PressableProps, React.RefAttributes<View> {
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
      className="flex-1 flex justify-center items-center gap-px"
      accessibilityRole="button"
      accessibilityState={isFocused ? { selected: true } : {}}
      accessibilityLabel={options.tabBarAccessibilityLabel}
      hitSlop={10}
      {...props}
    >
      <Feather
        name={iconName[routeName]}
        size={26}
        color={isFocused ? palette['purple']['100'] : palette['neutral']['400']}
      />
      <Text
        className={`${
          isFocused ? 'text-purple-100' : 'text-neutral-400'
        }  capitalize text-xs font-popRegular`}
      >
        {routeName === 'index' ? 'home' : routeName}
      </Text>
    </Pressable>
  );
};

export default TabBarButton;
