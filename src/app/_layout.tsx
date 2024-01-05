import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { Tabs } from "expo-router";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config";
import Blur from "../components/blur";

const HomeLayout = () => {
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

  return (
    <ThemeProvider value={theme}>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          headerBackground: Blur,
        }}
      >
        <Tabs.Screen name="index" options={{ title: "Home" }} />
        <Tabs.Screen name="discover" options={{ title: "Discover" }} />
        <Tabs.Screen name="dashboard" options={{ title: "Dashboard" }} />
        <Tabs.Screen name="settings" options={{ title: "Settings" }} />
        <Tabs.Screen name="modal" options={{ href: null }} />
      </Tabs>
    </ThemeProvider>
  );
};

export default HomeLayout;
