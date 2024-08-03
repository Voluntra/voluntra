import Ionicons from '@expo/vector-icons/Ionicons';
import { ThemeProvider } from '@react-navigation/native';
import * as Burnt from 'burnt';
import 'expo-dev-client';
import { registerDevMenuItems } from 'expo-dev-menu';
import { useFonts } from 'expo-font';
import * as Notifications from 'expo-notifications';
import * as QuickActions from 'expo-quick-actions';
import { RouterAction, useQuickActionRouting } from 'expo-quick-actions/router';
import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Platform } from 'react-native';
import Fallback from '../components/fallback';
import Blur from '../components/layout/blur';
import NavBackground from '../components/layout/nav-background';
import TabBar from '../components/layout/tab-bar';
import { devMenuItems } from '../config/dev-menu';
import { actions } from '../config/quick-actions';
import { tabsList } from '../config/tabs';
import { registerForPushNotificationsAsync } from '../lib/notifications';
import { findKey, setKey } from '../lib/onboarding';
import theme from '../lib/theme';

const RootLayout = () => {
  // Handle expo vector icons' initial load
  useFonts({ Ionicons: Ionicons.font });

  // Handle receiving push notifications while app is foregrounded
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });

  // Register custom dev menu items
  registerDevMenuItems(devMenuItems);

  // Enable linking to the `href` param when a quick action is used.
  useQuickActionRouting();

  useEffect(() => {
    // Begin on-boarding process, displaying key information to the user
    findKey('onboarding').then((val) => {
      // If the user has not seen the onboarding screen show it here
      // and set the "onboarding" key to true to keep track of it
      if (val === null || val === 'false') {
        setKey('onboarding', 'true').then(() => {
          // Onboarding placeholder
          Burnt.toast({
            title: 'Welcome to Voluntra!',
            message: 'This is a placeholder',
            preset: 'done',
            haptic: 'success',
          });
        });
      }
    });

    // Register user to receive push notifications
    registerForPushNotificationsAsync();

    // Set quick actions from config
    QuickActions.setItems<RouterAction>(actions);
  }, []);

  return (
    <ErrorBoundary FallbackComponent={Fallback}>
      <StatusBar style="light" animated />
      <ThemeProvider value={theme}>
        <Tabs
          initialRouteName="index"
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
          }}
        >
          {tabsList.map(({ name, title }) => (
            <Tabs.Screen key={name} name={name} options={{ title: title }} />
          ))}
        </Tabs>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default RootLayout;
