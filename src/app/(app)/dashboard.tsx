import { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import EventSource, { EventSourceListener } from 'react-native-sse';
import Streamable from '../../components/streamable';
import { useHaptics } from '../../hooks/useHaptics';
import Events from '../../types/streaming/events';

const Dashboard = () => {
  const [stream, setStream] = useState(false);
  const [data, setData] = useState<string[]>([]);

  const selectionHaptic = useHaptics();
  const successHaptic = useHaptics('success');

  useEffect(() => {
    let source: EventSource<Events> | null = null;

    if (stream) {
      source = new EventSource<Events>('https://www.voluntra.org/api/workers', {
        method: 'POST',
        body: JSON.stringify({
          question: 0,
          organization: 'Public Library',
        }),
        headers: {
          'Content-Type': 'text/html',
        },
        withCredentials: true,
      });

      const listener: EventSourceListener<Events> = (event) => {
        switch (event.type) {
          case 'open': {
            setData([]);
            successHaptic();
            break;
          }
          case 'update': {
            let parsed = JSON.parse(event.data);
            setData((prev) => [...prev, parsed.response]);
            break;
          }
          case 'complete': {
            setStream(false);
            break;
          }
          case 'error': {
            console.error('Connection error:', event.message);
            source.close();
            break;
          }
        }
      };

      source.addEventListener('open', listener);
      source.addEventListener('update', listener);
      source.addEventListener('complete', listener);
      source.addEventListener('error', listener);
    }

    return () => {
      if (source) {
        source.removeAllEventListeners();
        source.close();
      }
    };
  }, [stream]);

  const onPress = () => {
    selectionHaptic();

    if (data) {
      // Reset state variable, and therefore the `Streamable` component
      setData([]);
    }
    // Allow for re-streaming whenever the button is toggled
    setStream((prev) => !prev);
  };

  return (
    <View className="pt-offset pb-offset">
      <View className="m-page min-h-screen flex items-center">
        <Pressable
          onPress={onPress}
          className="bg-neutral-900 w-full h-14 rounded-xl flex items-center justify-center mb-4 active:opacity-80 border border-neutral-800"
        >
          <Text className="text-foreground text-lg font-popRegular active:opacity-80">
            Generate
          </Text>
        </Pressable>
        {data.length > 0 && <Streamable data={data} />}
      </View>
    </View>
  );
};

export default Dashboard;
