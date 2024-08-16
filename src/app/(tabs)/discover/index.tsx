import { FlatList, View } from 'react-native';
import Organization from '../../../components/discover/organization';

/**
 * Placeholder list of organizations until the backend is ready.
 */
const organizations: { title: string }[] = [
  {
    title: 'Americorps',
  },
  {
    title: 'City Year',
  },
  {
    title: 'Peace Corps',
  },
  {
    title: 'Teach for America',
  },
];

const Discover = () => {
  return (
    <View>
      <FlatList
        contentInsetAdjustmentBehavior="automatic"
        className="m-page min-h-screen flex-1 pb-offset"
        data={organizations}
        renderItem={({ item }) => <Organization title={item.title} />}
        keyExtractor={(item) => item.title}
        scrollEnabled={true}
      />
    </View>
  );
};

export default Discover;
