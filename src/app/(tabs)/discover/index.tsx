import Organization, {
  OrganizationProps,
} from '@components/discover/organization';
import { SearchContext } from '@context/search-context';
import { useFuzzySearchList } from '@nozbe/microfuzz/react';
import { Link } from 'expo-router';
import { useContext } from 'react';
import { FlatList, Text } from 'react-native';

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
    <FlatList
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{
        gap: 16,
        paddingHorizontal: 16,
      }}
      contentInset={{ bottom: 90 }}
      className="min-h-screen flex-1 w-full"
      data={filteredData}
      ListEmptyComponent={
        <Text className="font-popRegular text-foreground">Nothing found!</Text>
      }
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
    />
  );
};

export default Discover;
