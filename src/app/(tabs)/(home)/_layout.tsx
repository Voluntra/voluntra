import { headerOptions } from '@config/header';
import { Stack } from 'expo-router';

const HomeLayout = () => {
  return (
    <Stack
      screenOptions={{
        ...headerOptions,
        headerTitle: 'Home',
      }}
    />
  );
};

export default HomeLayout;
