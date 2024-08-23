import PageView from '@components/layout/page-view';
import Heading from '@components/settings/heading';
import { Separator } from '@components/settings/separator';
import Setting from '@components/settings/setting';
import { generalList, supportList } from '@config/settings';
import { useAuth } from '@hooks/useAuth';
import { useHaptics } from '@hooks/useHaptics';
import * as Application from 'expo-application';
import { Link } from 'expo-router';
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
        <View>
          <Heading text="General" />
        </View>

        {/* General section items*/}
        <View className="p-4 bg-black border border-neutral-900 rounded-xl">
          {generalList.map(({ title, iconName }, idx) => (
            <Fragment key={title}>
              <Link href="/modal">
                <Setting title={title} iconName={iconName} key={title} />
              </Link>
              {idx !== generalList.length - 1 && (
                <Separator key={`separator-${title}`} />
              )}
            </Fragment>
          ))}
        </View>

        {/* Support section heading */}
        <View className="">
          <Heading text="Support" />
        </View>

        {/* Support section items*/}
        <View className="p-4 bg-black border border-neutral-900 rounded-xl">
          {supportList.map(({ title, iconName }, idx) => (
            <Fragment key={title}>
              <Link href="/modal">
                <Setting title={title} iconName={iconName} key={title} />
              </Link>
              {idx !== supportList.length - 1 && (
                <Separator key={`separator-${title}`} />
              )}
            </Fragment>
          ))}
        </View>

        {/* Debug information */}
        <View className="flex flex-row justify-between items-center align-middle">
          <Text className="font-popRegular text-sm text-neutral-500">
            Version {Application.nativeApplicationVersion}
          </Text>

          <Text className="font-popRegular text-sm text-neutral-500">
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
          className="flex h-14 w-full items-center justify-center rounded-xl border border-red-500 bg-red-600 active:opacity-80"
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
