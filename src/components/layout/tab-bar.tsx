import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import * as Haptics from "expo-haptics";
import { useState } from "react";
import { LayoutChangeEvent, Platform, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import Blur from "./blur";
import NavBackground from "./nav-background";
import TabBarButton from "./tab-bar-button";

const TabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  // Filter routes to exclude built-in expo routes
  const filteredRoutes = state.routes.filter(
    (route) => !["_sitemap", "+not-found"].includes(route.name)
  );

  // Calculate the number of omitted routes
  const omittedRoutes = state.routes.length - filteredRoutes.length;

  const [dimensions, setDimensions] = useState({ height: 20, width: 100 });
  const buttonWidth = dimensions.width / (state.routes.length - omittedRoutes);

  const onTabBarLayout = (e: LayoutChangeEvent) => {
    setDimensions({
      height: e.nativeEvent.layout.height,
      width: e.nativeEvent.layout.width,
    });
  };

  const tabPositionX = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: tabPositionX.value }],
    };
  });

  return (
    <View
      className="flex flex-row absolute bottom-7 justify-between items-center mx-6 py-4 rounded-full overflow-hidden align-middle border border-neutral-800"
      onLayout={onTabBarLayout}
    >
      {/* Animated circle that indicates focus, width should be subtracted by double the horizontal margin */}
      <Animated.View
        className="absolute bg-purple-700 rounded-full mx-[5px] z-10"
        style={[
          animatedStyle,
          {
            height: dimensions.height - 15,
            width: buttonWidth - 10,
          },
        ]}
      />

      {/* Load a BlurView on iOS but use the regular on Android due to performance limitations */}
      {Platform.OS === "android" ? <NavBackground /> : <Blur />}

      {/* Map through defined routes (minus built-in expo routes) */}
      {filteredRoutes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          tabPositionX.value = withSpring(buttonWidth * index, {
            duration: 1000,
          });

          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
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
