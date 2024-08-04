import Ionicons from '@expo/vector-icons/Ionicons';
import { ThemeProvider } from '@react-navigation/native';
import 'expo-dev-client';
import { registerDevMenuItems } from 'expo-dev-menu';
import { useFonts } from 'expo-font';
import * as QuickActions from 'expo-quick-actions';
import { RouterAction, useQuickActionRouting } from 'expo-quick-actions/router';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Platform } from 'react-native';
import Fallback from '../components/fallback';
import Blur from '../components/layout/blur';
import NavBackground from '../components/layout/nav-background';
import { devMenuItems } from '../config/dev-menu';
import { actions } from '../config/quick-actions';
import theme from '../lib/theme';

const RootLayout = () => {
  // Handle expo vector icons' initial load
  useFonts({ Ionicons: Ionicons.font });

  // Register custom dev menu items
  registerDevMenuItems(devMenuItems);

  // Enable linking to the `href` param when a quick action is used.
  useQuickActionRouting();

  useEffect(() => {
    // Set quick actions from config
    QuickActions.setItems<RouterAction>(actions);
  }, []);

  return (
    <ErrorBoundary FallbackComponent={Fallback}>
      <StatusBar style="light" animated />
      <ThemeProvider value={theme}>
        <Stack
          initialRouteName="sign-in"
          screenOptions={{
            animation: 'fade',
            headerTransparent: true,
            headerTitleStyle: {
              fontSize: 26,
              fontFamily: 'Poppins-SemiBold',
            },
            headerShadowVisible: false,
            headerShown: false,
          }}
        >
          <Stack.Screen
            name="sign-in"
            options={{
              headerTitle: 'Sign In',
              headerShown: true,
              headerBackground: Platform.select({
                android: () => <NavBackground />,
                ios: () => <Blur />,
              }),
            }}
          />
        </Stack>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default RootLayout;
