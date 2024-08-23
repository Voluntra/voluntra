import { Text, View } from 'react-native';

interface HeadingProps {
  text: string;
}

const Heading = ({ text }: HeadingProps) => {
  return (
    <View>
      <Text className="font-medium text-base text-left text-foreground">
        {text}
      </Text>
    </View>
  );
};

export default Heading;
