import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useState } from 'react';
import { LayoutChangeEvent, Platform, View } from 'react-native';
import Animated, {
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { useHaptics } from '../../hooks/useHaptics';
import Blur from './blur';
import NavBackground from './nav-background';
import TabBarButton from './tab-bar-button';

const TabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const [dimensions, setDimensions] = useState({ height: 20, width: 100 });
  const tabPositionX = useSharedValue(0);

  const lightHaptic = useHaptics('light');

  // Specify the routes you want to include
  const includedRoutes = ['home', 'discover', 'dashboard', 'settings'];

  // Filter routes to include only the specified routes
  const filteredRoutes = state.routes.filter((route) =>
    includedRoutes.includes(route.name)
  );

  // Calculate the number of omitted routes
  const omittedRoutes = state.routes.length - filteredRoutes.length;

  const buttonWidth = dimensions.width / (state.routes.length - omittedRoutes);

  const onTabBarLayout = (e: LayoutChangeEvent) => {
    setDimensions({
      height: e.nativeEvent.layout.height,
      width: e.nativeEvent.layout.width,
    });
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: tabPositionX.value }],
    };
  });

  return (
    <View
      className="absolute bottom-7 mx-6 flex flex-row items-center justify-between overflow-hidden rounded-full border border-neutral-800 py-4 align-middle"
      onLayout={onTabBarLayout}
    >
      {/* Animated circle that indicates focus */}
      <Animated.View
        className="absolute z-10 mx-[5px] rounded-full bg-purple-700"
        style={[
          animatedStyle,
          {
            height: dimensions.height - 15,
            width: buttonWidth - 10,
          },
        ]}
      />

      {/* Load a BlurView on iOS but use the regular on Android due to performance limitations */}
      {Platform.select({
        android: <NavBackground />,
        ios: <Blur />,
      })}

      {/* Map through defined routes (minus built-in expo routes) */}
      {filteredRoutes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          tabPositionX.value = withSpring(buttonWidth * index, {
            duration: 1000,
            dampingRatio: 0.7,
            reduceMotion: ReduceMotion.System,
          });

          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
            lightHaptic();
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TabBarButton
            key={route.key}
            routeName={route.name}
            isFocused={isFocused}
            onPress={onPress}
            onLongPress={onLongPress}
            options={options}
            className="z-20"
          />
        );
      })}
    </View>
  );
};

export default TabBar;
