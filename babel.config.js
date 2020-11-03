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
            navigations: './src/navigations',
            store: './src/store',
            screens: './src/screens',
            utils: './src/utils',
          },
        },
      ],
    ],
  };
};
