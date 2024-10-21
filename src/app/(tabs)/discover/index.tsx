import Organization from '@components/discover/organization';
import { SearchContext } from '@context/search-context';
import { FlashList, ListRenderItemInfo } from '@shopify/flash-list';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'expo-router';
import { useContext, useState } from 'react';
import { Text, View } from 'react-native';

interface Metadata {
  message: string;
  data: {
    name: string;
    time: string;
    location: string;
    description: string;
    requirements: string;
  };
}

const fetchAmericorpsData = async () => {
  console.log('fetching data');
  const { data } = await axios.post<Metadata>(
    'https://www.voluntra.org/api/volunteer/storm'
  );

  console.log(data);

  return [data.data];
};

export const useFetch = (enabled: boolean) => {
  return useQuery<Metadata['data'][], Error>({
    queryKey: ['americorps'],
    queryFn: fetchAmericorpsData,
    enabled, // Control when the query should run
  });
};

const Discover = () => {
  const [enabled, setEnabled] = useState(false);
  const { data, isLoading, refetch } = useFetch(enabled);

  const searchValue = useContext(SearchContext);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    setEnabled(true); // Enable the query
    await refetch();
    setRefreshing(false);
  };

  if (isLoading) return <Text className="text-neutral-100">Loading...</Text>;

  return (
    <FlashList
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{
        paddingHorizontal: 16,
      }}
      contentInset={{ bottom: 90, top: 3 }}
      className="min-h-screen flex-1 w-full"
      data={data}
      ListEmptyComponent={
        <Text className="font-popRegular text-foreground">Nothing found!</Text>
      }
      ItemSeparatorComponent={() => <View className="h-4" />}
      renderItem={(item: ListRenderItemInfo<Metadata['data']>) => {
        return (
          <Link href="/discover/organization/1">
            <Organization title={item.item.name} rating={4.2} />
          </Link>
        );
      }}
      keyExtractor={(item) => item.name}
      scrollEnabled={true}
      extraData={searchValue}
      estimatedItemSize={245}
      refreshing={refreshing}
      onRefresh={onRefresh}
    />
  );
};

export default Discover;
