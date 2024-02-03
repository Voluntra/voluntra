import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import * as Sentry from "@sentry/react-native";
import { Tabs } from "expo-router";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config";
import Blur from "../components/blur";

Sentry.init({
  dsn: "https://5da9676a7efb087b4ea732217defcc41@us.sentry.io/4506651781955584",
  debug: process.env.NODE_ENV !== "production",
  enableNative: true,
});

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
      </Tabs>
    </ThemeProvider>
  );
};

export default Sentry.wrap(HomeLayout);
