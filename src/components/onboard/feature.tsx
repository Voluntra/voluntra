import { Text } from 'react-native';

export interface FeatureProps {
  title: string;
  description: string;
}

const Feature = ({ description, title }: FeatureProps) => {
  return (
    <>
      <Text className="text-foreground font-popMedium text-3xl text-center">
        {title}
      </Text>

      <Text className="text-neutral-400 font-popRegular text-base text-center pt-2">
        {description}
      </Text>
    </>
  );
};

export default Feature;
