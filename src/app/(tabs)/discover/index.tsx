import { FlatList, View } from 'react-native';
import Organization, {
  OrganizationProps,
} from '../../../components/discover/organization';

/**
 * Placeholder list of organizations until the backend is ready.
 */
const organizations: OrganizationProps[] = [
  {
    title: 'Americorps',
    rating: 4.5,
  },
  {
    title: 'City Year',
    rating: 4.3,
  },
  {
    title: 'Peace Corps',
    rating: 4.7,
  },
  {
    title: 'Teach for America',
    rating: 4.8,
  },
];

const Discover = () => {
  return (
    <FlatList
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{ gap: 16 }}
      className="min-h-screen flex-1"
      data={organizations}
      renderItem={({ item: { rating, title } }) => (
        <View className="px-4">
          <Organization title={title} rating={rating} />
        </View>
      )}
      keyExtractor={(item) => item.title}
      scrollEnabled={true}
    />
  );
};

export default Discover;
