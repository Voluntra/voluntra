import { Text, View } from "react-native";

interface StreamableProps {
  data: string;
  loading: boolean;
}

const Streamable = ({ data, loading }: StreamableProps) => {
  return (
    <View className="bg-neutral-800 rounded-md w-full">
      <Text className="text-neutral-100 p-4 text-base">{data}</Text>
    </View>
  );
};

export default Streamable;
