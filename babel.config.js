module.exports = function(api) {
  api.cache(true);
  return {
    presets: [
      ['babel-preset-expo', {
        jsxImportSource: 'react',
        runtime: 'automatic',
      }]
    ],
    plugins: [
      // React Native Reanimated plugin (must be last)
      'react-native-reanimated/plugin',
      
      // Module resolver for path aliases
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@components': './components',
            '@screens': './screens',
            '@navigation': './navigation',
            '@services': './services',
            '@utils': './utils',
            '@hooks': './hooks',
            '@context': './context',
            '@config': './config',
            '@styles': './styles',
            '@types': './types',
            '@assets': './assets',
          },
          extensions: [
            '.ios.js',
            '.android.js',
            '.js',
            '.jsx',
            '.ts',
            '.tsx',
            '.json',
          ],
        },
      ],
      
      // Optional chaining and nullish coalescing
      '@babel/plugin-proposal-optional-chaining',
      '@babel/plugin-proposal-nullish-coalescing-operator',
      
      // Export namespace from
      '@babel/plugin-proposal-export-namespace-from',
      
      // Class properties
      '@babel/plugin-proposal-class-properties',
      
      // Private methods
      '@babel/plugin-proposal-private-methods',
      
      // Private property in object
      '@babel/plugin-proposal-private-property-in-object',
      
      // Numeric separator
      '@babel/plugin-proposal-numeric-separator',
      
      // Throw expressions
      '@babel/plugin-proposal-throw-expressions',
      
      // Logical assignment operators
      '@babel/plugin-proposal-logical-assignment-operators',
      
      // Pipeline operator
      '@babel/plugin-proposal-pipeline-operator',
      
      // Do expressions
      '@babel/plugin-proposal-do-expressions',
      
      // Function bind
      '@babel/plugin-proposal-function-bind',
      
      // Function sent
      '@babel/plugin-proposal-function-sent',
      
      // Export default from
      '@babel/plugin-proposal-export-default-from',
      
      // Dynamic import
      '@babel/plugin-syntax-dynamic-import',
      
      // Top level await
      '@babel/plugin-syntax-top-level-await',
    ],
    env: {
      production: {
        plugins: [
          'transform-remove-console',
          'transform-remove-debugger',
        ],
      },
      development: {
        plugins: [
          // Keep console logs in development
        ],
      },
    },
  };
}; 