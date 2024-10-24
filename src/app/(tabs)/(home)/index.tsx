import { useNavigationStore } from '@appTypes/store';
import MonthlyGoal from '@components/home/monthly-goal';
import PageView from '@components/layout/page-view';
import Dismissable from '@components/ui/dismissable';
import { View } from 'react-native';
import Animated, { LinearTransition } from 'react-native-reanimated';

const Home = () => {
  const { homePageVisits, incrementHomePageVisits } = useNavigationStore();

  console.log(homePageVisits);
  return (
    <PageView className="m-page flex min-h-screen">
      <Animated.View layout={LinearTransition}>
        <MonthlyGoal hoursLeft={homePageVisits === 0 ? 8 : 7} monthlyGoal={8} />
        <View className="mt-3">
          <Dismissable />
        </View>
      </Animated.View>
    </PageView>
  );
};

export default Home;
