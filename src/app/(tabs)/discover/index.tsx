import { useFuzzySearchList } from '@nozbe/microfuzz/react';
import { useContext, useEffect } from 'react';
import { FlatList, Text } from 'react-native';
import { SearchContext } from 'src/context/search-context';
import Organization, {
  OrganizationProps,
} from '../../../components/discover/organization';

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

  useEffect(() => console.log(filteredData), [filteredData]);

  return (
    <FlatList
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{ gap: 16, paddingHorizontal: 16 }}
      className="min-h-screen flex-1 w-full h-full"
      data={filteredData}
      ListEmptyComponent={
        <Text className="font-popRegular text-neutral-100">Nothing found!</Text>
      }
      renderItem={({ item: { rating, title } }) => {
        console.log('Rendering Organization:', { title, rating });
        return <Organization title={title} rating={rating} />;
      }}
      keyExtractor={(item) => item.title}
      scrollEnabled={true}
      extraData={searchValue}
    />
  );
};

export default Discover;
