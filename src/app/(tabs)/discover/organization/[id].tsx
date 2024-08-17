import { ScrollView, Text } from 'react-native';

const Page = () => {
  return (
    <ScrollView
      className="m-page flex min-h-screen"
      contentInsetAdjustmentBehavior="automatic"
    >
      <Text className="font-popRegular text-foreground">ID</Text>
    </ScrollView>
  );
};

export default Page;
