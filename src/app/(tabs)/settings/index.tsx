import PageView from '@components/layout/page-view';
import Heading from '@components/settings/heading';
import { Separator } from '@components/settings/separator';
import Setting from '@components/settings/setting';
import { generalList, supportList } from '@config/settings';
import { useAuth } from '@hooks/useAuth';
import { useHaptics } from '@hooks/useHaptics';
import { Fragment } from 'react';
import { View } from 'react-native';

const Settings = () => {
  const { signOut } = useAuth();
  const successHaptic = useHaptics('success');

  const handlePress = () => {
    signOut(() => {
      successHaptic();
    });
  };

  return (
    <PageView>
      <View className="m-page flex-1 align-middle justify-between flex-col space-y-4">
        {/* General section*/}
        <View className="space-y-2">
          <Heading text="General" />

          <View className="p-4 bg-black border border-neutral-900 rounded-xl">
            {generalList.map((props, idx) => (
              <Fragment key={props.title}>
                <Setting {...props} />
                {idx !== generalList.length - 1 && <Separator />}
              </Fragment>
            ))}
          </View>
        </View>

        {/* Support section */}
        <View className="space-y-2">
          <Heading text="Support" />

          <View className="p-4 bg-black border border-neutral-900 rounded-xl">
            {supportList.map((props, idx) => (
              <Fragment key={props.title}>
                <Setting
                  {...props}
                  onPress={
                    idx === supportList.length - 1 ? handlePress : props.onPress
                  }
                />
                {idx !== supportList.length - 1 && <Separator />}
              </Fragment>
            ))}
          </View>
        </View>
      </View>
    </PageView>
  );
};

export default Settings;
