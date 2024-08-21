module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo', '@babel/preset-typescript'],
    plugins: [
      'nativewind/babel',
      [
        'module-resolver',
        {
          extensions: [
            '.ios.js',
            '.android.js',
            '.ios.jsx',
            '.android.jsx',
            '.js',
            '.jsx',
            '.json',
            '.ts',
            '.tsx',
          ],
          root: ['.'],
          alias: {
            '@components': './src/components',
            '@config': './src/config',
            '@context': './src/context',
            '@hooks': './src/hooks',
            '@lib': './src/lib',
            '@appTypes': './src/types',
          },
        },
      ],
    ],
  };
};
