import { Stack } from 'expo-router';
import React from 'react';
import { headerOptions } from '../../../config/header';

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
