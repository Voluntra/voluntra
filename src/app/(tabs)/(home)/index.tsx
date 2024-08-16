import { ScrollView } from 'react-native';
import MonthlyGoal from '../../../components/home/monthly-goal';

const Home = () => {
  return (
    <ScrollView
      className="m-page flex min-h-screen"
      contentInsetAdjustmentBehavior="automatic"
    >
      <MonthlyGoal hoursLeft={6} monthlyGoal={8} />
    </ScrollView>
  );
};

export default Home;
