import MonthlyGoal from '@components/home/monthly-goal';
import PageView from '@components/layout/page-view';

const Home = () => {
  return (
    <PageView className="m-page flex min-h-screen">
      <MonthlyGoal hoursLeft={6} monthlyGoal={8} />
    </PageView>
  );
};

export default Home;
