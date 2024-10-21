import { Image, ImageSource } from 'expo-image';
import { Text } from 'react-native';

export interface FeatureProps {
  title: string;
  description: string;
  image: ImageSource;
}

const Feature = ({ description, title, image: imageName }: FeatureProps) => {
  return (
    <>
      <Image
        className="h-[400px] w-[400px]"
        contentFit="contain"
        transition={250}
        source={imageName}
      />

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
