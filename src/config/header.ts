import { palette } from '@lib/tailwind';
import { Stack } from 'expo-router';
import { ComponentProps } from 'react';

/**
 * To ensure consistency across the application, this object is used to define
 * any boilerplate options for headers.
 */
export const headerOptions: ComponentProps<typeof Stack>['screenOptions'] = {
  headerTransparent: true,
  autoHideHomeIndicator: true,
  headerShadowVisible: false,
  headerLargeTitleShadowVisible: false,
  headerLargeTitle: true,
  headerBlurEffect: 'systemUltraThinMaterialDark',
  headerLargeStyle: {
    backgroundColor: palette.background as string,
  },
  headerLargeTitleStyle: {
    fontFamily: 'Poppins-SemiBold',
  },
  headerBackTitleStyle: {
    fontFamily: 'Poppins-Medium',
  },
  headerTitleStyle: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
  },
};
