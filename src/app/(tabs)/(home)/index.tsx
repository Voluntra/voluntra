import MonthlyGoal from '@components/home/monthly-goal';
import PageView from '@components/layout/page-view';
import Dismissable from '@components/ui/dismissable';
import { View } from 'react-native';
import Animated, { LinearTransition } from 'react-native-reanimated';

const Home = () => {
  return (
    <PageView className="m-page flex min-h-screen">
      <Animated.View layout={LinearTransition}>
        <MonthlyGoal hoursLeft={6} monthlyGoal={8} />
        <View className="mt-3">
          <Dismissable />
        </View>
      </Animated.View>
    </PageView>
  );
};

export default Home;
