import React from 'react';
import { Text, View } from 'react-native';

interface OrganizationProps {
  title: string;
}

const Organization = ({ title }: OrganizationProps) => {
  return (
    <View className="border boder-neutral-800 bg-neutral-900 p-5 flex-1 w-full rounded-xl items-center justify-center">
      <Text className="text-neutral-100 font-popRegular text-base">
        {title}
      </Text>
    </View>
  );
};

export default Organization;
