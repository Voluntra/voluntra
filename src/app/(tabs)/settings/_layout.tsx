import { headerOptions } from '@config/header';
import { useHaptics } from '@hooks/useHaptics';
import { Stack } from 'expo-router';

const SettingsLayout = () => {
  const selectionHaptic = useHaptics();

  return (
    <Stack
      screenOptions={{
        ...headerOptions,
        headerTitle: 'Settings',
        headerSearchBarOptions: {
          onFocus: () => selectionHaptic(),
          onCancelButtonPress: () => {
            selectionHaptic();
          },
          placeholder: 'What are you looking for?',
        },
      }}
    />
  );
};

export default SettingsLayout;
