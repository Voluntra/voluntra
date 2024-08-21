import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Constants from 'expo-constants';
import { keyName } from '../config/onboarding';

type KeyValues = 'true' | 'false';

/**
 * This function does as named, searching the on-device async-storage for a value
 * given a key.
 *
 * @param key A string that is utilized as a key in a key-value pair.
 * @returns Promise<String> Containing the value for the provided `key`.
 */
export const findKey = async (key: string): Promise<KeyValues> => {
  const value = await AsyncStorage.getItem(key);

  return value as KeyValues;
};

/**
 * This function does as named, setting a key-value pair in the
 * on-device async storage.
 *
 * @param key A string that is utilized as a key in a key-value pair.
 * @param value A string that is utilized as a value in a key-value pair.
 * @returns Promise<String> Containing the value for the provided `key`.
 */
export const setKey = async (key: string, value: KeyValues) => {
  await AsyncStorage.setItem(key, value);
};

export const hasOnboarded = async () => {
  const val = await findKey(keyName);

  if (val === null || val === 'false') {
    return false;
  }

  return true;
};

/**
 * This function is a wrapper that begins the onboarding process. It checks if the the `keyName` is found,
 * if it is not found, it will call the appropriate functions.
 *
 * This function will *not* set the `keyName` to true at any point in production. However, to ease development
 * the `keyName` will automatically be set to true to avoid soft locking the user out of the app.
 *
 * @param onKeyNotFound This function cannot be called unless `keyName` is *not* found.
 * @param onKeyFoundFn This function cannot be called unless `keyName` *is* found.
 */
export const startOnboarding = async (
  onKeyNotFound?: () => void,
  onKeyFoundFn?: () => void
) => {
  const val = await findKey(keyName);
  // If the user has not seen the onboarding screen
  if (val === null || val === 'false') {
    // If the dev build is being used, automatically set the key to true
    if (Constants.ExecutionEnvironment.Standalone) {
      setKey(keyName, 'true');
    }
    onKeyNotFound && onKeyNotFound();
  } else {
    onKeyFoundFn && onKeyFoundFn();
  }
};
