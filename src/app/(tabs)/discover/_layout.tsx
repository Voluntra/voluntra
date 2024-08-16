import { Stack } from 'expo-router';
import React from 'react';
import { headerOptions } from '../../../config/header';
import { useHaptics } from '../../../hooks/useHaptics';

const DiscoverLayout = () => {
  const selectionHaptic = useHaptics();

  return (
    <Stack
      screenOptions={{
        ...headerOptions,
        headerTitle: 'Discover',
        headerSearchBarOptions: {
          onFocus: () => selectionHaptic(),
          obscureBackground: true,
        },
      }}
    />
  );
};

export default DiscoverLayout;
