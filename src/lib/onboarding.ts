import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * This function does as named, searching the on-device async-storage for a value
 * given a key.
 *
 * @param key A string that is utilized as a key in a key-value pair.
 * @returns Promise<String> Containing the value for the provided `key`.
 */
export const findKey = async (key: string) => {
  const value = await AsyncStorage.getItem(key);
  return value;
};

/**
 * This function does as named, setting a key-value pair in the
 * on-device async storage.
 *
 * @param key A string that is utilized as a key in a key-value pair.
 * @param value A string that is utilized as a value in a key-value pair.
 * @returns Promise<String> Containing the value for the provided `key`.
 */
export const setKey = async (key: string, value: string) => {
  await AsyncStorage.setItem(key, value);
};
