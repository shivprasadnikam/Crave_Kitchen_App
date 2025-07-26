module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // React Native Reanimated plugin
      'react-native-reanimated/plugin',
      
      // Optional: Add any other Babel plugins you need
      // '@babel/plugin-proposal-export-namespace-from',
      // '@babel/plugin-proposal-optional-chaining',
      // '@babel/plugin-proposal-nullish-coalescing-operator',
    ],
  };
}; 