import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemeProvider } from "@react-navigation/native";
import * as Burnt from "burnt";
import "expo-dev-client";
import { registerDevMenuItems } from "expo-dev-menu";
import { useFonts } from "expo-font";
import * as Notifications from "expo-notifications";
import { Tabs } from "expo-router";
import { useEffect } from "react";
import { Platform } from "react-native";
import Blur from "../components/layout/blur";
import NavBackground from "../components/layout/nav-background";
import TabBar from "../components/layout/tab-bar";
import { tabsList } from "../config/tabs";
import {
  registerForPushNotificationsAsync,
  schedulePushNotification,
} from "../lib/notifications";
import { findKey, setKey } from "../lib/onboarding";
import theme from "../lib/theme";

const RootLayout = () => {
  // Handle expo vector icons' initial load
  useFonts({ Ionicons: Ionicons.font });

  // Handle receiving push notifications while app is foregrounded
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });

  // Create custom dev menu items
  const devMenuItems: Parameters<typeof registerDevMenuItems>[0][number][] = [
    {
      name: "Schedule Push Notification",
      callback: async () => {
        await schedulePushNotification(
          {
            title: "Test Notification",
            body: "Sent by Voluntra",
          },
          {
            seconds: 1,
          }
        );
      },
      shouldCollapse: true,
    },
    // To actually test onboarding, the app must be reloaded after this item is clicked
    {
      name: "Test Onboarding Process",
      callback: async () => {
        await AsyncStorage.setItem("onboarding", "false").then(() => {
          console.log("Success");
        });
      },
      shouldCollapse: false,
    },
  ];

  // Register custom dev menu items
  registerDevMenuItems(devMenuItems);

  useEffect(() => {
    // Begin on-boarding process, displaying key information to the user
    findKey("onboarding").then((val) => {
      // If the user has not seen the onboarding screen show it here
      // and set the "onboarding" key to true to keep track of it
      if (val === null || val === "false") {
        setKey("onboarding", "true").then(() => {
          // Onboarding placeholder
          Burnt.toast({
            title: "Welcome to Voluntra!",
            message: "This is a placeholder",
            preset: "done",
            haptic: "success",
          });
        });
      }
    });

    // Register user to receive push notifications
    registerForPushNotificationsAsync();
  }, []);

  return (
    <>
      {/* <StatusBar style="light" animated /> */}
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
              fontFamily: "Poppins-SemiBold",
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

export default RootLayout;
