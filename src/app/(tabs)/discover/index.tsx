import Organization, {
  OrganizationProps,
} from '@components/discover/organization';
import { SearchContext } from '@context/search-context';
import { useFuzzySearchList } from '@nozbe/microfuzz/react';
import { FlashList } from '@shopify/flash-list';
import { Link } from 'expo-router';
import { useContext } from 'react';
import { Text, View } from 'react-native';

/**
 * Placeholder list of organizations until the backend list is ready.
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
  const searchValue = useContext(SearchContext);

  const filteredData = useFuzzySearchList({
    list: organizations,
    queryText: searchValue,
    getText: ({ title, rating }) => [title, rating.toString()],
    mapResultItem: ({ item }) => item,
  });

  return (
    <FlashList
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{
        paddingHorizontal: 16,
      }}
      contentInset={{ bottom: 90, top: 3 }}
      className="min-h-screen flex-1 w-full"
      data={filteredData}
      ListEmptyComponent={
        <Text className="font-popRegular text-foreground">Nothing found!</Text>
      }
      ItemSeparatorComponent={() => <View className="h-4" />}
      renderItem={({ item: { rating, title } }) => {
        return (
          <Link href="/discover/organization/1">
            <Organization title={title} rating={rating} />
          </Link>
        );
      }}
      keyExtractor={(item) => item.title}
      scrollEnabled={true}
      extraData={searchValue}
      estimatedItemSize={245}
    />
  );
};

export default Discover;
