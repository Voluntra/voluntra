import { Stack } from 'expo-router';
import React from 'react';
import { headerOptions } from '../../../config/header';

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
