import "expo-dev-client";
import { View } from "react-native";
import MonthlyGoal from "../components/home/monthly-goal";

const App = () => {
  return (
    <View className="pt-offset pb-offset">
      <View className="flex min-h-screen m-3.5">
        <MonthlyGoal hoursLeft={2} monthlyGoal={10} />
      </View>
    </View>
  );
};

export default App;
