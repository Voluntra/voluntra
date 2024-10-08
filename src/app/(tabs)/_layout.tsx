import Blur from '@components/layout/blur';
import NavBackground from '@components/layout/nav-background';
import TabBar from '@components/layout/tab-bar';
import { tabsList } from '@config/tabs';
import { useAuth } from '@hooks/useAuth';
import { registerForPushNotificationsAsync } from '@lib/notifications';
import theme from '@lib/theme';
import { ThemeProvider } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';
import { Redirect, Tabs } from 'expo-router';
import { useEffect } from 'react';
import { Platform, Text } from 'react-native';

const TabsLayout = () => {
  const { session, loading } = useAuth();

  useEffect(() => {
    if (!loading && session) {
      // Handle receiving push notifications while app is foregrounded
      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: false,
        }),
      });

      // Register user to receive push notifications
      registerForPushNotificationsAsync();
    }
  }, [loading, session]);

  if (loading) {
    return (
      <Text className="pt-offset font-popRegular text-foreground">
        Loading...
      </Text>
    );
  }

  if (!loading && !session) {
    return <Redirect href="/sign-in" />;
  }

  return (
    <ThemeProvider value={theme}>
      <Tabs
        tabBar={(props) => <TabBar {...props} />}
        screenOptions={{
          headerBackground: Platform.select({
            android: () => <NavBackground />,
            ios: () => <Blur />,
          }),
          headerTransparent: true,
          headerTitleAlign: 'left',
          headerTitleStyle: {
            fontSize: 26,
            fontFamily: 'Poppins-SemiBold',
          },
          headerShadowVisible: false,
          headerShown: false,
        }}
      >
        {tabsList.map(({ name, title }) => (
          <Tabs.Screen key={name} name={name} options={{ title }} />
        ))}
      </Tabs>
    </ThemeProvider>
  );
};

export default TabsLayout;
