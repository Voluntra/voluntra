import { ExpoConfig } from "expo/config";

export default (): ExpoConfig => ({
  name: "Voluntra",
  slug: "voluntra",
  version: "1.0.0",
  runtimeVersion: {
    policy: "appVersion",
  },
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "dark",
  androidStatusBar: {
    barStyle: "light-content",
  },
  splash: {
    image: "./assets/splash-screen.png",
    resizeMode: "contain",
    backgroundColor: "#000000",
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: false,
    bundleIdentifier: "org.voluntra.voluntra",
  },
  android: {
    googleServicesFile: process.env.GOOGLE_SERVICES_JSON,
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#000000",
    },
    package: "org.voluntra.voluntra",
  },
  extra: {
    eas: {
      projectId: "72f616bf-cd7e-4d8f-aa80-36bd9cd5905c",
    },
  },
  scheme: "voluntra",
  owner: "voluntra",
  plugins: [
    [
      "expo-build-properties",
      {
        ios: {
          deploymentTarget: "13.4",
        },
      },
    ],
    [
      "expo-dev-launcher",
      {
        launchMode: "most-recent",
      },
    ],
    "expo-router",
    "expo-build-properties",
    "expo-asset",
    "expo-font",
  ],
  experiments: {
    typedRoutes: true,
  },
});
