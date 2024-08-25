import Blur from '@components/layout/blur';
import NavBackground from '@components/layout/nav-background';
import TabBar from '@components/layout/tab-bar';
import { tabsList } from '@config/tabs';
import { useReactQueryDevTools } from '@dev-plugins/react-query';
import { useAuth } from '@hooks/useAuth';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Redirect, Tabs } from 'expo-router';
import { Platform, Text, View } from 'react-native';

const queryClient = new QueryClient({});

const TabsLayout = () => {
  const { session, loading } = useAuth();
  useReactQueryDevTools(queryClient);

  if (loading) {
    return (
      <Text className="pt-offset font-popRegular text-foreground">
        Loading...
      </Text>
    );
  }

  if (!loading && !session) {
    return <Redirect href="/sign-in" />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Tabs
        tabBar={(props) => (
          <View className="mx-[14px]">
            <TabBar {...props} />
          </View>
        )}
        screenOptions={{
          headerBackground: Platform.select({
            android: () => <NavBackground />,
            ios: () => <Blur />,
          }),
          headerTransparent: true,
          headerTitleAlign: 'left',
          headerTitleStyle: {
            fontSize: 26,
            fontFamily: 'Poppins-SemiBold',
          },
          headerShadowVisible: false,
          headerShown: false,
        }}
      >
        {tabsList.map(({ name, title }) => (
          <Tabs.Screen key={name} name={name} options={{ title }} />
        ))}
      </Tabs>
    </QueryClientProvider>
  );
};

export default TabsLayout;
