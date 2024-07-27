import { DarkTheme } from "@react-navigation/native";
import palette from "../lib/palette";

/**
 * This theme object is passed to the `ThemeProvider` from `react-navigation`,
 * which applies a coherent color scheme to all navigation elements present
 * in the app.
 *
 * TODO: Set values for all theme objects inside `tailwind.config.js`, and read
 * those values into this theme object, to avoid theme mismatching.
 */
const theme = {
  dark: true,
  colors: {
    primary: palette.purple["100"],
    background: palette.background as string,
    card: palette.neutral["900"],
    text: palette.foreground as string,
    border: palette.neutral["800"],
    notification: palette.purple["100"],
  },
} satisfies typeof DarkTheme;

export default theme;
