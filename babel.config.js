module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    'transform-inline-environment-variables',
    [
      'module-resolver',
      {
        alias: {
          '@api': './src/api',
          '@assets': './src/assets',
          '@containers': './src/containers',
          '@components': './src/components',
          '@routes': './src/routes',
          '@state': './src/state',
          '@utils': './src/utils',
          '@typings': './src/types',
        },
      },
    ],
  ],
};
