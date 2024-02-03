import * as Burnt from "burnt";
import "expo-dev-client";
import { Alert, Button, Text, View } from "react-native";
import { ContextMenuView } from "react-native-ios-context-menu";

const App = () => {
  return (
    <View className="min-h-screen">
      <Button
        title="Press me"
        onPress={() => {
          throw new Error("Hello, Sentry!");
        }}
      />

      <Text className="text-foreground tracking-wide whitespace-nowrap text-lg text-center">
        You're currently in the home section!
      </Text>
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
          Alert.alert(
            "onPressMenuPreview Event",
            `Menu preview was pressed...`
          );
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
        <Text className="text-foreground">
          Press And Hold To Show Context Menu
        </Text>
      </ContextMenuView>
    </View>
  );
};

export default App;
