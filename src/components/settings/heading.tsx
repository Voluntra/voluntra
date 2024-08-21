import { Text } from 'react-native';

interface HeadingProps {
  text: string;
}

const Heading = ({ text }: HeadingProps) => {
  return (
    <Text className="font-popSemiBold text-2xl text-left text-foreground">
      {text}
    </Text>
  );
};

export default Heading;
