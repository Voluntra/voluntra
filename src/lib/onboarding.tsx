import AsyncStorage from "@react-native-async-storage/async-storage";

export const findKey = async (key: string) => {
  const value = await AsyncStorage.getItem(key);
  return value;
};
