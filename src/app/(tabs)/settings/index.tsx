import { useAuth } from '@hooks/useAuth';
import { useHaptics } from '@hooks/useHaptics';
import { Pressable, ScrollView, Text } from 'react-native';

const Settings = () => {
  const { signOut } = useAuth();

  const selectionHaptic = useHaptics();
  const successHaptic = useHaptics('success');

  return (
    <ScrollView
      className="m-page flex min-h-screen"
      contentInsetAdjustmentBehavior="automatic"
    >
      <Pressable
        onPress={() => {
          selectionHaptic();
          signOut(() => {
            successHaptic();
          });
        }}
        className="mb-4 flex h-14 w-full items-center justify-center rounded-xl border border-red-500 bg-red-600 active:opacity-80"
      >
        <Text className="font-popRegular text-lg text-red-100 active:opacity-80">
          Sign Out
        </Text>
      </Pressable>
    </ScrollView>
  );
};

export default Settings;
