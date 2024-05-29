import { Feather } from "@expo/vector-icons";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import * as Haptics from "expo-haptics";
import { Tabs } from "expo-router";
import { useState } from "react";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config";
import Blur from "../components/blur";
import tabsList from "../config/tabs";

const HomeLayout = () => {
  const [previousRoute, setPreviousRoute] = useState("index");

  const {
    theme: { colors },
  } = resolveConfig(tailwindConfig) as {
    theme: { colors: Record<string, string> };
  };

  const theme = {
    dark: true,
    colors: {
      primary: colors.purple["100"],
      background: colors.background,
      card: colors.neutral["900"],
      text: colors.foreground,
      border: colors.neutral["800"],
      notification: colors.purple["100"],
    },
  } satisfies typeof DarkTheme;

  const handleIcon = (color: string, name: keyof typeof Feather.glyphMap) => {
    return <Feather name={name} size={24} color={color} />;
  };

  return (
    <ThemeProvider value={theme}>
      <Tabs
        initialRouteName="index"
        screenListeners={{
          tabPress: (e) => {
            const target = e.target?.split("-")[0];

            // If the user does not navigate to the same route twice, vibrate
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
            height: 90,
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
  );
};

export default HomeLayout;
