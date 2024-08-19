import MonthlyGoal from '@components/home/monthly-goal';
import { ScrollView } from 'react-native';

const Home = () => {
  return (
    <ScrollView
      className="m-page flex min-h-screen"
      contentInset={{ bottom: 90 }}
      contentInsetAdjustmentBehavior="automatic"
    >
      <MonthlyGoal hoursLeft={6} monthlyGoal={8} />
    </ScrollView>
  );
};

export default Home;
