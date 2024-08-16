import { Feather } from '@expo/vector-icons';

interface Tab {
  name: string;
  title: string;
  iconName: keyof typeof Feather.glyphMap;
}

type IconMap = {
  [K in (typeof tabsList)[number]['name']]: (typeof tabsList)[number]['iconName'];
};

/**
 * This configuration object defines the tabs that will be displayed throughout the app,
 * to prevent hard-coding of tab names and icons in multiple places.
 */
export const tabsList: Tab[] = [
  {
    name: 'home',
    title: 'Home',
    iconName: 'home',
  },
  {
    name: 'discover',
    title: 'Discover',
    iconName: 'compass',
  },
  {
    name: 'dashboard',
    title: 'Dashboard',
    iconName: 'bar-chart-2',
  },
  {
    name: 'settings',
    title: 'Settings',
    iconName: 'settings',
  },
];

/**
 * This object extracts the icon name from the tabsList array, in a specific format
 * to be consumed by the `TabBarButton` component, to ensure complete type safety.
 */
export const iconName: IconMap = tabsList.reduce((acc, tab) => {
  acc[tab.name] = tab.iconName;
  return acc;
}, {} as IconMap);
