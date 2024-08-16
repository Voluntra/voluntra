import { headerOptions } from '@config/header';
import { Stack } from 'expo-router';

const SettingsLayout = () => {
  return (
    <Stack
      screenOptions={{
        ...headerOptions,
        headerTitle: 'Settings',
      }}
    />
  );
};

export default SettingsLayout;
