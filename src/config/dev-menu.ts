import AsyncStorage from '@react-native-async-storage/async-storage';
import 'expo-dev-client';
import { registerDevMenuItems } from 'expo-dev-menu';
import { schedulePushNotification } from '../lib/notifications';
import { keyName } from './onboarding';

/**
 * This array is a type-safe method to register custom menu items,
 *
 * which are available in development mode only.
 */
export const devMenuItems: Parameters<
  typeof registerDevMenuItems
>[0][number][] = [
  {
    name: 'Schedule Push Notification',
    callback: async () => {
      await schedulePushNotification(
        {
          title: 'New shift opened',
          body: 'Sent by Voluntra',
        },
        {
          seconds: 1,
        }
      );
    },
    shouldCollapse: true,
  },
  {
    name: 'Test Onboarding Process',
    callback: async () => {
      await AsyncStorage.setItem(keyName, 'false');
    },
    shouldCollapse: true,
  },
];
