import { ExpoConfig } from 'expo/config';

export default (): ExpoConfig => ({
  name: 'Voluntra',
  slug: 'voluntra',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'dark',
  androidStatusBar: {
    barStyle: 'light-content',
  },
  splash: {
    image: './assets/splash-screen.png',
    resizeMode: 'contain',
    backgroundColor: '#000000',
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: false,
    bundleIdentifier: 'org.voluntra.voluntra',
  },
  android: {
    googleServicesFile: process.env.GOOGLE_SERVICES_JSON,
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#000000',
    },
    package: 'org.voluntra.voluntra',
  },
  extra: {
    eas: {
      projectId: '72f616bf-cd7e-4d8f-aa80-36bd9cd5905c',
    },
  },
  scheme: 'voluntra',
  owner: 'voluntra',
  plugins: [
    [
      'expo-build-properties',
      {
        ios: {
          deploymentTarget: '13.4',
        },
      },
    ],
    [
      'expo-dev-launcher',
      {
        launchMode: 'most-recent',
      },
    ],
    [
      'expo-font',
      {
        fonts: [
          'assets/fonts/Poppins-Black.ttf',
          'assets/fonts/Poppins-BlackItalic.ttf',
          'assets/fonts/Poppins-Bold.ttf',
          'assets/fonts/Poppins-BoldItalic.ttf',
          'assets/fonts/Poppins-ExtraBold.ttf',
          'assets/fonts/Poppins-ExtraBoldItalic.ttf',
          'assets/fonts/Poppins-ExtraLight.ttf',
          'assets/fonts/Poppins-ExtraLightItalic.ttf',
          'assets/fonts/Poppins-Italic.ttf',
          'assets/fonts/Poppins-Light.ttf',
          'assets/fonts/Poppins-LightItalic.ttf',
          'assets/fonts/Poppins-Medium.ttf',
          'assets/fonts/Poppins-MediumItalic.ttf',
          'assets/fonts/Poppins-Regular.ttf',
          'assets/fonts/Poppins-SemiBold.ttf',
          'assets/fonts/Poppins-SemiBoldItalic.ttf',
          'assets/fonts/Poppins-Thin.ttf',
          'assets/fonts/Poppins-ThinItalic.ttf',
        ],
      },
    ],
    'expo-router',
    'expo-build-properties',
    'expo-asset',
    'expo-font',
  ],
  experiments: {
    typedRoutes: true,
  },
});
