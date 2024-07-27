import { Feather } from "@expo/vector-icons";
import { ThemeProvider } from "@react-navigation/native";
import * as Haptics from "expo-haptics";
import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Platform } from "react-native";
import Blur from "../components/blur";
import NavBackground from "../components/nav-background";
import tabsList from "../config/tabs";
import theme from "../lib/theme";

const HomeLayout = () => {
  const [previousRoute, setPreviousRoute] = useState("index");

  const handleIcon = (color: string, name: keyof typeof Feather.glyphMap) => {
    return <Feather name={name} size={24} color={color} />;
  };

  return (
    <>
      <StatusBar style="light" />
      <ThemeProvider value={theme}>
        <Tabs
          initialRouteName="index"
          screenListeners={{
            tabPress: (e) => {
              const target = e.target?.split("-")[0];

              // If the user does not navigate to the same route twice, trigger haptics
              if (target !== previousRoute) {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              }
              setPreviousRoute(target);
            },
          }}
          screenOptions={{
            headerBackground: Platform.OS === "android" ? NavBackground : Blur,
            headerTransparent: true,
            headerTitleAlign: "left",
            headerTitleStyle: {
              fontSize: 26,
            },
            headerShadowVisible: false,
            tabBarStyle: {
              height: Platform.OS === "android" ? 80 : 90,
              position: "absolute",
            },
            tabBarLabelPosition: "below-icon",
            tabBarLabelStyle: {
              paddingBottom: Platform.OS === "android" ? 20 : 0,
            },
            tabBarBackground: Platform.OS === "android" ? NavBackground : Blur,
          }}
        >
          {tabsList.map(({ iconName, name, title }) => (
            <Tabs.Screen
              key={name}
              name={name}
              options={{
                title: title,
                tabBarIcon: ({ color }) => handleIcon(color, iconName),
                tabBarIconStyle: {
                  marginTop: 16,
                },
              }}
            />
          ))}
        </Tabs>
      </ThemeProvider>
    </>
  );
};

export default HomeLayout;
