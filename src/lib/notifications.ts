import Constants from "expo-constants";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

/**
 * This function will perform a series of checks, and handle platform differences between iOS
 * and Android.
 *
 * @returns Promise<string> The push token by which notifications are sent to a mobile device.
 */
export const registerForPushNotificationsAsync = async () => {
  let token: string;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
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
    try {
      const projectId =
        Constants?.expoConfig?.extra?.eas?.projectId ??
        Constants?.easConfig?.projectId;
      if (!projectId) {
        throw new Error("Project ID not found");
      }
      token = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
      console.log(token);
    } catch (e) {
      token = `${e}`;
    }
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
};

/**
 * This function is a placeholder for the time being, until a `usePushNotifications` hook
 * is made, and provides a basic wrapper in which notifications can be sent from the frontend.
 *
 * @param content Describes the shape of the data that will be displayed to the user, generally containing a `title`, a `body`, and some `data`.
 * @param trigger Defines the time to wait until the notification is sent among other things.
 */
export const schedulePushNotification = async (
  content: Notifications.NotificationContentInput,
  trigger: Notifications.NotificationTriggerInput
) => {
  await Notifications.scheduleNotificationAsync({
    content: content,
    trigger: trigger,
  }).catch((e) => {
    console.error(e);
  });
};
