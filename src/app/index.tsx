import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Burnt from "burnt";
import "expo-dev-client";
import { useEffect } from "react";
import { View } from "react-native";
import MonthlyGoal from "../components/home/monthly-goal";
import { registerForPushNotificationsAsync } from "../lib/notifications";
import { findKey } from "../lib/onboarding";

const App = () => {
  useEffect(() => {
    // Begin on-boarding process, displaying key information to the user
    findKey("onboarding").then((val) => {
      // If the user has not seen the onboarding screen show it here
      // and set the "onboarding" key to true to keep track of it
      if (val === null || val === "false") {
        AsyncStorage.setItem("onboarding", "true").then(() => {
          Burnt.toast({
            title: "Welcome to Voluntra!",
            message: "Here's how to use our app",
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
    <View>
      <MonthlyGoal hoursLeft={2} monthlyGoal={10} />
    </View>
  );
};

export default App;
