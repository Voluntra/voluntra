import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { SearchContext } from 'src/context/search-context';
import { headerOptions } from '../../../config/header';
import { useHaptics } from '../../../hooks/useHaptics';

const DiscoverLayout = () => {
  const [searchTerms, setSearchTerms] = useState<string>(null);
  const selectionHaptic = useHaptics();

  return (
    <SearchContext.Provider value={searchTerms}>
      <Stack
        screenOptions={{
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
    </SearchContext.Provider>
  );
};

export default DiscoverLayout;
