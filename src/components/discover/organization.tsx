import Ionicons from '@expo/vector-icons/Ionicons';
import { Image } from 'expo-image';
import { Text, View } from 'react-native';
import { palette } from 'src/lib/palette';

export interface OrganizationProps {
  title: string;
  rating: number;
}

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

const Organization = ({ title, rating }: OrganizationProps) => {
  return (
    <View className="border-neutral-800 items-center justify-center rounded-xl border bg-neutral-900 overflow-hidden">
      {/* Organization Image */}
      <Image
        className="flex w-full aspect-video items-center justify-center"
        source="https://picsum.photos/seed/696/3000/2000"
        placeholder={{ blurhash }}
        contentFit="cover"
        transition={1000}
        onError={(error) => console.error('Image Load Error:', error)}
        onLoad={() => console.log('Image Loaded Successfully')}
      />

      <View className="flex w-full flex-row justify-between items-center align-middle p-2 pb-0">
        {/* Organization Title */}
        <Text className="font-medium text-lg text-neutral-100">{title}</Text>

        {/* Organization Rating */}
        <View className="flex flex-row justify-center items-center align-middle space-x-1">
          <Ionicons name="star" size={16} color={palette['yellow']['100']} />
          <Text className="font-medium text-lg text-neutral-100">{rating}</Text>
        </View>
      </View>
      <Text className="text-neutral-300 font-popRegular p-2 pt-0 flex w-full justify-start">
        Mixed Shifts, Community
      </Text>
    </View>
  );
};

export default Organization;
