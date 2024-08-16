import Blur from '@components/layout/blur';
import NavBackground from '@components/layout/nav-background';
import { headerOptions } from '@config/header';
import { SearchContext } from '@context/search-context';
import { useHaptics } from '@hooks/useHaptics';
import { Stack } from 'expo-router';
import { useState } from 'react';
import { Platform } from 'react-native';

const DiscoverLayout = () => {
  const [searchTerms, setSearchTerms] = useState<string>(null);
  const selectionHaptic = useHaptics();

  return (
    <SearchContext.Provider value={searchTerms}>
      <Stack screenOptions={{}}>
        <Stack.Screen
          name="index"
          options={{
            ...headerOptions,
            headerTitle: 'Discover',
            headerSearchBarOptions: {
              onFocus: () => selectionHaptic(),
              onCancelButtonPress: () => {
                selectionHaptic();
                searchTerms && setSearchTerms(null);
              },
              onChangeText: (e) => setSearchTerms(e.nativeEvent.text),
              placeholder: 'What are you looking for?',
            },
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
      </Stack>
    </SearchContext.Provider>
  );
};

export default DiscoverLayout;
