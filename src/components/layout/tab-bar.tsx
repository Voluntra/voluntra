import { tabsList, tuningValues } from '@config/tabs';
import { useHaptics } from '@hooks/useHaptics';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useState } from 'react';
import { LayoutChangeEvent, Platform, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import Blur from './blur';
import NavBackground from './nav-background';
import TabBarButton from './tab-bar-button';

const TabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const [dimensions, setDimensions] = useState({ height: 20, width: 100 });
  const width = useSharedValue(0);

  const tabPositionX = useSharedValue(0);

  const lightHaptic = useHaptics('light');

  // Filter routes to include only routes defined in the tabs configuration
  const filteredRoutes = state.routes.filter((route) =>
    tabsList.some((tab) => tab.name === route.name)
  );

  // Calculate the number of omitted routes
  const omittedRoutes = state.routes.length - filteredRoutes.length;

  const buttonWidth = dimensions.width / (state.routes.length - omittedRoutes);

  const onTabBarLayout = (e: LayoutChangeEvent) => {
    setDimensions({
      height: e.nativeEvent.layout.height,
      width: e.nativeEvent.layout.width,
    });

    width.value = buttonWidth - tuningValues[0].width;
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: tabPositionX.value }],
      width: width.value,
    };
  });

  return (
    <View
      className="absolute bottom-7 w-full align-middle justify-between px-5 flex-row items-center overflow-hidden rounded-full border py-4"
      style={{
        borderColor: 'rgba(93, 93, 93, .5)',
      }}
      onLayout={onTabBarLayout}
    >
      {/* Animated circle that indicates focus */}
      <Animated.View
        className="absolute z-10 rounded-full bg-purple-900 ml-1"
        style={[
          animatedStyle,
          {
            height: dimensions.height - 15,
          },
        ]}
      />

      {/* Load a BlurView on iOS but use the regular on Android due to performance limitations */}
      {Platform.select({
        android: <NavBackground />,
        ios: <Blur />,
      })}

      {/* Map through defined routes (minus built-in expo routes) */}
      {filteredRoutes.map((route, idx) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === idx;

        const onPress = () => {
          tabPositionX.value = withSpring(
            buttonWidth * idx - tuningValues[idx].tabPosition,
            {
              duration: 1000,
              dampingRatio: 0.7,
            }
          );

          width.value = withTiming(buttonWidth - tuningValues[idx].width, {
            duration: 300,
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
            className="z-50"
          />
        );
      })}
    </View>
  );
};

export default TabBar;
