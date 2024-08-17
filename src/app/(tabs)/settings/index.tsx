import Heading from '@components/settings/heading';
import { Separator } from '@components/settings/separator';
import Setting from '@components/settings/setting';
import { useAuth } from '@hooks/useAuth';
import { useHaptics } from '@hooks/useHaptics';
import * as Application from 'expo-application';
import { Pressable, ScrollView, Text, View } from 'react-native';

const Settings = () => {
  const { signOut } = useAuth();

  const selectionHaptic = useHaptics();
  const successHaptic = useHaptics('success');

  return (
    <ScrollView
      className="m-page flex min-h-screen"
      contentInsetAdjustmentBehavior="automatic"
    >
      <View className="flex-1 align-middle justify-between flex-col space-y-4">
        {/* General section heading*/}
        <View className="mb-4 pt-5">
          <Heading text="General" />
        </View>

        {/* General section items*/}
        <Setting title="Account information" iconName="user" />
        <Separator />
        <Setting title="Notifications" iconName="bell" />
        <Separator />
        <Setting title="Appearance" iconName="settings" />
        <Separator />
        <Setting title="Volunteering" iconName="activity" />

        {/* Support section heading */}
        <View className="mb-4 pt-5">
          <Heading text="Support" />
        </View>

        {/* Support section items*/}
        <Setting title="Report an issue" iconName="alert-triangle" />
        <Separator />
        <Setting title="Give us your feedback" iconName="message-circle" />

        {/* Debug information */}
        <View className="flex flex-row justify-between items-center align-middle pt-5">
          <Text className="font-popRegular text-neutral-400">
            Version {Application.nativeApplicationVersion}
          </Text>

          <Text className="font-popRegular text-neutral-400">
            Build Number {Application.nativeBuildVersion}
          </Text>
        </View>

        {/* Log out button */}
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
            Log Out
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default Settings;
