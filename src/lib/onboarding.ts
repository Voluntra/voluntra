import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * This function does as named, searching the on-device async-storage for a value
 * given a key.
 *
 * @param key A string that is utilized as a key in a key-value pair.
 * @returns Promise<String> Containing the value for the provided `key`.
 */
const findKey = async (key: string) => {
  const value = await AsyncStorage.getItem(key);
  return value;
};

export default findKey;
