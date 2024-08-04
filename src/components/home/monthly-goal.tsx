import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Text, View } from 'react-native';
import { DonutChart, DonutItem } from 'react-native-circular-chart';
import Animated, { FadeIn } from 'react-native-reanimated';
import palette from '../../lib/palette';

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
      value: monthlyGoal - hoursLeft,
      color: palette['purple']['700'],
    },
    {
      name: 'hours',
      value: hoursLeft,
      color: palette['purple']['100'],
    },
  ];

  return (
    <View className="h-28 bg-neutral-900 rounded-xl shadow-sm p-5 flex flex-row justify-between align-middle items-center border border-neutral-800 overflow-hidden">
      {/* Background Linear Gradient */}
      <LinearGradient
        colors={[palette['neutral']['800'], palette['neutral']['900']]}
        className="absolute left-0 right-0 top-0 bottom-0"
      />

      {/* Dynamic text identifying the component and hours left to volunteer */}
      <View className="flex flex-col gap-PX justify-center align-middle">
        <Text className="font-popMedium text-2xl text-neutral-100">
          Monthly Goal
        </Text>
        <Text className="text-neutral-400 font-popRegular text-base">
          {hoursLeft} {hoursLeft > 1 ? 'hours' : 'hour'} of volunteering left
        </Text>
      </View>

      {/* TODO: Find a suitable alternative for this chart componenet, looks janky */}
      {/* Donut pie chart to visually display the percentage of the monthly goal completed */}
      <View className="w-24 h-24 flex justify-center align-middle items-center">
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
          className="absolute inset-0 flex items-center justify-center text-neutral-100 font-popMedium text-2xl top-[34px]"
          entering={FadeIn}
        >
          {((hoursLeft / monthlyGoal) * 100).toFixed(0)}
        </Animated.Text>
      </View>
    </View>
  );
};

export default MonthlyGoal;
