import React from 'react';
import { Text, View } from 'react-native';

interface OrganizationProps {
  title: string;
}

const Organization = ({ title }: OrganizationProps) => {
  return (
    <View className="boder-neutral-800 w-full flex-1 items-center justify-center rounded-xl border bg-neutral-900 p-5">
      <Text className="font-popRegular text-base text-neutral-100">
        {title}
      </Text>
    </View>
  );
};

export default Organization;
