import { Stack } from 'expo-router';
import { ComponentProps } from 'react';
import { palette } from '../lib/palette';

/**
 * To ensure consistency across the application, this object is used to define
 * any boilerplate options for headers.
 */

export const headerOptions: ComponentProps['screenOptions'] = {
  headerTransparent: true,
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
  headerTitleStyle: {
    fontSize: 26,
    fontFamily: 'Poppins-SemiBold',
  },
};
