import { AmericorpsApiResponse } from '@appTypes/backend';
import Organization from '@components/discover/organization';
import { SearchContext } from '@context/search-context';
import { FlashList } from '@shopify/flash-list';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'expo-router';
import { useContext } from 'react';
import { Text, View } from 'react-native';

const fetchAmericorpsData = async () => {
  const payload = {
    location: '20001',
    distance: '20',
    categories: [],
    skills: [],
    greatFor: ['teens'],
    sortCriteria: null,
    keywords: [],
    virtual: false,
    dateRanges: [],
  };

  const { data } = await axios.post<AmericorpsApiResponse>(
    'https://www.voluntra.org/api/volunteer/americorps',
    payload
  );
  return data;
};

const Discover = () => {
  const { data, isLoading } = useQuery<AmericorpsApiResponse, Error>({
    queryKey: ['americorps'],
    queryFn: fetchAmericorpsData,
  });

  const searchValue = useContext(SearchContext);

  // const filteredData = useFuzzySearchList({
  //   list: data.data.volunteerMatchAPI.data.searchOpportunities.opportunities,
  //   queryText: searchValue,
  //   getText: ({ title }) => [title],
  //   mapResultItem: ({ item }) => item,
  // });

  if (isLoading) return <Text className="text-neutral-100">Loading...</Text>;

  return (
    <FlashList
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{
        paddingHorizontal: 16,
      }}
      contentInset={{ bottom: 90, top: 3 }}
      className="min-h-screen flex-1 w-full"
      data={data.data.volunteerMatchAPI.data.searchOpportunities.opportunities}
      ListEmptyComponent={
        <Text className="font-popRegular text-foreground">Nothing found!</Text>
      }
      ItemSeparatorComponent={() => <View className="h-4" />}
      renderItem={({ item: { title } }) => {
        return (
          <Link href="/discover/organization/1">
            <Organization title={title} rating={4.2} />
          </Link>
        );
      }}
      keyExtractor={(item) => item.id.toString()}
      scrollEnabled={true}
      extraData={searchValue}
      estimatedItemSize={245}
    />
  );
};

export default Discover;
