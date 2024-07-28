import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Burnt from "burnt";
import "expo-dev-client";
import * as Notifications from "expo-notifications";
import { useEffect } from "react";
import { View } from "react-native";
import MonthlyGoal from "../components/home/monthly-goal";
import { registerForPushNotificationsAsync } from "../lib/notifications";
import findKey from "../lib/onboarding";

const App = () => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });

  useEffect(() => {
    // Begin on-boarding process, displaying key information to the user
    findKey("onboarding").then((val) => {
      // If the user has not seen the onboarding screen show it here
      // and set the "onboarding" key to true to keep track of it
      if (val === null || val === "false") {
        AsyncStorage.setItem("onboarding", "true").then(() => {
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
    <View className="pt-offset pb-offset">
      <View className="flex min-h-screen m-3.5">
        <MonthlyGoal hoursLeft={2} monthlyGoal={10} />
      </View>
    </View>
  );
};

export default App;
