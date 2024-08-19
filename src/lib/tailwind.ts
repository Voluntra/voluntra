import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../../tailwind.config';

/**
 * This constant represents my tailwind config in a format that is NOT type-safe.
 * TODO: Add dynamic typing to the `palette` constant.
 */
export const palette = resolveConfig(tailwindConfig).theme.colors;

export const config = resolveConfig(tailwindConfig).theme;
