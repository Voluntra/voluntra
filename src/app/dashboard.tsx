import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import EventSource, { EventSourceListener } from "react-native-sse";
import Streamable from "../components/streamable";

type Events = "update" | "complete" | "close" | "error";

const Dashboard = () => {
  const [stream, setStream] = useState(false); // Set initial stream state to false
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<string>(null);

  useEffect(() => {
    let source: EventSource<Events> | null = null;

    if (stream) {
      source = new EventSource<Events>("https://voluntra.org/api/workers", {
        method: "POST",
        body: JSON.stringify({
          question: 0,
          organization: "Frisco Ford Stadium",
        }),
        withCredentials: true,
      });
      setLoading(true);

      const listener: EventSourceListener<Events> = (event) => {
        if (event.type === "open") {
          console.log("Open SSE connection.");
          setData("");
        } else if (event.type === "update") {
          let parsed = JSON.parse(event.data);

          setData((prev) => prev + parsed.response); // Update the data state variable
        } else if (event.type === "complete") {
          console.log("All events received.");
          setStream(false); // Set stream state to false after receiving all events
        } else if (event.type === "error") {
          console.error("Connection error:", event.message);
          source.close();
        } else if (event.type === "exception") {
          console.error("Error:", event.message, event.error);
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
        console.log("Close SSE connection.");
      }
      setLoading(false);
    };
  }, [stream]);

  const handleStream = () => {
    if (data) {
      setData(""); // Clear the data state variable when the button is pressed (to reset the streamable component
    }
    setStream((prev) => !prev); // Set stream state to true when the button is pressed
  };

  return (
    <View className="p-5 min-h-screen flex items-center space-y-4">
      <Pressable
        onPress={handleStream}
        className="transition-opacity ease-in-out duration-200 bg-neutral-800 w-full h-11 rounded-md flex items-center justify-center mb-4 active:opacity-50"
      >
        <Text className="text-neutral-200 text-lg font-bold">Generate</Text>
      </Pressable>
      {data && <Streamable data={data} loading={loading} />}
    </View>
  );
};

export default Dashboard;
