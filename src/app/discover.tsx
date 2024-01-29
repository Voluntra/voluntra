import axios from "axios";
import Constants from "expo-constants";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useEffect, useRef, useState } from "react";
import { Button, Platform, Text, View } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

Notifications.setNotificationCategoryAsync("op", [
  {
    identifier: "volunteer",
    buttonTitle: "Click me!",
    textInput: {
      placeholder: "What's your name?",
      submitButtonTitle: "Send",
    },
    options: {
      opensAppToForeground: true,
    },
  },
  {
    identifier: "bad",
    buttonTitle: "Bad",
    options: {
      isDestructive: true,
      opensAppToForeground: false,
    },
  },
]);

// Can use this function below or use Expo's Push Notification Tool from: https://expo.dev/notifications
async function sendPushNotification(expoPushToken: string) {
  const message = {
    to: expoPushToken,
    sound: "default",
    title: "New Opportunity Available",
    body: "Swipe down for something cool!",
    data: { someData: "goes here" },
    categoryId: "op",
  };

  await axios.post("https://exp.host/--/api/v2/push/send", message, {
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
  });
}

async function registerForPushNotificationsAsync() {
  let token = await Notifications.getExpoPushTokenAsync({
    projectId: Constants.expoConfig.extra.eas.projectId,
  });

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = await Notifications.getExpoPushTokenAsync({
      projectId: Constants.expoConfig.extra.eas.projectId,
    });
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token.data;
}

const App = () => {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState<Notification | null>(null);
  const notificationListener = useRef<Notifications.Subscription | null>(null);
  const responseListener = useRef<Notifications.Subscription | null>(null);

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        if (response.actionIdentifier === "volunteer") {
          console.info("Volunteer button was pressed");
        } else if (response.actionIdentifier === "bad") {
          console.info("Destructive button was pressed");
        }
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <View className="flex-1 items-center justify-around">
      <Text className="text-foreground">
        Your expo push token: {expoPushToken}
      </Text>
      <View className="items-center justify-center">
        <Text className="text-foreground">
          Title: {notification && notification.request.content.title}{" "}
        </Text>
        <Text className="text-foreground">
          Body: {notification && notification.request.content.body}
        </Text>
        <Text className="text-foreground">
          Data:{" "}
          {notification && JSON.stringify(notification.request.content.data)}
        </Text>
      </View>
      <Button
        title="Press to Send Notification"
        onPress={async () => {
          await sendPushNotification(expoPushToken);
        }}
      />
    </View>
  );
};

export default App;

