import Events from '@appTypes/streaming/events';
import Gradient from '@components/gradient';
import PageView from '@components/layout/page-view';
import Streamable from '@components/streamable';
import Button from '@components/ui/pressable';
import { useHaptics } from '@hooks/useHaptics';
import { useEffect, useState } from 'react';
import { Text } from 'react-native';
import EventSource, { EventSourceListener } from 'react-native-sse';

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
  }, [stream, successHaptic]);

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
    <PageView className="m-page flex min-h-screen">
      <Button onPress={onPress} className="overflow-hidden w-full mb-3">
        <Gradient />
        <Text className="font-popRegular text-lg text-foreground active:opacity-80">
          Generate
        </Text>
      </Button>
      {data.length > 0 && <Streamable data={data} />}
    </PageView>
  );
};

export default Dashboard;
