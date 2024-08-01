import AsyncStorage from "@react-native-async-storage/async-storage";
import "expo-dev-client";
import { registerDevMenuItems } from "expo-dev-menu";
import { schedulePushNotification } from "../lib/notifications";

/**
 * This array is a type-safe method to register custom menu items,
 *
 * which are available in development mode only.
 */
export const devMenuItems: Parameters<
  typeof registerDevMenuItems
>[0][number][] = [
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
        },
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
