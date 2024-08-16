import { RouterAction } from 'expo-quick-actions/router';

/**
 * These actions are passed to `expo-quick-actions` to be displayed
 *
 * in the `actions` design pattern, on the home screen.
 *
 * TODO: Fix crashing on Android, quick actions are currently disabled.
 */
export const actions: RouterAction[] = [
  {
    title: 'Discover',
    icon: 'search',
    id: '1',
    params: { href: '/discover' },
  },
  {
    title: 'Dashboard',
    icon: 'symbol:chart.bar',
    id: '2',
    params: { href: '/dashboard' },
  },
  {
    title: 'Settings',
    icon: 'symbol:gear',
    id: '2',
    params: { href: '/settings' },
  },
  {
    title: 'Leave Feedback',
    subtitle: 'Please provide feedback before deleting the app',
    icon: 'symbol:envelope',
    id: '3',
    params: { href: 'mailto:support@voluntra.org' },
  },
];
