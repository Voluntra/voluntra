import React, { useState } from 'react';
import Blur from '@components/layout/blur';
import NavBackground from '@components/layout/nav-background';
import { headerOptions } from '@config/header';
import { SearchContext } from '@context/search-context';
import { useHaptics } from '@hooks/useHaptics';
import { Stack } from 'expo-router';
import { Platform } from 'react-native';

// Define your ShiftData interface for TypeScript
interface ShiftData {
  description: string;
  time: string;
  organization: string;
  ageRequirements: string;
  location: string;
  image: string | null;
}

const DiscoverLayout = () => {
  const [searchTerms, setSearchTerms] = useState<string | null>(null);
  const selectionHaptic = useHaptics();

  return (
    <SearchContext.Provider value={searchTerms}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            ...headerOptions,
            headerTitle: 'Enlist Shifts',
          }}
        />
        <Stack.Screen
          name="organization/[id]"
          options={{
            headerTitleStyle: {
              fontSize: 20,
              fontFamily: 'Poppins-SemiBold',
            },
            headerBackground: () =>
              Platform.select({
                android: <NavBackground />,
                ios: <Blur />,
              }),
            headerBackTitleStyle: {
              fontFamily: 'Poppins-Medium',
            },
            headerTransparent: true,
            autoHideHomeIndicator: true,
            headerShadowVisible: false,
            headerBlurEffect: 'systemUltraThinMaterialDark',
            headerTitle: 'Organization',
          }}
        />
        <Stack.Screen
          name="OpportunityDetails"
          options={{
            headerTitle: 'Opportunity Details',
            headerTitleStyle: {
              fontSize: 20,
              fontFamily: 'Poppins-SemiBold',
            },
            headerBackground: () =>
              Platform.select({
                android: <NavBackground />,
                ios: <Blur />,
              }),
            headerBackTitleStyle: {
              fontFamily: 'Poppins-Medium',
            },
            headerTransparent: true,
            autoHideHomeIndicator: true,
            headerShadowVisible: false,
            headerBlurEffect: 'systemUltraThinMaterialDark',
          }}
        />
      </Stack>
    </SearchContext.Provider>
  );
};

export default DiscoverLayout;
