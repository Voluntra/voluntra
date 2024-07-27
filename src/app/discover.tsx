import { Button, View } from "react-native";
import { schedulePushNotification } from "../lib/notifications";

export default function App() {
  return (
    <View className="pt-offset pb-offset">
      <View className="flex items-center">
        <Button
          title="Press to schedule a notification"
          onPress={async () => {
            await schedulePushNotification();
          }}
        />
      </View>
    </View>
  );
}
