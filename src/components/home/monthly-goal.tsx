import { palette } from '@lib/tailwind';
import { Text, View } from 'react-native';
import { DonutChart, DonutItem } from 'react-native-circular-chart';
import Animated, { FadeIn } from 'react-native-reanimated';

interface MonthlyGoalProps {
  hoursLeft: number;
  monthlyGoal: number;
}

const MonthlyGoal = ({ hoursLeft, monthlyGoal }: MonthlyGoalProps) => {
  if (hoursLeft > monthlyGoal) {
    throw new Error(
      'MonthlyGoal component requires that its prop `hoursLeft` be less than `monthlyGoal`'
    );
  }

  const data: DonutItem[] = [
    {
      name: 'hours',
      value: hoursLeft === 7 ? monthlyGoal - hoursLeft : 0.0001,
      color: palette['blue']['600'],
    },
    {
      name: 'hours',
      value: monthlyGoal,
      color: palette['blue']['100'],
    },
  ];

  return (
    <View className="flex h-28 flex-row items-center justify-between overflow-hidden rounded-xl border border-neutral-900 bg-black p-5 align-middle shadow-sm">
      {/* Background Linear Gradient */}

      {/* Dynamic text identifying the component and hours left to volunteer */}
      <View className="gap-px flex flex-col justify-center align-middle">
        <Text className="font-popMedium text-2xl text-foreground">
          Monthly Goal
        </Text>
        <Text className="font-popRegular text-base text-neutral-400">
          {hoursLeft} {hoursLeft > 1 ? 'hours' : 'hour'} of volunteering left
        </Text>
      </View>

      {/* TODO: Find a suitable alternative for this chart componenet, looks janky */}
      {/* Donut pie chart to visually display the percentage of the monthly goal completed */}
      <View className="flex h-24 w-24 items-center justify-center align-middle">
        <DonutChart
          data={data}
          strokeWidth={12}
          radius={35}
          labelValueStyle={{
            display: 'none',
          }}
          labelTitleStyle={{
            display: 'none',
          }}
          labelWrapperStyle={{
            display: 'none',
          }}
          containerWidth={100}
          containerHeight={100}
          type="round"
          startAngle={0}
          endAngle={360}
          animationType="slide"
        />
        <Animated.Text
          className="absolute inset-0 top-[34px] flex items-center justify-center font-popMedium text-2xl text-foreground"
          entering={FadeIn}
        >
          {hoursLeft === 8 ? '0%' : '13%'}
        </Animated.Text>
      </View>
    </View>
  );
};

export default MonthlyGoal;
