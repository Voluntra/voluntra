import { SettingProps } from '@components/settings/setting';

/**
 * No duplicate settings (combo w/ title + iconName) are allowed, else React will render two items with the same key.
 */
export const generalList: SettingProps[] = [
  {
    title: 'Account information',
    iconName: 'user',
  },
  {
    title: 'Notifications',
    iconName: 'bell',
  },
  {
    title: 'Appearance',
    iconName: 'settings',
  },
  {
    title: 'Volunteering',
    iconName: 'activity',
  },
];

/**
 * No duplicate settings (combo w/ title + iconName) are allowed, else React will render two items with the same key.
 */
export const supportList: SettingProps[] = [
  {
    title: 'Report an issue',
    iconName: 'alert-triangle',
  },
  {
    title: 'Give us your feedback',
    iconName: 'message-circle',
  },
];
