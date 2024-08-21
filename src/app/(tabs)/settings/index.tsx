import PageView from '@components/layout/page-view';
import Heading from '@components/settings/heading';
import { Separator } from '@components/settings/separator';
import Setting from '@components/settings/setting';
import { generalList, supportList } from '@config/settings';
import { useAuth } from '@hooks/useAuth';
import { useHaptics } from '@hooks/useHaptics';
import * as Application from 'expo-application';
import { Fragment } from 'react';
import { Pressable, Text, View } from 'react-native';

const Settings = () => {
  const { signOut } = useAuth();

  const selectionHaptic = useHaptics();
  const successHaptic = useHaptics('success');

  return (
    <PageView>
      <View className="m-page flex-1 align-middle justify-between flex-col space-y-4">
        {/* General section heading*/}
        <View className="mb-4">
          <Heading text="General" />
        </View>

        {/* General section items*/}
        {generalList.map(({ title, iconName }, idx) => (
          <Fragment key={title}>
            <Setting title={title} iconName={iconName} key={title} />
            {idx !== generalList.length - 1 && (
              <Separator key={`separator-${title}`} />
            )}
          </Fragment>
        ))}

        {/* Support section heading */}
        <View className="mb-4 pt-5">
          <Heading text="Support" />
        </View>

        {/* Support section items*/}
        {supportList.map(({ title, iconName }, idx) => (
          <Fragment key={title}>
            <Setting title={title} iconName={iconName} key={title} />
            {idx !== generalList.length - 1 && (
              <Separator key={`separator-${title}`} />
            )}
          </Fragment>
        ))}

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
    </PageView>
  );
};

export default Settings;
