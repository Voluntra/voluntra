import { BlurView, BlurViewProps } from 'expo-blur';

/**
 * A wrapper around the Expo BlurView component that provides a consistent
 * blur effect across the app, not to be used on Android for performance reasons.
 *
 * The `tint` and `intensity` props are removed using rest operator to prevent
 * overriding of styles.
 */
const Blur = ({ tint, intensity, ...props }: BlurViewProps) => {
  return (
    <BlurView
      tint={'systemUltraThinMaterialDark'}
      intensity={70}
      className="absolute top-0 bottom-0 left-0 right-0"
      {...props}
    />
  );
};

export default Blur;
