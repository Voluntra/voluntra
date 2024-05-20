import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Burnt from "burnt";
import "expo-dev-client";
import { router } from "expo-router";
import { useEffect } from "react";
import { Button, ScrollView, Text, View } from "react-native";
import { ContextMenuView } from "react-native-ios-context-menu";

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
      <ContextMenuView
        previewConfig={{
          previewType: "CUSTOM",
          previewSize: "STRETCH",
          isResizeAnimated: true,
          borderRadius: 10,
          backgroundColor: "#1b1b1b",
          preferredCommitStyle: "pop",
        }}
        renderPreview={() => (
          <View className="flex flex-1 contaienr items-center align-middle">
            <Text className="text-foreground">Custom Preview</Text>
          </View>
        )}
        onPressMenuPreview={() => {
          router.navigate("discover");
          Burnt.toast({
            title: "Navigated to discover page",
            preset: "done",
            message: "This is a test function",
            duration: 3,
          });
        }}
        menuConfig={{
          menuTitle: "Basic Title Here",
          menuItems: [
            {
              actionKey: "key-01",
              actionTitle: "Toggled action",
              menuState: "on",
            },
            {
              actionKey: "key-02",
              actionTitle: "Disabled Action",
              icon: {
                type: "IMAGE_SYSTEM",
                imageValue: {
                  systemName: "nosign",
                },
              },
              menuAttributes: ["disabled"],
            },
            {
              actionKey: "key-03",
              menuAttributes: ["destructive"],
              icon: {
                type: "IMAGE_SYSTEM",
                imageValue: {
                  systemName: "trash",
                },
              },
              actionTitle: "Destructive Action",
            },
            {
              actionKey: "key-04",
              actionTitle: "With Subtitle",
              actionSubtitle: "This is a subtitle",
              icon: {
                type: "IMAGE_SYSTEM",
                imageValue: {
                  systemName: "doc.plaintext",
                },
              },
            },
          ],
        }}
      >
        <Text className="text-foreground bg-black">
          Press And Hold To Show Context Menu
        </Text>
      </ContextMenuView>
    </ScrollView>
  );
};

export default App;
