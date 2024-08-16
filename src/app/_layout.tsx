import { SessionProvider } from '@components/auth/session-provider';
import Fallback from '@components/fallback';
import Blur from '@components/layout/blur';
import NavBackground from '@components/layout/nav-background';
import { devMenuItems } from '@config/dev-menu';
import { actions } from '@config/quick-actions';
import { useReactNavigationDevTools } from '@dev-plugins/react-navigation';
import Ionicons from '@expo/vector-icons/Ionicons';
import theme from '@lib/theme';
import { ThemeProvider } from '@react-navigation/native';
import 'expo-dev-client';
import { registerDevMenuItems } from 'expo-dev-menu';
import { useFonts } from 'expo-font';
import * as QuickActions from 'expo-quick-actions';
import { RouterAction, useQuickActionRouting } from 'expo-quick-actions/router';
import { Stack, useNavigationContainerRef } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Platform } from 'react-native';

const RootLayout = () => {
  // Handle expo vector icons' initial load
  useFonts({ Ionicons: Ionicons.font });

  // Register custom dev menu items
  registerDevMenuItems(devMenuItems);

  // Enable linking to the `href` param when a quick action is used.
  useQuickActionRouting();

  // Add React Navigation development plugin
  const navigationRef = useNavigationContainerRef();
  useReactNavigationDevTools(navigationRef);

  useEffect(() => {
    // Set quick actions from config
    QuickActions.setItems<RouterAction>(actions);
  }, []);

  return (
    <ErrorBoundary FallbackComponent={Fallback}>
      <StatusBar style="light" animated />
      <ThemeProvider value={theme}>
        <SessionProvider>
          <Stack
            screenOptions={{
              headerTransparent: true,
              headerTitleStyle: {
                fontSize: 26,
                fontFamily: 'Poppins-SemiBold',
              },
              headerShadowVisible: false,
              animation: 'fade',
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
        </SessionProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default RootLayout;
