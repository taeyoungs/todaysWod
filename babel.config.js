module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            assets: './assets',
            components: './src/components',
            models: './src/models',
            navigation: './src/navigation',
            redux: './src/redux',
            screens: './src/screens',
            utils: './src/utils',
          },
        },
      ],
    ],
  };
};
