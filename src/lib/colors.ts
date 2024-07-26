import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config";

const palette = resolveConfig(tailwindConfig).theme.colors;

export default palette;
