import { Stack } from 'expo-router';
import React from 'react';
import { headerOptions } from '../../../config/header';

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
