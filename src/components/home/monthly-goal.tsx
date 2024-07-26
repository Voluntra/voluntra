import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { DonutChart, DonutItem } from "react-native-circular-chart";
import twColors from "../../lib/palette";

interface MonthlyGoalProps {
  hoursLeft: number;
  monthlyGoal: number;
}

const MonthlyGoal = ({ hoursLeft, monthlyGoal }: MonthlyGoalProps) => {
  if (hoursLeft > monthlyGoal) {
    throw new Error(
      "MonthlyGoal component requires that its prop `hoursLeft` be less than `monthlyGoal`"
    );
  }

  const data: DonutItem[] = [
    {
      name: "hours",
      value: monthlyGoal - hoursLeft,
      color: twColors["purple"]["900"],
    },
    {
      name: "hours",
      value: hoursLeft,
      color: twColors["purple"]["100"],
    },
  ];

  const styles = StyleSheet.create({
    centerLabelText: {
      fontSize: 20,
      color: twColors["white"] as string,
    },
    centerLabelCaption: {
      fontSize: 10,
    },
  });

  return (
    <View className="h-2/5 bg-neutral-800 rounded-xl shadow-sm m-3.5 p-5 flex flex-row justify-between align-middle items-center">
      {/* Dynamic text identifying the component and hours left to volunteer */}
      <View className="flex flex-col gap-PX justify-center align-middle">
        <Text className="font-bold text-2xl text-neutral-100">
          Monthly Goal
        </Text>
        <Text className="text-lg text-neutral-400">
          {hoursLeft} {hoursLeft > 1 ? "hours" : "hour"} of volunteering left
        </Text>
      </View>

      {/* Donut pie chart to visually display the percentage of the monthly goal completed */}
      <DonutChart
        data={data}
        strokeWidth={12}
        radius={35}
        labelValueStyle={styles.centerLabelText}
        labelTitleStyle={styles.centerLabelCaption}
        containerWidth={100}
        containerHeight={100}
        type="round"
        startAngle={0}
        endAngle={360}
        animationType="slide"
      />
    </View>
  );
};

export default MonthlyGoal;
