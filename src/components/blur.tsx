import { BlurView } from "expo-blur";
import { StyleSheet } from "react-native";

const Blur = () => {
  return (
    <BlurView tint="dark" intensity={100} style={StyleSheet.absoluteFill} />
  );
};

export default Blur;
