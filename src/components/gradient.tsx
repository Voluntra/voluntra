import { palette } from '@lib/tailwind';
import { LinearGradient } from 'expo-linear-gradient';

const Gradient = () => {
  return (
    <LinearGradient
      colors={[palette['neutral']['900'], palette['black']]}
      className="absolute bottom-0 left-0 right-0 top-0 o"
    />
  );
};

export default Gradient;
