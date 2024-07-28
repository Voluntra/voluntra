import { ThemeProvider } from "@react-navigation/native";
import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Platform } from "react-native";

import Blur from "../components/layout/blur";
import NavBackground from "../components/layout/nav-background";
import TabBar from "../components/layout/tab-bar";
import { tabsList } from "../config/tabs";
import theme from "../lib/theme";

const HomeLayout = () => {
  return (
    <>
      <StatusBar style="light" />
      <ThemeProvider value={theme}>
        <Tabs
          initialRouteName="index"
          tabBar={(props) => <TabBar {...props} />}
          screenOptions={{
            headerBackground:
              Platform.OS === "android" ? NavBackground : () => <Blur />,
            headerTransparent: true,
            headerTitleAlign: "left",
            headerTitleStyle: {
              fontSize: 26,
            },
            headerShadowVisible: false,
          }}
        >
          {tabsList.map(({ name, title }) => (
            <Tabs.Screen key={name} name={name} options={{ title: title }} />
          ))}
        </Tabs>
      </ThemeProvider>
    </>
  );
};

export default HomeLayout;
