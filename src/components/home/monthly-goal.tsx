import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { DonutChart, DonutItem } from "react-native-circular-chart";
import palette from "../../lib/palette";

interface MonthlyGoalProps {
  hoursLeft: number;
  monthlyGoal: number;
}

const MonthlyGoal = ({ hoursLeft, monthlyGoal }: MonthlyGoalProps) => {
  if (hoursLeft > monthlyGoal) {
    throw new Error(
      "MonthlyGoal component requires that its prop `hoursLeft` be less than `monthlyGoal`",
    );
  }

  const data: DonutItem[] = [
    {
      name: "hours",
      value: monthlyGoal - hoursLeft,
      color: palette["purple"]["900"],
    },
    {
      name: "hours",
      value: hoursLeft,
      color: palette["purple"]["100"],
    },
  ];

  const styles = StyleSheet.create({
    centerLabelText: {
      fontSize: 20,
      color: palette["white"] as string,
    },
    centerLabelCaption: {
      fontSize: 10,
    },
  });

  return (
    <View className="h-28 bg-neutral-900 rounded-xl shadow-sm p-5 flex flex-row justify-between align-middle items-center border border-neutral-800 overflow-hidden">
      {/*  Background Linear Gradient */}
      <LinearGradient
        colors={[palette["neutral"]["800"], palette["neutral"]["900"]]}
        className="absolute left-0 right-0 top-0 bottom-0"
      />

      {/* Dynamic text identifying the component and hours left to volunteer */}
      <View className="flex flex-col gap-PX justify-center align-middle">
        <Text className="font-popMedium text-2xl text-neutral-100">
          Monthly Goal
        </Text>
        <Text className="text-neutral-400 font-popRegular text-base">
          {hoursLeft} {hoursLeft > 1 ? "hours" : "hour"} of volunteering left
        </Text>
      </View>

      {/* Donut pie chart to visually display the percentage of the monthly goal completed */}
      <DonutChart
        data={data}
        strokeWidth={12}
        radius={35}
        labelValueStyle={{
          fontSize: 20,
          fontFamily: "Poppins-Regular",
          color: palette["neutral"]["100"] as string,
        }}
        labelTitleStyle={{
          fontSize: 10,
          fontFamily: "Poppins-Regular",
          color: palette["neutral"]["100"] as string,
        }}
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
