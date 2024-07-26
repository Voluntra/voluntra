import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import EventSource, { EventSourceListener } from "react-native-sse";
import Streamable from "../components/streamable";
import { Events } from "../types/streaming/events";

const Dashboard = () => {
  const [stream, setStream] = useState(false);
  const [data, setData] = useState<string>(null);

  const onDataChange = useEffect(() => {
    let source: EventSource<Events> | null = null;

    if (stream) {
      source = new EventSource<Events>("https://www.voluntra.org/api/workers", {
        method: "POST",
        body: JSON.stringify({
          question: 0,
          organization: "Frisco Ford Stadium",
        }),
        headers: {
          "Content-Type": "text/html",
        },
        withCredentials: true,
      });

      const listener: EventSourceListener<Events> = (event) => {
        switch (event.type) {
          case "open": {
            setData("");
            break;
          }
          case "update": {
            let parsed = JSON.parse(event.data);
            setData((prev) => prev + parsed.response);
            break;
          }
          case "complete": {
            setStream(false);
            break;
          }
          case "error": {
            console.error("Connection error:", event.message);
            source.close();
            break;
          }
        }
      };

      source.addEventListener("open", listener);
      source.addEventListener("update", listener);
      source.addEventListener("complete", listener);
      source.addEventListener("error", listener);
    }

    return () => {
      if (source) {
        source.removeAllEventListeners();
        source.close();
      }
    };
  }, [stream]);

  const handlePress = () => {
    if (data) {
      // Reset state variable, and therefore the `Streamable` component
      setData("");
    }
    // Allow for re-streaming whenever the button is toggled
    setStream((prev) => !prev);
  };

  return (
    <View className="p-5 min-h-screen flex items-center space-y-4">
      <Pressable
        onPress={handlePress}
        className="transition-opacity ease-in-out duration-200 bg-neutral-800 w-full h-11 rounded-md flex items-center justify-center mb-4 active:opacity-50"
      >
        <Text className="text-neutral-200 text-lg font-bold">Generate</Text>
      </Pressable>
      {data && <Streamable data={data} />}
    </View>
  );
};

export default Dashboard;
