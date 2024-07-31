import { Text, View } from "react-native";

interface StreamableProps {
  data: string;
}

const Streamable = ({ data }: StreamableProps) => {
  return (
    <View className="bg-neutral-900 rounded-xl w-full border-neutral-800 border">
      <Text className="text-neutral-100 p-4 font-popRegular">{data}</Text>
    </View>
  );
};

export default Streamable;
