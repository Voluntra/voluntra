import { headerOptions } from '@config/header';
import { Stack } from 'expo-router';

const DashboardLayout = () => {
  return (
    <Stack
      screenOptions={{
        ...headerOptions,
        headerTitle: 'Dashboard',
      }}
    />
  );
};

export default DashboardLayout;
