import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Burnt from "burnt";
import "expo-dev-client";
import { useEffect } from "react";
import { Button, ScrollView, Text } from "react-native";

const App = () => {
  const findKey = async (key: string) => {
    const value = await AsyncStorage.getItem(key);
    return value;
  };

  useEffect(() => {
    findKey("onboarding").then((val) => {
      // If the user has not seen the onboarding screen show it here
      // and set the "onboarding" key to true to keep track of it
      if (val === null || val === "false") {
        AsyncStorage.setItem("onboarding", "true").then(() => {
          Burnt.toast({
            title: "Welcome to Burnt!",
            message: "This is a toast message",
            preset: "done",
            haptic: "success",
          });
        });
      }
    });
  }, []);

  return (
    <ScrollView>
      <Text className="text-foreground tracking-wide whitespace-nowrap text-lg text-center">
        You're currently in the home section!
      </Text>
      <Button
        title="Test Onboarding Screen"
        onPress={async () => {
          await AsyncStorage.setItem("onboarding", "false").then(() => {
            console.log("Success");
          });
        }}
      />
      <Button title="Popover Test" />
      <Button
        title="Notifications test"
        onPress={() => {
          console.log(
            "Attempting to send notification (currently unimplemented, will be broken)"
          );
        }}
      />
      <Button
        title="Toast test"
        onPress={() => {
          Burnt.toast({
            title: "This is an example toast",
            preset: "done",
            message: "Looks cool, right",
            haptic: "success",
          });
        }}
      />
      <Button
        title="Alert test"
        onPress={() => {
          Burnt.alert({
            title: "This is an example alert",
            preset: "done",
            message: "Looks cool, right",
            duration: 1,
          });
        }}
      />
    </ScrollView>
  );
};

export default App;
