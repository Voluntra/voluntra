import { Text, View } from 'react-native';
import MonthlyGoal from '../../components/home/monthly-goal';

const App = () => {
  // const { session } = useAuth();

  return (
    <View className="pt-offset pb-offset">
      <View className="flex min-h-screen m-page space-y-4">
        <MonthlyGoal hoursLeft={6} monthlyGoal={8} />
        <Text className="text-neutral-100 font-popRegular">
          Hello
          {/* {session.user.email} */}
        </Text>
      </View>
    </View>
  );
};

export default App;
