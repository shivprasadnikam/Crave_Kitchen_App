const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add support for additional file extensions
config.resolver.assetExts.push(
  'db', 'mp3', 'ttf', 'obj', 'png', 'jpg', 'jpeg', 'gif', 'webp', 'svg',
  'pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'zip', 'rar',
  'mp4', 'avi', 'mov', 'wmv', 'flv', 'webm', 'mkv', 'm4v',
  'wav', 'aac', 'ogg', 'flac', 'm4a', 'wma'
);

// Add support for additional source extensions
config.resolver.sourceExts.push('jsx', 'js', 'ts', 'tsx', 'json', 'cjs', 'mjs');

// Configure transformer for better performance
config.transformer.minifierConfig = {
  keep_fnames: true,
  mangle: {
    keep_fnames: true,
  },
  compress: {
    drop_console: false, // Keep console logs for development
    drop_debugger: true,
  },
};

// Configure resolver for better module resolution
config.resolver.platforms = ['ios', 'android', 'native', 'web'];

// Add custom resolver for better module resolution
config.resolver.alias = {
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
};

// Configure cache for better performance
config.cacheStores = [
  {
    name: 'metro-cache',
    type: 'file',
    options: {
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  },
];

// Configure server for better development experience
config.server = {
  port: 8081,
  enhanceMiddleware: (middleware, server) => {
    return (req, res, next) => {
      // Add custom middleware here if needed
      return middleware(req, res, next);
    };
  },
};

// Configure watchman for better file watching
config.watchFolders = [
  __dirname,
  // Add additional folders to watch if needed
];

module.exports = config; 