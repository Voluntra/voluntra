import { BlurView } from "expo-blur";
import { StyleSheet } from "react-native";

const Blur = () => {
  return (
    <BlurView
      tint="systemUltraThinMaterialDark"
      intensity={70}
      style={StyleSheet.absoluteFill}
    />
  );
};

export default Blur;
