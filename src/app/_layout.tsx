import { Feather } from "@expo/vector-icons";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import * as Haptics from "expo-haptics";
import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Platform } from "react-native";
import Blur from "../components/blur";
import tabsList from "../config/tabs";
import palette from "../lib/colors";

const HomeLayout = () => {
  const [previousRoute, setPreviousRoute] = useState("index");

  const theme = {
    dark: true,
    colors: {
      primary: palette.purple["100"],
      background: palette.background as string,
      card: palette.neutral["900"],
      text: palette.foreground as string,
      border: palette.neutral["800"],
      notification: palette.purple["100"],
    },
  } satisfies typeof DarkTheme;

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
          // TODO: Fix headerTransparent prop moving all Views on all screens up
          screenOptions={{
            headerBackground: Blur,
            headerTransparent: false,
            headerTitleAlign: "left",
            headerTitleStyle: {
              fontSize: 26,
            },
            tabBarStyle: {
              height: Platform.OS === "android" ? 80 : 90,
            },
            tabBarLabelPosition: "below-icon",
            tabBarLabelStyle: {
              paddingBottom: Platform.OS === "android" ? 20 : 0,
            },
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
