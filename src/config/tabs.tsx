import { Feather } from "@expo/vector-icons";

interface Tab {
  name: string;
  title: string;
  iconName: keyof typeof Feather.glyphMap;
}

const tabsList: Tab[] = [
  {
    name: "index",
    title: "Home",
    iconName: "home",
  },
  {
    name: "discover",
    title: "Discover",
    iconName: "compass",
  },
  {
    name: "dashboard",
    title: "Dashboard",
    iconName: "target",
  },
  {
    name: "settings",
    title: "Settings",
    iconName: "settings",
  },
];

export default tabsList;
