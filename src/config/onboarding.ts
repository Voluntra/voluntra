import { FeatureProps } from '@components/onboard/feature';

export const keyName = 'onboarding';

export const onboardingFeatures: FeatureProps[] = [
  {
    title: 'Powerful Dashboard',
    description:
      'Set goals, track your progress, and get insights to help you improve',
    image: require('assets/dashboard.png'),
  },
  {
    title: 'Efficient Discovery',
    description:
      'Not sure where to volunteer? Our search algorithm will help you find the perfect opportunity',
    image: require('assets/discovery.png'),
  },
  {
    title: 'Get Notified',
    description:
      'Enable notifications to stay up-to-date with your volunteer opportunities',
    image: require('assets/notified.png'),
  },
];
