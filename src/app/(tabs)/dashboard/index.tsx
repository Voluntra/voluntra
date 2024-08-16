import { useEffect, useState } from 'react';
import { Pressable, ScrollView, Text } from 'react-native';
import EventSource, { EventSourceListener } from 'react-native-sse';
import Streamable from '../../../components/streamable';
import { useHaptics } from '../../../hooks/useHaptics';
import Events from '../../../types/streaming/events';

const Dashboard = () => {
  const [stream, setStream] = useState(false);
  const [data, setData] = useState<string[]>([]);

  const selectionHaptic = useHaptics();
  const successHaptic = useHaptics('success');

  useEffect(() => {
    let source: EventSource | null = null;

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

      const listener: EventSourceListener = (event) => {
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
    <ScrollView
      className="m-page flex min-h-screen"
      contentInsetAdjustmentBehavior="automatic"
    >
      <Pressable
        onPress={onPress}
        className="mb-4 flex h-14 w-full items-center justify-center rounded-xl border border-neutral-800 bg-neutral-900 active:opacity-80"
      >
        <Text className="font-popRegular text-lg text-foreground active:opacity-80">
          Generate
        </Text>
      </Pressable>
      {data.length > 0 && <Streamable data={data} />}
    </ScrollView>
  );
};

export default Dashboard;
